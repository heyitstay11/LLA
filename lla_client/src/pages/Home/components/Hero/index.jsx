import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="text-gray-600 body-font dark:bg-slate-900 dark:text-white">
      <div className="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 dark:text-white">
            A Successful Language Learning
            <br className="hidden lg:inline-block" />
            Experience.
          </h1>
          <p className="mb-8 leading-relaxed">
            It all comes down to patterns again. Learning your first foreign
            language can be quite the challenge, mostly because you are not
            familiar with using new speaking rules. Once you start learning the
            second foreign language, then the third, and so on, patterns will
            start coming to light and you will know exactly how to start with
            any new language.
          </p>
          <div className="flex justify-center">
            <Link
              to={"/signup"}
              className="inline-flex text-yellow-900 bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg"
            >
              Join Now
            </Link>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="./hero.svg"
            width={720}
            height={600}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
