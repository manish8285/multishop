import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container } from "reactstrap"
import Base from "../components/Base"
import OrderStatus from "../components/OrderStatus"
import { GetMyOrderById, GetMyOrderStatus } from "../services/order-service"

const OrderDetail=()=>{
    const {orderId} = useParams()
    const [order,setOrder]=useState({})

    useEffect(()=>{
        GetMyOrderById(orderId).then((data)=>{

            //if(data.trackingId != null){
                //window.open(`https://pickrr.com/track/${data.trackingId}`, '_blank');
                let a= document.createElement('a');
                a.target= '_blank';
                a.href= `https://pickrr.com/track/${data.trackingId}`;
                a.click();
                 console.log(data)
                 setOrder(data)
            //}
        }).catch((error)=>{
            console.log(error)
        })
    },[])



    return(
        <Base>
            <OrderStatus props={order.status}></OrderStatus>
            
        </Base>
    )
}
export default OrderDetail