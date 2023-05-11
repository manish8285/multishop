import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardBody, CardText, CardTitle, Col, Container, Input, Row, Table } from "reactstrap"
import Base from "../components/Base"
import OrderStatus from "../components/OrderStatus"
import Status from "../components/Status"
import { BASE_URL, DRIVE_IMAGE_URL } from "../services/helper"
import { GetMyOrderById, GetMyOrderStatus } from "../services/order-service"
import { requestOrderPayment } from "../services/payment-service"

const OrderDetail=()=>{
    const {orderId} = useParams()
    const [order,setOrder]=useState({
        "items":[],
        "status":[]
    })
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
        txnid:"",
    })


    const updatePaymentDetail=(event)=>{
        setPaymentDetail({
            ...paymentDetail,
            [event.target.id]:event.target.value
        })
    }

    const requestPayment=()=>{
        requestOrderPayment(order.orderId).then(data=>{
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
        GetMyOrderById(orderId).then((data)=>{
            setOrder(data)
            console.log(data)
            /*
            //if(data.trackingId != null){
                //window.open(`https://pickrr.com/track/${data.trackingId}`, '_blank');
                let a= document.createElement('a');
                a.target= '_blank';
                a.href= `https://pickrr.com/track/${data.trackingId}`;
                a.click();
                 console.log(data)
                 
            //}
            */
        }).catch((error)=>{
            console.log(error)
        })
    },[])



    return(
        <Base>
            <>
            <Container>
           
                <nav class="breadcrumb bg-dark my-2">
                    <a onClick={()=>{navigate("/myorders")}} class="breadcrumb-item text-primary" ><i class="fas fa-arrow-left"></i></a>
                    <span class="breadcrumb-item active text-primary">Order Detail</span>
                </nav>
               
                <Card>
                    <CardBody>

                        


                        <Table responsive borderless style={{borderCollapse:"unset"}} >
                            <tbody>
                                <tr>
                                    <th>Order Id</th>
                                    <td>{order.orderId}</td>
                                </tr>
                                <tr>
                                    <th>Order Date</th>
                                    <td>{order.date}</td>
                                </tr>
                                <tr>
                                    <th>Order Type</th>
                                    <td>{order.ordertype}</td>
                                </tr>


                                <tr><th colSpan={"2"}>Items</th></tr>
                                {
                                    order.items.map((item)=>(
                                        <tr >
                                            <td>
                                            <Row style={{flexWrap:"unset"}}>
                                            <Col md="2" sm="2" style={{width:"auto",whiteSpace:"nowrap"}}>
                                            <img width={"90px"} src={DRIVE_IMAGE_URL+item?.product.images[0].name} alt="product image" />
                                            </Col>
                                            <Col md="2" sm="2" style={{width:"auto",marginLeft:"25px",whiteSpace:"nowrap"}}>
                                            <i class="fas fa-rupee-sign"> {item.price}</i> 
                                            </Col>
                                            <Col md="2" sm="2" style={{width:"auto",whiteSpace:"nowrap"}}>
                                                {'X '+item.quantity}
                                            </Col>
                                            </Row>
                                            </td>
                                            <td>
                                            
                                                {item.product.name}
                                         
                                            </td>

                                            
                                        </tr>
                                    ))
                                }

                                
                                
                            </tbody>
                        </Table>

                        {/* payment details */}
                        <Row className="mt-3">
                            <Col md="4">
                            <Card body>
                            <CardTitle tag="h5">Payment</CardTitle>
                            <CardText>
                                        <b>MODE : </b>{order?.paymentType}
                                        <br />
                                        <b>Status : </b>{ order.paymentVerified?"Verified":"Pending" }
                                    </CardText>
                        </Card>
                            </Col>
                            <Col md="8">

                                {
                                    (!order.paymentVerified && order.amount !=0) &&(
                                        <form action="https://secure.payu.in/_payment" name="payuform" method="POST">

                                        <Input type="text" className="form-control" value={paymentDetail.productInfo} onChange={(event)=>updatePaymentDetail(event)} id="productInfo" name="productinfo"  hidden/>
                                        <Input type="text" className="form-control" id="firstname" value={paymentDetail.firstname} onChange={(event)=>updatePaymentDetail(event)} name="firstname" hidden />
                                        <Input type="email" className="form-control" id="email" value={paymentDetail.email} onChange={(event)=>updatePaymentDetail(event)} name="email" hidden />
                                        <Input type="number" className="form-control" id="phone" value={paymentDetail.phone} onChange={(event)=>updatePaymentDetail(event)} name="phone" hidden />
                                        <Input type="number" className="form-control" id="amount" value={paymentDetail.amount} onChange={(event)=>updatePaymentDetail(event)} name="amount" hidden  />

                                    <Input type="textarea" name="surl" id="surl" ng-model="surl" value={paymentDetail.surl} rows="2" cols="2" hidden />
                                    <Input type="textarea" name="furl" id="furl"  rows="2" cols="2" value={paymentDetail.furl} hidden />
                                    <Input type="textarea" name="key" id="key"  rows="2" cols="2" value={paymentDetail.key} hidden />
                                    <Input type="textarea" name="hash" id="hash"  rows="2"  cols="2" value={paymentDetail.hash} hidden />
                                    <Input type="textarea" name="txnid" id="txnid"  rows="2" cols="2" value={paymentDetail.txnid} hidden />
                                    <Input type="textarea" name="service_provider" id="service_provider" rows="2" cols="2" hidden />
                                    <button type="button" class="btn btn-primary" id="btn-confirm" onClick={()=>requestPayment()} >Confirm Payment</button>
                                    <button type="submit" class="btn btn-danger" style={{display:"none"}} id="btn-submit" >Continue Payment</button>
                                </form>
                                    )
                                }

                                {
                                    order.paymentVerified &&(<button type="button" class="btn btn-outline-success" disabled id="btn-confirm"  >Payment Completed</button>)
                                }

{
                                    order.amount==0 &&(<button type="button" class="btn btn-outline-dark" disabled id="btn-confirm"  >Waiting for the response </button>)
                                }
                                    
                            </Col>
                        </Row>

                        <Row className="mt-3">
                        <Col md="4" className="">
                        <Card body>
                            <Table borderless>
                                <tbody>
                                    <tr>
                                        <td>Delivery Charge</td>
                                        <td>{order.deliverycharge}</td>
                                    </tr>
                                    <tr><td colSpan={2}><hr /></td></tr>
                                    <tr><td>Total</td>
                                        <td>{order?.amount}</td></tr>
                                </tbody>
                            </Table>
                     
                           
                        </Card>
                    </Col>
                        </Row>

                        <Row className="my-3">
                            <Col md="4">
                            <Card body>
                            <Status props={order.status} />
                        </Card>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col md="4">
                            <Card body>
                            <CardTitle tag="h5">Address</CardTitle>
                            <CardText>
                            {order?.address?.name}
                            <br />
                            {order?.address?.mobile}
                            <br />
                            {order?.address?.address}
                            <br />
                            <b>City : </b>
                            {order?.address?.city}
                            <br />
                            <b>State : </b>
                            {order?.address?.state} 
                            <br />
                            <b>PIN Code : </b>
                            {order?.address?.pincode}
                            </CardText>
                        </Card>
                            </Col>
                        </Row>

                        <Row className="my-3">
                            <Col md="4">
                                <Card body>
                                    <CardTitle tag="h5">
                                        Notes
                                    </CardTitle>
                                    <CardText>{order.notes}</CardText>
                                </Card>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
           
            </>
            
        </Base>
    )
}
export default OrderDetail