import { cardsData } from "./data";

const Card = ({ title, subtitle, image, enrolled, content }) => {
  return (
    <div className="lg:w-1/3 sm:w-1/2 p-4">
      <div className="flex relative">
        <img
          alt="gallery"
          className="absolute inset-0 w-full h-full object-cover object-center"
          src={image}
        />
        <div className="px-8 py-8 relative z-10 w-full border-4 border-gray-200 bg-white transition-opacity duration-200 opacity-0 hover:opacity-100">
          <h2 className="tracking-widest text-sm title-font font-medium text-yellow-500 mb-1 dark:text-yellow-700">
            {subtitle}
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {title}
          </h1>
          <p className="leading-relaxed dark:text-black">{content}</p>
          <p className="leading-relaxed dark:text-black text-lg pt-1">
            <span className="text-bold">Total Enrolled:</span>{" "}
            <span className="text-yellow-700 underline">{enrolled}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  return (
    <section className="text-gray-600 body-font dark:bg-slate-900 dark:text-white">
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 dark:text-white">
            Trending Courses
          </h1>
          <p className="lg:w-2/4 mx-auto leading-relaxed text-base">
            Multiple studies have shown that learning a second language can
            improve memory and slow the process of aging.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {cardsData?.map((card, index) => {
            const { title, subtitle, image, enrolled, content } = card;
            return (
              <Card
                key={index}
                {...{ title, subtitle, image, enrolled, content }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
