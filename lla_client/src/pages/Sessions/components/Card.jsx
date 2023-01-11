import { Link } from "react-router-dom";
export const Card = ({
  proficiency,
  title,
  ratings,
  enrolled,
  _id,
  price,
  thumbnail,
  createdBy,
}) => {
  return (
    <div className="p-4 pb-0 md:w-1/3 lg:w-1/4">
      <div className="h-auto border-2 border-gray-500 dark:border-yellow-400 border-opacity-60 rounded-lg overflow-hidden">
        <Link to={`/course/${_id}`}>
          <img
            className="lg:h-48 md:h-36 w-full object-cover object-center"
            src={thumbnail || "https://dummyimage.com/720x400"}
            alt=""
          />
        </Link>
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {proficiency.toUpperCase()}
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3 dark:text-white">
            {title}
          </h1>
          <p className="leading-relaxed mb-3 flex">
            {createdBy?.name} &nbsp;
            <span className="ml-auto inline-block">₹ {price}</span>
          </p>
          <div className="flex items-center flex-wrap mt-auto">
            <Link
              to={`/course/${_id}`}
              className="dark:text-yellow-500 text-yellow-600 inline-flex items-center md:mb-2 lg:mb-0"
            >
              Learn More
              <img className="w-4 h-4 ml-2" src="./right-arrow.svg" alt="" />
            </Link>
            <span
              title="enrolled students"
              className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-500 dark:border-yellow-400"
            >
              <svg
                className="w-4 h-4 mr-1"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              {enrolled}
            </span>
            <span
              title="ratings"
              className="text-gray-400 inline-flex items-center leading-none text-sm"
            >
              <svg
                className="w-4 h-4 mr-1"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
              {ratings}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
