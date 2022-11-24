import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Container, Form, FormFeedback, FormGroup, FormText, Input, Label } from "reactstrap";
import { doLogin, isLogedIn } from "../auth";
import { login } from "../services/user_service";

const Login=()=>{

    let navigate = useNavigate()

    const [logindata,setlogindata] =useState({
        "email":"",
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

    const attemptLogin=()=>{
        const authRequest= {
            "username":logindata.email,
            "password":logindata.password
        }
        login(authRequest).then((data)=>{
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
                            <h4 className="text-primary">MULTISHOP | LOGIN</h4>
                            </Container>
                        <Form className="">
                        <FormFeedback invalid>
                                {JSON.stringify(logindata.error)}
                            </FormFeedback>
                            <FormGroup>
                            <Label>Enter you username</Label>
                            <Input invalid={errors?.username} type="email" name="email" required id="email" placeholder="Enter your email" value={logindata.email} onChange={(event)=>updateLoginData(event)} />
                            
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
                            <Button onClick={()=>attemptLogin()} >Login</Button>
                            </Container>
                            <a className="text-dark" onClick={()=>{navigate("/signup")}} >New member? Signup</a>
                            </Form>

                        
                        </div>

                    </div>

    );
}

export default Login