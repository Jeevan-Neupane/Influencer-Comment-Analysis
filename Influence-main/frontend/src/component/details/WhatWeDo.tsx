import React from "react";
import { Link } from "react-router-dom";

function WhatWeDo() {
  return (
    <div className='text-center text-6xl font-bold'>
      <p>All in one social media management platform powered by LLM.</p>
      <button className=' text-black font-bold py-3 px-5  mt-8 border text-4xl rounded-md border-gray-400'>
        <Link to='/price'>Get Started</Link>
      </button>
    </div>
  );
}

export default WhatWeDo;
