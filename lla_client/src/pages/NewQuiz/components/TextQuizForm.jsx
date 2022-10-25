const TextQuizForm = ({ handler }) => {
  return (
    <div className="py-2">
      <p className="text-lg text-center">Translate Text</p>
      <form onSubmit={handler}>
        <div className="py-1">
          <label htmlFor="question">Question</label>
          <input
            type="text"
            id="question"
            className="pl-2 ml-4 text-black border border-2 border-black rounded-md"
            required
          />
        </div>
        <div className="py-1">
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            id="desc"
            className="pl-2 ml-4 text-black border border-2 border-black rounded-md"
          />
        </div>
        <div className="py-1">
          <label htmlFor="optionA">Option A</label>
          <input
            type="text"
            id="optionA"
            className="pl-2 ml-4 text-black border border-2 border-black rounded-md"
            required
          />
        </div>
        <div className="py-1">
          <label htmlFor="optionB">Option B</label>
          <input
            type="text"
            id="optionB"
            className="pl-2 ml-4 text-black border border-2 border-black rounded-md"
            required
          />
        </div>
        <div className="py-1">
          <label htmlFor="optionC">Option C</label>
          <input
            type="text"
            id="optionC"
            className="pl-2 ml-4 text-black border border-2 border-black rounded-md"
            required
          />
        </div>
        <div className="py-1">
          <label htmlFor="optionD">Option D</label>
          <input
            type="text"
            id="optionD"
            className="pl-2 ml-4 text-black border border-2 border-black rounded-md"
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
            className="text-black border border-2 border-black rounded-md text-lg"
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
  );
};

export default TextQuizForm;
