import { Link } from "react-router-dom";
import { FaYoutube, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import aiImage from "../../public/ai-image.jpg";
import Chat from "../component/chat/Chat";
import { useState } from "react";
import YourComponent from "../utils/webSocket";
import WhatWeDo from "../component/details/WhatWeDo";

const Homepage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='mt-10 text-gray-800 text-2xl'>
      <div>
        <h1 className='text-3xl font-bold'>Select Your Platform</h1>
        <div className='grid grid-cols-1 sm:grid-cols-4 gap-3'>
          <Link to={"/analytics/youtube"}>
            <div className='flex items-center gap-5 mt-3'>
              <FaYoutube
                size={30}
                className='text-red-600'
              />
              <h1 className='text-2xl'>YouTube</h1>
            </div>
          </Link>
          <div>
            <div className='flex items-center gap-5 mt-3'>
              <FaInstagram
                size={30}
                className='text-pink-600 '
              />
              <Link
                to='/price'
                className='text-2xl'
              >
                {" "}
                Instagram
              </Link>
            </div>
          </div>
          <div>
            <div className='flex items-center gap-5 mt-3'>
              <FaFacebook
                size={30}
                className='text-blue-600'
              />
              <Link
                to='/price'
                className='text-2xl'
              >
                {" "}
                Facebook
              </Link>
            </div>
          </div>
          <div>
            <div className='flex items-center gap-5 mt-3'>
              <FaLinkedin
                size={30}
                className='text-blue-700 '
              />
              <Link
                to='/price'
                className='text-2xl'
              >
                {" "}
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-[500px] flex flex-col items-center justify-center '>
        <h1 className='text-5xl font-bold'>Chat with AI Analytics</h1>
        <p className='m-8 text-gray-600'>
          Chat with ai to know anything about your contents
        </p>
        <p
          className='font-bold py-3 px-8 border border-gray-600 rounded-lg w-auto h-auto flex items-center gap-2  cursor-pointer'
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <img
            src={aiImage}
            alt='ai-icon'
            className='h-20'
          />
          AI Analytics
        </p>
      </div>
      <Chat
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <WhatWeDo />
    </div>
  );
};

export default Homepage;
