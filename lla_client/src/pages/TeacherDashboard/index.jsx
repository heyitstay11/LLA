const Leftboard = () => {
  return (
    <div className="h-full w-full py-8 gap-2 flex flex-col items-center bg-white border-r-2 border-yellow-400 dark:bg-slate-900 dark:text-white">
      <button className="flex py-2 mb-2 bg-gray-200 hover:bg-yellow-500 dark:hover:text-yellow-300 font-bold text-sm text-gray-900 py-2 px-4 hover:text-gray-900 dark:bg-gray-500 rounded-lg dark:text-white">
        Profile
      </button>
      <button className="flex py-2 mb-2 bg-gray-200 hover:bg-yellow-500 dark:hover:text-yellow-300 font-bold text-sm text-gray-900 py-2 px-4 hover:text-gray-900 dark:bg-gray-500 rounded-lg dark:text-white">
        Course
      </button>
      <button className="flex py-2 mb-2 bg-gray-200 hover:bg-yellow-500 dark:hover:text-yellow-300 font-bold text-sm text-gray-900 py-2 px-4 hover:text-gray-900 dark:bg-gray-500 rounded-lg dark:text-white">
        Class
      </button>
    </div>
  );
};

const Rightboard = () => {
  return (
    <div class=" w-full h-full text-gray-600 body-font">
      <div class="w-full h-full px-5 py-8 mx-auto flex flex-wrap">
        <div class="w-full h-full flex flex-wrap -m-4">
          <div class="p-4 lg:w-1/2 md:w-full">
            <div class="flex border-2 rounded-lg border-gray-200 dark:bg-slate-800 border-opacity-50 p-8 sm:flex-row flex-col">
              <div class="flex-grow">
                <h2 class="text-gray-900 dark:text-yellow-400  text-lg title-font font-medium mb-3">
                  The Catalyzer
                </h2>
                <p class="leading-relaxed text-base dark:text-gray-200 ">
                  Date - 1/2/2022
                </p>
                <p class="leading-relaxed text-base dark:text-gray-200 ">
                  Blue
                </p>
                <a class="mt-3 text-indigo-600 dark:text-yellow-500 inline-flex items-center">
                  meeting link
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div class="p-4 lg:w-1/2 md:w-full">
            <div class="flex border-2 rounded-lg border-gray-200 dark:bg-slate-800 border-opacity-50 p-8 sm:flex-row flex-col">
              <div class="flex-grow">
                <h2 class="text-gray-900 dark:text-yellow-400  text-lg title-font font-medium mb-3">
                  The Catalyzer
                </h2>
                <p class="leading-relaxed text-base dark:text-gray-200 ">
                  Date - 1/2/2022
                </p>
                <p class="leading-relaxed text-base dark:text-gray-200 ">
                  Blue
                </p>
                <a class="mt-3 text-indigo-600 dark:text-yellow-500 inline-flex items-center">
                  meeting link
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div class="p-4 lg:w-1/2 md:w-full">
            <div class="flex border-2 rounded-lg border-gray-200 dark:bg-slate-800 border-opacity-50 p-8 sm:flex-row flex-col">
              <div class="flex-grow">
                <h2 class="text-gray-900 dark:text-yellow-400  text-lg title-font font-medium mb-3">
                  The Catalyzer
                </h2>
                <p class="leading-relaxed text-base dark:text-gray-200 ">
                  Date - 1/2/2022
                </p>
                <p class="leading-relaxed text-base dark:text-gray-200 ">
                  Blue
                </p>
                <a class="mt-3 text-indigo-600 dark:text-yellow-500 inline-flex items-center">
                  meeting link
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeacherDashboard = () => {
  return (
    <section className="h-5/6 text-gray-600 body-font relative h-full dark:bg-slate-900 dark:text-white">
      <div className="flex flex-col md:flex-row flex-wrap mr-0 dark:bg-slate-900 dark:text-white">
        <div className="lg:w-1/5 md:w-1/5 bg-gray-300 border-b-2 border-yellow-400 rounded-lg overflow-y-auto flex items-end justify-start relative">
          <Leftboard />
        </div>
        <div className="lg:w-4/5 pb-10 md:w-4/5 bg-white flex flex-col md:ml-auto w-full ml-4 mt-8 md:mt-0 dark:bg-slate-900 dark:text-white">
          <h1 className="sm:text-3xl max-w-2xl mx-auto text-2xl text-center py-6 font-medium title-font text-gray-900 dark:bg-slate-900 dark:text-white">
            "Section Title"
          </h1>
          <div className="flex flex-col items-center justify-center">
            <Rightboard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherDashboard;
