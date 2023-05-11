import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container, Table } from "reactstrap"
import Base from "../components/Base"
import { getPaymentDetail } from "../services/payment-service"

const PaymentResponse=()=>{

    let {paymentId} = useParams()
    let navigate = useNavigate()
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
        txnId:"",
        paymentStatus:'',
        paymentDate:''
    })

    const loadpayment=()=>{
        getPaymentDetail(paymentId).then(data=>{
            console.log(data)
            setPaymentDetail(data)
        }).catch(error=>console.log(error))
    }
    useEffect(()=>{
        loadpayment()
    },[])
    return (
        <Base>
            <Container style={{border:"1px solid green",marginTop:"2px",padding:"5px"}}>

                <Table responsive>
                    <tr >
                        <td colSpan={2} style={{textAlign:"center"}}>
                            {
                                (paymentDetail.paymentStatus=="Success") &&(<i class="far fa-check-circle fa-4x text-success"></i>)
                            }
                            {
                                (paymentDetail.paymentStatus=="Pending") &&(<i class="fas fa-exclamation-circle fa-4x text-warning"></i>)
                            }
                            {
                                (paymentDetail.paymentStatus=="Failed") &&(<i class="fas fa-exclamation-circle fa-4x text-danger"></i>)
                            }
                            <h1>{paymentDetail.paymentStatus}</h1>
                        </td>
                        
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{paymentDetail.name}</td>
                    </tr>
                    <tr>
                        <td>Amount</td>
                        <td>{paymentDetail.amount}</td>
                    </tr>
                    <tr>
                        <td>Transaction Id</td>
                        <td>{paymentDetail.txnId}</td>
                    </tr>
                    <tr>
                        <td>Mode</td>
                        <td>{paymentDetail.mode}</td>
                    </tr>
                    <tr>
                        <td>For</td>
                        <td>{paymentDetail.productInfo}</td>
                    </tr>
                    <tr>
                        <td>Date</td>
                        <td>{paymentDetail.paymentDate}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>{paymentDetail.phone}</td>
                    </tr>


                </Table>
                <Container className="text-center">
                   <button className="btn btn-primary" onClick={()=>navigate("/")}> Home</button>
                </Container>
            </Container>
        </Base>
    )
}

export default PaymentResponse