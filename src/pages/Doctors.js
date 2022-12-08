import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useNavigate } from "react-router-dom"
import { Button, Card, CardBody, CardFooter, Col, Container, Form, FormGroup, Input, Table } from "reactstrap"
import { isLogedIn } from "../auth"
import Base from "../components/Base"
import { getAllDoctors, getAllSpecializations } from "../services/doctor-service"

const Doctors=()=>{
    let navigate = useNavigate()
    const [specializations,setspecializations]= useState([])
    const [currentPage,setCurrentPage] = useState(0)
    const [category,setCategory]=useState(-1)
    const pageSize=5

    const [pageData,setPageData] = useState({
        pageNumber:"",
        pageSize:"",
        totalElements:"",
        totalPages:"",
        lastPage:true,
        doctors:[]
    })
    const [alldoctors,setAlldoctors] = useState([])


    

    useEffect(()=>{
        if(!isLogedIn()){
            navigate("/login")
        }
        getAllSpecializations().then(data=>{
            setspecializations(data)
        }).catch(error=>console.log(error))

        loadDoctors()
    },[])

    useEffect(()=>{
        getAllDoctors(currentPage,5,category).then(data=>{
            setPageData(data)
        }).catch(error=>console.log(error))
    },[category])

    const loadDoctors=()=>{
        getAllDoctors(currentPage,pageSize,category).then(data=>{
            setPageData({
                pageNumber:data.pageNumber,
                pageSize:data.pageSize,
                totalPages:data.totalPages,
                totalElements:data.totalElements,
                doctors:[...pageData.doctors,...data.doctors]
            })
        }).catch(error=>console.log(error))
    }

    useEffect(()=>{
        getAllDoctors(currentPage,5,category).then(data=>{
            setAlldoctors([...alldoctors,data.doctors])
        }).catch(error=>console.log(error))
    },[currentPage])

    useEffect(()=>{
        console.log(pageData)
    },[pageData])
    return (
        <Base>
            <Container>
                <Form className="my-2 mx-0 px-0">
                    <FormGroup >
                    <Input type="select" onChange={(event)=>setCategory(event.target.value)} className="form-control" >
                        {
                            specializations.map(sp=>(
                                <option key={sp.id} value={sp.id}>{sp.name}</option>
                            ))
                        }
                        
                    </Input>
                    </FormGroup>
                </Form>

                <InfiniteScroll
                        dataLength={pageData.totalElements}
                        hasMore={!pageData.lastPage}
                        next={()=>{setCurrentPage(currentPage+1)}}
                        className="row"
                        
                    >
                    {pageData.doctors.map(dr=>(
                        <Col md="4 mb-1">
                            <Card>
                            <CardBody>
                                
                                <Container className="text-center">
                                <img width={"200px"} src="img/doctorhe1.webp" alt="" />
                                <h4 >Dr. {dr.name}</h4>
                                <p className="text-primary">{dr.specialization.name} {!(dr.verified) &&(<i class='fas fa-check-circle' style={{color:"blue"}}></i>)} </p>
                               
                                </Container>
                                <CardFooter>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Qualification :</td>
                                                <td>{dr.qualification}</td>
                                            </tr>
                                            <tr>
                                                <td>Experience :</td>
                                                <td>{dr.experience}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </CardFooter>
                                <Container className="text-center">
                                <Button onClick={()=>navigate("/appointment/"+dr.id)} className="btn-success mt-1">Book Appointment</Button>
                                </Container>
                            </CardBody>
                        </Card>
                        </Col>
                    ))}
                    </InfiniteScroll>
                
            </Container>
        </Base>
    )
}
export default Doctors