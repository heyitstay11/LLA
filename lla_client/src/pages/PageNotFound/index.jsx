const PageNotFound = () => {
  return (
    <section className="flex items-center h-100 p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <img src="/pagenotfound.svg" className="motion-safe:animate-bounce" />
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-yellow-400">
            <span className="sr-only dark:bg-yellow-400">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <a
            rel="noopener noreferrer"
            href="/"
            className="px-8 py-3 font-semibold bg-gray-300 rounded dark:bg-yellow-400 dark:text-gray-900"
          >
            Back to homepage
          </a>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
