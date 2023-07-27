import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
      <p className="text-xl text-gray-600 mb-8">Something went wrong.</p>
      <div className="bg-white p-8 rounded-md shadow-lg">
        <p className="text-gray-800 mb-2">Error Code: 404</p>
        <p className="text-gray-600">
          The page you're looking for could not be found.
        </p>
      </div>
      <Link
        to="/"
        className="px-3 my-2 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Error;
