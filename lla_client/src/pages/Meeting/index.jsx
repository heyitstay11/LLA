import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

const Meeting = () => {
  const { meetingId = "" } = useParams();
  const myVideoRef = useRef();
  let myVideoStream;

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        myVideoStream = stream;
        myVideoRef.current.srcObject = stream;
      })
      .catch((err) => console.log(err));
  });
  return (
    <section className="text-gray-600 body-font dark:bg-slate-900 dark:text-white">
      <div className="container px-5 py-24 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <h1 className="font-">{meetingId}</h1>
          <div className="rounded-lg h-64 overflow-hidden max-w-xl mx-auto">
            <img
              alt="content"
              className="object-cover object-center h-full w-full mx-auto"
              src="https://dummyimage.com/1200x500"
            />
          </div>
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-2 sm:py-8">
              <div className="w-50 h-40 rounded-full inline-flex items-center justify-center">
                <video
                  ref={myVideoRef}
                  playsInline
                  autoPlay
                  className="w-50 h-40"
                ></video>
              </div>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  value="abcd"
                  className="w-full text-black pt-auto pl-4"
                />
                <button className="text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg dark:text-yellow-900 dark:font-medium">
                  Send
                </button>
              </form>
              <p className="leading-relaxed text-lg mb-4">
                Meggings portland fingerstache lyft, post-ironic fixie man bun
                banh mi umami everyday carry hexagon locavore direct trade art
                party. Locavore small batch listicle gastropub farm-to-table
                lumbersexual salvia messenger bag. Coloring book flannel
                truffaut craft beer drinking vinegar sartorial, disrupt fashion
                axe normcore meh butcher. Portland 90's scenester vexillologist
                forage post-ironic asymmetrical, chartreuse disrupt butcher
                paleo intelligentsia pabst before they sold out four loko. 3
                wolf moon brooklyn.
              </p>
              <a className="text-yellow-500 inline-flex items-center">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Meeting;
