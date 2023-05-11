import Base from "../components/Base"
import { Card, CardImg, CardText, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { useEffect, useState } from "react"
import { GetAllMyPatients } from "../services/patient-service"
import { useNavigate } from "react-router-dom"

const Patients=()=>{
    const [patients,setPatients] = useState([])
    let navigate = useNavigate()

    const getAllPatients=()=>{
        GetAllMyPatients().then(data=>{
            setPatients(data)
        }).catch(error=>console.log(error))
    }

    useEffect(()=>{
        getAllPatients();
    },[])
    return (
        <Base>
            <Container className="mt-1">
                <Row>

                    {
                        patients.map((pt,index)=>(
                            <Col md="3" key={index}>
                        <Card className="text-center" body>
                        <i class="fas fa-user-circle fa-4x text-primary"> </i>
                        <p className="m-0">{pt.name}</p>
                        <p className="m-0">{pt.age} | {pt.sex}</p>
                        <p><i onClick={()=>navigate("/prescriptions",{state:pt})} class="fas fa-notes-medical fa-2x text-success myHover" ></i><i class="fas fa-stethoscope fa-2x text-success myHover ml-2"></i></p>
                        </Card>

                    </Col>

                        ))
                    }
                    
                    <Col md="3">

                    </Col>

                </Row>
            </Container>
        </Base>
    )
}

export default Patients