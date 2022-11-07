import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, Card, CardBody, Container, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap"
import { resetPassword, sendOTP, verifyOTP } from "../services/user_service"

const ForgetPassword=()=>{
    let navigate = useNavigate()
    const [emailFeedback,setEmailFeedback]=useState("")
    var emailId, password, otp
    const sendMyOTP=()=>{
        toast.info("Please wait while sending an OTP ...")
        emailId=document.getElementById("email").value
        console.log(emailId);
        sendOTP(emailId).then(data=>{
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
    }
    const verifyMyOTP=()=>{
        otp=document.getElementById("otp").value
        verifyOTP(otp).then(data=>{
            console.log(data)
            if(data){
                document.getElementById("form2").style.display="none"
                document.getElementById("form3").style.display="block"
            }else{
                toast.error("Please enter a valid OTP")
            }
        }
        )
    }
    const resetMyPassword=()=>{
        password = document.getElementById("password").value
       let password2 = document.getElementById("password2").value
        if(password != password2){
            toast.error("password does not match")
            return
        }
        document.getElementById("form3").style.display="none"
        resetPassword(emailId,password,otp).then(data=>{
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
                            <h4 className="text-primary">MULTISHOP | FORGET PASSWORD</h4>
                            </Container>
                        <Form className="" id="form1">
                            <FormGroup>
                            <Label>Enter your username</Label>
                            <Input type="email" name="email" required id="email" placeholder="Enter your email"  />
                            
                            </FormGroup>
                            <Container className="text-right">
                            <Button onClick={()=>sendMyOTP()} >SEND OTP</Button>
                            </Container>
                        </Form>
                        <br />
                        <Form id="form2" style={{display:"none"}}>
                            <FormGroup>
                            <Label>Enter OTP</Label>
                            <Input  type="text" placeholder="Enter OTP sent on email" id="otp" name="otp"   />
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
                            <Input  type="password" placeholder="Enter new Password" id="password" name="password"   />
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