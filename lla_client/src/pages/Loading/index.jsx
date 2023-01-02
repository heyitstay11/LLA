const Loading = ({ msg }) => {
  return (
    <div className="w-full py-24 md:py-52 flex flex-col items-center justify-center dark:bg-slate-900 dark:text-white">
      <img className="animate-pulse p-4" src="/trace.svg" width="200" />
      <div className="custom-loader"></div>
      <h2 className="p-4 font-mono text-3xl"> {msg || "Loading"}</h2>
    </div>
  );
};

export default Loading;
