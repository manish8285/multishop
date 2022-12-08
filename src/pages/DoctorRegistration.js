import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, Card, Container, FormGroup, Input, Label,Form, CardBody } from "reactstrap"
import { isLogedIn } from "../auth"
import Base from "../components/Base"
import { customerToDoctor, getAllSpecializations, registerNewDoctor } from "../services/doctor-service"

const DoctorRegistration=()=>{
    let navigate = useNavigate()
    const [specializations,setSpecializations]=useState([])
    useEffect(()=>{
        if(!isLogedIn()){
            navigate("/login")
        }
        getAllSpecializations().then(data=>{
            setSpecializations(data)
        }).catch(error=>{
            console.log(error)
        })
    },[])
    
    const [errors,setErrors] = useState({
        specialization:{},
        experiance:"",
        fee:"",
        registrationNo:"",
        qualification:"",
        degree:""

    })
    const [doctor,setDoctor]=useState({
        specialization:"",
        experiance:"",
        fee:"",
        registrationNo:"",
        degree:"",


        address:{
            name:"",
            city:"",
            pincode:"",
            mobile:"",
            address:"",
            state:""

        }
    })
    const updateAddress=(event)=>{
        let id =event.target.id
        const finalId=id.substring(8)
        //console.log('doctor'+'.'+finalId)
        setDoctor({
            ...doctor,
            address:{
                ...doctor.address,
                [finalId]:event.target.value
            }
        })
    }
    const updateDoctor=(event)=>{
        setDoctor({
            ...doctor,
            [event.target.id]:event.target.value
        })
    }

    const validateDoctor=()=>{
        if(doctor.specialization.length<2){
            return false
        }else if(doctor.experiance.length<1){
            return false
        }else if(doctor.qualification.length<3){
            return false
        }else if(doctor.degree<5){
            return false
        }else if(doctor.registrationNo.length<5){
            return false
        }else if(doctor.address.name.length<3){
            return false
        }else if(doctor.address.address.length<5){
            return false
        }else if(doctor.address.city.length<3){
            return false
        }else if(doctor.address.state.length<3){
            return false
        }else if(doctor.address.mobile.length<10){
            return false
        }else if(doctor.address.pincode.length<6){
            return false
        }else if(doctor.specialization==null){
            return false
        }
        return true
    }

    const registerDoctor=()=>{
        
        if(!validateDoctor()){
            toast.error("please fill all the details")
            return
        }

        customerToDoctor().then(data=>{
            console.log("user registered successfully")
            registerNewDoctor(doctor).then(data=>{
                console.log("registered successfully")
            }).catch(error=>{
                console.log(error)
            })
        }).catch(error=>{
            console.log(error)
        })
        
    }
    return(
        <Base>
            <Container>
                    <Card className="my-3">
                        <Container className="text-center">
                            <h3 className="text-primary my-2">HOMEORX | Doctor Registration</h3>
                        </Container>

                       <CardBody>
                       <Form>
                            <FormGroup>
                            <Label for="specialization">
                            Enter your Specialization
                            </Label>
                            <Input className="form-control"  name="specialization" required type="select" id="specialization" onChange={(event)=>setDoctor({...doctor,specialization:JSON.parse(event.target.value)})} >
                                <option value={"-1"} selected disabled>---Please Select One---</option>
                                
                                {
                                    specializations.map(sp=>(
                                        <option value={JSON.stringify(sp)}>{sp.name}</option>
                                    ))
                                }
                            </Input>
                            </FormGroup>

                            <FormGroup>
                            <Label for="experiance">
                            Enter your Experiance *
                            </Label>
                            <Input className="form-control"  name="experiance" required type="text" id="experiance" value={doctor.experiance} onChange={(event)=>updateDoctor(event)} />    
                            </FormGroup>
                            <FormGroup>
                            <Label for="fee">
                            Enter your Fee (in INR) *
                            </Label>
                            <Input className="form-control"  name="fee" required type="number" id="fee" value={doctor.fee} onChange={(event)=>updateDoctor(event)} />    
                            </FormGroup>
                            <FormGroup>
                            <Label for="fee">
                            Enter your highest qualification *
                            </Label>
                            <Input className="form-control" placeholder="BAMS/BDS/BAMS/etc"  name="qalification" required type="text" id="qualification" value={doctor.qualification} onChange={(event)=>updateDoctor(event)} />    
                            </FormGroup>
                            <FormGroup >
                            <Label for="degree">
                            Drive url of Degree/Diploma *
                            </Label>
                            <Input className="form-control"  name="degree" required type="text" id="degree" value={doctor.degree} onChange={(event)=>updateDoctor(event)} />    
                            </FormGroup>
                            <FormGroup>
                            <Label for="degree">
                            Registration No
                            </Label>
                            <Input className="form-control"  name="registrationNo" required type="text" id="registrationNo" value={doctor.registrationNo} onChange={(event)=>updateDoctor(event)} />    
                            </FormGroup>
                            <FormGroup className="pl-2">
                            <Label for="Address">
                            Enter your Address
                            </Label>
                            <Input className="form-control" placeholder="Name or Clinic Name"  name="address_name" required type="text" id="address_name" value={doctor.address.name} onChange={(event)=>updateAddress(event)} />
                            <Input className="form-control mt-1" placeholder="address line 1"  name="address_address" required type="text" id="address_address" value={doctor.address.address} onChange={(event)=>updateAddress(event)} />
                            <Input className="form-control mt-1" placeholder="City of your practice"  name="address_city" required type="text" id="address_city" value={doctor.address.city} onChange={(event)=>updateAddress(event)} />
                            <Input className="form-control mt-1" placeholder="Phone number"  name="address_mobile" required type="number" id="address_mobile" value={doctor.address.mobile} onChange={(event)=>updateAddress(event)} />
                            <Input className="form-control mt-1" placeholder="State"  name="address_state" required type="text" id="address_state" value={doctor.address.state} onChange={(event)=>updateAddress(event)} /> 
                            <Input className="form-control mt-1" placeholder="Pin code"  name="address_pincode" required type="text" id="address_pincode" value={doctor.address.pincode} onChange={(event)=>updateAddress(event)} />   
                            </FormGroup>
                            <Button onClick={()=>registerDoctor()} type="button">Register</Button>
                        </Form>
                       </CardBody>

                    </Card>
            </Container>
        </Base>
    )
}

export default DoctorRegistration