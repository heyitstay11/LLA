import { useState, useEffect, useMemo } from "react";
import Card from "./components/Card";
import axios from "axios";
import Loading from "../Loading";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadCourses = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/course");
      setCourses(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCourseData = useMemo(() => {
    let filteredData = courses.slice();

    if (!searchTerm) return [];
    if (searchTerm.trim()) {
      filteredData = filteredData.filter((course) =>
        course?.title?.toLowerCase()?.includes(searchTerm.toLowerCase())
      );
    }

    return filteredData;
  }, [searchTerm, courses]);

  useEffect(() => {
    loadCourses();
  }, []);

  if (isLoading) {
    return <Loading msg={"Fetching Top courses ..."} />;
  }

  return (
    <section className="text-gray-600 body-font dark:bg-slate-900 dark:text-white">
      <div className="container px-5 py-12 pt-4 mx-auto">
        <h1 className=" font-medium text-xl my-2 text-gray-900 dark:text-white text-center">
          Book Sessions
        </h1>
        <div className="pt-4 text-lg">
          <div className="md:w-1/2 mx-auto flex">
            Search Course &nbsp;
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
          Featured Courses
        </h1>
        <div className="flex flex-wrap -m-4">
          {courses?.map((course) => {
            return <Card key={course._id} {...course} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Courses;
