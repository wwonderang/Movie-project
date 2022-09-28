import React, { useState, useEffect } from "react";

import { FaCaretSquareUp } from "react-icons/fa";

import './scrol.scss';

const Scroll = () => {

  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 200) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    })
  }, []);

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      // left: 0,
      behavior: 'smooth',
    });
  };
  
  return (
    <div className="btn-up">
      {showBtn && (<FaCaretSquareUp className="arrowIcon" onClick={handleScroll}/>
  )}
    </div>
  )};
  
  export default Scroll;
