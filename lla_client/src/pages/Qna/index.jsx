import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { Modal } from "./component/Modal";
import { Link } from "react-router-dom";
import Loading from "../Loading";

const Qnapromt = ({ data }) => {
  console.log(data);
  return (
    <div className="py-5 flex flex-wrap md:flex-nowrap">
      <div className="md:flex-grow">
        <Link to={"/qna/" + data._id}>
          <h2 className="text-2xl font-medium text-gray-900 title-font mb-2 dark:text-yellow-400">
            {data.question}
          </h2>
        </Link>
        <h2 className="text-md flex font-medium text-gray-600 title-font mb-2 dark:text-yellow-200">
          {data.tags.map((tag) => {
            return (
              <div key={tag} className="ml-2">
                {tag}
              </div>
            );
          })}
        </h2>
        <p className="leading-relaxed text-gray-800 dark:text-white">
          {data.description ||
            "Glossier echo park pug, church-key sartorial biodiesel vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf moon party messenger bag selfies, poke vaporware kombucha lumbersexual pork belly polaroid hoodie portland craft beer."}
        </p>
      </div>
    </div>
  );
};

const Qna = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredQuestions = useMemo(() => {
    const sanitizedTerm = searchTerm.trim().toLowerCase();
    if (!sanitizedTerm) return question;
    return question.filter(
      (q) =>
        q?.question.toLowerCase().includes(sanitizedTerm) ||
        q?.tags.join("").toLowerCase().includes(sanitizedTerm)
    );
  }, [searchTerm, question]);

  const loadRecentQuestions = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/qna/");
      setQuestion(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadRecentQuestions();
  }, []);

  if (isLoading) {
    return <Loading msg={"Loading most recent QNAs"} />;
  }
  return (
    <>
      <Modal {...{ showModal, setShowModal }} />
      {/* */}
      <section className="text-gray-600 body-font overflow-hidden dark:bg-slate-900 dark:text-gray-100">
        <h1 className="sm:text-3xl text-center mt-4 text-2xl font-medium title-font mb-4 text-yellow-500 dark:text-yellow-400">
          Most Asked Questions
        </h1>
        <div className="flex w-full justify-center">
          <div className="relative mr-4 lg:w-1/2 w-2/4 md:w-2/3 text-left">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          {!isLoading && question?.length == 0 && (
            <h1 className="sm:text-3xl text-center mt-2 text-2xl font-medium title-font mb-4 text-yellow-500 dark:text-yellow-400">
              No Questions Found
            </h1>
          )}
          {searchTerm.trim() && (
            <h1 className="sm:text-xl text-center mt-2 text-xl font-medium title-font mb-2 text-yellow-500 dark:text-yellow-400">
              Search Results for "{searchTerm}"
            </h1>
          )}
          {!isLoading && filteredQuestions.length == 0 && (
            <h1 className="sm:text-2xl text-center mt-2 text-2xl font-medium title-font mb-2 text-yellow-500 dark:text-yellow-400">
              Found Nothing :/
            </h1>
          )}
          <div className="-my-4 mx-auto py-1 divide-y-2 divide-gray-300 w-4/5">
            {filteredQuestions.map((data) => {
              return <Qnapromt key={data._id} data={data} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Qna;
