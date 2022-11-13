import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useNavigate } from "react-router-dom"
import { Card, CardBody, CardHeader, CardText, CardTitle, Col, Container, NavLink } from "reactstrap"
import Base from "../components/Base"
import { DRIVE_IMAGE_URL } from "../services/helper"
import { GetMyOrders } from "../services/order-service"

const MyOrders=()=>{
    const [page,setPage] = useState({
        "totalPages":'',
        "pageSize":'',
        "pageNumber":'',
        "totalElements":'',
        "lastPage":false,
        "orders":[]
    })
    const [currentPage,setCurrentPage]= useState(0)
    let navigate = useNavigate()

    useEffect(()=>{
        changePage()
        
    },[])

    const changePage=(pageSize=5)=>{
        GetMyOrders(currentPage,pageSize).then((data)=>{
            setPage({...page,
                "pageNumber":data.pageNumber,
                "lastPage":data.lastPage,
                "orders":[...page.orders,...data.orders]
            })
        }).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        changePage()
    },[currentPage])

    return (
        <Base>
            <>
            
            <Container>
          
            <div class="row mt-2">
            <div class="col-12">
                <nav class="breadcrumb bg-dark mb-30">
                    <a onClick={()=>{navigate("/")}} class="breadcrumb-item text-primary" ><i class="fas fa-arrow-left"></i></a>
                    <span class="breadcrumb-item active text-primary">My Orders</span>
                    </nav>
                </div>
            
        </div>
                           <InfiniteScroll
                           dataLength={page.totalElements}
                           hasMore={!page.lastPage}
                           next={()=>{setCurrentPage(currentPage+1)}}
                           endMessage={    <h1 style={{ textAlign: 'center' }}>...End of Page...</h1>    }
                           >

            {
                
                page.orders.map((order,index)=>(
                    <Card className="mt-2" key={index}>
                   <CardHeader onClick={()=>{navigate("/order-detail/"+order.orderId)}} >
                   <i class="fas fa-gifts"></i> <b className="mr-3">{order.orderId}</b> <i class="fas fa-rupee-sign"> <b className="mr-3">{order.amount}</b></i> <i class="fas fa-calendar-check"> <b> {order.date.substring(0,10)}</b></i>   <p className="float-right"><i class="fas fa-check-circle"></i> Status : <b >{order.status[order.status?.length-1]?.status} </b> </p>
                   </CardHeader>
                   <CardBody>
                       


                           <div className="row" style={{flexWrap:"unset"}}>
                                <Col  sm="3" style={{width:"auto"}} >
                                   
                                    <img className="mb-1" width={"90px"} src={DRIVE_IMAGE_URL+order?.items[0]?.product.images[0].name} alt="product image" />

                                </Col>

                               <Col sm="9" style={{width:"auto"}} >
                                   <div>
                                   <p className="my-0">
                                {

                                    order.items?.map((item,index)=>(
                                    <>
                                     {item.product.name} X {item.quantity} 
                                    </>
                                    ))
                                   
                                    }
                                    </p>
                                       <small className="my-0 py-0" >{order.address.name}, {order.address.address}, {order.address.city}, {order.address.pincode}, {order.address.mobile}</small>
                                </div>   

                           </Col>
                      </div>
                   </CardBody>
               </Card> 
                ))
               
            }
            </InfiniteScroll>

            </Container>
            </>
        </Base>
        
    )
}
export default MyOrders