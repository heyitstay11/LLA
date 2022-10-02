import { NavLink } from "react-router-dom";

const QuizList = () => {
  return (
    <section class="text-gray-600 body-font overflow-hidden dark:bg-slate-900 dark:text-white">
      <div class="container md:w-5/6 w-8/10 px-5 py-12 mx-auto ">
        <div className="p-4 mb-6">
          <div className="md:w-1/3 mx-auto flex">
            Search
            <input className="border border-2 border-yellow-400 flex-grow ml-2 dark:text-black pl-2" />
          </div>
        </div>
        <div class="-my-8 divide-y-2 divide-gray-100">
          <div class="py-8 flex flex-wrap md:flex-nowrap">
            <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span class="font-semibold title-font text-gray-700 dark:text-slate-300">
                English
              </span>
              <span class="mt-1 text-gray-500 text-sm dark:text-slate-100">
                10 Feb 2022
              </span>
            </div>
            <div class="md:flex-grow">
              <h2 class="text-2xl font-medium text-gray-900 title-font mb-2 dark:text-slate-300">
                Quiz 1 module 1
              </h2>
              <p class="leading-relaxed">
                Glossier echo park pug, church-key sartorial biodiesel
                vexillologist pop-up snackwave ramps cornhole.
              </p>
              <a class="text-yellow-500 inline-flex items-center mt-2">
                <NavLink to={"/quiz"}> Start </NavLink>
              </a>
            </div>
          </div>
          <div class="py-8 flex flex-wrap md:flex-nowrap">
            <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span class="font-semibold title-font text-gray-700 dark:text-slate-300">
                German
              </span>
              <span class="mt-1 text-gray-500 text-sm dark:text-slate-100">
                12 Jan 2022
              </span>
            </div>
            <div class="md:flex-grow">
              <h2 class="text-2xl font-medium text-gray-900 title-font mb-2 dark:text-slate-300">
                Quiz 2 module 1
              </h2>
              <p class="leading-relaxed">
                Marfa 3 wolf moon party messenger bag selfies, poke vaporware
                kombucha lumbersexual pork belly polaroid hoodie portland craft
                beer.
              </p>
              <a class="text-yellow-500 inline-flex items-center mt-2">
                <NavLink to={"/quiz"}> Start </NavLink>
              </a>
            </div>
          </div>
          <div class="py-8 flex flex-wrap md:flex-nowrap">
            <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col ">
              <span class="font-semibold title-font text-gray-700 dark:text-slate-300">
                Spanish
              </span>
              <span class="text-sm text-gray-500 dark:text-slate-100">
                12 Jun 2019
              </span>
            </div>
            <div class="md:flex-grow">
              <h2 class="text-2xl font-medium text-gray-900 title-font mb-2 dark:text-slate-300">
                Quiz on Spanish History
              </h2>
              <p class="leading-relaxed">
                Glossier echo park pug, poke vaporware kombucha lumbersexual
                pork belly polaroid hoodie portland craft beer.
              </p>
              <a class="text-yellow-500 inline-flex items-center mt-2">
                <NavLink to={"/quiz"}> Start </NavLink>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizList;
