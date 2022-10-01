import { courseData } from "./data";
import { useState } from "react";
import { useMemo } from "react";
import Card from "./components/Card";
const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourseData = useMemo(() => {
    let filteredData = courseData.slice();

    if (!searchTerm) return [];
    if (searchTerm.trim()) {
      filteredData = filteredData.filter((course) =>
        course?.title?.toLowerCase()?.includes(searchTerm.toLowerCase())
      );
    }

    return filteredData;
  }, [searchTerm, courseData]);

  return (
    <section className="text-gray-600 body-font dark:bg-slate-900 dark:text-white">
      <div className="container px-5 py-12 mx-auto">
        <div className="py-4 text-lg">
          <div className="md:w-1/3 mx-auto flex">
            Search Course &nbsp;
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm((prev) => e.target.value)}
              className="border border-2 border-yellow-400 flex-grow  dark:text-black pl-2"
            />
          </div>
        </div>
        {searchTerm && (
          <p className="text-lg mx-20 my-2">
            {filteredCourseData?.length === 0 && "No"} Results for the search
            term <q>{searchTerm}</q>
          </p>
        )}
        <div className="flex flex-wrap -m-4">
          {filteredCourseData?.map((course) => {
            const { author } = course;
            return <Card key={author} {...course} />;
          })}
        </div>
        <h1 className="title-font font-medium text-3xl my-8 text-gray-900 dark:text-white text-center">
          Featured Courses
        </h1>
        <div className="flex flex-wrap -m-4">
          {courseData?.map((course) => {
            const { author } = course;
            return <Card key={author} {...course} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Courses;
