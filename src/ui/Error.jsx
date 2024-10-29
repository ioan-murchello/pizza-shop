import { useNavigate, useRouteError } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError()

  return (
    <div className='mx-4 p-5'>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <button className='text-blue-500 focus:text-blue-400 hover:text-blue-400' onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default NotFound;
