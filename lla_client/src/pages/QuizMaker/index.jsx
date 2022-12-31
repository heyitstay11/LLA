import { useRef, useState } from "react";
import { Modal } from "./components/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import { Preview } from "./components/Preview";
import { useAuthContext } from "../../context/auth";
import { useNavigate } from "react-router-dom";

export const QuizMaker = () => {
  const selectRef = useRef();
  const navigate = useNavigate();
  const {
    auth: { token = "" },
  } = useAuthContext();
  const [quizDetails, setQuizDetails] = useState({ title: "", desc: "" });
  const [quiz, setQuiz] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({});

  const handleAddQuestion = () => {
    const {
      answer1 = "",
      answer2 = "",
      answer3 = "",
      answer4 = "",
      question = "",
      type,
      questionFile,
    } = currentQuestion;
    if (
      !answer1.trim() ||
      !answer2.trim() ||
      !answer3.trim() ||
      !answer4.trim() ||
      !question.trim()
    ) {
      toast.error("Fill Details properly");
      return;
    }
    if (type == "image" && !questionFile) {
      toast.error("Files Not Uploaded");
      return;
    }

    const newQuestion = {
      ...currentQuestion,
      correctAnswer: currentQuestion[selectRef.current.value],
    };
    setQuiz((prev) => [...prev, newQuestion]);
    toast.success("Question Added Successfully");
    setCurrentQuestion({});
  };

  const handleFileUpload = async (e) => {
    let file = e?.target?.files?.[0];
    if (!file) {
      toast.error("An error occured, upload again");
      return;
    }
    if (currentQuestion.type == "text" && e.target.id != "questionFile") {
      toast.warn(
        "File Uploads for options not supported for text based questions"
      );
      return;
    }
    if (currentQuestion.type == "audio" && e.target.id == "questionFile") {
      toast.warn(
        "File Uploads for question field not supported for audio based questions"
      );
      return;
    }

    let cloudinaryResponse;
    try {
      const { data: sData } = await axios.get("/quiz/get-signature");

      const data = new FormData();
      data.append("file", file);
      data.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
      data.append("signature", sData.signature);
      data.append("timestamp", sData.timestamp);
      cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/auto/upload`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: function (e) {
            console.log(e.loaded / e.total);
          },
        }
      );
    } catch (error) {
      toast.error("Error While Uploading file");
      console.log(error);
    }
    console.log(cloudinaryResponse.data, e.target.id);
    setCurrentQuestion((prev) => ({
      ...prev,
      [e.target.id]: cloudinaryResponse.data.secure_url,
    }));
    toast.success("File Uploaded Sucessfully");
  };

  const handlePublishQuiz = async () => {
    const { title = "", desc = "" } = quizDetails;
    if (!title.trim() || !desc.trim()) {
      toast.error("Fill Quiz Details properly");
      return;
    }
    try {
      const { data } = await axios.post(
        "/quiz/create",
        {
          title,
          desc,
          questions: quiz,
        },
        { headers: { "x-auth-token": token } }
      );
      console.log(data);
      navigate("/quiz/" + data.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal {...{ showModal, setShowModal, setCurrentQuestion }} />

      {/*  */}

      <div className="wrapper text-slate-900 min-h-screen flex flex-col items-center justify-center text-gray-600 body-font dark:bg-slate-900 dark:text-white">
        <h1 className="text-3xl my-4">Create a Quiz</h1>
        <div className="quiz-name py-1">
          <input
            onChange={(e) =>
              setQuizDetails((prev) => ({ ...prev, title: e.target.value }))
            }
            value={quizDetails.title}
            type="text"
            placeholder="Enter Quiz Title"
            className="w-full placeholder-black my-2 bg-white rounded border border-2 border-yellow-400  focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="quiz-name">
          <textarea
            onChange={(e) =>
              setQuizDetails((prev) => ({ ...prev, desc: e.target.value }))
            }
            value={quizDetails.desc}
            type="text"
            placeholder="Enter Quiz Details"
            cols={35}
            className="w-full placeholder-black my-2 bg-white rounded border border-2 border-yellow-400  focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        {/*  */}
        {quiz.map((q, index) => {
          return <Preview key={index} {...q} index={index} />;
        })}

        {/*  */}

        {currentQuestion?.type ? (
          <div className="question-box text-slate-900 flex flex-col  md:w-1/2 w-full px-6 md:px-0 lg:px-0">
            <div className="edit-question my-4 p-4 dark:bg-slate-800 border border-2 border-black rounded-md flex flex-col">
              <div className="flex text-slate-900 flex-col items-center margin-auto">
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
                    className="form-control text-lg block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
                    id="currQuestion"
                    placeholder="Example label"
                  />
                </div>
                <div className="flex">
                  <div className="">
                    <label
                      htmlFor="questionFile"
                      className="form-label mt-1 inline-block mb-2 text-gray-700 dark:text-white p-2 border border-2 border-yellow-500"
                    >
                      Add File
                    </label>
                    <input
                      onChange={handleFileUpload}
                      className=" hidden form-control block w-full px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="questionFile"
                      type="file"
                      accept=".jpg, .png, .wav, .mp3"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1 flex flex-col md:flex-row mx-auto md:px-4">
                <div className="w-1/2">
                  <div className="mb-2 xl:w-96">
                    <label
                      htmlFor="Answer1"
                      className="form-label text-slate-900 inline-block mb-2 text-gray-700 dark:text-white"
                    >
                      Answer 1
                    </label>
                    <input
                      type="text"
                      className="form-control  text-lg  block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
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
                          htmlFor="file1"
                          className="form-label mt-1 inline-block mb-2 text-gray-700 dark:text-white p-2 border border-2 border-yellow-500"
                        >
                          Add File
                        </label>
                        <input
                          onChange={handleFileUpload}
                          className=" hidden form-control block w-full px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="file1"
                          type="file"
                          accept=".jpg, .png, .wav, .mp3"
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
                      className="form-control block  text-lg   px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
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
                          htmlFor="file2"
                          className="form-label mt-1 inline-block mb-2 text-gray-700 dark:text-white p-2 border border-2 border-yellow-500"
                        >
                          Add File
                        </label>
                        <input
                          onChange={handleFileUpload}
                          className=" hidden form-control block w-full px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="file2"
                          type="file"
                          accept=".jpg, .png, .wav, .mp3"
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
                      className="form-control block  text-lg   px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
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
                          htmlFor="file3"
                          className="form-label mt-1 inline-block mb-2 text-gray-700 dark:text-white p-2 border border-2 border-yellow-500"
                        >
                          Add File
                        </label>
                        <input
                          onChange={handleFileUpload}
                          className=" hidden form-control block w-full px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="file3"
                          type="file"
                          accept=".jpg, .png, .wav, .mp3"
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
                      className="form-control block  text-lg   px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-2 border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-400 focus:outline-none"
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
                          htmlFor="file4"
                          className="form-label mt-1 inline-block mb-2 text-gray-700 dark:text-white p-2 border border-2 border-yellow-500"
                        >
                          Add File
                        </label>
                        <input
                          onChange={handleFileUpload}
                          className=" hidden form-control block w-full px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="file4"
                          type="file"
                          accept=".jpg, .png, .wav, .mp3"
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
                      onClick={() => handleAddQuestion()}
                      className="text-white align-center my-2 bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg dark:text-yellow-900 dark:font-medium"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setCurrentQuestion({})}
                      className="text-white dark:text-white align-center my-2 bg-red-500 ml-3 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg dark:font-medium"
                    >
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
          className="dark:text-white text-xl my-2 bg-yellow-500 border-0 py-3 px-10 focus:outline-none hover:bg-yellow-600 rounded text-lg dark:font-medium"
        >
          + Add Question
        </button>

        {quiz.length > 0 && (
          <button
            onClick={() => handlePublishQuiz()}
            className="dark:text-white text-xl my-2 bg-yellow-500 border-0 py-3 px-10 focus:outline-none hover:bg-yellow-600 rounded text-lg dark:font-medium"
          >
            Publish Quiz
          </button>
        )}
      </div>
    </>
  );
};
