import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./component/Comments";
import Modal from "./component/Modal";
import axios from "axios";

const SingleQna = () => {
  const { qid } = useParams();
  const [qna, setQna] = useState({});
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const loadQna = async () => {
    if (!qid) return;
    try {
      const {
        data: { qna, comments = [] },
      } = await axios.get("/qna/" + qid);
      setQna(qna);
      setComments(comments);
      console.log(comments);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadQna();
  }, [qid]);
  return (
    <>
      <Modal {...{ setShowModal, showModal, loadQna }} />
      <section className="text-gray-600 body-font overflow-hidden dark:bg-slate-900 dark:text-gray-100">
        <div className="flex w-full justify-center">
          <div className="py-8 flex flex-wrap md:flex-nowrap">
            <div className="md:flex-grow">
              <h2 className="text-2xl font-medium text-center text-gray-900 title-font mb-2 dark:text-yellow-400 ">
                {qna.question || qid}
              </h2>
              <div className="">
                <p className="leading-relaxed md:px-10">
                  {qna.description ||
                    "Description {qid} park pug, church-key sartorial biodiesel vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf."}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Comments
          qid={qid}
          comments={comments}
          setShowModal={setShowModal}
          loadQna={loadQna}
        />
      </section>
    </>
  );
};
export default SingleQna;
