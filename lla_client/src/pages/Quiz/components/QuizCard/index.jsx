
const QuizCard = () => {

return (
        <section className="text-gray-600 body-font h-4/5">
            <div className="container mx-auto flex flex-col px-5 py-12 pb-2 justify-center items-center h-3/5 bg-gray-100">
            <img className="lg:w-2/6 md:w-3/6 w-4/6 mb-10 object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" />
            <div className="w-full flex flex-col mb-16 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">What is this? </h1>
            <div className="  flex-wrap mx-5">
                <button className="mt-2 basis-1/4 bg-gray-300 inline-flex py-3 px-5 rounded-lg items-center ml-4 focus:outline-none hover:bg-yellow-400 hover:text-yellow-900">
                <span className=" flex items-start flex-col leading-none title-font font-medium">
                    Option 1
                </span>
                </button>
                <button className="mt-2 basis-1/4 bg-gray-300 inline-flex py-3 px-5 rounded-lg items-center ml-4 focus:outline-none hover:bg-yellow-400 hover:text-yellow-900">
                <span className="flex items-start flex-col leading-none title-font font-medium">
                    Option 2 
                </span>
                </button>
                <button className="mt-2 basis-1/4 bg-gray-300 inline-flex py-3 px-5 rounded-lg items-center ml-4 focus:outline-none hover:bg-yellow-400 hover:text-yellow-900">
                <span className=" flex items-start flex-col leading-none title-font font-medium">
                    Option 3 
                </span>
                </button>
                <button className="mt-2 basis-1/4 bg-gray-300 inline-flex py-3 px-5 rounded-lg items-center ml-4 focus:outline-none hover:bg-yellow-400 hover:text-yellow-900">
                <span className="flex items-start flex-col leading-none title-font font-medium">
                    Option 4 
                </span>
                </button>
            </div>
            <div className="flex my-3">
                <button className="bg-yellow-300 inline-flex py-3 px-5 rounded-lg items-center ml-4 focus:outline-none hover:bg-yellow-400 hover:text-yellow-900">
                <span className=" flex items-start flex-col leading-none">
                    <span className="title-font font-medium">Submit</span>
                </span>
                </button>
            </div>
            </div>
        </div>
    </section>         
)
}
export default QuizCard