import { useState, useEffect, useMemo } from "react";
import Card from "./components/Card";
import axios from "axios";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import useRazorpay from "react-razorpay";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/auth";

const Sessions = () => {
  const {
    auth: { token },
  } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const Razorpay = useRazorpay();

  const loadCourses = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/meeting");
      setSessions(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuy = async (id) => {
    if (isLoading) return;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/meeting/book`,
        { meetingId: id },
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
              `${import.meta.env.VITE_SERVER_URL}/api/meeting/verify`,
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
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "An error occured");
    }
  };

  const filteredCourseData = useMemo(() => {
    let filteredData = sessions.slice();

    if (!searchTerm) return [];
    if (searchTerm.trim()) {
      filteredData = filteredData.filter((course) =>
        course?.title?.toLowerCase()?.includes(searchTerm.toLowerCase())
      );
    }

    return filteredData;
  }, [searchTerm, sessions]);

  useEffect(() => {
    loadCourses();
  }, []);

  if (isLoading) {
    return <Loading msg={"Fetching Top sessions ..."} />;
  }

  return (
    <section className="text-gray-600 body-font dark:bg-slate-900 dark:text-white">
      <div className="container px-5 py-12 pt-4 mx-auto">
        <div className="text-center">
          <Link
            to={"/courses"}
            className="font-medium text-center text-yellow-600 dark:text-yelllow-500 hover:underline"
          >
            Check Courses
          </Link>
        </div>

        <div className="pt-4 text-lg">
          <div className="md:w-1/2 mx-auto flex">
            Search Session &nbsp;
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm((prev) => e.target.value)}
              className="border border-2 w-1/2 border-yellow-400 flex-grow  dark:text-black pl-2"
            />
          </div>
        </div>
        {searchTerm && (
          <p className="text-lg mx-20 my-2">
            {filteredCourseData?.length === 0 && "No"} Results for the search
            term <q>{searchTerm}</q>
          </p>
        )}
        <div className="flex flex-wrap -m-2">
          {filteredCourseData?.map((course) => {
            return <Card key={course._id} {...course} />;
          })}
        </div>
        <h1 className="title-font font-medium text-3xl my-8 text-gray-900 dark:text-white text-center">
          Featured Sessions
        </h1>
        {sessions.length == 0 && (
          <h1 className="title-font font-medium text-xl my-8 text-gray-900 dark:text-white">
            No Sessions availabla at this moment
          </h1>
        )}
        <div className="flex flex-wrap -m-4">
          {sessions?.map((course) => {
            return <Card key={course._id} {...course} handleBuy={handleBuy} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Sessions;
