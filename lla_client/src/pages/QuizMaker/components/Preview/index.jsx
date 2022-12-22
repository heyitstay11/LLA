const FileLink = ({ fileURL = "" }) => {
  return (
    fileURL && (
      <a
        href={fileURL}
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline pl-2"
        target={"_blank"}
      >
        File
      </a>
    )
  );
};

export const Preview = ({
  answer1,
  answer2,
  answer3,
  answer4,
  question,
  type,
  file1 = "",
  file2 = "",
  file3 = "",
  file4 = "",
  questionFile = "",
  correctAnswer,
  index,
}) => {
  console.log({ questionFile });
  return (
    <section className="flex flex-col  md:w-1/2 w-full px-6 md:px-0 lg:px-0">
      <div className=" my-4 p-4 dark:bg-slate-800 border border-2 border-black rounded-md flex flex-col">
        <div className="text-center text-lg">
          {index + 1}. {question} <FileLink fileURL={questionFile} />
        </div>
        <div className="flex items-center justify-between my-2">
          <div className="pl-4">
            Ans 1. {answer1}
            <FileLink fileURL={file1} />
          </div>
          <div className="pr-4">
            Ans 2. {answer2}
            <FileLink fileURL={file2} />
          </div>
        </div>
        <div className="flex items-center justify-between my-2">
          <div className="pl-4">
            Ans 3. {answer3}
            <FileLink fileURL={file3} />
          </div>
          <div className="pr-4">
            Ans 4. {answer4}
            <FileLink fileURL={file4} />
          </div>
        </div>
      </div>
    </section>
  );
};
