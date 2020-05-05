import React, {useEffect, useState} from 'react';

import ListGroup from 'react-bootstrap/ListGroup'
import { subDays, startOfToday, format , addDays } from "date-fns";

const axios = require('axios').default;

var valuesortnumber = null;


const SimpleList = ({onPatientButtonClicked , refs,indexMarker, Seekbarsort}) => {
    
    
    const [patients, setPatients] = useState([]);

    const constantDay = new Date("2019-12-8");
    const today = startOfToday();   
    const subday = today - constantDay; 
    const numberday = subday / 86400000; // milisecond in 1 day
    const curday = subDays(today,numberday/2 );

        function checkvalueSeekbar(arr, Seekbarsort)
    {
        

        let finishresult = new Array() ;

        if(Seekbarsort===undefined)
        {
            Seekbarsort = format(curday, 'yyyy-MM-dd') ;
            
            
            arr.map((item,index) => {
                // item.verifyDate>"2020-04-12T00:00:00"
                let a = item.verifyDate.substring(0, 10);
                
                if( a <Seekbarsort)
                {
                
                finishresult.push(item)
                
                }

            } 
            )
            
        }
        else{

            arr.map((item,index) => {
                // item.verifyDate>"2020-04-12T00:00:00"
                let a = item.verifyDate.substring(0, 10);
                
                if( a <Seekbarsort)
                {
                
                finishresult.push(item)
                
                }

            } 
            )

        }
        return finishresult
    }
    
   
    useEffect(() => {
        fetch("https://maps.vnpost.vn/apps/covid19/api/patientapi/list")
            .then(res => res.json())
            .then(
                (result) => {
                    setPatients(result.data);
                    
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    // setIsLoaded(true);
                    // setError(error);
                }
            )
    }, []);
    
    const sortedPatients = patients.sort(function compare(a, b) {
        var dateA = new Date(a.verifyDate);
        var dateB = new Date(b.verifyDate);
        return dateA - dateB;
      }).reverse();
      
      
        
    const finalSortedPatients = checkvalueSeekbar(sortedPatients,Seekbarsort)

    useEffect(() => {
            console.log(refs[indexMarker])
            if(refs[indexMarker]){
            refs[indexMarker].current.scrollIntoView({
                behavior: "smooth",
                block: "start"});
            }
        
    },[indexMarker])
    
    const PatientsList = () => (

        <div>
        <h4>  Danh sách các bệnh nhận sort Desc </h4>
        <div className ="list-group">
        <div>
            
            {
                finalSortedPatients.map((item,index) => (
                
                <div key={index}  style={
                    (index === indexMarker) ?  {  backgroundColor: "pink", colors: "black", border: "2px solid #4CAF50" ,width: "100%" ,margin:5 } :  {  backgroundColor: "white", colors: "black", border: "2px solid #4CAF50" ,width: "100%" ,margin:5 }
                   }>
                <div ref={refs[index]} />
                <h5 color="red">
                Tên: {item.name}   
                </h5>
                <div>
                Thời Gian: {item.verifyDate}
                </div> 
                
                <button className="button" style={{ backgroundColor: "white", colors: "black", border: "2px solid #4CAF50" ,width: "100%" ,margin:5  }} onClick={()=>{
                onPatientButtonClicked(item)}}>Xem Vị Trí</button>
                
                
                </div>
            
            ))
            } 
            
        </div>
        </div>
       
           
        </div>
      );
      return <PatientsList></PatientsList>
}
export default  SimpleList