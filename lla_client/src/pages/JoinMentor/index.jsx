import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { ACTION_TYPES, initialState, reducer } from "./reducer";

export const JoinMentor = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    isLoading,
    fullname,
    teacher_email,
    experience,
    contact_num,
    qualification,
  } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic validation
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: ACTION_TYPES.INPUT,
      payload: { [name]: value },
    });
  };

  return (
    <section className="text-gray-700 body-font dark:bg-slate-900 dark:text-white">
      <div className="container md:w-4/5 px-5 py-10 mx-auto flex flex-wrap items-center">
        <form
          onSubmit={handleSubmit}
          className="lg:w-1/2 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 mx-auto"
        >
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Join as a Teacher
          </h2>
          <div className="relative mb-4">
            <label
              htmlFor="fullname"
              className="leading-7 text-sm text-gray-700"
            >
              FullName
            </label>
            <input
              value={fullname}
              onChange={handleInputChange}
              type="text"
              id="fullname"
              name="fullname"
              required
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="teacher_email"
              className="leading-7 text-sm text-gray-700"
            >
              Teacher Email
            </label>
            <input
              value={teacher_email}
              onChange={handleInputChange}
              type="email"
              id="teacher_email"
              name="teacher_email"
              required
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="qualification"
              className="leading-7 text-sm text-gray-700"
            >
              Qualification
            </label>
            <input
              value={qualification}
              onChange={handleInputChange}
              type="text"
              id="qualification"
              name="qualification"
              required
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="experience"
              className="leading-7 text-sm text-gray-700"
            >
              Experience (years)
            </label>
            <input
              value={experience}
              onChange={handleInputChange}
              type="number"
              id="experience"
              name="experience"
              min={0}
              max={99}
              required
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="contact_num"
              className="leading-7 text-sm text-gray-700"
            >
              Contact Number
            </label>
            <input
              value={contact_num}
              onChange={handleInputChange}
              type="text"
              id="contact_num"
              name="contact_num"
              required
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          {isLoading ? (
            <div className="text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-700 rounded text-lg">
              <span className="block text-center">Loading ...</span>
            </div>
          ) : (
            <button className="text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-700 rounded text-lg dark:text-yellow-900 dark:font-medium">
              Submit
            </button>
          )}
        </form>
      </div>
    </section>
  );
};
export default JoinMentor;
