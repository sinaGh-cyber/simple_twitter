import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timeOutId = setTimeout(() => {
        console.log('here');
      navigate('/home');
    }, 3000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, []);

  return (
    <div className=" flex justify-center items-center w-full h-screen bg-gray-dark">
      not found
    </div>
  );
};

export default NotFound;
