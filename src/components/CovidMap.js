import React, {useEffect, useState} from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const CovidMap = ({onPatientMarkerClicked,onLocationButtonClick , Seekbarsort}) => {
    let curLat ;
    let curLong;
    
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
            
        }
        else{
            arr.map((item,index) => {
                // item.verifyDate>"2020-04-12T00:00:00"
                let a = item.verifyDate.substring(0, 10);
                
                if( a <=Seekbarsort)
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

    const finalSortedPatients = checkvalueSeekbar(patients,Seekbarsort)

    return <Map center={[curLat,curLong]} zoom={16}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png   "
        />
        {finalSortedPatients.map((patient,index) => <Marker 
        key={index} position={[patient.lat, patient.lng]} 
        onClick={() => {onPatientMarkerClicked(patient,index)}}>
          
        </Marker>)}
    </Map>;
};

export default CovidMap;
