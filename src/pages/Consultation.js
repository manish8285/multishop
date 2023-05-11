import { Col, Container, Row ,Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form, Card, CardTitle, CardText, ButtonDropdown} from "reactstrap"
import React, { useEffect, useState } from 'react';
import Base from "../components/Base"
import { AddNewPatient, GetAllMyPatients, UpdatePatient } from "../services/patient-service";
import { toast } from "react-toastify";
import { CreateAppointment, UpdateAppointment } from "../services/appointment-service";
import { requestAppintmentPayment } from "../services/payment-service";
import { useNavigate } from "react-router-dom";
import { isLogedIn } from "../auth";

const Consultation=()=>{
    const [modalAP, setModalAP] = useState(false);
    const [modalEP, setModalEP] = useState(false);
    const [patients,setPatients] = useState([])
    let navigate = useNavigate()

    if(!isLogedIn()){
        navigate("/login")
    }

    //console.log(!isLogedIn())
    const [appointment,setAppointment]= useState({
        id:null,
        patient:{
            id:0
        },
        symptoms:"",
        mode:"",
        doctor:{
            id:""
        }

    })
    const [paymentDetail,setPaymentDetail]=useState({
        productInfo:"",
        firstname:"",
        email:'',
        phone:'',
        amount:'',
        surl:'',
        furl:'',
        key:'',
        hash:'',
        txnid:"",
    })

    const updatePaymentDetail=(event)=>{
        setPaymentDetail({
            ...paymentDetail,
            [event.target.id]:event.target.value
        })
    }

    const [patient,setPatient] = useState({
        name:"",
        age:"",
        sex:"MALE",

    })

    const toggleAP = () => setModalAP(!modalAP);
    const toggleEP = () => setModalEP(!modalEP);

    const addPatient=()=>{
        toggleAP()


        console.log(patient)
        AddNewPatient(patient).then(data=>{
            setPatient(data)
            getAllPatients()
            toast.success("Patient Added Successfully !!!")
        }).catch(error=>console.log(error))
    }

    const editPatient=(patient1)=>{
        toggleEP()
        const pt =JSON.parse(patient1)
        setPatient(pt)
    }

    const updatePatient=()=>{
        console.log(patient)
        toggleEP()
        UpdatePatient(patient).then(data=>{
            toast.info("patient updated successfully !!!")
            getAllPatients()
        }).catch(error=>console.log(error))
    }

    const getAllPatients=()=>{
        GetAllMyPatients().then(data=>{
            setPatients(data)
        }).catch(error=>console.log(error))
    }

    const selectPatient=(patientId)=>{
        document.querySelectorAll('.patientDiv').forEach(function(pd) {
            pd.classList.remove("activeDiv")
            setAppointment({...appointment,"patient":{"id":patientId}})
        });
        //document.getElementsByClassName("patientDiv").classList.remove("activeDiv")
        document.getElementById(patientId).classList.add("activeDiv")

    }

    const selectMode=(id)=>{
        document.querySelectorAll('.modDiv').forEach(function(pd) {
            pd.classList.remove("activeDiv")
            setAppointment({...appointment,"type":id})
        });
        //document.getElementsByClassName("patientDiv").classList.remove("activeDiv")
        document.getElementById(id).classList.add("activeDiv")
    }

    const step2=()=>{
        if(appointment.patient.id==0){
            toast.info("Please Select patient first")
            return
        }
        document.querySelector("#step1").style.display="none"
        document.querySelector("#step2").style.display="block"
        console.log(appointment)
        if(appointment.id==null){
            CreateAppointment(appointment).then(data=>{
                console.log("created appointment",data)
                setAppointment(data)
                requestAppintmentPayment(data.id).then(data=>{
                    setPaymentDetail(data)
                }).catch(error=>console.log(error))
            }).catch(error=>console.log(error))
        }

    }

    const step1=()=>{
        document.querySelector("#step2").style.display="none"
        document.querySelector("#step1").style.display="block"
    }

    const updateAppointment=()=>{

        if(appointment.id != 0){
        UpdateAppointment(appointment).then(data=>{
            setAppointment(data)
        }).catch(error=>console.log(error))
        }
       console.log(appointment)
    }
    useEffect(()=>{
        if(!isLogedIn()){
            navigate("/login")
        }
        getAllPatients();
    },[])

    return (
        <Base>
            <Container>
                <div id="step1">
                <Row className="mt-5 pl-3">
                    <Col md="10" className="m-0 p-0">
                    <h4>Who are you consulting for ?</h4>
                <p>Select person you want to consult for and your preferred mode of consultation</p>
                    </Col>
                    <Col md="2" className="m-0 p-0">
                        

                    <i class="far fa-user-circle fa-3x text-danger"></i>
                    </Col>
                   

                </Row>
                <Row className="mt-4">
                    
                    {
                            patients.map(p=>(
                                <Col md="6">
                            <div style={{marginBottom:"40px"}}>
                            <Card className="patientDiv myHover" id={p.id} onClick={()=>selectPatient(p.id)} style={{background:"none",padding:"8px" ,borderRadius:"10px"}}>
                                <CardTitle className="mb-0" tag="h5">{p.name}</CardTitle>
                                <CardText>{p.age} | {p.sex}</CardText>
                            </Card>
                            <hp onClick={()=>editPatient(JSON.stringify(p))} className="text-danger float-right myHover"  ><b>Edit</b></hp>
                            </div>
                            </Col>
                            ))
                        }

                        
                </Row>

                <Row>
                    <Col md="6">
                    <br />
                    <p><i onClick={()=>toggleAP()} class="fas fa-plus text-danger myHover"> Add New Member</i></p>
                <br />
                <Form>
                    <FormGroup>
                        <Label for="mobile">Patient phone number</Label>
                        <Input onChange={(event)=>setAppointment({...appointment,"mobile":event.target.value})} value={appointment.mobile} type="number" id="mobile" />
                    </FormGroup>
                </Form>

                <p>What is your preferred mode of consultation?</p>
                <Row>
                    <Col md="3 pb-2">
                        <Card className="modDiv p-2 myHover text-center" onClick={()=>selectMode("chat")} id="chat" style={{background:"none",padding:"8px" ,borderRadius:"10px"}} >
                            <CardText>Chat</CardText>
                        </Card>
                    </Col>
                    <Col md="3 pb-2">
                        <Card className="modDiv p-2 myHover text-center" onClick={()=>selectMode("voice")} id="voice" style={{background:"none",padding:"8px" ,borderRadius:"10px"}} >
                            <CardText>Voice</CardText>
                        </Card>
                    </Col>
                    <Col md="3 pb-2">
                        <Card className="modDiv p-2 myHover text-center" id="video" onClick={()=>selectMode("video")} style={{background:"none",padding:"8px" ,borderRadius:"10px"}} >
                            <CardText>Video</CardText>
                        </Card>
                    </Col>
                </Row>


                    </Col>
                    <Col md="6">
                    
                    </Col>
                </Row>
                <Row>
                    <Col md="6">

                    </Col>
                    <Col md="5">
                    <Button onClick={()=>step2()} className="btn btn-danger mb-5 mt-4 float-right">Proceed</Button>
                    </Col>
                </Row>
            </div>
                <div id="step2" style={{display:"none"}}>
                    <Row className="mt-5">
                        <Col md="10">
                            <h4>Tell us your symptoms</h4>
                            <p>Search for the symptoms you are suffering with or select from the common symptoms from the list below</p>
                        </Col>
                        <Col md="2">
                        <i class="fas fa-lungs-virus"></i>
                        <i class="fas fa-head-side-cough"></i>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="6">
                            <Form>
                                <FormGroup>
                                    <Input value={appointment.symptoms} onBlur={()=>updateAppointment()} onChange={(event)=>setAppointment({...appointment,"symptoms":event.target.value})} id="symptoms" type="textarea"></Input>
                                </FormGroup>
                            </Form>

                        </Col>
                    </Row>
                    <Row>
                        <Col md="9">

                        </Col>
                        <Col md="3">
                            
                            {/* <Button  className="btn-warning ml-2">Make Appointment</Button> */}
                            <form action="https://secure.payu.in/_payment" name="payuform" method="POST">

                                        <Input type="text" className="form-control" value={paymentDetail.productInfo} onChange={(event)=>updatePaymentDetail(event)} id="productInfo" name="productinfo"  hidden/>
                                        <Input type="text" className="form-control" id="firstname" value={paymentDetail.firstname} onChange={(event)=>updatePaymentDetail(event)} name="firstname" hidden />
                                        <Input type="email" className="form-control" id="email" value={paymentDetail.email} onChange={(event)=>updatePaymentDetail(event)} name="email" hidden />
                                        <Input type="number" className="form-control" id="phone" value={paymentDetail.phone} onChange={(event)=>updatePaymentDetail(event)} name="phone" hidden />
                                        <Input type="number" className="form-control" id="amount" value={paymentDetail.amount} onChange={(event)=>updatePaymentDetail(event)} name="amount" hidden  />

                                    <Input type="textarea" name="surl" id="surl" ng-model="surl" value={paymentDetail.surl} rows="2" cols="2" hidden />
                                    <Input type="textarea" name="furl" id="furl"  rows="2" cols="2" value={paymentDetail.furl} hidden />
                                    <Input type="textarea" name="key" id="key"  rows="2" cols="2" value={paymentDetail.key} hidden />
                                    <Input type="textarea" name="hash" id="hash"  rows="2"  cols="2" value={paymentDetail.hash} hidden />
                                    <Input type="textarea" name="txnid" id="txnid"  rows="2" cols="2" value={paymentDetail.txnid} hidden />
                                    <Input type="textarea" name="service_provider" id="service_provider" rows="2" cols="2" hidden />
                                    {/* <button type="button" class="btn btn-primary" id="btn-confirm" onClick={()=>requestPayment()} >Confirm Payment</button> */}
                                    {/* <button type="submit" class="btn btn-warning" id="btn-submit" >Make Appointment</button> */}
                                    <Button type="button" onClick={()=>step1()} className="btn-danger">Back</Button>
                                    <Button type="submit" className="btn-warning ml-2">Make Appointment</Button>
                                </form>
                        </Col>
                    </Row>
                
                </div>

                
                
                    


                <Modal isOpen={modalAP} toggle={()=>toggleAP()} >
        <ModalHeader toggle={toggleAP}>Add Patient</ModalHeader>
        <ModalBody>
          <Form>
              <FormGroup>
                  <Label for="name">Patient's Name</Label>
                  <Input id="name" type="text" value={patient.name} onChange={(event)=>setPatient({...patient,"name":event.target.value})} placeholder="Enter Patient's Name" />
              </FormGroup>
              <FormGroup>
                  <Label for="age">Age</Label>
                  <Input type="text"id="age" value={patient.age} onChange={(event)=>setPatient({...patient,"age":event.target.value})} placeholder="Enter Patient's Age" />
              </FormGroup>
              <FormGroup>
                <Label for="sex">Gender</Label>
                <Input onSelect={(event)=>setPatient({...patient,"sex":event.target.value})} onChange={(event)=>setPatient({...patient,"sex":event.target.value})} className="form-control" id="sex" name="sex" type="select">
                <option value="MALE">---select---</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
                </Input>
            </FormGroup>
            <Button id="btnSubmit" type="button" onClick={()=>addPatient()} className="btn-block">Submit</Button>
            <Button id="btnEdit" type="button" onClick={()=>addPatient()} className="btn-block">Submit</Button>
          </Form>
          
        </ModalBody>
      </Modal>

      <Modal isOpen={modalEP} toggle={()=>toggleEP()} >
        <ModalHeader toggle={toggleEP }> Edit Patient </ModalHeader>
        <ModalBody>
          <Form>
              <FormGroup>
                  <Label for="name">Patient's Name</Label>
                  <Input id="name" type="text" value={patient.name} onChange={(event)=>setPatient({...patient,"name":event.target.value})} placeholder="Enter Patient's Name" />
              </FormGroup>
              <FormGroup>
                  <Label for="age">Age</Label>
                  <Input type="text"id="age" value={patient.age} onChange={(event)=>setPatient({...patient,"age":event.target.value})} placeholder="Enter Patient's Age" />
              </FormGroup>
              <FormGroup>
                <Label for="sex">Gender</Label>
                <Input onSelect={(event)=>setPatient({...patient,"sex":event.target.value})} onChange={(event)=>setPatient({...patient,"sex":event.target.value})} className="form-control" id="sex" name="sex" type="select">
                <option value="MALE">---select---</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
                </Input>
            </FormGroup>
            <Button id="btnEdit" type="button" onClick={()=>updatePatient()} className="btn-block">Submit</Button>
          </Form>
          
        </ModalBody>
      </Modal>
            </Container>

        </Base>
    )
}

export default Consultation