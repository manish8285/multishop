import { useEffect, useState } from "react"
import { GetMyDeliveryCharge } from "../services/order-service"
import Base from "../components/Base"
import { Button, Container, Input, Label } from "reactstrap"
import { proceedPayment } from "../services/payment-service"
import PrescriptionOrder from "../components/PrescriptionOrder"

const Testpage=()=>{
    

    const [paymentDetail,setPaymentDetail]=useState({
        productInfo:"",
        firstname:"",
        email:'',
        phone:'',
        amount:'',
        surl:'',
        furl:'',
        key:'',
        hash:'',
        txnid:"",
    })


    const updatePaymentDetail=(event)=>{
        setPaymentDetail({
            ...paymentDetail,
            [event.target.id]:event.target.value
        })
    }

    const requestPayment=()=>{
        proceedPayment(paymentDetail).then(data=>{
            console.log(data)
            setPaymentDetail(data)
            document.querySelector("#btn-confirm").style.display="none"
            document.querySelector("#btn-submit").style.display="block"

            psumbit()
        }).catch(error=>{
            console.log(error)
        })
    }

    const psumbit=()=>{
        let txnid = document.querySelector("#txnid").value
        console.log(txnid)
        let furl = document.querySelector("#furl").value
        console.log(furl)
    }

    useEffect(()=>{
        
    },[])

    return(
        <Base>
            <Container>
            <form action="https://secure.payu.in/_payment" name="payuform" method="POST">
    <div className="form-group">
        <Label for="productInfo">Product Name:</Label>
        <Input type="text" className="form-control" value={paymentDetail.productInfo} onChange={(event)=>updatePaymentDetail(event)} id="productInfo" name="productinfo"  />
    </div>
    <div class="form-group">
        <Label for="firstname">Name:</Label>
        <Input type="text" className="form-control" id="firstname" value={paymentDetail.firstname} onChange={(event)=>updatePaymentDetail(event)} name="firstname"  />
    </div>
    <div className="form-group">
        <Label for="email">Email:</Label>
        <Input type="email" className="form-control" id="email" value={paymentDetail.email} onChange={(event)=>updatePaymentDetail(event)} name="email"  />
    </div>
    <div class="form-group">
        <Label for="email">Phone:</Label>
        <Input type="number" className="form-control" id="phone" value={paymentDetail.phone} onChange={(event)=>updatePaymentDetail(event)} name="phone" />
    </div>
    <div className="form-group">
        <Label for="amount">Amount:</Label>
        <Input type="number" className="form-control" id="amount" value={paymentDetail.amount} onChange={(event)=>updatePaymentDetail(event)} name="amount"  />
    </div>
    <Input type="textarea" name="surl" id="surl" ng-model="surl" value={paymentDetail.surl} rows="2" cols="2" hidden />
    <Input type="textarea" name="furl" id="furl"  rows="2" cols="2" value={paymentDetail.furl} hidden />
    <Input type="textarea" name="key" id="key"  rows="2" cols="2" value={paymentDetail.key} hidden />
    <Input type="textarea" name="hash" id="hash"  rows="2"  cols="2" value={paymentDetail.hash} hidden />
    <Input type="textarea" name="txnid" id="txnid"  rows="2" cols="2" value={paymentDetail.txnid} hidden />
    <Input type="textarea" name="service_provider" id="service_provider" rows="2" cols="2" hidden />
    <button type="button" class="btn btn-primary" id="btn-confirm" onClick={()=>requestPayment()} >Confirm</button>
    <button type="submit" class="btn btn-danger" style={{display:"none"}} id="btn-submit" >Submit</button>
</form>


            {/* <Button color="danger" onClick={()=>toggle()}>
        Click Me
      </Button> */}


</Container>
        </Base>
    )
}
export default Testpage