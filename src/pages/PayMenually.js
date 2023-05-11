import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, Card, CardBody, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { getToken } from "../auth"
import Base from "../components/Base"
import { BASE_URL, privateAxios } from "../services/helper"
import { getSelfPayment, makeSelfPayment, requestSelfPayment } from "../services/payment-service"
import SweetAlert from 'react-bootstrap-sweetalert';

const PayMenually=()=>{
    let navigate =useNavigate()
    const {paymentID} = useParams()
    const [selfPayment,setSelfPayment]=useState({
        amount:''
    })

    const [recipt,setRecipt]=useState()

    

    useEffect(()=>{
        console.log("payment id ="+paymentID)
        getSelfPayment(paymentID).then(data=>{
            setSelfPayment(data)
        }).catch(error=>console.log(error))
    },[])

    const makePayment=()=>{
        const form = document.forms.namedItem("form11");
        const formData = new FormData(form)
        formData.append("paymentId",paymentID)
      

        
         privateAxios.post("payments/self_order_payment",formData,{headers:{
            "Content-Type": "multipart/form-data",
        
        }}).then(data=>{
            console.log(data)
            toast.success("Placed Successfully !!!")
            
            navigate("/")
        }).catch(error=>console.log(error))
        

        
    }

    return (
        <Base>
            <Container>
                <Card className="my-1 p-1 text-primary">HomeoRx Payments | Self Payment</Card>
                <Card>
                    <CardBody>
                        <Container className="text-center">
                            <h3 className="text-danger">Rs {selfPayment?.amount}</h3>
                            <img className="w-100" style={{maxWidth:"250px"}} src="img/clinicqrcode.png" alt="qr code" />
                            <p className="my-2"> ---OR---</p>
                            <h3 className="mt-0" style={{color:"#1867d2"}}>GPay 8285482825</h3>
                            
                            {(selfPayment.recipt) &&(
                            <div>
                                <hr />
                                <h4 className="text-danger">Your Recipt</h4>
                                <br />
                                <img className="w-100" style={{maxWidth:"250px"}} src={BASE_URL+"images/recipts/"+selfPayment.recipt} alt="qr code" />
                            </div>
                            )}
                        </Container>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <Form name="form11" id="form11"  method="post" enctype="multipart/form-data">
                            <FormGroup className="pb-1">
                            <Input hidden disabled value={selfPayment.id} type="number" name="paymentId" id="paymentId" />
                                <Label for='recipt'>Upload Screen Shot of Payment</Label>
                                <Input type="file" name="recipt" id="recipt" />
                            </FormGroup>
                            <Container className="text-center">
                            <Button type="button" onClick={()=>makePayment()}>Submit</Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>
            </Container>
        </Base>
    )
}
export default PayMenually