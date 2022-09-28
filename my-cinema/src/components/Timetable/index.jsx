import React from 'react';

import './timetable.scss';

const MovieTimetable = (props) => {
  const { showInfo } = props;
  const daysInfo = [];

  const getDays = () => {
    const days =[];
    for(let day in showInfo.showList) {
      daysInfo.push(showInfo.showList[day]);

      days.push(
        <div>
          {showInfo.showList[day].map((f) => 
            <div  className='timetable'>
              <h5>{f.theater.name}</h5>
              <p>{f.start}</p>
            </div>
            )}
        </div>
      )
    }

    return days;
  }

  return (
    <div>
      {getDays()}
    </div>
  )
}

export default MovieTimetable; 
