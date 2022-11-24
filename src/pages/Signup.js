import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Container, Form, FormFeedback, FormGroup, FormText, Input, Label } from "reactstrap"
import { doLogin } from "../auth"
import Base from "../components/Base"
import { signUp, verifyEmailUnique } from "../services/user_service"

const Signup=()=>{

    let navigate=useNavigate()

    const [userdata,setUserdata]=useState({
        "name":"",
        "email":"",
        "password":"",
        "about":"",
    })

    const [valid,setValid]=useState({
        "name":false,
        "email":false,
        "password":false,
        "about":false,
    })

    const [errors,setErrors] = useState({})

    const updateUserData=(event)=>{
        setUserdata({
            ...userdata,
            [event.target.id]:event.target.value
        })
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
        setValid({...valid,"email":false})
        setErrors({...errors,"email":""})
        //console.log("email ="+userdata.email)
        if(userdata.email.includes("@") && userdata.email.includes(".com")){
        verifyEmailUnique(userdata.email).then(data=>{
            setValid({...valid,"email":true})
            //setErrors({...errors,"email":data})
            console.log(data)
        }).catch(error=>{
           console.log(error)
            setValid({...valid,"email":false})
            setErrors({...errors,"email":error.response.data})
        })
    }else{
        setErrors({...errors,"email":"Please Enter a valid email"})
    }
    }

    const attemptSignup=()=>{
        
        if(valid.name==true && valid.password==true && valid.email==true){
        signUp(userdata).then((data)=>{
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
        checkEmail()
        checkName()
        checkPassword()
        toast.error("Please correct all the information first")
        return
    }
    
   //navigate("/login")
    }
    useEffect(()=>{
        
    },[])
    return (

        <Base>
            <Container className="mt-2">
            <div className="row offset-md-2">
                <div className="col-md-8">
                <div className="card">
            <div className="card-body">
                <Container className="text-center">
                    <h4 className="text-primary">MULTISHOP | SIGNUP</h4>
                </Container>
                <Form >
  
                <FormGroup>
                    <Label for="name">
                    Enter your Full Name
                    </Label>
                    <Input invalid={errors?.name?true:false} onBlur={()=>checkName()} valid={valid.name} name="name" required type="text" id="name" value={userdata.name} onChange={(event)=>updateUserData(event)} />
                    <FormFeedback>
                            {errors?.name}
                    </FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="email">
                    Enter your Email
                    </Label>
                    <Input invalid={errors?.email?true:false} valid={valid.email} onBlur={()=>checkEmail()} required  name="email" type="email" id="email" value={userdata.email} onChange={(event)=>updateUserData(event)} />
                    <FormFeedback>
                            {errors?.email}
                    </FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="password">
                    Create New Password
                    </Label>
                    <Input invalid={errors?.password?true:false} onBlur={()=>checkPassword()} valid={valid.password} required name="password" type="password" id="password" value={userdata.password} onChange={(event)=>updateUserData(event)} />
                    <FormFeedback>
                            {errors?.password}
                    </FormFeedback>
                </FormGroup>

                <Container className="text-center">
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