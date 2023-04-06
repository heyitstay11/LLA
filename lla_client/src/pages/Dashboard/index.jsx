import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { useAuthContext } from "../../context/auth";

const player_opts = {
  height: "390",
  width: "640",
  playerVars: {
    // controls: 0,
  },
};

const Leftboard = ({ course = {}, setCurrSection, downloadCertificate }) => {
  return (
    <div className="h-full w-full py-2 flex flex-col items-center bg-white border-r-2 border-yellow-400 dark:bg-slate-900 dark:text-white">
      {course.sections?.map((section) => {
        return (
          <button
            key={section._id}
            onClick={() => setCurrSection(section)}
            className="flex bg-white hover:bg-yellow-500 dark:hover:text-yellow-600 font-bold text-sm text-gray-900 py-2 px-4 hover:text-gray-900 dark:bg-slate-900 dark:text-white"
          >
            {section.title}
          </button>
        );
      })}
      <button
        onClick={() => downloadCertificate()}
        className="flex bg-white hover:bg-yellow-500 dark:hover:text-yellow-600 font-bold text-sm text-gray-900 py-2 px-4 hover:text-gray-900 dark:bg-slate-900 dark:text-white"
      >
        Get Certificate
      </button>
    </div>
  );
};

const Rightboard = ({ course = {}, currPart }) => {
  return (
    <div className="w-4/5 h-full dark:bg-slate-900 dark:text-white">
      {currPart ? (
        <div className="relative mb-4 ">
          <h2 className="p-4 text-lg my-2">{currPart?.description}</h2>
          {currPart.type == "File" && (
            <>
              <a
                target={"_blank"}
                className="font-medium p-4 text-yellow-600 dark:text-yellow-500 hover:underline"
                href={currPart.value}
              >
                Resource Link
              </a>
              <img
                src={course.thumbnail || "https://dummyimage.com/600x400"}
                className="mt-4 player h-1/2 w-1/2 border-2"
              />
            </>
          )}
          {currPart.type == "Video" && (
            <>
              <LiteYouTubeEmbed
                id={currPart?.value || "ekka-DlnnNs"}
                params="modestbranding=true"
                activeClass="lyt-activated"
                title="Video"
              />
            </>
            // <a
            //   target={"_blank"}
            //   className="font-medium p-4 text-yellow-600 dark:text-yellow-500 hover:underline"
            //   href={currPart.value}
            // >
            //   Video
            // </a>
          )}
        </div>
      ) : (
        <div className="relative md:mb-4 py-2">
          <img
            src={course.thumbnail || "https://dummyimage.com/600x400"}
            className="md:mt-4  border-2"
          />
          <h2 className="md:px-4 py-2 md:py-6 max-w-2xl md:text-lg">
            {course.details || "Demo Description"}
          </h2>
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [currSection, setCurrSection] = useState(null);
  const [currPart, setCurrPart] = useState(null);
  const { auth } = useAuthContext();
  const downloadCertificate = async () => {
    try {
      const response = await axios.get("/cert/generate/" + id, {
        headers: {
          "x-auth-token": auth?.token,
        },
        responseType: "blob",
      });
      const href = URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", `${course.title || "certificate"}.pdf`);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    } catch (error) {
      console.log(error);
    }
  };

  const loadCourse = async () => {
    if (!id) return;
    try {
      const { data } = await axios.get("/course/" + id + "?section=true");
      setCourse(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCourse();
  }, [id]);

  return (
    <section className="text-gray-600 body-font relative h-full dark:bg-slate-900 dark:text-white">
      <div className=" flex flex-col md:flex-row flex-wrap mr-0 dark:bg-slate-900 dark:text-white">
        <div className="lg:w-1/5 md:w-1/5 bg-gray-300 border-b-2 border-yellow-400 rounded-lg overflow-y-auto flex items-end justify-start relative">
          <Leftboard
            course={course}
            currSection={currSection}
            setCurrSection={setCurrSection}
            downloadCertificate={downloadCertificate}
          />
        </div>
        <div className="lg:w-4/5 sm:pb-10 md:w-4/5 bg-white flex flex-col md:ml-auto w-full sm:ml-4 mt-8 md:mt-0 dark:bg-slate-900 dark:text-white">
          <h1 className="md:text-3xl max-w-2xl mx-auto text-lg text-center py-6 font-medium title-font text-gray-900 dark:bg-slate-900 dark:text-white">
            {course.title || "Test Course"}
          </h1>
          {currSection?.parts?.length > 0 ? (
            <header className="text-gray-600 body-font border-b-2 border-yellow-400 border-t-2">
              <h2 className="text-2xl text-center py-1 font-medium title-font text-gray-900 dark:bg-slate-900 dark:text-white">
                {currSection.title}
              </h2>
              <div className="justify-center container mx-auto flex flex-wrap p-5 pt-1 flex-col md:flex-row items-center">
                <nav className="flex flex-wrap items-center text-base justify-center dark:bg-slate-900 dark:text-white">
                  {currSection.parts?.map((part, index) => {
                    return (
                      <button
                        onClick={() => setCurrPart(part)}
                        key={index}
                        className="mr-5 hover:text-yellow-600 dark:hover:text-yellow-500 dark:bg-slate-900 dark:text-white"
                      >
                        Part {index + 1}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </header>
          ) : null}

          <div className="h-full flex flex-col items-center justify-center">
            <Rightboard course={course} currPart={currPart} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
