const CardGrid = () => {
  return (
    <div className="max-w-xs mx-4 mb-2 rounded-lg pb-2 shadow-lg bg-white">
      <img
        className="w-full "
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
        alt="product"
      />
      <div className="px-6 py-4">
        <h4 className="mb-3 text-xl font-semibold tracking-tight text-gray-800">
          This is rendered
        </h4>
        <p className="leading-normal text-gray-700">this is description</p>
        <a className="mt-2 leading-normal font-bold text-slate-400">
          Go to Couse
        </a>
      </div>
    </div>
  );
};

const MyCourse = () => {
  return (
    <section class="text-gray-600 body-font relative">
      <div class="mx-auto ">
        <div class="flex flex-col text-center w-full bg-gray-200 py-2 ">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-slate-900">
            My Course
          </h1>
        </div>
        <div className="h-full flex flex-col items-center justify-center">
          <div class="w-full px-4 py-4 text-center bg-gray-200 flex flex-col items-center justify-center">
            <header class="text-gray-800 body-font ">
              <div class="mx-auto flex flex-wrap  flex-col md:flex-row justify-centeritems-center">
                <nav class="flex flex-wrap items-center text-base justify-center font-bold ">
                  <a class="px-5 hover:text-gray-900  ">Course</a>
                  <a class="px-5 hover:text-gray-900  ">Quiz</a>
                  <a class="px-5 hover:text-gray-900 ">Resource</a>
                </nav>
              </div>
            </header>
          </div>
          <div className="w-4/5 px-4">
            <div className="py-4 text-lg">
              <div className="md:w-1/2 mx-auto flex">
                Search &nbsp;
                <input className="border border-2 w-1/2 border-yellow-400 flex-grow  dark:text-black pl-2" />
              </div>
            </div>
            <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              <CardGrid />
              <CardGrid />
              <CardGrid />
              <CardGrid />
              <CardGrid />
              <CardGrid />
              <CardGrid />
              <CardGrid />
              <CardGrid />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyCourse;
