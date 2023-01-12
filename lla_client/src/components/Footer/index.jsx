import { Link } from "react-router-dom";
import { useThemeContext } from "../../context/theme";

const Footer = () => {
  const { theme } = useThemeContext();
  return (
    <footer className="text-gray-600 body-font dark:bg-slate-900 dark:text-white">
      <div className="h-0.5 w-100 bg-yellow-500"></div>
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <Link
          to={"/"}
          className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900 dark:text-white"
        >
          <img
            src="/lm.png"
            alt=""
            className={`w-20 h-15 text-white p-2  rounded-full ${
              theme !== "dark" ? "darklogo" : ""
            }`}
          />
          <span className="ml-3 text-xl">LingoMax</span>
        </Link>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4 dark:text-white">
          © 2022 LingoMax —
          <a
            href="https://twitter.com/"
            className="text-gray-600 ml-1 dark:text-white"
            rel="noopener noreferrer"
            target="_blank"
          >
            @tayyab, @tahir
          </a>
        </p>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4 dark:text-white">
          <Link to="/privacy">Privacy Policy</Link>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a
            href="https://www.twitter.com"
            target={"_blank"}
            rel={"noopener noreferer"}
            className="ml-3 text-gray-500 hover:text-blue-600 dark:hover:text-blue-600 dark:text-white"
          >
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
          <a
            href="https://www.instagram.com"
            target={"_blank"}
            rel={"noopener noreferer"}
            className="ml-3 text-gray-500 hover:text-purple-600 dark:hover:text-purple-600 dark:text-white"
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com"
            target={"_blank"}
            rel={"noopener noreferer"}
            className="ml-3 text-gray-500 dark:text-white dark:hover:text-blue-400 hover:text-blue-400 "
          >
            <svg
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              ></path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
