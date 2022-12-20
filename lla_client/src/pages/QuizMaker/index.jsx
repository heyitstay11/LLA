import { useRef, useState } from "react";
import { Modal } from "./components/Modal";

export const QuizMaker = () => {
  const selectRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({});

  const handleAddQuestion = () => {
    const { answer1, answer2, answer3, answer4, question } = currentQuestion;
    if (!answer1 || !answer2 || !answer3 || !answer4 || !question) {
      alert("Fill Details properly");
    }
    setCurrentQuestion((prev) => ({
      ...prev,
      correctAnswer: currentQuestion[selectRef.current.value],
    }));
  };

  return (
    <>
      <Modal {...{ showModal, setShowModal, setCurrentQuestion }} />

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

        {/*  */}

        {currentQuestion?.type ? (
          <div className="question-box flex flex-col  md:w-1/2 w-full px-6 md:px-0 lg:px-0">
            <div className="edit-question my-4 p-2 bg-slate-800 flex flex-col">
              <div className="flex justify-center">
                <div className="xl:w-96">
                  <label
                    htmlFor="currQuestion"
                    className="form-label inline-block mb-2 text-gray-700 dark:text-white"
                  >
                    Question
                  </label>
                  <input
                    onChange={(e) =>
                      setCurrentQuestion((prev) => ({
                        ...prev,
                        question: e.target.value,
                      }))
                    }
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
                    id="currQuestion"
                    placeholder="Example label"
                  />
                </div>
              </div>
              <div className="mt-1 flex flex-col md:flex-row mx-auto md:px-4">
                <div className="w-1/2">
                  <div className="mb-2 xl:w-96">
                    <label
                      htmlFor="Answer1"
                      className="form-label inline-block mb-2 text-gray-700 dark:text-white"
                    >
                      Answer 1
                    </label>
                    <input
                      type="text"
                      className="form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
                      id="Answer1"
                      placeholder="New Answer"
                      onChange={(e) =>
                        setCurrentQuestion((prev) => ({
                          ...prev,
                          answer1: e.target.value,
                        }))
                      }
                    />
                    <div className="flex">
                      <div className="">
                        <label
                          htmlFor="answer1file"
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
                      htmlFor="Answer2"
                      className="form-label inline-block mb-2 text-gray-700 dark:text-white"
                    >
                      Answer 2
                    </label>
                    <input
                      type="text"
                      className="form-control block  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
                      id="Answer2"
                      placeholder="New Answer"
                      onChange={(e) =>
                        setCurrentQuestion((prev) => ({
                          ...prev,
                          answer2: e.target.value,
                        }))
                      }
                    />
                    <div className="flex">
                      <div className="">
                        <label
                          htmlFor="answer2file"
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
                      htmlFor="Answer3"
                      className="form-label inline-block mb-2 text-gray-700 dark:text-white"
                    >
                      Answer 3
                    </label>
                    <input
                      type="text"
                      className="form-control block  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
                      id="Answer3"
                      placeholder="New Answer"
                      onChange={(e) =>
                        setCurrentQuestion((prev) => ({
                          ...prev,
                          answer3: e.target.value,
                        }))
                      }
                    />
                    <div className="flex">
                      <div className="">
                        <label
                          htmlFor="answer3file"
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
                      htmlFor="Answer4"
                      className="form-label inline-block mb-2 text-gray-700 dark:text-white"
                    >
                      Answer 4
                    </label>
                    <input
                      type="text"
                      className="form-control block  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
                      id="Answer4"
                      placeholder="New Answer"
                      onChange={(e) =>
                        setCurrentQuestion((prev) => ({
                          ...prev,
                          answer4: e.target.value,
                        }))
                      }
                    />
                    <div className="flex">
                      <div className="">
                        <label
                          htmlFor="answer4file"
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
              <div className="flex flex-col md:flex-row mx-auto md:px-4">
                <div className="w-1/2">
                  <div className="mb-2 xl:w-96">
                    <label
                      htmlFor="CorrectAnswer"
                      className="form-label inline-block mb-2 text-gray-700 dark:text-white"
                    >
                      Select Answer
                    </label>
                    <select
                      className="form-select cursor-pointer form-select-lg mb-3 appearance-none block w-1/2 px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      aria-label=".form-select-lg example"
                      ref={selectRef}
                    >
                      <option defaultValue={"answer1"} value="answer1">
                        Answer 1
                      </option>
                      <option value="answer2">Answer 2</option>
                      <option value="answer3">Answer 3</option>
                      <option value="answer4">Answer 4</option>
                    </select>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="xl:w-96">
                    <button
                      onClick={handleAddQuestion}
                      className="text-white align-center my-2 bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg dark:text-yellow-900 dark:font-medium"
                    >
                      Save
                    </button>
                    <button className="text-white dark:text-white align-center my-2 bg-red-500 ml-3 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg dark:font-medium">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

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
