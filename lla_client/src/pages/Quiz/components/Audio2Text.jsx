const Audio2Text = ({ next }) => {
  return (
    <section className="text-gray-600 body-font relative dark:bg-slate-900 dark:text-white">
      <div className="container lg:w-5/6 px-5 md:h-[72vh] py-12 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="px-4 py-2 rounded-md min-h-full md:w-1/2 bg-white flex flex-col mx-auto w-5/6 md:py-8 mt-8 md:mt-0 border-2 border-yellow-500 dark:bg-slate-900 ">
          <div className="relative mb-4 mx-auto flex flex-col justify-center text-yellow-400 font-bold">
            <h1 className="md:text-3xl text-black dark:text-white text-xl text-center">
              Write what you hear
            </h1>
            <p className="text-xs text-center text-black dark:text-white">
              An audio will pe played write what you hear in the textspace
            </p>
          </div>
          <div className="relative mb-4 flex md:flex-row h-full flex-col">
            <div className="flex flex-col justify-center mx-auto mb-2 md:mr-2">
              <img src="./speaker-svgrepo-com.svg" className="w-12 h-12 " />
            </div>
            <textarea
              id="message"
              name="message"
              className="w-full md:h-5/6 md:my-auto bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>

          <button
            onClick={() => {
              next((prev) => prev + 1);
            }}
            className="text-white font-md bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default Audio2Text;
