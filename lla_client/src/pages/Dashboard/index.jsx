const Leftboard = () => {
  return (
    <div className="h-full w-full flex flex-col items-center bg-white border-r-2 border-yellow-400">
      <div className="flex bg-white hover:bg-yellow-50 font-bold text-sm text-gray-900 py-3 px-4 hover:text-gray-900">
        First Link
      </div>
      <div className="flex bg-white hover:bg-yellow-50 font-bold text-sm text-gray-900 py-3 px-4 hover:text-gray-900">
        First Link
      </div>
      <div className="flex bg-white hover:bg-yellow-50 font-bold text-sm text-gray-900 py-3 px-4 hover:text-gray-900">
        First Link
      </div>
      <div className="flex bg-white hover:bg-yellow-50 font-bold text-sm text-gray-900 py-3 px-4 hover:text-gray-900">
        First Link
      </div>
      <div className="flex bg-white hover:bg-yellow-50 font-bold text-sm text-gray-900 py-3 px-4 hover:text-gray-900">
        First Link
      </div>
      <div className="flex bg-white hover:bg-yellow-50 font-bold text-sm text-gray-900 py-3 px-4 hover:text-gray-900">
        First Link
      </div>
    </div>
  );
};

const Rightboard = () => {
  return (
    <div className="w-4/5 h-full ">
      <div className="relative mb-4 ">
        <video className="mt-4 player h-3/5 w-4/5 border-2" />
        <h2 className="p-4">Descp</h2>
        <p className="p-4">more info</p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <section className="text-gray-600 body-font relative h-full">
      <div className=" flex flex-col md:flex-row flex-wrap mr-0">
        <div className="lg:w-1/5 md:w-1/5 bg-gray-300 border-b-2 border-yellow-400 rounded-lg overflow-y-auto flex items-end justify-start relative">
          <Leftboard />
        </div>
        <div className="lg:w-4/5 md:w-4/5 bg-white flex flex-col md:ml-auto w-full ml-4 mt-8 md:mt-0">
          <h1 class="sm:text-3xl text-2xl text-center py-4 font-medium title-font text-gray-900">
            Course Name
          </h1>
          <header class="text-gray-600 body-font border-b-2 border-yellow-400 border-t-2">
            <div class="justify-center container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
              <nav class="flex flex-wrap items-center text-base justify-center">
                <a class="mr-5 hover:text-gray-900">First Link</a>
                <a class="mr-5 hover:text-gray-900">Second Link</a>
                <a class="mr-5 hover:text-gray-900">Third Link</a>
                <a class="mr-5 hover:text-gray-900">Fourth Link</a>
                <a class="mr-5 hover:text-gray-900">Fifth Link</a>
              </nav>
            </div>
          </header>
          <div className="h-full flex flex-col items-center justify-center">
            <Rightboard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
