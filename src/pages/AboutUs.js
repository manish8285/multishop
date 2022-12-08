import { Col, Container, Row } from "reactstrap"
import Base from "../components/Base"

const AboutUs=()=>{
    return (
       <Base>
        <>
        <div className="container-fluid mt-3">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            <a className="breadcrumb-item text-dark" href="#">Home</a>
                            <span className="breadcrumb-item active">About Us</span>
                        </nav>
                    </div>
                </div>
            </div>
            <Container>
                <Container className="text-center mb-5">
                <h1 className="text-primary">About HomeoRx</h1>
                <h4 >India’s leading digital consumer healthcare platform</h4>
                </Container>

                <Row>
                    <Col md={3}>
                        <Container className="text-center">
                           <img src="img/dawai.png" width={50} height={50} alt="" /> 
                            <h5>E-Pharmacy</h5>
                            <p>Order medicines and health products online and get it delivered at home from licensed pharmacies</p>
                        </Container>
                    </Col>
                    <Col md={3}>
                        <Container className="text-center">
                           <img src="img/doctorshe2.png" width={70} height={70} alt="" /> 
                            <h5>Online Consultations</h5>
                            <p>Consult qualified and registered doctors on video call or free on chat</p>
                        </Container>
                    </Col>
                    <Col md={3}>
                        <Container className="text-center">
                        <i class="fas fa-flask fa-3x text-success"></i> 
                            <h5>Labs Tests</h5>
                            <p>Book lab tests online for hassle-free, home sample collection service. Get reports online.</p>
                        </Container>
                    </Col>
                    <Col md={3}>
                        <Container className="text-center">
                        <img src="img/premiumQuality.png" width={80} height={60} alt="" />
                            <h5>Authentic Information</h5>
                            <p>Read medicine and health content written by qualified doctors and health professionals</p>
                        </Container>
                    </Col>
                </Row>

                <Container className="text-center mt-5">
                    <p>HomeoRx brings to you an online platform, which can be accessed for all your health needs. We are trying to make healthcare a hassle-free experience for you. Get your ayurvedic, homeopathic medicines, vitamins & nutrition supplements and other health-related products delivered at home. Lab tests? That too in the comfort of your home. Doctor consult? Yes, we got that covered too</p>
                </Container>
            </Container>

            <Container className="text-center p-2 bg-white mt-5">
                <h2 className="text-primary my-4">Leadership</h2>
            <Row>
                    <Col md={4}>
                        <Container className="text-center">
                           <img className="pt-1" src="img/doctorshe3.png" width={90} height={90} style={{borderRadius:"50%"}} alt="" /> 
                            <h5 className="mb-0">DR. Sweta</h5>
                            <p >Senior Doctor</p>
                        </Container>
                    </Col>
                    <Col md={4}>
                        <Container className="text-center">
                           <img src="img/doctorhe1.webp" width={130} height={110} style={{borderRadius:"50%"}} alt="" /> 
                            <h5 className="mb-0">DR. Dinesh Singh</h5>
                            <p >CEO & Co-Founder</p>
                        </Container>
                    </Col>

                    <Col md={4}>
                        <Container className="text-center">
                           <img src="img/person.png" width={100} height={100} style={{borderRadius:"50%"}} alt="" /> 
                            <h5 className="mb-0">MR. Manish Singh</h5>
                            <p >CEO & Founder</p>
                        </Container>
                    </Col>
                    
                </Row>
            </Container>


        </>

       </Base>
    )
}
export default AboutUs