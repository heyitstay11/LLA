import { useState } from "react";
import { useAuthContext } from "../../../context/auth";
import axios from "axios";

const ChildComment = ({ comment, createdAt, postedBy }) => {
  const randomImgId = 1 + Math.floor(Math.random() * 100);
  return (
    <>
      <article className="p-4 mb-2 py-2 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-yellow-400">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src={`https://picsum.photos/${randomImgId}`}
                alt="Jese Leos"
              />
              {postedBy?.name || "Michael Gough"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time dateTime="2022-02-12" title="February 12th, 2022">
                {createdAt
                  ? new Date(createdAt).toDateString()
                  : null || "Feb. 8, 2022"}
              </time>
            </p>
          </div>
          {/* <button
            id="dropdownComment2Button"
            data-dropdown-toggle="dropdownComment2"
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
            <span className="sr-only">Comment settings</span>
          </button>
          <div
            id="dropdownComment2"
            className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownMenuIconHorizontalButton"
            >
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Remove
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Report
                </a>
              </li>
            </ul>
          </div> */}
        </footer>
        <p className="text-gray-500 dark:text-gray-400">
          {comment ||
            "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy."}
        </p>
      </article>
    </>
  );
};

const ParentComment = ({
  comment,
  createdAt,
  postedBy,
  setShowModal,
  replies = [],
  _id,
  loadQna,
}) => {
  const {
    auth: { _id: userId, token },
  } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const randomImgId = 1 + Math.floor(Math.random() * 100);

  const handleCommentDelete = async () => {
    try {
      const { data } = await axios.delete("/qna/comment/" + _id, {
        headers: { "x-auth-token": token },
      });
      console.log(data);
      loadQna();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <article className="px-1 md:px-6 py-4 mb-2 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-yellow-400">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src={`https://picsum.photos/${randomImgId}`}
                alt="Michael Gough"
              />
              {postedBy?.name || "Michael Gough"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time dateTime="2022-02-08" title="February 8th, 2022">
                {createdAt
                  ? new Date(createdAt).toDateString()
                  : null || "Feb. 8, 2022"}
              </time>
            </p>
          </div>
          {userId === postedBy?._id && (
            <>
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                id="dropdownComment1Button"
                data-dropdown-toggle="dropdownComment1"
                className="inline-flex flex-col items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                </svg>
                {isOpen && <span>Close</span>}
                <span className="sr-only">Comment settings</span>
              </button>
              <div
                id="dropdownComment1"
                className={`${
                  isOpen ? "" : "hidden"
                } z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconHorizontalButton"
                >
                  <li>
                    <button className="block w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Edit
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleCommentDelete}
                      className="block  w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Remove
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </footer>
        <p className="text-gray-500 dark:text-gray-400">
          {comment ||
            "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy."}
        </p>
        <div className="flex items-center mt-4 space-x-4">
          <button
            onClick={() => {
              setShowModal(_id);
            }}
            type="button"
            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
          >
            <svg
              aria-hidden="true"
              className="mr-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            Reply
          </button>
        </div>
      </article>
      {/* {childComment &&} */}
      {replies?.map((reply) => {
        return <ChildComment key={reply._id} {...reply} />;
      })}
    </>
  );
};

const Comments = ({ qid, comments = [], setShowModal, loadQna }) => {
  const {
    auth: { token = "" },
  } = useAuthContext();
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    console.log("ok");
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      const { data } = await axios.post(
        "/qna/comment",
        { comment: comment.trim(), question: qid },
        { headers: { "x-auth-token": token } }
      );
      console.log(data);
      setComment("");
      loadQna();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900 py-2 md:py-8 lg:py-8">
        <div className="md:w-4/5 mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-yellow-400">
              Discussion ({comments.length})
            </h2>
          </div>
          <form className="mb-2" onSubmit={handleSubmit}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-black border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="6"
                className="px-0 w-full text-sm text-gray-900 border  dark:border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center dark:text-white bg-primary-700 rounded-lg border border-black dark:border-gray-500  focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-400"
            >
              Post comment
            </button>
          </form>
          {comments?.length == 0 && (
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-yellow-400">
              No Comments available
            </h2>
          )}
          {comments?.map((c) => {
            return (
              <ParentComment
                key={c._id}
                {...c}
                setShowModal={setShowModal}
                loadQna={loadQna}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Comments;
