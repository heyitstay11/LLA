import { useRef } from "react";

export const Modal = ({ setCurrentQuestion, setShowModal, showModal }) => {
  const selectRef = useRef();
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
        <div
          className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-4 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <label>Choose Type of Question</label>
            <select
              ref={selectRef}
              onChange={(e) =>
                setCurrentQuestion((prev) => ({
                  ...prev,
                  type: e.target.value,
                }))
              }
              className="form-select form-select-lg mb-3 appearance-none block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label=".form-select-lg example"
            >
              <option defaultValue={"text"} value="text">
                Text
              </option>
              <option value="image">Image</option>
              <option value="audio">Audio</option>
            </select>
          </div>
          <div className="bg-gray-200 px-4 py-3 text-right">
            <button
              onClick={() => {
                setShowModal(false);
                setCurrentQuestion((prev) => ({
                  ...prev,
                  type: selectRef.current.value,
                }));
              }}
              type="button"
              className="py-2 px-4 bg-yellow-500 text-white rounded hover:bg-yellow-700 mr-2"
            >
              <i className="fas fa-times"></i> Create
            </button>
            <button
              onClick={() => setShowModal(false)}
              type="button"
              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
            >
              <i className="fas fa-times"></i> Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
