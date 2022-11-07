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
                <nav class="breadcrumb bg-light mb-30">
                    <a onClick={()=>{navigate("/")}} class="breadcrumb-item text-dark" >Home</a>
                    <span class="breadcrumb-item active">My Orders</span>
                    </nav>
                </div>
            
        </div>
        <div className="row">
                           <InfiniteScroll
                           dataLength={page.totalElements}
                           hasMore={!page.lastPage}
                           next={()=>{setCurrentPage(currentPage+1)}}
                           endMessage={    <h1 style={{ textAlign: 'center' }}>...End of Page...</h1>    }
                           >

            {
                
                page.orders.map((order,index)=>(
                    <Card className="mt-2" key={index}>
                   <CardHeader>
                   <i class="fas fa-gifts"></i>  Order Id : <b className="mr-3">{order.orderId}</b> <i class="fas fa-rupee-sign"> <b className="mr-3">{order.amount}</b></i> <i class="fas fa-calendar-check ml-3"></i> <b> {order.date.substring(0,10)}</b>  <p className="float-right"><i class="fas fa-check-circle"></i> Status : <b >{order.status[order.status?.length-1]?.status} </b> </p>
                   </CardHeader>
                   <CardBody>
                       


                           <div className="row">
                           
                               {

                                   order.items?.map((item,index)=>(
                                    <Col sm="5" md="2">
                                    <Card key={index}>
                                        <img  src={DRIVE_IMAGE_URL+item.product.images[0].name} alt="product image" />
                                        <CardText>{item.product.name} X {item.quantity}</CardText>
                                    </Card>
                                    </Col>
                                ))
                               }
                            </div>
                           
                      
                   </CardBody>
               </Card> 
                ))
               
            }
            </InfiniteScroll>
            </div>
            </Container>
            </>
        </Base>
        
    )
}
export default MyOrders