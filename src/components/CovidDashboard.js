import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import CovidGoogleMap from "./CovidGoogleMap";
import ListPatients from "./ListPatients";
import Container from "react-bootstrap/Container";
import PatientInfo from "./PatientInfo";
import 'bootstrap/dist/css/bootstrap.min.css';

import MySlider from './MySlider';

import CovidMap from './CovidMap'

const CovidDashboard = (props) => {
    const [currentPatient, setCurrentPatient] = useState();
    const [SeekbarPatients, setSeekbarPatients] = useState();
    const [markerIndex,setmarkerIndex] = useState()

    const patientMarkerClickedHandler = (patient,index) => {
        setCurrentPatient(patient);
        setmarkerIndex(index)
    }
    const patientButtonClickedHandler = (patient) => {
        setCurrentPatient(patient);
    }
    const patientSeekbarClickedHandler = (event,newValue) => {
        

        setSeekbarPatients(newValue);
        
    }
    const testseekbarvalue = (nvalue) =>{
        

        setSeekbarPatients(nvalue);
    }


    

    return ( <Container>
        <Row>
            <Col xs={2} ><ListPatients onPatientButtonClicked={patientButtonClickedHandler}  Seekbarsort={SeekbarPatients} /></Col>  
        
            <Col xs={3} >
                <h5>Thông tin chi tiết bệnh nhân</h5>
                {currentPatient &&
                <PatientInfo patients={currentPatient}/>}
            </Col>
            <Col xs={7} ><CovidGoogleMap onPatientMarkerClicked={patientMarkerClickedHandler} onLocationButtonClick={currentPatient} Seekbarsort={SeekbarPatients} /></Col>
        </Row>
      
        <Row>
            <MySlider style="background-color:powderblue;" onSeekbarClick={testseekbarvalue} ></MySlider> 
            
        </Row>
    </Container> )
};

export default CovidDashboard;