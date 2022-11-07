import {BsThreeDotsVertical} from 'react-icons/bs';

const Vanilla = () => {
  return (
    <div className="mx-auto max-w-xl w-full">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div className="p-2 group relative border-2 hover:bg-gray-50 hover:shadow-md">
        <p className="group-hover:text-gray-900">Comments</p>
        <BsThreeDotsVertical
          size={20}
          className={`opacity-0 group-hover:opacity-40 absolute top-1 right-2 cursor-pointer`}
        />
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 opacity-0 group-hover:opacity-40 absolute top-1 right-2 cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg> */}
      </div>
    </div>
  );
};

export default Vanilla;
