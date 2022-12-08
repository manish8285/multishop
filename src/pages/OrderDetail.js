import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardBody, Col, Container, Row, Table } from "reactstrap"
import Base from "../components/Base"
import OrderStatus from "../components/OrderStatus"
import { BASE_URL, DRIVE_IMAGE_URL } from "../services/helper"
import { GetMyOrderById, GetMyOrderStatus } from "../services/order-service"

const OrderDetail=()=>{
    const {orderId} = useParams()
    const [order,setOrder]=useState({
        "items":[],
        "status":[]
    })
    let navigate = useNavigate()

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
                    <a onClick={()=>{navigate("/")}} class="breadcrumb-item text-primary" ><i class="fas fa-arrow-left"></i></a>
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
                                {
                                    (order.ordertype!="POSTPAID" && order.selfPayment) &&(
                                        <tr>
                                        <th>Paid Online
                                        <Button style={{whiteSpace:"nowrap"}} onClick={()=>navigate("/self_payment/"+order?.selfPayment?.id)} className="ml-2 btn btn-small btn-outline-warning">{(order.selfPayment.verified)?'Verified':'Waiting for Payment Varification'}</Button>
                                        </th>
                                        
                                        <td >
                                            <img width={125} src={BASE_URL+"images/recipts/"+order.selfPayment.recipt} alt="" />
                                            
                                            
                                        </td>

                                    </tr>  
                                    )
                                }
                                <tr>
                                    <th>Total Amount</th>
                                    <td>{order.amount}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td><p className="my-0">{order.address?.name}</p>
                                        <p className="my-0">{order.address?.address}</p>
                                        <p className="my-0">{order.address?.city +' ,'+ order.address?.state+' ,'+order.address?.pincode+' ,'+order.address?.mobile}</p>
                                    </td>
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

                                <tr><th colSpan={"2"}>Status</th></tr>
                                
                                    {order.status?.map((s)=>(
                                        <tr>
                                        <td> <i class="fas fa-check-circle"></i> {s.status}</td>
                                        <td>{s.date}</td>
                                        </tr>

                                    ))}
                                
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Container>
           
            </>
            
        </Base>
    )
}
export default OrderDetail