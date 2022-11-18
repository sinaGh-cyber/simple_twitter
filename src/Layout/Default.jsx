import { Children } from 'react';
import NavBar from '../components/navBar/navBar';
import TopBar from '../components/topBar/topBar';
import {useSelector} from 'react-redux';
import TweetModal from '../modules/tweetModal/tweetModal';

const Default = ({ children, pageName, refreshHandler }) => {

  
  return (
    <main className="w-full min-h-screen  bg-white flex flex-col-reverse   md:flex-row justify-between items-center ">
    
    
    <section className="w-full  z-10 md:w-auto md:h-screen flex flex-col justify-start items-center md:border-l-4 md:border-l-gray-ExtraLight border-t-2 border-t-gray-ExtraLight  sticky bottom-0 md:top-0 bg-gray-ExtraExtraLight">
        <NavBar />
      </section>
      <section className=" w-full md:w-auto min-h-screen flex flex-col flex-1 ">
        <div className=" bg-white z-10 opacity-80 p-2 px-5 sticky top-0 text-2xl font-bold ">
          <TopBar pageName={pageName} refreshHandler={refreshHandler} />
        </div>
        <div className=" min-h-[39rem] flex-1 bg-gray-ExtraExtraLight ">
          {children}
        </div>
      </section>
    </main>
  );
};

export default Default;
