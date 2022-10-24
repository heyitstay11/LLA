const Optcomp = ({ data }) => {
  return (
    <button className="mt-2 flex-1 bg-gray-300 inline-flex py-3 px-5 rounded-lg items-center ml-4 focus:outline-none hover:bg-yellow-400 hover:text-yellow-900 text-black focus:bg-yellow-400 focus:border-solid focus:border-2 focus:border-orange-700 ">
      <span className="mx-auto items-start flex-col leading-none title-font font-medium">
        {data}
      </span>
    </button>
  );
};

const QuizImage = ({ options, question, imgsrc, next }) => {
  return (
    <section className="text-gray-600 body-font h-4/5 dark:bg-slate-900 dark:text-white">
      <div className="container mx-auto flex flex-col px-5 py-12 pb-2 justify-center items-center h-3/5 bg-gray-100 dark:bg-slate-900 dark:text-white">
        <img
          className="lg:w-2/6 md:w-3/6 w-4/6 mb-10 object-cover object-center rounded"
          alt="hero"
          src={imgsrc}
        />
        <div className="w-full flex flex-col mb-16 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 dark:text-gray-200">
            {question}{" "}
          </h1>
          <div className="w-9/10 flex flex-wrap">
            {options.map((e, i) => {
              return <Optcomp key={i} data={e} />;
            })}
          </div>
          <div className="flex my-3">
            <button
              onClick={() => {
                next((prev) => prev + 1);
              }}
              className="bg-yellow-500 inline-flex py-3 px-5 rounded-lg items-center ml-4 focus:outline-none hover:bg-yellow-400 hover:text-yellow-900 dark:text-slate-100 font-bold "
            >
              <span className=" flex items-start flex-col leading-none">
                <span className="title-font font-medium">Submit</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizImage;
