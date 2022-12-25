import { Moda } from "./component";
import { useState } from "react";
const Qna = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Moda {...{ showModal, setShowModal }} />
      {/* */}
      <section class="text-gray-600 body-font overflow-hidden dark:bg-slate-900 dark:text-gray-100">
        <h1 class="sm:text-3xl text-center mt-2 text-2xl font-medium title-font mb-4 text-yellow-500 dark:text-yellow-400">
          Most Asked Questions
        </h1>
        <div class="flex w-full justify-center">
          <div class="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
            <input
              type="text"
              id="hero-field"
              name="hero-field"
              class="w-full bg-gray-100 dark:bg-white bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 dark:border-yellow-400 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button class="inline-flex text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">
            Search
          </button>
        </div>
        <div class="flex w-full justify-center">
          <button
            onClick={setShowModal}
            class="mt-2 text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg"
          >
            Ask a Question
          </button>
        </div>
        <div class="container py-4 content-center mt-2">
          <div class="-my-4 mx-auto py-2 divide-y-2 divide-gray-300 w-4/5">
            <div class="py-4 flex flex-wrap md:flex-nowrap ">
              <div class="md:flex-grow">
                <h2 class="text-2xl font-medium text-gray-900 dark:text-yellow-400 title-font mb-2">
                  Bitters hashtag waistcoat fashion axe chia unicorn
                </h2>
                <p class="leading-relaxed">
                  Glossier echo park pug, church-key sartorial biodiesel
                  vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf
                  moon party messenger bag selfies, poke vaporware kombucha
                  lumbersexual pork belly polaroid hoodie portland craft beer.
                </p>
              </div>
            </div>
            <div class="py-8 flex flex-wrap md:flex-nowrap">
              <div class="md:flex-grow">
                <h2 class="text-2xl font-medium text-gray-900 title-font mb-2 dark:text-yellow-400 ">
                  Bitters hashtag waistcoat fashion axe chia unicorn
                </h2>
                <p class="leading-relaxed">
                  Glossier echo park pug, church-key sartorial biodiesel
                  vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf
                  moon party messenger bag selfies, poke vaporware kombucha
                  lumbersexual pork belly polaroid hoodie portland craft beer.
                </p>
              </div>
            </div>
            <div class="py-8 flex flex-wrap md:flex-nowrap">
              <div class="md:flex-grow">
                <h2 class="text-2xl font-medium text-gray-900 title-font mb-2 dark:text-yellow-400">
                  Bitters hashtag waistcoat fashion axe chia unicorn
                </h2>
                <p class="leading-relaxed">
                  Glossier echo park pug, church-key sartorial biodiesel
                  vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf
                  moon party messenger bag selfies, poke vaporware kombucha
                  lumbersexual pork belly polaroid hoodie portland craft beer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Qna;
