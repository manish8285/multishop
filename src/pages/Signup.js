import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, Container, Form, FormFeedback, FormGroup, FormText, Input, Label } from "reactstrap"
import { doLogin } from "../auth"
import Base from "../components/Base"
import { sendMobileOTP, signUp, verifyEmailUnique, verifyOTP } from "../services/user_service"

const Signup=()=>{

    let navigate=useNavigate()

    const [userdata,setUserdata]=useState({
        "name":"",
        "mobile":"",
        "password":"",
        "otp":"",
    })

    const [valid,setValid]=useState({
        "name":false,
        "email":false,
        "password":false,
        "otp":false,
        "mobile":false,
    })

    const [errors,setErrors] = useState({})

    const updateUserData=(event)=>{
        setUserdata({
            ...userdata,
            [event.target.id]:event.target.value
        })
    }

    const nameNext=()=>{
        if(valid.name){
            document.querySelector("#namebox").style.display="none"
            document.querySelector("#mobilebox").style.display="block"
        }
        
    }
    const mobileNext=()=>{
        checkMobile()
        if(valid.mobile){
            sendMobileOTP(userdata.mobile).then(data=>{
                document.querySelector("#mobilebox").style.display="none"
                document.querySelector("#otpbox").style.display="block"
                toast.info(data)
            }).catch(error=>{
                toast.error(error)
            })
        }
        
    }
    const otpNext=()=>{
        if(valid.otp){
            document.querySelector("#otpbox").style.display="none"
            document.querySelector("#passwordbox").style.display="block"
            document.querySelector("#submitbox").style.display="block"
        }
        
    }


    const checkName=()=>{
        if(userdata.name?.length>=3){
            setValid({...valid,"name":true})
            setErrors({...errors,"name":""})
        }else{
            setValid({...valid,"name":false})
            setErrors({...errors,"name":"Not a valid name"})
        } 
    }
    const checkPassword=()=>{
        if(userdata.password?.length>=3){
            setValid({...valid,"password":true})
            setErrors({...errors,"password":""})
        }else{
            setValid({...valid,"password":false})
            setErrors({...errors,"password":"Password must be at least 3 letter long"})
        }  
    }

    const checkEmail=()=>{
        
        //console.log("email ="+userdata.email)
        if(userdata.email.length==10){
            setValid({...valid,"email":false})
            setErrors({...errors,"email":""})

        }else{
            setErrors({...errors,"email":"Please Enter a valid Mobile No"})
        }
    }

    const checkOTP=()=>{

        verifyOTP(userdata.otp).then(data=>{
            setValid({...valid,"otp":true})
            setErrors({...errors,"otp":""})
        }).catch(error=>{
            setValid({...valid,"otp":false})
            setErrors({...errors,"otp":"Please Enter a valid OTP"})
        })
    }


    const checkMobile=()=>{
        
        //console.log("email ="+userdata.email)
        if(userdata.mobile.length==10){
            verifyEmailUnique(userdata.mobile).then(data=>{
                console.log(data)
                setValid({...valid,"mobile":true})
                setErrors({...errors,"mobile":""})
            }).catch(error=>{
               console.log(error)
                toast.error(error.response.data)
                setErrors({...errors,"email":error})
                setValid({...valid,"mobile":false})
            })
            
        }else{
            setErrors({...errors,"email":"Please Enter a valid Mobile No"})
            setValid({...valid,"mobile":false})
        }
    }

    const attemptSignup=()=>{
        
        if(valid.name==true && valid.password==true && valid.otp==true){
        signUp(userdata,userdata.otp).then((data)=>{
            toast.success("You have registered successfully !!!")
           // window.URL="/login"
           //window.location.href="/#/login"
            navigate("/login")
            console.log(data)
            // doLogin(data,()=>{
                
            // })
            
        }).catch((error)=>{
            console.log(error)
            setErrors(error.response.data)
        })
    }else{
        checkMobile()
        checkName()
        checkPassword()
        toast.error("Please correct all the information first")
        return
    }

    }


    return (

        <Base>
            <Container className="mt-2">
            <div className="row offset-md-2">
                <div className="col-md-8">
                <div className="card">
            <div className="card-body">
                <Container className="text-center">
                    <h4 className="text-primary myHover" onClick={()=>navigate("/")}>HomeoRx | SIGNUP</h4>
                </Container>
                <Form >
  
                <FormGroup id="namebox">
                    <Label for="name">
                    Enter your Name
                    </Label>
                    <Input invalid={errors?.name?true:false} onBlur={()=>checkName()} valid={valid.name} name="name" required type="text" id="name" value={userdata.name} onChange={(event)=>updateUserData(event)} />
                    <FormFeedback>
                            {errors?.name}
                    </FormFeedback>
                    <button type="button" className="btn btn-primary float-right mt-1" onClick={()=>nameNext()} >Next</button>
                </FormGroup>

                <FormGroup id="mobilebox" style={{display:"none"}}>
                    <Label for="mobile">
                    Enter your Mobile
                    </Label>
                    <Input invalid={errors?.mobile?true:false} valid={valid.mobile} onBlur={()=>checkMobile()} required  name="mobile" type="text" id="mobile" value={userdata.mobile} onChange={(event)=>{updateUserData(event)}} />
                    <FormFeedback>
                            {errors?.mobile}
                    </FormFeedback>
                    <button type="button" className="btn btn-primary float-right mt-1" onClick={()=>mobileNext()} >Next</button>
                </FormGroup>

                <FormGroup id="otpbox" style={{display:"none"}}>
                            <Label>Enter OTP</Label>
                            <Input invalid={errors?.otp?true:false} valid={valid.otp} onBlur={()=>checkOTP()} type="text" placeholder={`Enter OTP sent on Mobile ${userdata.mobile}`} id="otp" name="otp"  value={userdata.otp} onChange={(event)=>updateUserData(event)}  />
                            <FormFeedback>
                                
                            </FormFeedback>
                            <button type="button" className="btn btn-primary float-right mt-1" onClick={()=>otpNext()} >Next</button>
                </FormGroup>

                <FormGroup id="passwordbox" style={{display:"none"}}>
                    <Label for="password">
                    Create New Password
                    </Label>
                    <Input invalid={errors?.password?true:false} onBlur={()=>checkPassword()} valid={valid.password} required name="password" type="password" id="password" value={userdata.password} onChange={(event)=>updateUserData(event)} />
                    <FormFeedback>
                            {errors?.password}
                    </FormFeedback>
                </FormGroup>

                <Container style={{display:"none"}} id="submitbox" className="text-center">
                <button type="button" className="btn btn-primary" onClick={()=>attemptSignup()}>Signup</button>
                </Container>
 
            </Form>
                 <a className="text-dark" onClick={()=>{navigate("/login")}} >Already member? Login</a> 
                {/* <Navigate to="/login">Already member? Login</Navigate> */}
            </div>
        </div>
                </div>
            </div>
            </Container>
        </Base>
    )


}

export default Signup