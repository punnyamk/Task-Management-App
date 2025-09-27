import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4'>
      <h1 className='text-9xl font-extrabold text-gray-800 mb-4'>404</h1>
      <p className='text-xl text-gray-600 mb-6'>
        Oops! The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate('/')}
        className='px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition'
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
