const AudioToTextQuizForm = ({ handler }) => {
  return (
    <div className="py-2">
      <p className="text-lg text-center">Audio to Text</p>
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
          <label htmlFor="audio">Audio file</label>
          <input
            type="file"
            id="audio"
            className="pl-2 ml-4"
            multiple={false}
            required
          />
        </div>
        <div className="py-1 pt-2">
          <label htmlFor="answer" className="mr-2">
            Answer
          </label>
          <input
            id="answer"
            type="text"
            className="pl-2 ml-4 text-black border border-2 border-black rounded-md"
            required
          />
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

export default AudioToTextQuizForm;
