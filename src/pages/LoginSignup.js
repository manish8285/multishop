import Login from "../components/Login";
import Base from "../components/Base";
import { Container } from "reactstrap";
import { isLogedIn } from "../auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage=()=>{
    let navigate =useNavigate()
    // if(isLogedIn){
    //          navigate("/")
    //  }

    

    return (
        <Base>
            <Container>
                <div className="row mr-0">
                    <div className="col-md-8 offset-md-2">
                    <Login></Login>
                    </div>
                </div>
            </Container>
        </Base>
    );

}
export default LoginPage