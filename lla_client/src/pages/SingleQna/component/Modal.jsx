import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuthContext } from "../../../context/auth";

export const Modal = ({ setShowModal, showModal }) => {
  const {
    auth: { token = "" },
  } = useAuthContext();
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.warn("Fill the details properly");
      return;
    }
    try {
      const { data } = await axios.post(
        "/qna/comment",
        {
          comment,
          parent: showModal,
        },
        { headers: { "x-auth-token": token } }
      );
      console.log(data);
      setComment("");
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={
        "fixed z-10 overflow-y-auto top-0 w-full left-0 " +
        `${showModal ? "" : "hidden"}`
      }
    >
      <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-900 opacity-75" />
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>
        <form
          onSubmit={handleSubmit}
          className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-4 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {/* <h2 className="text-2xl my-1 font-medium text-center text-gray-900 title-font mb-2 ">
            Reply to {showModal}
          </h2> */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <label htmlFor="description">Write a Reply</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              minLength={10}
              required={true}
              id="description"
              name="description"
              placeholder="Explain your Question"
              className="w-full bg-gray-100 dark:bg-white bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 dark:border-yellow-400 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="bg-gray-200 px-4 py-3 text-right">
            <button
              type="submit"
              className="py-2 px-4 bg-yellow-500 text-white rounded hover:bg-yellow-700 mr-2"
            >
              <i className="fas fa-times"></i> Reply
            </button>
            <button
              onClick={() => {
                setComment("");
                setShowModal(false);
              }}
              type="button"
              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
            >
              <i className="fas fa-times"></i> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
