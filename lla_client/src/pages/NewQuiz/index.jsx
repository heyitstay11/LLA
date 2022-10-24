import { useState } from "react";

const NewQuiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const handleTextQuestionAdd = (e) => {
    e.preventDefault();
    const { question, desc, optionA, optionB, optionC, optionD, answer } =
      e.target;
    const options = { optionA, optionB, optionC, optionD };

    const newQuiz = {
      type: "text",
      question: question.value,
      desc: desc.value,
      options: [optionA.value, optionB.value, optionC.value, optionD.value],
      answer: options[answer.value].value,
    };

    setQuizData((prev) => [...prev, newQuiz]);
    e.target.reset();
  };

  const handleImageQuestionAdd = (e) => {
    e.preventDefault();
    const {
      question,
      desc,
      optionA,
      optionB,
      optionC,
      optionD,
      answer,
      image,
    } = e.target;
    const options = { optionA, optionB, optionC, optionD };
    const newQuiz = {
      type: "image",
      question: question.value,
      desc: desc.value,
      imgsrc: image.value,
      options: [optionA.value, optionB.value, optionC.value, optionD.value],
      answer: options[answer.value].value,
    };

    setQuizData((prev) => [...prev, newQuiz]);
    e.target.reset();
  };

  const handleTypeSelection = (e) => {
    const value = e.target.value;
    setSelectedType(value);
  };

  return (
    <section className="text-gray-600 body-font dark:bg-slate-900 dark:text-white">
      <h1 className="text-center text-2xl">New Quiz </h1>
      <div className="md:w-1/2 mx-auto px-4 py-10 pb-2">
        <div className="pb-4">
          <label htmlFor="title">Quiz Title:</label>
          <input type="text" id="title" className="pl-2 ml-4 text-black" />
        </div>

        {quizData.map((quiz, index) => {
          if (quiz.type === "text" || quiz.type === "image") {
            const { options, question, desc, answer } = quiz;
            return (
              <div className="py-2" key={`${question}-${index}`}>
                <div className="">
                  {index + 1}. Question: {question}
                </div>
                {quiz.type === "image" && (
                  <div className="">
                    Image URL: <a href={quiz?.imgsrc}>{quiz?.imgsrc}</a>{" "}
                  </div>
                )}

                <div className="">Desc: {desc}</div>
                <div className="flex flex-wrap">
                  <div className="mr-2">Options:</div>
                  <ul className="flex flex-wrap">
                    {options.map((opt, index) => (
                      <li key={`${opt}-${index}`}>
                        {index + 1}: {opt} &nbsp;
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="">Answer: {answer}</div>
              </div>
            );
          }
        })}

        <div className="py-2">
          <p className="text-lg text-center">Choose Type</p>
          <select
            name="quiz-type"
            id="quiz-type"
            className="text-black text-lg"
            onChange={handleTypeSelection}
            defaultValue={"default"}
          >
            <option value="default" disabled={true}>
              Select a type
            </option>
            <option value="text">Translate Text</option>
            <option value="image">Guess Image</option>
            <option value="audio">Guess Audio</option>
            <option value="audioToText">Audio to Text</option>
          </select>
        </div>

        {selectedType === "text" && (
          <div className="py-2">
            <p className="text-lg text-center">Translate Text</p>
            <form onSubmit={handleTextQuestionAdd}>
              <div className="py-1">
                <label htmlFor="question">Question</label>
                <input
                  type="text"
                  id="question"
                  className="pl-2 ml-4 text-black"
                  required
                />
              </div>
              <div className="py-1">
                <label htmlFor="desc">Description</label>
                <input type="text" id="desc" className="pl-2 ml-4 text-black" />
              </div>
              <div className="py-1">
                <label htmlFor="optionA">Option A</label>
                <input
                  type="text"
                  id="optionA"
                  className="pl-2 ml-4 text-black"
                  required
                />
              </div>
              <div className="py-1">
                <label htmlFor="optionB">Option B</label>
                <input
                  type="text"
                  id="optionB"
                  className="pl-2 ml-4 text-black"
                  required
                />
              </div>
              <div className="py-1">
                <label htmlFor="optionC">Option C</label>
                <input
                  type="text"
                  id="optionC"
                  className="pl-2 ml-4 text-black"
                  required
                />
              </div>
              <div className="py-1">
                <label htmlFor="optionD">Option D</label>
                <input
                  type="text"
                  id="optionD"
                  className="pl-2 ml-4 text-black"
                  required
                />
              </div>
              <div className="py-1 pt-2">
                <label htmlFor="answer" className="mr-2">
                  Answer
                </label>
                <select
                  name="quiz-type"
                  id="answer"
                  className="text-black text-lg"
                  defaultValue={"optionA"}
                  required
                >
                  <option value="optionA">Option A</option>
                  <option value="optionB">Option B</option>
                  <option value="optionC">Option C</option>
                  <option value="optionD">Option D</option>
                </select>
              </div>
              <div className="text-center">
                <button className="p-1 px-4 border border-2 border-yellow-500 rounded-md my-2">
                  Add
                </button>
              </div>
            </form>
          </div>
        )}

        {selectedType === "image" && (
          <div className="py-2">
            <p className="text-lg text-center">Guess Image</p>
            <form onSubmit={handleImageQuestionAdd}>
              <div className="py-1">
                <label htmlFor="question">Question</label>
                <input
                  type="text"
                  id="question"
                  className="pl-2 ml-4 text-black"
                  required
                />
              </div>
              <div className="py-1">
                <label htmlFor="desc">Description</label>
                <input type="text" id="desc" className="pl-2 ml-4 text-black" />
              </div>
              <div className="py-1">
                <label htmlFor="image">Choose Image</label>
                <input
                  type="file"
                  id="image"
                  className="pl-2 ml-4"
                  multiple={false}
                  required
                />
              </div>
              <div className="py-1">
                <label htmlFor="optionA">Option A</label>
                <input
                  type="text"
                  id="optionA"
                  className="pl-2 ml-4 text-black"
                  required
                />
              </div>
              <div className="py-1">
                <label htmlFor="optionB">Option B</label>
                <input
                  type="text"
                  id="optionB"
                  className="pl-2 ml-4 text-black"
                  required
                />
              </div>
              <div className="py-1">
                <label htmlFor="optionC">Option C</label>
                <input
                  type="text"
                  id="optionC"
                  className="pl-2 ml-4 text-black"
                  required
                />
              </div>
              <div className="py-1">
                <label htmlFor="optionD">Option D</label>
                <input
                  type="text"
                  id="optionD"
                  className="pl-2 ml-4 text-black"
                  required
                />
              </div>
              <div className="py-1 pt-2">
                <label htmlFor="answer" className="mr-2">
                  Answer
                </label>
                <select
                  name="quiz-type"
                  id="answer"
                  className="text-black text-lg"
                  defaultValue={"optionA"}
                  required
                >
                  <option value="optionA">Option A</option>
                  <option value="optionB">Option B</option>
                  <option value="optionC">Option C</option>
                  <option value="optionD">Option D</option>
                </select>
              </div>
              <div className="text-center">
                <button className="p-1 px-4 border border-2 border-yellow-500 rounded-md my-2">
                  Add
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="text-center py-4">
        <button className="text-center p-2 border border-2 border-yellow-500 rounded-md">
          Save Quiz
        </button>
      </div>
    </section>
  );
};

export default NewQuiz;
