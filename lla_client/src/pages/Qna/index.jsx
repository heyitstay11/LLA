import { useState } from "react";
import { Modal } from "./component";

const Qna = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Modal {...{ showModal, setShowModal }} />
      {/* */}
      <section className="text-gray-600 body-font overflow-hidden dark:bg-slate-900 dark:text-gray-100">
        <h1 className="sm:text-3xl text-center mt-2 text-2xl font-medium title-font mb-4 text-yellow-500 dark:text-yellow-400">
          Most Asked Questions
        </h1>
        <div className="flex w-full justify-center">
          <div className="relative mr-4 lg:w-1/2 w-2/4 md:w-2/3 text-left">
            <input
              type="text"
              id="hero-field"
              name="hero-field"
              className="w-full bg-gray-100 dark:bg-white bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 dark:border-yellow-400 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button className="inline-flex text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">
            Search
          </button>
        </div>
        <div className="flex w-full justify-center">
          <button
            onClick={setShowModal}
            className="mt-2 text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg"
          >
            Ask a Question
          </button>
        </div>
        <div className="container py-4 content-center mt-2">
          <div className="-my-4 mx-auto py-2 divide-y-2 divide-gray-300 w-4/5">
            <div className="py-4 flex flex-wrap md:flex-nowrap ">
              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 dark:text-yellow-400 title-font mb-2">
                  Bitters hashtag waistcoat fashion axe chia unicorn
                </h2>
                <p className="leading-relaxed">
                  Glossier echo park pug, church-key sartorial biodiesel
                  vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf
                  moon party messenger bag selfies, poke vaporware kombucha
                  lumbersexual pork belly polaroid hoodie portland craft beer.
                </p>
              </div>
            </div>
            <div className="py-8 flex flex-wrap md:flex-nowrap">
              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2 dark:text-yellow-400 ">
                  Bitters hashtag waistcoat fashion axe chia unicorn
                </h2>
                <p className="leading-relaxed">
                  Glossier echo park pug, church-key sartorial biodiesel
                  vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf
                  moon party messenger bag selfies, poke vaporware kombucha
                  lumbersexual pork belly polaroid hoodie portland craft beer.
                </p>
              </div>
            </div>
            <div className="py-8 flex flex-wrap md:flex-nowrap">
              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2 dark:text-yellow-400">
                  Bitters hashtag waistcoat fashion axe chia unicorn
                </h2>
                <p className="leading-relaxed">
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
