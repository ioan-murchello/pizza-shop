import { useNavigate, useRouteError } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError()

  return (
    <div className='mx-4'>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default NotFound;
