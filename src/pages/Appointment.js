import { useEffect, useState } from "react"
import {useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Form,Card, CardBody, Col, Container, FormGroup, Input, Label, Button } from "reactstrap"
import { getCurrentUserDetail } from "../auth"
import Base from "../components/Base"
import { createAppointment, getDoctor } from "../services/doctor-service"

const Appointment=()=>{
    let navigate=useNavigate()
    const {drId} = useParams()

    const [doctor,setDoctor] = useState({})
    const [appointment,setAppointment]=useState({
        name:"",
        email:"",
        mobile:"",
        age:"",
        symptoms:""
    })

    const validateAppointment=()=>{
        if(appointment?.name?.length<3){
            return false
        }else if(appointment?.email?.length<3){
            return false
        }else if(appointment?.mobile?.length<10){
            return false
        }else if(appointment?.symptoms?.length<3){
            return false
        }
        return true
    }

    const bookAppointment=()=>{
        if(!validateAppointment()){
            toast.error("please fill all the details first")
           // return
        }else{
           
            createAppointment(appointment).then(data=>{
                if(data.fee==0){
                    toast.success("appointment has been booked successfully")
                }
                navigate("/self_payment/"+data.selfPayment.id)
            }).catch(error=>{
                console.log(error)
            })
            
        }

        
        

        
        
        

    }

    useEffect(()=>{
        
        getDoctor(drId).then(data=>{
            //console.log("doctor = ")
           // console.log(data)
            setDoctor(data)
        }).catch(error=>console.log(error))

        const user =getCurrentUserDetail()
        console.log(user)
        setAppointment({
            ...Appointment,
            name:user.name,
            doctor:doctor,
            email:user.email,
            mobile:user.mobile

        })
    },[])
    useEffect(()=>{
        setAppointment({
            ...Appointment,
            doctor:doctor

        })
    },[doctor])

    const updateAppointment=(event)=>{
        setAppointment({
            ...appointment,
            [event.target.id]:event.target.value
        })
    }

    return (
        <Base>
            <Container>
                <Container className="text-center mt-2 bg-white">
                    <h1 className="text-primary">Book Appointment with Dr. {doctor?.user?.name} {!(doctor.verified)&&(<i class='fas fa-check-circle' style={{color:"blue",fontSize:"20px"}}></i>)} </h1>
                    <p>{doctor.specialization?.name} , {doctor.address?.city?.toUpperCase()}</p>
                </Container>
                <Card>
                    <CardBody>
                       <Form>
                       <FormGroup row>
                            <Label for="exampleEmail" sm={2}> Name</Label>
                            <Col sm={3}>
                            <Input onChange={(event)=>updateAppointment(event)} id="name" value={appointment.name} name="email" placeholder="Your Full Name" type="text"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="age" sm={2}> Age</Label>
                            <Col sm={3}>
                            <Input onChange={(event)=>updateAppointment(event)} id="age" value={appointment.age} name="age" placeholder="Your age" type="number"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="symptoms" sm={2}> Symptoms</Label>
                            <Col sm={3}>
                            <Input onChange={(event)=>updateAppointment(event)} id="symptoms" value={appointment.symptoms} name="symptoms" placeholder="Describe your problem" type="textarea"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="email" sm={2}> Email</Label>
                            <Col sm={3}>
                            <Input onChange={(event)=>updateAppointment(event)} id="email" value={appointment.email} name="email" placeholder="Your Email" type="email"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="mobile" sm={2}> Mobile</Label>
                            <Col sm={3}>
                            <Input onChange={(event)=>updateAppointment(event)} id="mobile" value={appointment.mobile} name="mobile" placeholder="Mobile No" type="text"/>
                            </Col>
                        </FormGroup>
                        <Container className="text-center">
                            <Button onClick={()=>bookAppointment()} type="button" className="btn-success">Pay ₹{doctor.fee}</Button>
                        </Container>
                       </Form>
                       <small className="text-danger">please provide correct details so that doctor can contact you *</small>
                    </CardBody>
                </Card>
            </Container>
        </Base>
    )
}
export default Appointment