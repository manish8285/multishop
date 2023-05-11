import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useLocation } from "react-router-dom"
import { Card, CardText, Col, Container, Row } from "reactstrap"
import Base from "../components/Base"
import { BASE_URL } from "../services/helper"
import { getAllPrescriptionsOfPatient } from "../services/patient-service"

const Prescriptions=()=>{
    const [patient,setPatient]= useState(useLocation().state)
    const [currentPage,setCurrentPage] = useState(0)

    const [presc,setPresc] = useState({
        lastPage:"",
        prescriptions:[]
    })

    const loadPrescriptions=()=>{
        getAllPrescriptionsOfPatient(currentPage,5,patient.id).then(data=>{
            //console.log("loading page ",currentPage)
            setPresc({
                pageNumber:data.pageNumber,
                pageSize:data.pageSize,
                totalElements:data.totalElements,
                totalPages:data.totalPages,
                lastPage:data.lastPage,
                prescriptions:[...presc.prescriptions,...data.prescriptions]})
           // console.log(presc)
        }).catch(error=>console.log(error))
    }

    useEffect(()=>{
        loadPrescriptions()
        
    },[currentPage])

    useEffect(()=>{
        console.log(patient)
    },[])

    return (
        <Base>
            <Container>
                <Card className="p-1 mt-1">
                    <Row>
                        <Col md="1">
                        <i class="fas fa-user-shield fa-3x text-primary"></i>
                        </Col>
                        <Col mod="2">
                            <p className="m-0">{patient.name}</p>
                            <p className="m-0">{patient.age} | { patient.sex}</p>

                        </Col>
                    </Row>
                </Card>
                
                <InfiniteScroll
                        dataLength={presc.prescriptions.length}
                        hasMore={!presc.lastPage}
                        next={()=>{setCurrentPage(currentPage+1)}}
                        //scrollableTarget="scrollableDiv"
                        
                        
                    >
                {(presc.prescriptions).map(pr=>(
                        <div className="mt-3" >
                        <hr style={{margin:"0px 0px -13px 0px"}} />
                        <small className="bg-white">{pr.createdDate}</small>
                        <Card  className="myHover" body>
                        <Row>
                            <Col md="4">
                            <img alt="Sample" style={{maxWidth:"240px"}} onClick={()=>window.location.href=BASE_URL+"images/prescriptions/"+pr.image} src={BASE_URL+"images/prescriptions/"+pr.image} />
                            </Col>
                            <Col md="3">
                            <p className="m-0"> <b>Disease : </b>{pr.disease} </p>
                            <p className="m-0"> <b>Symptoms : </b>{ pr.symptoms} </p>
                            <p className="m-0"> <b>Next Date : </b>{ pr.nextDate} </p>
                            <hr />
                            <CardText> {pr.notes}</CardText>
                            </Col>
                        </Row>
                        
                        
                         </Card>
                        </div>

                        ))}
                    </InfiniteScroll>
                    
                
            </Container>
        </Base>
    )
}

export default Prescriptions