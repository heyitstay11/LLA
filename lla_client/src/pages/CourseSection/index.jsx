import { useReducer } from "react";
import { ACTION_TYPES, initialState, reducer } from "./reducer";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function YouTubeGetID(url) {
  var ID = "";
  url = url
    .replace(/(>|<)/gi, "")
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  } else {
    ID = url;
  }
  return ID;
}

export const CourseSection = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    title,
    description,
    courseID,
    parts,
    partValue,
    partType,
    partDescription,
  } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: ACTION_TYPES.INPUT,
      payload: { [name]: value },
    });
  };

  const handleAddPart = () => {
    let link = "";
    try {
      link = new URL(partValue);
      link = link.href;
    } catch (error) {
      toast.error("Invalid URL");
      return;
    }
    if (partType == "Video") {
      link = YouTubeGetID(link);
      if (!link) {
        toast.error("Invalid Youtube URL");
        return;
      }
    }
    dispatch({
      type: ACTION_TYPES.ADD_PART,
      payload: {
        type: partType,
        value: link,
        description: partDescription,
      },
    });
  };

  const handleSubmitSection = async () => {
    try {
      const { data } = await axios.post("/course/createSection", { ...state });
      console.log(data);
      navigate("/courseboard/" + courseID);
    } catch (error) {
      console.log(error);
      toast.error("An error occured, try again");
    }
  };

  return (
    <div className="w-full dark:bg-slate-900 dark:text-white flex flex-col items-center">
      <h1 className="text-2xl mt-6">Create New Section</h1>
      <div className="block w-full md:w-2/3 m-8 p-6 rounded-lg border border-gray-600 dark:border-white bg-white max-w-md dark:bg-slate-900 dark:text-white">
        <form>
          <div className="form-group mb-6 ">
            <label
              htmlFor="courseID"
              className="form-label inline-block mb-2 text-gray-700 dark:text-white"
            >
              Course ID
            </label>
            <input
              type="text"
              value={courseID}
              onChange={handleInputChange}
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-400 dark:border-gray-300  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="courseID"
              name="courseID"
              placeholder="Enter Course ID"
            />
          </div>
          <div className="form-group mb-6 ">
            <label
              htmlFor="title"
              className="form-label inline-block mb-2 text-gray-700 dark:text-white"
            >
              Section Title
            </label>
            <input
              type="text"
              onChange={handleInputChange}
              value={title}
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-400 dark:border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="title"
              name="title"
              placeholder="Enter Title"
            />
          </div>
          <div className="form-group mb-6">
            <label
              htmlFor="description"
              className="form-label inline-block mb-2 text-gray-700 dark:text-white"
            >
              Section Description
            </label>
            <textarea
              onChange={handleInputChange}
              value={description}
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-400 dark:border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="description"
              name="description"
              placeholder="Explain a little bit about the course"
            />
          </div>
          <div className="form-group mb-6 ">
            <div className="flex justify-center mb-2">
              {parts.length > 0 && (
                <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900 dark:bg-slate-900 dark:text-white">
                  {parts.map((l, index) => {
                    return (
                      <li
                        key={index}
                        className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
                      >
                        {index + 1}.&nbsp;
                        <a
                          href={
                            l.type == "Video"
                              ? "https://www.youtube.com/watch?v=" + l.value
                              : l.value
                          }
                          target="_blank"
                          className="font-medium break-all text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          {l.value}
                        </a>{" "}
                        <small>
                          <em>{l.type}</em>
                        </small>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <label
              htmlFor="partValue"
              className="form-label inline-block mb-2 text-gray-700 dark:text-white"
            >
              Add Parts
            </label>
            <div className="flex flex-wrap items-center mb-2">
              <label
                htmlFor="partType"
                className="form-label inline-block mb-2 text-gray-700 dark:text-white"
              >
                Type
              </label>
              <select
                onChange={handleInputChange}
                className="form-select ml-6 appearance-none block w-full md:w-1/2 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition  ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default select example"
                id="partType"
                name="partType"
                defaultValue={partType}
              >
                <option value="Video">Video / Youtube </option>
                <option value="File">File / Drive Link</option>
              </select>
            </div>
            <div className="form-group mb-6">
              <label
                htmlFor="partDescription"
                className="form-label inline-block mb-2 text-gray-700 dark:text-white"
              >
                Part Description
              </label>
              <textarea
                onChange={handleInputChange}
                value={partDescription}
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-400 dark:border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="partDescription"
                name="partDescription"
                placeholder="Explain a little bit about the course"
              />
            </div>
            <div className="flex flex-wrap">
              <input
                value={partValue}
                onChange={handleInputChange}
                type="url"
                className="form-control block w-2/3 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-400 dark:border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="partValue"
                name="partValue"
                placeholder={
                  partType == "Video"
                    ? "Enter Youtube Link"
                    : "Enter Drive Link"
                }
              />
              <button
                onClick={handleAddPart}
                type="button"
                className="px-6 py-2.5 bg-yellow-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Add
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmitSection}
            type="button"
            className="px-6 py-2.5 bg-yellow-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseSection;
