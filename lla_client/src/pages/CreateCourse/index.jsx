import axios from "axios";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadFile } from "../../api/uploadFile";
import { useAuthContext } from "../../context/auth";
import { ACTION_TYPES, initialState, reducer } from "./reducers";

export const CreateCourse = () => {
  const {
    auth: { token },
  } = useAuthContext();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { learnings, title, details, proficiency, price, currentLearning } =
    state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: ACTION_TYPES.INPUT,
      payload: { [name]: value },
    });
  };

  const handleAddLearning = () => {
    let learning = currentLearning.trim();
    if (!learning) return;
    dispatch({
      type: ACTION_TYPES.ADD_LEARNING,
      payload: learning,
    });
  };

  const handleThumbnailUpload = async (e) => {
    let file = e?.target?.files?.[0];
    if (!file) {
      toast.error("An error occured, upload again");
      return;
    }
    try {
      const { data } = await uploadFile(file);
      console.log(data);
      const fileURL = data.secure_url;
      dispatch({
        type: ACTION_TYPES.INPUT,
        payload: { thumbnail: fileURL },
      });
      toast.success("File Uploaded Sucessfully");
    } catch (error) {
      toast.error("An error occured, upload again");
    }
  };

  const handleSubmitCourse = async () => {
    try {
      const { data } = await axios.post(
        "/course/create",
        { ...state },
        { headers: { "x-auth-token": token } }
      );
      console.log(data);
      navigate("/course/" + data.id);
    } catch (error) {
      toast.error("An error occured, try again");
    }
  };

  return (
    <div className="w-full dark:bg-slate-900 dark:text-white flex flex-col items-center">
      <h1 className="text-2xl mt-6">Create New Course</h1>
      <div className="container w-full md:w-full my-8 p-6 rounded-lg border border-gray-600 dark:border-white bg-white max-w-xl dark:bg-slate-900 dark:text-white">
        <form className="w-full flex-grow">
          <div className="form-group mb-6 flex-grow">
            <label
              htmlFor="title"
              className="form-label inline-block mb-2 text-gray-700 dark:text-white"
            >
              Course Title
            </label>
            <input
              type="text"
              onChange={handleInputChange}
              value={title}
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="title"
              name="title"
              placeholder="Enter Title"
            />
          </div>
          <div className="form-group mb-6 flex-grow">
            <label
              htmlFor="details"
              className="form-label inline-block mb-2 text-gray-700 dark:text-white "
            >
              Course Details
            </label>
            <textarea
              onChange={handleInputChange}
              value={details}
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="details"
              name="details"
              placeholder="Explain a little bit about the course"
            />
          </div>
          <div className="form-group mb-6">
            <label
              htmlFor="proficiency"
              className="form-label inline-block mb-2 text-gray-700 dark:text-white"
            >
              Proficiency
            </label>
            <select
              onChange={handleInputChange}
              className="form-select appearance-none block w-full md:w-1/2 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition  ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Default select example"
              id="proficiency"
              name="proficiency"
              defaultValue={proficiency}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advance">Advance</option>
            </select>
          </div>
          <div className="form-group mb-6 ">
            <label
              htmlFor="price"
              className="form-label inline-block mb-2 text-gray-700 dark:text-white"
            >
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={handleInputChange}
              className="form-control block text-lg w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="price"
              name="price"
              min={0}
              placeholder="Enter Price"
            />
          </div>
          <div className="form-group mb-6 ">
            <div className="flex justify-start mb-2">
              {learnings.length > 0 && (
                <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900 dark:bg-slate-900 dark:text-white">
                  {learnings.map((l, index) => {
                    return (
                      <li
                        key={index}
                        className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
                      >
                        {index + 1}.&nbsp;{l}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <label
              htmlFor="currentLearning"
              className="form-label inline-block mb-2 text-gray-700 dark:text-white"
            >
              What students will learn (pointers)
            </label>
            <div className="flex flex-wrap">
              <input
                value={currentLearning}
                onChange={handleInputChange}
                type="text"
                className="form-control block w-2/3 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="currentLearning"
                name="currentLearning"
                placeholder="Enter Learnings"
              />
              <button
                onClick={handleAddLearning}
                type="button"
                className="px-6 py-2.5 bg-yellow-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Add
              </button>
            </div>
          </div>
          <div className="form-group mb-6 ">
            <div className="flex">
              <div className="mb-3">
                <label
                  htmlFor="thumbnail"
                  className="form-label inline-block mb-2 text-gray-700 dark:text-white"
                >
                  Course thumbnail
                </label>
                <input
                  onChange={handleThumbnailUpload}
                  className="form-control dark:bg-slate-900 dark:text-white block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="file"
                  accept=".jpg, .png"
                  id="thumbnail"
                  name="thumbnail"
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmitCourse}
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
