import { cardsData } from "./data";

const Card = ({ icon, title, content }) => {
  return (
    <div className="xl:w-1/2 md:w-1/2 p-4">
      <div className="border border-gray-200 p-6 rounded-lg bg-gray-100  dark:border-4 dark:border-yellow-500">
        <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 mb-4">
          <img src={`./${icon}`} alt="" className="w-6 h-6" />
        </div>
        <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
          {title}
        </h2>
        <p className="leading-relaxed text-base dark:text-black">{content}</p>
      </div>
    </div>
  );
};

const Content = () => {
  return (
    <section className="text-gray-600 body-font dark:bg-slate-900 dark:text-white">
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-wrap w-full mb-12 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 dark:text-white">
            Why Choose Lingomax
          </h1>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500 dark:text-gray-200">
            If there’s a “secret” or “hack” to learning a foreign language, it’s
            this: hours and hours of awkward and strenuous conversation with
            people better than you in that language.
          </p>
        </div>
        <div className="flex flex-wrap md:w-4/5 mx-auto">
          {cardsData?.map((card, index) => {
            const { title, content, icon } = card;
            return <Card key={index} {...{ title, content, icon }} />;
          })}
        </div>
        <button className="flex mx-auto mt-16 text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg font-medium dark:text-yellow-900">
          Enroll Now
        </button>
      </div>
    </section>
  );
};

export default Content;
