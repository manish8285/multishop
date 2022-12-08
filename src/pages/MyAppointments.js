import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useNavigate } from "react-router-dom"
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap"
import Base from "../components/Base"
import { getAllAppointments } from "../services/doctor-service"

const MyAppointments=()=>{
    let navigate = useNavigate()
    const [currentPage,setCurrentPage] = useState(0)
    const [pageData,setPageData] = useState({
        pageNumber:"",
        pageSize:"",
        totalElements:"",
        totalPages:"",
        lastPage:true,
        appointments:[]
    })

    useEffect(()=>{
        getAllAppointments(0,5).then(data=>{
            console.log(data)
            setPageData(data)
        }).catch(error=>console.log(error))
    },[])

    useEffect(()=>{
        getAllAppointments(currentPage,5).then(data=>{
            setPageData({
                pageNumber:data.pageNumber,
                pageSize:data.pageSize,
                totalElements:data.totalElements,
                totalPages:data.totalPages,
                lastPage:data.lastPage,
                appointments:[...pageData.appointments,...data.appointments]})
        }).catch(error=>console.log(error))
    },[currentPage])

    return (
        <Base>
        <Container>
            <Card className="p-1 my-1 d-flex">
            <i class="fas fa-headset text-primary mx-2"> My Appointments <Button onClick={()=>navigate("/doctors")} className="btn-success">Book New</Button></i> 
            
            </Card>

            <InfiniteScroll
                        dataLength={pageData.totalElements}
                        hasMore={!pageData.lastPage}
                        next={()=>{setCurrentPage(currentPage+1)}}
                        
                    >
                    {(pageData.appointments).map(ap=>(
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col md="5">
                                        <Card className="border-primary rounded mb-2">
                                            <CardBody>
                                            <Container className="text-center">
                                                <i class="fas fa-user-injured fa-2x text-primary"></i>
                                                <i class="fas fa-headset fa-2x text-primary mx-2"></i>
                                                <i class="fas fa-user-md fa-2x text-primary"></i>
                                                <h5 className="text-success">Dr. {ap.doctor?.name}</h5>
                                            </Container>
                                            <Button onClick={()=>navigate("/self_payment/"+ap?.selfPayment?.id)} >{ap.status}</Button>
                                            {(ap.status=="WAITING FOR PAYMENT") && (<Button onClick={()=>navigate("/self_payment/"+ap?.selfPayment?.id)} className="ml-1 btn-success">PAY ₹ {ap.fee}</Button>)}
                                            <div>
                                            <table className="table-responsive">
                                                <tbody>
                                                    <tr>
                                                        <td>Date</td>
                                                        <td>{ap.date}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Pt. Name</td>
                                                        <td>{ap.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Mobile : </td>
                                                        <td> {ap.mobile}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Email : </td>
                                                        <td> {ap.email}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Symptoms : </td>
                                                        <td> {ap.symptoms}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                   
                                    
                                </Row>
                            </CardBody>

                        </Card>
                        
                    ))}
                    </InfiniteScroll>

        </Container>
        </Base>
    )
}
export default MyAppointments