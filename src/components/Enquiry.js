import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import THEME from "../assets/css/store.module.css"
import { toast } from "react-toastify";
import { sendEnquiry } from "../services/enquiry-service";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const Enquiry=()=>{
    let navigate = useNavigate()
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

  const [enquiry,setEnquiry] = useState({
    name:"",
    email:"",
    mobile:"",
    sex:"MALE",
    age:"",
    slot:"MORNING",
    message:""
})

const resetEnquiry=()=>{
    setEnquiry({
      name:"",
      email:"",
      mobile:"",
      sex:"MALE",
      age:"",
      slot:"",
      message:""
    })
}




const sendMyenquiry=()=>{
  // const age1=enquiry.name+" "+document.querySelector("#age").value
  // const sex = document.querySelector("#sex").value
  
  toast.info("please wait while sending message...")


  console.log(enquiry)
  

  
  sendEnquiry(enquiry).then(data=>{
      setEnquiry(data)
      //resetEnquiry()
      toggle()
      console.log(data)
      //toast.success(data)
  }).catch(error=>{
      console.log(error)
      toast.error("Sorry something went wrong !!!")
  })
    }
    return (

        <div class={`${THEME["page-section"]}`}>
    <div class="container">
      <h1 class="text-center wow fadeInUp">Make an Appointment</h1>

      <form class={THEME["main-form"]} autocomplete="off">
        <div class="row mt-5 ">
          <div class="col-12 col-sm-6 py-2 wow fadeInLeft">
            <input type="text" class="form-control" value={enquiry.name} onChange={(event)=>setEnquiry({...enquiry,name:event.target.value})} id="name" placeholder="Full name" />
          </div>
          <div class="col-12 col-sm-6 py-2 wow fadeInRight" data-wow-delay="300ms">
          <input type="email" value={enquiry.email} onChange={(event)=>setEnquiry({...enquiry,email:event.target.value})} id="email" class="form-control" placeholder="Your email" />
          </div>
          <div class="col-12 col-sm-6 py-2 wow fadeInLeft"  data-wow-delay="300ms">
            <input type="number" placeholder="Age"  onBlur={()=>(event)=>setEnquiry({...enquiry,[event.target.id]:event.target.value})} onChange={(event)=>setEnquiry({...enquiry,[event.target.id]:event.target.value})} id="age" class="form-control" />
          </div>
          <div class="col-12 col-sm-6 py-2 wow fadeInRight" data-wow-delay="300ms">
          <select name="departement" id="sex" onChange={(event)=>setEnquiry({...enquiry,[event.target.id]:event.target.value})} onSelect={(event)=>setEnquiry({...enquiry,[event.target.id]:event.target.value})} class="custom-select">
              <option selected value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
            </select>
          
          </div>
          <div class="col-12 col-sm-6 py-2 wow fadeInLeft" data-wow-delay="300ms">
            <input type="number" onBlur={()=>(event)=>setEnquiry({...enquiry,[event.target.id]:event.target.value})}  onChange={(event)=>setEnquiry({...enquiry,[event.target.id]:event.target.value})} id="mobile" class="form-control" placeholder="Number.." />
          </div>
          <div class="col-12 col-sm-6 py-2 wow fadeInRight" data-wow-delay="300ms">
          <select name="departement" id="slot" onChange={(event)=>setEnquiry({...enquiry,[event.target.id]:event.target.value})} onSelect={(event)=>setEnquiry({...enquiry,[event.target.id]:event.target.value})} class="custom-select">
              <option selected value="MORNING">MORNING (9AM To 2 PM)</option>
              <option value="EVENING">EVENING (5PM To 10PM)</option>
            </select>
          </div>
          <div class="col-12 py-2 wow fadeInUp" data-wow-delay="300ms">
            <textarea name="message" value={enquiry.message} onChange={(event)=>setEnquiry({...enquiry,message:event.target.value})} id="message" class="form-control" rows="6" placeholder="Symptoms / Disease / Health issue (optional).."></textarea>
          </div>
        </div>

        <button type="button" onClick={()=>sendMyenquiry()} className={`${THEME.btn} ${THEME["btn-primary"]} mt-3 wow zoomIn`}>Submit Request</button>
      </form>
    </div>

    <Modal isOpen={modal} toggle={()=>toggle()} >
        <ModalHeader toggle={()=>toggle()}>Your Appointment Booked Successfully</ModalHeader>
        <ModalBody>
            Dear <b>{enquiry.name}</b>
            <br />
          Your appointment booked successfully, please visit the place in between {enquiry.slot=="MORNING"?"9AM to 1:30PM" : "5PM to 9:30PM"} .Don't forget to mention your name and homeorx.in at place
          <br />
          <i onClick={()=>navigate("/contactus")}  class="fas fa-map-marker-alt text-primary myHover"> Divine Health Care</i>



        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={()=>navigate("/contactus")}>
            Get Location
          </Button>{' '}
          <Button color="secondary" onClick={()=>toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
  </div>

    )
}

export default Enquiry