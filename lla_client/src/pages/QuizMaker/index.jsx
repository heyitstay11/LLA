import { useState } from "react";

export const QuizMaker = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({});
  return (
    <>
      <div
        className={
          "fixed z-10 overflow-y-auto top-0 w-full left-0 " +
          `${showModal ? "" : "hidden"}`
        }
      >
        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-900 opacity-75" />
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>
          <div
            className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-4 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <label>Choose Type of Question</label>
              <select
                onChange={(e) =>
                  setCurrentQuestion((prev) => ({
                    ...prev,
                    type: e.target.value,
                  }))
                }
                className="form-select form-select-lg mb-3 appearance-none block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label=".form-select-lg example"
              >
                <option defaultValue={"text"} value="text">
                  Text
                </option>
                <option value="image">Image</option>
                <option value="audio">Audio</option>
              </select>
            </div>
            <div className="bg-gray-200 px-4 py-3 text-right">
              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="py-2 px-4 bg-yellow-500 text-white rounded hover:bg-yellow-700 mr-2"
              >
                <i className="fas fa-times"></i> Create
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setCurrentQuestion({});
                }}
                type="button"
                className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
              >
                <i className="fas fa-times"></i> Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="wrapper flex flex-col items-center justify-center text-gray-600 body-font dark:bg-slate-900 dark:text-white">
        <h1 className="text-2xl my-4">Create a Quiz</h1>
        <div className="quiz-name">
          <input
            type="text"
            placeholder="Enter Quiz Title"
            className="w-full placeholder-black my-2 bg-white rounded border border-2 border-yellow-400  focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="question-box flex flex-col  md:w-1/2 w-full px-6 md:px-0 lg:px-0">
          <div className="edit-question my-4 p-2 bg-slate-800 flex flex-col">
            <div className="flex justify-center">
              <div className="xl:w-96">
                <label
                  for="currQuestion"
                  className="form-label inline-block mb-2 text-gray-700 dark:text-white"
                >
                  Question
                </label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
                  id="currQuestion"
                  placeholder="Example label"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row mx-auto md:px-4">
              <div className="w-1/2">
                <div className="mb-2 xl:w-96">
                  <label
                    for="Answer1"
                    className="form-label inline-block mb-2 text-gray-700 dark:text-white"
                  >
                    Answer 1
                  </label>
                  <input
                    type="text"
                    className="form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
                    id="Answer1"
                    placeholder="New Answer"
                  />
                  <div className="flex">
                    <div className="">
                      <label
                        for="answer1file"
                        className="form-label mt-1 inline-block mb-2 text-gray-700 dark:text-white p-2 border border-2 border-yellow-500"
                      >
                        Add File
                      </label>
                      <input
                        className=" hidden form-control block w-full px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="answer1file"
                        type="file"
                        accept=".jpg, .png"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                <div className="mb-3 xl:w-96">
                  <label
                    for="Answer2"
                    className="form-label inline-block mb-2 text-gray-700 dark:text-white"
                  >
                    Answer 2
                  </label>
                  <input
                    type="text"
                    className="form-control block  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
                    id="Answer2"
                    placeholder="New Answer"
                  />
                  <div className="flex">
                    <div className="">
                      <label
                        for="answer2file"
                        className="form-label mt-1 inline-block mb-2 text-gray-700 dark:text-white p-2 border border-2 border-yellow-500"
                      >
                        Add File
                      </label>
                      <input
                        className=" hidden form-control block w-full px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="answer2file"
                        type="file"
                        accept=".jpg, .png"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row mx-auto md:px-4">
              <div className="w-1/2">
                <div className="mb-2 xl:w-96">
                  <label
                    for="Answer3"
                    className="form-label inline-block mb-2 text-gray-700 dark:text-white"
                  >
                    Answer 3
                  </label>
                  <input
                    type="text"
                    className="form-control block  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
                    id="Answer3"
                    placeholder="New Answer"
                  />
                  <div className="flex">
                    <div className="">
                      <label
                        for="answer3file"
                        className="form-label mt-1 inline-block mb-2 text-gray-700 dark:text-white p-2 border border-2 border-yellow-500"
                      >
                        Add File
                      </label>
                      <input
                        className=" hidden form-control block w-full px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="answer3file"
                        type="file"
                        accept=".jpg, .png"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                <div className="xl:w-96">
                  <label
                    for="Answer4"
                    className="form-label inline-block mb-2 text-gray-700 dark:text-white"
                  >
                    Answer 4
                  </label>
                  <input
                    type="text"
                    className="form-control block  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
                    id="Answer4"
                    placeholder="New Answer"
                  />
                  <div className="flex">
                    <div className="">
                      <label
                        for="answer4file"
                        className="form-label mt-1 inline-block mb-2 text-gray-700 dark:text-white p-2 border border-2 border-yellow-500"
                      >
                        Add File
                      </label>
                      <input
                        className=" hidden form-control block w-full px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="answer4file"
                        type="file"
                        accept=".jpg, .png"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="text-white my-2 bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg dark:text-yellow-900 dark:font-medium"
        >
          + Add Question
        </button>
      </div>
    </>
  );
};
