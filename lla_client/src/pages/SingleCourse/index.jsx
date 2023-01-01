import { useNavigate, useParams } from "react-router-dom";
import useRazorpay from "react-razorpay";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/auth";
import { courseData } from "../Courses/data";
import { nanoid } from "nanoid";

const SingleCourse = () => {
  const navigate = useNavigate();
  const { id, author: pAuthor } = useParams();
  const {
    auth: { token = "" },
  } = useAuthContext();
  const Razorpay = useRazorpay();
  let sCourse = false;
  if (pAuthor) {
    sCourse = courseData.find((course) => course.author == pAuthor);
  }
  const [course, setCourse] = useState(sCourse || {});

  const {
    title,
    details,
    proficiency,
    enrolled,
    ratings = 100,
    price,
    thumbnail,
    author,
    learnings = [],
    content = [],
    level,
    img,
  } = course;

  const loadCourse = async () => {
    if (!id) return;
    try {
      const { data } = await axios.get("/course/" + id);
      setCourse(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCourse();
  }, [id]);

  const handleBuy = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/payment/razorpay`,
        { price, courseId: id || nanoid() },
        { headers: { "x-auth-token": token } }
      );
      const options = {
        key: import.meta.env.VITE_RAZOR_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        handler: async (response) => {
          try {
            const res = await fetch(
              `${import.meta.env.VITE_SERVER_URL}/api/payment/verify`,
              {
                method: "POST",
                body: JSON.stringify({ ...response, orderId: data.orderId }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const verifyData = await res.json();
            console.log(verifyData);
            if (verifyData.msg) {
              navigate("/mycourse");
              toast.success("Payment Done!, Check Dashboard");
            }
          } catch (error) {
            console.log(error);
          }
        },
        modal: {
          ondismiss: function () {
            toast.warn("Payment was closed in between");
          },
        },
      };
      const razorpay = new Razorpay(options);
      razorpay.open();
    } catch (error) {}
  };

  return (
    <section className="text-gray-600 body-font dark:bg-slate-900 dark:text-white">
      <div className="container px-5 py-12 mx-auto flex flex-wrap justify-center">
        <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
          <div className="w-full sm:p-4 px-4 mb-6">
            <h1 className="title-font font-medium text-3xl mb-2 text-gray-900 dark:text-white">
              {title || "Dummy Title"}
            </h1>
            <div className="leading-relaxed">
              {details ||
                "Pour-over craft beer pug drinking vinegar live-edge gastropub, keytar neutra sustainable fingerstache kickstarter."}
            </div>
            <div className="leading-relaxed">
              &nbsp; ~ {author || "John Doe"}
            </div>
          </div>
          <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
            <h2 className="title-font font-medium text-3xl text-gray-900 dark:text-white">
              {enrolled || "1.1k"}
            </h2>
            <p className="leading-relaxed">Learners</p>
          </div>
          <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
            <h2 className="title-font font-medium text-3xl text-gray-900 dark:text-white">
              {ratings?.toFixed(1) || "2.9"}
            </h2>
            <p className="leading-relaxed">Ratings</p>
          </div>
          <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
            <h2 className="title-font font-medium text-3xl text-gray-900 dark:text-white">
              {proficiency || level || "Beginner"}
            </h2>
            <p className="leading-relaxed">Proficiency</p>
          </div>
        </div>
        <div className="lg:w-1/3 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0 border border-4 border-yellow-500">
          <img
            className="object-cover object-center w-full h-full"
            src={thumbnail || img || "https://dummyimage.com/300x200"}
            alt=""
          />
        </div>
      </div>
      <div className="container lg:px-32 px-6 pb-8 mx-auto flex flex-wrap">
        <div className="flex text-xl items-center">
          <h1>Price: ₹{price || 699}</h1>
          <button
            onClick={handleBuy}
            className="text-white bg-yellow-500 border-0 py-2 px-8 mx-6 focus:outline-none hover:bg-yellow-600 rounded text-lg font-medium dark:text-yellow-900"
          >
            Buy Now
          </button>
        </div>
      </div>
      <div className="lg:mx-32 text-gray-600 body-font pb-6">
        <div className="container px-5 py-6 mx-auto flex flex-wrap items-center">
          <div className="lg:w-1/2 md:w-1/2 md:pr-16 sm:mx-auto border border-yellow-500 border-2 rounded-md p-4 ">
            <h1 className="title-font font-medium text-2xl mb-4 text-gray-900 dark:text-white">
              What you will learn in <q>{title || "Dummy Title"}</q>
            </h1>
            {learnings?.map((point, index) => (
              <p
                key={index}
                className="leading-relaxed my-2 px-2 dark:text-white"
              >
                {index + 1}&nbsp; {point}
              </p>
            ))}
            {content?.map((point, index) => (
              <p
                key={index}
                className="leading-relaxed dark:text-white my-2 px-2"
              >
                {index + 1}&nbsp; {point}
              </p>
            ))}
          </div>
          <div className="lg:w-1/2 md:w-1/2 p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"></div>
        </div>
      </div>
    </section>
  );
};

export default SingleCourse;
