import React, {useEffect, useState} from 'react';
import {compose, withProps} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps"
import { subDays, startOfToday, format , addDays } from "date-fns";
const CovidGoogleMap = ({onPatientMarkerClicked,onLocationButtonClick , Seekbarsort}) => {
    let curLat ;
    let curLong;
    const constantDay = new Date("2019-12-8");
    const today = startOfToday();   
    const subday = today - constantDay; 
    const numberday = subday / 86400000; // milisecond in 1 day
    const curday = subDays(today,numberday/2 );

    
    if(onLocationButtonClick===undefined)
    {
        curLat = 10.762913;
        curLong=106.6799884;
    }
    else
    {
        curLat = onLocationButtonClick.lat;
        curLong =onLocationButtonClick.lng;
    }

    
    function checkvalueSeekbar(arr, Seekbarsort)
    {
        var dateTMP = new Date("2020-04-12T00:00:00");

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

    
    const [patients, setPatients] = useState([]);
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

    const MyMapComponent = compose(
        withProps({
            googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyCfrgza6UF7_rK2NsnuUQBytLTSbKYuAlA&libraries=geometry,drawing,places",
            loadingElement: <div style={{height: `100%`}}/>,
            containerElement: <div style={{height: `600px`}}/>,
            mapElement: <div style={{height: `90%`}}/>
        }),
        withScriptjs,
        withGoogleMap
    )((props)=> (
        <GoogleMap defaultZoom={16} defaultCenter={{lat: curLat, lng: curLong}}>
            {finalSortedPatients.map((patient, index) => (<Marker key={index}  position={{lat: patient.lat, lng: patient.lng}} onClick={()=>{
                onPatientMarkerClicked(patient,index,finalSortedPatients)}}>
            </Marker>))}
        </GoogleMap>
    ));


    return <MyMapComponent/>;
}
export default CovidGoogleMap;
