import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import User from "../models/user.js";
import Course from "../models/course.js";

const router = Router();

router.get("/generate/:courseId", requireAuth, async (req, res) => {
  const { courseId } = req.params;
  const { _id: userId = "" } = req.user || {};
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "No such user exists" });

    const course = await Course.findById(courseId).populate(
      "createdBy",
      "name email"
    );
    if (!course)
      return res.status(404).json({ message: "No such course exists" });

    const doc = new PDFDocument({
      layout: "landscape",
      size: "A4",
    });

    const certLocation = course.title + "-" + user.name + ".pdf";

    // Helper to move to next line
    function jumpLine(doc, lines) {
      for (let index = 0; index < lines; index++) {
        doc.moveDown();
      }
    }

    // doc.pipe(fs.createWriteStream(certLocation));
    doc.pipe(res);

    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fff");

    doc.fontSize(10);

    // Margin
    const distanceMargin = 28;

    doc
      .fillAndStroke("#facc15")
      .lineWidth(10)
      .lineJoin("round")
      .rect(
        distanceMargin,
        distanceMargin,
        doc.page.width - distanceMargin * 2,
        doc.page.height - distanceMargin * 2
      )
      .stroke();

    // Header
    const maxWidth = 200;
    const maxHeight = 80;

    doc.image("fonts/logo.png", doc.page.width / 2 - maxWidth / 2, 60, {
      fit: [maxWidth, maxHeight],
      align: "center",
    });

    jumpLine(doc, 6);

    // Content
    doc
      .font("fonts/NotoSansJP-Regular.otf")
      .fontSize(20)
      .fill("#021c27")
      .text("CERTIFICATE OF COMPLETION", {
        align: "center",
      });

    jumpLine(doc, 1);

    doc
      .font("fonts/NotoSansJP-Light.otf")
      .fontSize(10)
      .fill("#021c27")
      .text("Presented to", {
        align: "center",
      });

    jumpLine(doc, 2);

    doc
      .font("fonts/NotoSansJP-Bold.otf")
      .fontSize(24)
      .fill("#1e40af")
      .text(user.name, {
        align: "center",
      });

    jumpLine(doc, 1);

    doc
      .font("fonts/NotoSansJP-Light.otf")
      .fontSize(12)
      .fill("#021c27")
      .text("Successfully completed " + course.title + ".", {
        align: "center",
      });

    jumpLine(doc, 7);

    doc.lineWidth(1);

    // Signatures
    const lineSize = 174;
    const signatureHeight = 390;

    doc.fillAndStroke("#021c27");
    doc.strokeOpacity(0.2);

    const startLine1 = 128;
    const endLine1 = 128 + lineSize;
    doc
      .moveTo(startLine1, signatureHeight)
      .lineTo(endLine1, signatureHeight)
      .stroke();

    const startLine2 = endLine1 + 32;
    const endLine2 = startLine2 + lineSize;

    const startLine3 = endLine2 + 32;
    const endLine3 = startLine3 + lineSize;

    doc.image("fonts/lm.png", startLine3, endLine1 + 28, {
      fit: [maxWidth - 40, maxHeight - 20],
      align: "center",
    });

    doc
      .moveTo(startLine3, signatureHeight)
      .lineTo(endLine3, signatureHeight)
      .stroke();

    doc
      .font("fonts/NotoSansJP-Bold.otf")
      .fontSize(10)
      .fill("#021c27")
      .text(user.name, startLine1, signatureHeight + 10, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
        align: "center",
      });

    doc
      .font("fonts/NotoSansJP-Light.otf")
      .fontSize(10)
      .fill("#021c27")
      .text("Student", startLine1, signatureHeight + 25, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
        align: "center",
      });

    doc
      .font("fonts/NotoSansJP-Bold.otf")
      .fontSize(10)
      .fill("#021c27")
      .text(course?.createdBy?.name, startLine3, signatureHeight + 10, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
        align: "center",
      });

    doc
      .font("fonts/NotoSansJP-Light.otf")
      .fontSize(10)
      .fill("#021c27")
      .text("Instructor", startLine3, signatureHeight + 25, {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
        align: "center",
      });

    jumpLine(doc, 4);

    // Validation link
    const link = "https://lingomax.ml/certify/" + courseId + "/" + userId;

    const linkWidth = doc.widthOfString(link);
    const linkHeight = doc.currentLineHeight();

    doc
      .underline(
        doc.page.width / 2 - linkWidth / 2,
        448,
        linkWidth,
        linkHeight,
        {
          color: "#021c27",
        }
      )
      .link(
        doc.page.width / 2 - linkWidth / 2,
        448,
        linkWidth,
        linkHeight,
        link
      );

    doc
      .font("fonts/NotoSansJP-Light.otf")
      .fontSize(10)
      .fill("#021c27")
      .text(
        link,
        doc.page.width / 2 - linkWidth / 2,
        448,
        linkWidth,
        linkHeight
      );

    doc.end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

export default router;
