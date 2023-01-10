const Leftboard = () => {
  return (
    <div className="h-full w-full py-8 gap-2 flex flex-col items-center bg-white border-r-2 border-yellow-400 dark:bg-slate-900 dark:text-white">
      {/* <button className="flex py-2 mb-2 bg-gray-200 hover:bg-yellow-500 dark:hover:text-yellow-300 font-bold text-sm text-gray-900 py-2 px-4 hover:text-gray-900 dark:bg-gray-500 rounded-lg dark:text-white">
        Profile
      </button> */}
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
    <div className=" w-full h-full text-gray-600 body-font">
      <div className="w-full h-full px-5 py-8 mx-auto flex flex-wrap">
        <div className="w-full h-full flex flex-wrap -m-4">
          <div className="p-4 lg:w-1/2 md:w-full">
            <div className="flex border-2 rounded-lg border-gray-200 dark:bg-slate-800 border-opacity-50 p-8 sm:flex-row flex-col">
              <div className="flex-grow">
                <h2 className="text-gray-900 dark:text-yellow-400  text-lg title-font font-medium mb-3">
                  Mock interview
                </h2>
                <p className="leading-relaxed text-base dark:text-gray-200 ">
                  Date - 1/2/2022 5:30 pm
                </p>
                <p className="leading-relaxed text-base dark:text-gray-200 ">
                  Booked ✔
                </p>
                <p className="leading-relaxed text-base dark:text-gray-200 ">
                  Student : John Doe
                </p>
                <a className="mt-3 text-indigo-600 dark:text-yellow-500 inline-flex items-center">
                  meeting link
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="p-4 lg:w-1/2 md:w-full">
            <div className="flex border-2 rounded-lg border-gray-200 dark:bg-slate-800 border-opacity-50 p-8 sm:flex-row flex-col">
              <div className="flex-grow">
                <h2 className="text-gray-900 dark:text-yellow-400  text-lg title-font font-medium mb-3">
                  Language Class 60 min
                </h2>
                <p className="leading-relaxed text-base dark:text-gray-200 ">
                  Date - 1/2/2022 7:30 pm
                </p>
                <p className="leading-relaxed text-base dark:text-gray-200 ">
                  Booked ✔
                </p>
                <p className="leading-relaxed text-base dark:text-gray-200 ">
                  Student : John Doe
                </p>
                <a className="mt-3 text-indigo-600 dark:text-yellow-500 inline-flex items-center">
                  meeting link
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="p-4 lg:w-1/2 md:w-full">
            <div className="flex border-2 rounded-lg border-gray-200 dark:bg-slate-800 border-opacity-50 p-8 sm:flex-row flex-col">
              <div className="flex-grow">
                <h2 className="text-gray-900 dark:text-yellow-400  text-lg title-font font-medium mb-3">
                  Language Class 30 min
                </h2>
                <p className="leading-relaxed text-base dark:text-gray-200 ">
                  Date - 1/2/2022 9:30 pm
                </p>
                <p className="leading-relaxed text-base dark:text-gray-200 ">
                  Not Booked ❌
                </p>
                <a className="mt-3 text-indigo-600 dark:text-yellow-500 inline-flex items-center">
                  meeting link
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="p-4 lg:w-1/2 md:w-full">
            <div className="flex border-2 rounded-lg border-gray-200 dark:bg-slate-800 border-opacity-50 p-8 sm:flex-row flex-col">
              <form className="flex-grow">
                <h2 className="text-gray-900 dark:text-yellow-400  text-lg title-font font-medium mb-3">
                  Create New Meeting Schedule
                </h2>
                <div className="py-3">
                  <label className="dark:text-white mx-3" htmlFor="">
                    Title:
                  </label>
                  <input className="px-1" type="text" required={true} />
                </div>
                <div className="">
                  <label className="dark:text-white mx-3" htmlFor="">
                    Enter Date:
                  </label>
                  <input
                    type="date"
                    required={true}
                    className="px-1"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="py-3">
                  <label className="dark:text-white mx-3" htmlFor="">
                    Enter Time (in mins):
                  </label>
                  <input
                    className="px-1"
                    type="number"
                    required={true}
                    step={15}
                    min={15}
                    max={90}
                  />
                </div>
                <button className="mx-auto mx-6 my-2 px-8 border border-1 p-2 border-yellow-500 text-indigo-600 dark:text-yellow-500 inline-flex items-center">
                  Submit
                </button>
              </form>
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
            Upcoming Meetings
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
