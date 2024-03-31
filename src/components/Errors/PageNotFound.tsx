import { FaHome } from 'react-icons/fa';
const PageNotFound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-start p-10">
      <div className="rounded-lg flex flex-col gap-4 border w-[40%] border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1 ">
        <div className="flex flex-col gap-2">
          <h1 className=" text-xl font-bold text-black">404 Page not found</h1>
          <p className="text-sm ">
            I'm sorry, but it seems that the content you're looking for isn't
            available on the path you've chosen. Would you like to navigate back
            to the home page to explore other options? You can click on the home
            icon or use the navigation menu to return to the main page. If you
            need further assistance, feel free to contact us. Thank you for your
            understanding.
          </p>
        </div>
        <button
          onClick={() => (window.location.href = '/admin')}
          className="flex gap-2 items-center justify-end text-sm  text-primary"
        >
          Go to home page
          <FaHome size={20} />
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
