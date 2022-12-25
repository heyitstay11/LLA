import { useParams } from "react-router-dom";
import Comments from "./component/Comments";
const SingleQna = () => {
  const { qid } = useParams();
  return (
    <>
      <section class="text-gray-600 body-font overflow-hidden dark:bg-slate-900 dark:text-gray-100">
        <div class="flex w-full justify-center">
          <div class="py-8 flex flex-wrap md:flex-nowrap">
            <div class="md:flex-grow">
              <h2 class="text-2xl font-medium text-center text-gray-900 title-font mb-2 dark:text-yellow-400 ">
                Question {qid}
              </h2>
              <p class="leading-relaxed">
                Description {qid} park pug, church-key sartorial biodiesel
                vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf.
              </p>
            </div>
          </div>
        </div>
        <Comments />
      </section>
    </>
  );
};
export default SingleQna;
