import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import CovidGoogleMap from "./CovidGoogleMap";
import ListPatients from "./ListPatients";

import PatientInfo from "./PatientInfo";
import 'bootstrap/dist/css/bootstrap.min.css';

import MySlider from './MySlider';


let refs = [];
const CovidDashboard = (props) => {
    const [currentPatient, setCurrentPatient] = useState();
    const [SeekbarPatients, setSeekbarPatients] = useState();

    const [indexPatient , setindexPatient] = useState();
    const [patients, setPatients] = useState([]);
    const patientMarkerClickedHandler = (patient,index,patients) => {
        setCurrentPatient(patient);
        setPatients(patients);
        setindexPatient(index);
        console.log("vi tri: " +index)
    }

    refs = patients.reduce((acc, currentPatient,index) => {
        acc[index] = React.createRef();
        return acc;
      }, {});

    const patientButtonClickedHandler = (patient) => {
        setCurrentPatient(patient);
    }
    const patientSeekbarClickedHandler = (event,newValue) => {
        console.log(newValue)

        setSeekbarPatients(newValue);
        
    }
    const testseekbarvalue = (nvalue) =>{
        

        setSeekbarPatients(nvalue);
    }


    

    return ( <Container>
        <Row>
            <Col xs={2} ><ListPatients onPatientButtonClicked={patientButtonClickedHandler}  Seekbarsort={SeekbarPatients} refs = {refs} indexMarker={indexPatient} /></Col>  
            <Col xs={7} ><CovidGoogleMap onPatientMarkerClicked={patientMarkerClickedHandler} onLocationButtonClick={currentPatient} Seekbarsort={SeekbarPatients} /></Col>
            <Col xs={3} >
                <h5>Thông tin chi tiết bệnh nhân</h5>
                {currentPatient &&
                <PatientInfo patients={currentPatient}/>}
            </Col>
            
        </Row>
      
        <Row>
            <MySlider style="background-color:powderblue;" onSeekbarClick={testseekbarvalue} ></MySlider> 
            
        </Row>
    </Container> )
};

export default CovidDashboard;