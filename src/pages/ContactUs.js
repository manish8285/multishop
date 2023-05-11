import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Base from "../components/Base"
import { sendEmail } from "../services/email_service"

const ContactUs=()=>{
    let navigate = useNavigate()
    const [email,setEmail] = useState({
        from_name:"",
        from_email:"",
        subject:"",
        message:""
    })

    const resetEmail=()=>{
        setEmail({
            from_name:"",
            from_email:"",
            subject:"",
            message:""
        })
    }

    const sendMyEmail=()=>{
        toast.info("please wait while sending message...")
        resetEmail()
        console.log(email)
        sendEmail(email).then(data=>{
            console.log(data)
            toast.success(data)
        }).catch(error=>{
            console.log(error)
            toast.error("Sorry something went wrong !!!")
        })
    }
    return (
        <Base>
            <>
            <div className="container-fluid mt-3">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            <a className="breadcrumb-item text-dark" href="#">Home</a>
                            <span className="breadcrumb-item active">Contact</span>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Divine Health Care</span></h2>
        <div className="row px-xl-5">
            <div className="col-lg-7 mb-5">

                <div className="contact-form bg-light p-30">
                    <h1>Contact Us</h1>
                    <div id="success"></div>
                    <form name="sentMessage" id="contactForm" novalidate="novalidate">
                        <div className="control-group">
                            <input type="text" class="form-control" value={email.from_name} onChange={(event)=>setEmail({...email,from_name:event.target.value})} id="name" placeholder="Your Name"
                                required="required" data-validation-required-message="Please enter your name" />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div class="control-group">
                            <input type="email" class="form-control" value={email.from_email} onChange={(event)=>setEmail({...email,from_email:event.target.value})} id="email" placeholder="Your Email"
                                required="required" data-validation-required-message="Please enter your email" />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group">
                            <input type="text" class="form-control" value={email.subject} onChange={(event)=>setEmail({...email,subject:event.target.value})} id="subject" placeholder="Subject"
                                required="required" data-validation-required-message="Please enter a subject" />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group">
                            <textarea className="form-control" value={email.message} onChange={(event)=>setEmail({...email,message:event.target.value})} rows="8" id="message" placeholder="Message"
                                required="required"
                                data-validation-required-message="Please enter your message"></textarea>
                            <p className="help-block text-danger"></p>
                        </div>
                        <div>
                            <button className="btn btn-primary py-2 px-4" type="button" onClick={()=>sendMyEmail()} id="sendMessageButton">Send
                                Message</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-lg-5 mb-5">
                <div className="bg-light p-30 mb-30">
                    <iframe style={{width: "100%", height: "250px",border:"0"}}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d877.1244320573498!2d77.083447346615!3d28.434408805851888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d198ebdc7659b%3A0x9af47251f7cfd2eb!2s(Homeopathic)%20Divine%20Health%20Care!5e0!3m2!1sen!2sbd!4v1669225073317!5m2!1sen!2sbd"
                    frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                </div>
                <div class="bg-light p-30 mb-3">
                    <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3"></i>Divine Health Care, Wazirabad, Sector 52, Gurgaon, Haryana 122003</p>
                    <p className="mb-2"><i className="fa fa-user text-primary mr-3"></i>Dr. Sweta</p>
                    <p className="mb-2"><i className="fa fa-envelope text-primary mr-3"></i>help@homeorx.in</p>
                    <p className="mb-2"><i className="fa fa-phone-alt text-primary mr-3"></i>+91 8929248031</p>
                </div>
            </div>
        </div>

        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3"> HOMEO CLINIC</span></h2>
        <div className="row px-xl-5">
            <div className="col-lg-7 mb-5">
                <div className="contact-form bg-light p-30">
                <div id="header-carousel" class="carousel slide carousel-fade mb-30 mb-lg-0" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#header-carousel" data-slide-to="0" class="active"></li>
                        <li data-target="#header-carousel" data-slide-to="1"></li>
                        <li data-target="#header-carousel" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item position-relative active" style={{height: "430px"}}>
                            <img class="position-absolute w-100 h-100" src="img/homeoClinic.jpg" style={{objectFit:"fill"}} />
                            
                        </div>
                        <div class="carousel-item position-relative" style={{height: "430px"}}>
                            <img class="position-absolute w-100 h-100" src="img/oldage.webp" style={{objectFit: "fill"}} />
                            
                        </div>
                        <div class="carousel-item position-relative" style={{height: "430px"}}>
                            <img class="position-absolute w-100 h-100" src="img/vitiligo.png" style={{objectFit: "fill"}} />
                            
                        </div>
                    </div>
                </div>
                <a class="btn btn-warning py-2 px-4 mt-3 animate__animated animate__fadeInUp" onClick={()=>navigate("/aboutus")} >Book Appointment</a>
                                
                </div>
            </div>
            <div className="col-lg-5 mb-5">
                <div className="bg-light p-30 mb-30">
                    <iframe style={{width: "100%", height: "250px",border:"0"}}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.5517531798523!2d77.08676753524517!3d28.432779399809167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1965047e47fb%3A0xf2faeb38701a2c00!2sHOMOEOPATHIC%20CLINIC!5e0!3m2!1sen!2sin!4v1678536707773!5m2!1sen!2sin"
                    frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                </div>
                <div class="bg-light p-30 pb-3">
                    <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3"></i>Homeo Clinic, Wazirabad, Sector 52, Gurgaon, Haryana 122003</p>
                    <p className="mb-2"><i className="fa fa-user text-primary mr-3"></i>Dr DK Singh</p>
                    <p className="mb-2"><i className="fa fa-envelope text-primary mr-3"></i>info@homeorx.in</p>
                    <p className="mb-2"><i className="fa fa-phone-alt text-primary mr-3"></i>+91 9213759146</p>
                </div>
            </div>
        </div>
    </div>
            </>
        </Base>
    )
}
export default ContactUs