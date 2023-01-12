export const Card = ({
  duration,
  title,
  _id,
  price,
  host,
  startTime,
  handleBuy,
}) => {
  return (
    <div className="p-4 pb-0 md:w-1/3 lg:w-1/4">
      <div className="h-auto border-2 border-gray-500 dark:border-yellow-400 border-opacity-60 rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="title-font text-lg font-medium text-gray-900 mb-2 dark:text-white">
            {title}
          </h1>
          <h2 className="tracking-widest title-font font-medium text-gray-800 dark:text-gray-300 mb-1">
            ~ {host?.name}
          </h2>
          <p className="leading-relaxed text-md  mb-3 flex justify-between">
            <span className="inline-block">{duration} min</span>{" "}
            <span className="inline-block">₹ {price}</span>
          </p>
          <div className="text-md text-gray-800 dark:text-gray-300">
            Timings: {new Date(startTime)?.toLocaleString()?.slice(0, 17)}
          </div>
          <button
            onClick={() => handleBuy(_id)}
            className="text-white bg-yellow-500 border-0 py-2 px-4 m-2 ml-0 focus:outline-none hover:bg-yellow-600 rounded text-lg font-medium dark:text-yellow-900"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
