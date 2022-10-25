const QuestionPlaceholder = ({ quiz, index }) => {
  const { options, question, desc, answer, audios = [] } = quiz;
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

      <div className="">Desc: {desc ? desc : "N/A"}</div>

      {options?.length > 0 && (
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
      )}

      {quiz.type === "audio" && (
        <div className="flex flex-wrap">
          <div className="mr-2">Audios:</div>
          <ul className="flex flex-wrap">
            {audios.map((opt, index) => (
              <li key={`${opt}-${index}`}>
                {index + 1}: {opt} &nbsp;
              </li>
            ))}
          </ul>
        </div>
      )}
      {quiz?.audio && <p>Audio File: {quiz.audio}</p>}
      <div className="">Answer: {answer}</div>
    </div>
  );
};

export default QuestionPlaceholder;
