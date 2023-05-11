import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Container, Form, FormFeedback, FormGroup, FormText, Input, Label } from "reactstrap";
import { doLogin, isLogedIn } from "../auth";
import { login } from "../services/user_service";

const Login=()=>{

    let navigate = useNavigate()

    const [logindata,setlogindata] =useState({
        "username":"",
        "password":""
    })
    const [errors,setErrors]=useState({})

    //console.log(isLogedIn())
   // console.log(localStorage.getItem("data"))

    const updateLoginData=(event)=>{
        
        setlogindata({
            ...logindata,
            [event.target.id]:event.target.value
        })
    }

    const checkMobile=()=>{
        if(logindata.username.length==10){
            setErrors({...errors,username:null})
        }else{
            setErrors({...errors,username:"Invalid Mobile Number"})
        }
    }
    const attemptLogin=()=>{
        // const authRequest= {
        //     "username":logindata.email,
        //     "password":logindata.password
        // }
        login(logindata).then((data)=>{
            doLogin(data,()=>{
                toast.success("You have logged in successfully !!!")
                navigate("/")
            })
            
           //console.log(data)
        }).catch((error)=>{
            setErrors(error.response.data)
            console.log(error)
           // console.log(errors)
            if(error.response.status===401 || error.response.status==400){
                toast.error("Credentials do not match")
            }
        })
    }


    return (
                    <div className="card mt-2">
                        <div className="card-body">
                            <Container className="text-center">
                            <h4 className="text-primary myHover" onClick={()=>navigate("/")}>HomeoRx | LOGIN</h4>
                            </Container>
                        <Form className="">
                        <FormFeedback invalid>
                                {JSON.stringify(logindata.error)}
                            </FormFeedback>
                            <FormGroup>
                            <Label>Enter your mobile number</Label>
                            <Input invalid={errors?.username} type="number" name="username" required id="username" placeholder="Registered mobile number" onBlur={()=>checkMobile()} value={logindata.username} onChange={(event)=>updateLoginData(event)} />
                            
                            <FormFeedback>
                                {errors?.username}
                            </FormFeedback>
                            </FormGroup>

                            <FormGroup>
                            <Label>Enter your password</Label>
                            <Input invalid={errors?.password} type="password" placeholder="Enter your password" id="password" name="password" value={logindata.password}  onChange={(event)=>updateLoginData(event)} />
                            <FormFeedback>
                                {errors?.password}
                            </FormFeedback>
                            <a onClick={()=>{navigate("/forget-password")}} >Forget Password ?</a>
                            </FormGroup>
                            <Container className="text-center">
                            <button className="btn btn-primary" type="button" onClick={()=>attemptLogin()} >Login</button>
                            </Container>
                            <a className="text-dark" onClick={()=>{navigate("/signup")}} >New member? Signup</a>
                            </Form>

                        
                        </div>

                    </div>

    );
}

export default Login