import React, { Component,useState,useEffect } from "react";

import { render } from "react-dom";
import { Slider, Rail, Handles, Ticks } from "react-compound-slider";
import { SliderRail, Handle, Tick } from "./SupportMyslider"; // example render components - source below
import { subDays, startOfToday, format , addDays } from "date-fns";
import { scaleTime } from "d3-scale";


const sliderStyle = {
  position: "relative",
  width: "100%"
};

function formatTick(ms) {
  return <div style={{ fontSize: 20 }}>{format(new Date(ms), "yyyy-MM-dd")}</div>
  
}

const halfHour = 1000 * 60 * 60;
const constantDay = new Date("2019-12-8");

const MySlider =({onSeekbarClick})=> {
  
    let  interval;
    const today = startOfToday();
    
    const subday = today - constantDay;
    
    const numberday = subday / 86400000; // milisecond in 1 day
   
    const fourDaysAgo = subDays(today,numberday/2 );
    const oneWeekAgo = subDays(today, numberday);

   

    const [selected, setselected] = useState(fourDaysAgo);
    const [updated, setupdated] = useState(fourDaysAgo);
    const [min, setmin] = useState(oneWeekAgo);
    const [max, setmax] = useState(today);
    const [isPlay,setIsPlay] = useState(false); 
   

  const onChange = ([ms]) => {
    
    setselected(new Date(ms))
    
    return selected
  };

  const onUpdate = ([ms]) => {
    
    setupdated(new Date(ms))
    onSeekbarClick(format(updated, 'yyyy-MM-dd'))
    return updated
  };

  
  useEffect(() => {
    const timer =
    (isPlay===true && format(updated, 'yyyy-MM-dd') <= format(updated, 'yyyy-MM-dd')) && setInterval(() => {
      setselected(selected => addDays(selected,1))
      setupdated(updated => addDays(updated,1))
      onSeekbarClick(format(updated, 'yyyy-MM-dd'))
      
    }, 500);
    return () => clearInterval(timer);
  },[updated,isPlay])
    
  

  

  

  const renderDateTime = (date, header)=> {
    return (
      <div
        style={{
          width: "100%",
          textAlign: "center",
          fontFamily: "Arial",
          
        }}
      >
        <b>{header}:</b>
        <div style={{ fontSize: 20 }}>{format(date, "yyyy-MM-dd")}</div>
      </div>
    );
  }

  
    

    const dateTicks = scaleTime()
      .domain([min, max])
      .ticks(8)
      .map(d => +d);
    
   

    return (
      <div style={{ backgroundColor: "white", colors: "black", border: "2px solid #4CAF50", width: "100%" }}   >
    
        {renderDateTime(updated, "Thời Gian")}

        <div>
        <button  onClick = {() => {setIsPlay(isPlay => true)}}   style={{ marginLeft:60, backgroundColor: "white", colors: "black", border: "2px solid #4CAF50" }}>
              Play
        </button>
        <button  onClick = {() => {setIsPlay(isPlay => false)}}  style={{ marginLeft:10, backgroundColor: "white", colors: "black", border: "2px solid #4CAF50" }} >
              Pause
        </button>
        </div> 
         
        <div style={{ margin: "5%", height: 120, width: "90%" }}>
          <Slider
            mode={1}
            step={halfHour}
            domain={[+min, +max]}
            rootStyle={sliderStyle}
            onUpdate={onUpdate}
            onChange={onChange}
            values={[+selected]}
          
          >
            <Rail>
              {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
            </Rail>
            <Handles>
              {({ handles, getHandleProps }) => (
                <div>
                  {handles.map(handle => (
                    <Handle
                      key={handle.id}
                      handle={handle}
                      domain={[+min, +max]}
                      getHandleProps={getHandleProps}
                    />
                  ))}
                </div>
              )}
            </Handles>

            <Ticks values={dateTicks} >
              {({ ticks }) => (
                <div>
                  {ticks.map(tick => (
                    <Tick 
                      key={tick.id}
                      tick={tick}
                      count={ticks.length}
                      format={formatTick}
                      
                    />
                  ))}
                </div>
              )}
            </Ticks>
          </Slider>
          

        </div>

      </div>
    );
  
}

export default MySlider;
