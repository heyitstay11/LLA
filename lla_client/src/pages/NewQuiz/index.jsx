import { useState } from "react";

const NewQuiz = () => {
  const quiz = [];
  const [selectedType, setSelectedType] = useState("");

  const handleTypeSelection = (e) => {
    const value = e.target.value;
    console.log(value);
  };

  return (
    <section className="text-gray-600 body-font dark:bg-slate-900 dark:text-white">
      <h1 className="text-center text-2xl">New Quiz </h1>
      <div className="md:w-1/2 mx-auto px-4 py-10">
        <div className="pb-4">
          <label htmlFor="title">Quiz Title:</label>
          <input type="text" id="title" className="pl-2 ml-4 text-black" />
        </div>

        <button className="p-2 border border-2 border-yellow-500 rounded-md">
          Add Question
        </button>

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
            <option value="Text">Translate Text</option>
            <option value="Image">Guess Image</option>
            <option value="Audio">Guess Audio</option>
            <option value="AudioToText">Audio to Text</option>
          </select>
        </div>

        <div className="py-2">
          <div className="py-1">
            <label htmlFor="question">Question</label>
            <input type="text" id="question" className="pl-2 ml-4 text-black" />
          </div>
          <div className="py-1">
            <label htmlFor="optionA">Option A</label>
            <input type="text" id="optionA" className="pl-2 ml-4 text-black" />
          </div>
          <div className="py-1">
            <label htmlFor="optionB">Option B</label>
            <input type="text" id="optionB" className="pl-2 ml-4 text-black" />
          </div>
          <div className="py-1">
            <label htmlFor="optionC">Option C</label>
            <input type="text" id="optionC" className="pl-2 ml-4 text-black" />
          </div>
          <div className="py-1">
            <label htmlFor="optionD">Option D</label>
            <input type="text" id="optionD" className="pl-2 ml-4 text-black" />
          </div>
          <div className="py-1">
            <label htmlFor="answer" className="mr-2">
              Answer
            </label>
            <select
              name="quiz-type"
              id="answer"
              className="text-black text-lg"
              onChange={handleTypeSelection}
              defaultValue={"default"}
            >
              <option value="default" disabled={true}>
                Select Answer
              </option>
              <option value="optionA">Option A</option>
              <option value="optionB">Option B</option>
              <option value="optionC">Option C</option>
              <option value="optionD">Option D</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewQuiz;
