import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, Card, CardBody, Container, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap"
import { resetPassword, sendMobileOTP, sendOTP, verifyEmailUnique, verifyOTP } from "../services/user_service"

const ForgetPassword=()=>{
    let navigate = useNavigate()
    const [emailFeedback,setEmailFeedback]=useState("")
    const [errors,setErrors] = useState({
        mobile:""
    })
    const [userData,setUserData]=useState({mobileNo:"",password:"",otp:""})
    //var mobileNo, password, otp
    const sendMyOTP=()=>{
        
        console.log(userData.mobileNo);
        if(errors.mobile==null){
            toast.info("Please wait while sending an OTP ...")
            sendMobileOTP(userData.mobileNo).then(data=>{
                document.getElementById("form1").style.display="none"
                document.getElementById("form2").style.display="block"
                //console.log(data)
                //setEmailFeedback(data)
                toast.success(data)
            }).catch(error=>{
                //console.log(error)
    
                toast.error(error.response.data)
            }
            )
        }else{
            toast.error("Please enter a valid mobile no")
        }
    }
    const verifyMyOTP=()=>{
       // otp=document.getElementById("otp").value
        verifyOTP(userData.otp).then(data=>{
            console.log(data)
            if(data){
                document.getElementById("form2").style.display="none"
                document.getElementById("form3").style.display="block"
            }else{
                toast.error("Please enter a valid OTP")
                setErrors({...errors,otp:"Invalid OTP"})
            }
        }
        )
    }

    const updateUserData=(event)=>{
        setUserData({...userData,
        [event.target.id]:event.target.value})

        checkMobile()
    }
    const checkMobile=()=>{
        
        //console.log("email ="+userdata.email)
        //mobileNo=document.getElementById("mobile").value
        //console.log(userData.mobileNo)
        if(userData.mobileNo.length>=9){
            verifyEmailUnique(userData.mobileNo).then(data=>{
                setErrors({...errors,"mobile":"This mobile no is not registered"})
            }).catch(error=>{
                //setValid({...valid,"mobile":true})
                setErrors({...errors,"mobile":null})
                
               // setValid({...valid,"mobile":false})
            })
            
        }else{
            setErrors({...errors,"mobile":"Please Enter a valid Mobile No"})
            //setValid({...valid,"mobile":false})
        }
    }
    const resetMyPassword=()=>{
        let password = document.getElementById("password").value
       let password2 = document.getElementById("password2").value
        if(password != password2){
            setErrors({...errors,password:"Password Does Not Match"})
            toast.error("password does not match")
            return
        }
        document.getElementById("form3").style.display="none"
        resetPassword(userData.mobileNo,userData.password,userData.otp).then(data=>{
            console.log(data)
            toast.success(data);
            navigate("/login")
        }).catch(error=>{
            console.log(error)
            toast.error(error.response.data)
        })
        
       // document.getElementById("form2.").style.display="block"
    }
    return (
        <Container>
                <div className="row mr-0">
                    <div className="col-md-8 offset-md-2">
                    <Card className="mt-2">
                        <CardBody>
                            <Container className="text-center mb-3">
                            <h4 className="text-primary myHover" onClick={()=>navigate("/")}> HomeoRx | FORGET PASSWORD</h4>
                            </Container>
                        <Form className="" id="form1">
                            <FormGroup>
                            <Label>Enter Your Mobile No</Label>
                            <Input invalid={errors?.mobile?true:false} type="number" onChange={(event)=>updateUserData(event)} name="mobileNo" required id="mobileNo" placeholder="Registered Mobile Number"  />
                            <FormFeedback>
                            {errors?.mobile}
                            </FormFeedback>
                            </FormGroup>
                            <Container className="text-right">
                            <Button onClick={()=>sendMyOTP()} >SEND OTP</Button>
                            </Container>
                        </Form>
                        <br />
                        <Form id="form2" style={{display:"none"}}>
                            <FormGroup>
                            <Label>Enter OTP</Label>
                            <Input value={userData.otp} onChange={(event)=>updateUserData(event)} type="text" placeholder="Enter OTP sent on email" id="otp" name="otp"   />
                            <FormFeedback>
                                
                            </FormFeedback>
                            </FormGroup>
                            <Container className="text-center">
                            <Button onClick={()=>verifyMyOTP()}>Next</Button>
                            </Container>
                            <a className="text-dark" onClick={()=>{navigate("/signup")}} >New member? Signup</a>
                            </Form>
                        <br />

                        <Form id="form3" style={{display:"none"}}>
                            <FormGroup>
                            <Label>New Password</Label>
                            <Input onChange={(event)=>updateUserData(event)} type="password" placeholder="Enter new Password" id="password" name="password"   />
                            <FormFeedback>
                                
                            </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                            <Label>Re Enter Password</Label>
                            <Input  type="password" placeholder="Re Enter new Password" id="password2" name="password2"   />
                            <FormFeedback>
                                
                            </FormFeedback>
                            </FormGroup>
                            <Container className="text-center">
                            <Button onClick={()=>resetMyPassword()}>Submit</Button>
                            </Container>
                            <a className="text-dark" onClick={()=>{navigate("/signup")}} >New member? Signup</a>
                            </Form>


                        </CardBody>

                    </Card>
                    </div>
                </div>
            </Container>
    )
}
export default ForgetPassword