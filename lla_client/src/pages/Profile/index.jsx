import { useAuthContext } from "../../context/auth";

const Profile = () => {
  const {
    auth: { _id, name, email, description, about },
  } = useAuthContext();
  return (
    <section className="text-gray-400 bg-gray-900 body-font relative">
      <div className="container px-0 md:px-5 py-2 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="w-full flex flex-row justify-center">
          <div className="w-5/6 md:w-4/6 flex flex-col  w-full md:py-8 mt-8 md:mt-0">
            <h1 className="w-5/6 text-white text-3xl mb-1 font-medium title-font">
              Profile
            </h1>
            <div className="py-2 flex-row flex justify-between">
              <img src="./lm.png" height="128px" width="128px" />
              <a className="flex">Change Photo</a>
            </div>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-lg text-gray-400">
                Your profile link
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={"lingomax.ml/profile/" + _id}
                readOnly="true"
                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 text-base outline-none text-gray-100 my-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-400"
              >
                Full Name
              </label>
              <input
                value={name}
                readOnly={true}
                type="email"
                id="email"
                name="email"
                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-400"
              >
                Email
              </label>
              <input
                value={email}
                readOnly={true}
                type="email"
                id="email"
                name="email"
                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-400"
              >
                Short Description
              </label>
              <input
                value={description}
                readOnly={true}
                type="email"
                id="email"
                name="email"
                placeholder="Your achievements and career highlight"
                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="message"
                className="leading-7 text-sm text-gray-400"
              >
                About Yourself
              </label>
              <textarea
                value={about}
                readOnly={true}
                id="message"
                name="message"
                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button className="text-white font-bold bg-yellow-500 border-0 mb-2 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">
              UPDATE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
