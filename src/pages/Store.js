import Base from "../components/Base"
import THEME from "../assets/css/store.module.css"
import "../assets/css/maicons.css"
import "../assets/vendor/animate/animate.css"
import OwlCarousel from 'react-owl-carousel';
import { useNavigate } from "react-router-dom";
import { useEffect, useState,useRef } from "react";
import { toast } from "react-toastify";
import { sendEnquiry } from "../services/enquiry-service";
import Enquiry from "../components/Enquiry";

//import "../assets/vendor/owlCarousel/css/owlCarousel.css"

const Store=()=>{

  const ref = useRef(null)
  const toAppointment=()=>{ref.current?.scrollIntoView({behavior: 'smooth'})}
  let navigate = useNavigate()

  const options = {
    margin: 30,
    responsiveClass: true,
    //nav:true,
    // rewindNav:false,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
        0: {
            items: 1,
            loop:true
        },
        400: {
            items: 1,
            loop:true
        }
    },
  };
  

    return (
        <Base>
        <div id="store" style={{backgroundColor:"none"}} className="storePage">
        <div className={`${THEME["page-hero"]} ${THEME["bg-image"]} ${THEME["overlay-dark"]}`} style={{backgroundImage : "url(storeFront1.jpg)"}}>
    <div className={THEME["hero-section"]}>
      <div className={`container text-center wow zoomIn`}>
        <span class={THEME.subhead}>Let's make your life happier</span>
        <h1 className={"display-4 text-light"}>Homeopathic</h1>
        <a onClick={()=>toAppointment()} class={`${THEME.btn} ${THEME["btn-primary"]}`}>Let's Consult</a>
      </div>
    </div>
  </div>


  <div className={THEME["bg-light"]}>
    <div className={`${THEME["page-section"]} py-3 mt-md-n5 ${THEME["custom-index"]}`}>
      <div className={"container"}>
        <div className={"row justify-content-center"}>
          <div className="col-md-4 py-3 py-md-0">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-secondary"]} ${THEME["text-white"]}`}>
                <span className="mai-cash-outline"></span>
              </div>
              <p><span>Minimum</span> Fee</p>
            </div>
          </div>
          <div class="col-md-4 py-3 py-md-0">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-primary"]} ${THEME["text-white"]}`}>
                <span class="mai-shield-checkmark"></span>
              </div>
              <p><span>HomeoRx</span>- Total Cure</p>
            </div>
          </div>
          <div class="col-md-4 py-3 py-md-0">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-accent"]} ${THEME["text-white"]}`}>
                <span class="mai-basket"></span>
              </div>
              <p><span>HomeoRx</span>- Pharmacy</p>
            </div>
          </div>
        </div>
      </div>
    </div> 
    {/*<!-- .page-section --> */}

    <div className={`${THEME["page-section"]} pb-0`}>
      <div class="container">
        <div class="row align-items-center">
            <div className={`col-lg-6 py-3 wow fadeInUp`}>
              <h1>Best Homeopathic Doctors<br /> Since 2013</h1>
              <p class="text-grey mb-4 text-justify">We are team of best doctors, and pharmacist  available in Gurugram since 2013 serving patients at minimum fee.
               We have good number of trusted and happy customer accross the country . We are available online as homeorx.in and provide services such as doctor consultancy, delivery of remedies and lab tests.
               You can visit our dispensary and get total cured with experienced doctor.
               Divine Health Care and Homeo Clinic both are situated at Wazirabad, Sector 52 Gurugram and operated in between 9 AM to 9 PM except lunch break 2PM to 5 PM.
               We have more than 10 years of experience to deal with all type of health issues and chronic diseases.</p>
              <a onClick={()=>navigate("/contactus")} className={  `btn ${THEME["btn-primary"]}`} >Reach to Us</a>
            </div>
            <div className={`col-lg-6 wow fadeInRight`} data-wow-delay="400ms">
                <div className={`${THEME["img-place"]} ${THEME["custom-img-1"]}`} >
                  <img src="bg-doctor.png" alt="" />
                </div>
            </div>
        </div>
      </div>
      </div>
    {/* <!-- .bg-light --> */}
  </div>
   {/* <!-- .bg-light --> */}

  <div className={`${THEME["page-section"]} bg-light`}>
    <div class="container-fluid text-center">
      <h1 className={`text-center mb-5 wow fadeInUp`}>Our Teams</h1>

      <OwlCarousel className="slider-items owl-carousel vendor-carousel" id="doctorSlideshow" {...options}>

            <div  class="item">
              <div className={THEME["card-doctor"]}>
                <div className={THEME.header}>
                  <img src="doctors/doctorhe.jpg" alt="" />
                  <div className={THEME.meta}>
                    <a href="#"><span class="mai-call"></span></a>
                    <a href="#"><span class="mai-logo-whatsapp"></span></a>
                  </div>
                </div>
                <div className={THEME.body}>
                  <p className={`${THEME["ext-xl"]} mb-0`}>Dr. DK Singh</p>
                  <span className={`${THEME["text-sm"]} ${THEME["text-grey"]}`}>General Homeopathic Physician</span>
                </div>
              </div>
            </div>

            
         
            
            <div  class="item ">
              <div className={THEME["card-doctor"]}>
                <div className={THEME.header}>
                  <img src="doctors/sweta.jpeg" alt="" />
                  <div className={THEME.meta}>
                    <a href="#"><span class="mai-call"></span></a>
                    <a href="#"><span class="mai-logo-whatsapp"></span></a>
                  </div>
                </div>
                <div className={THEME.body}>
                  <p className={`${THEME["text-xl"]} mb-0`}>Dr. Sweta</p>
                  <span className={`${THEME["text-sm"]} ${THEME["text-grey"]}`}>General Homeopathic Physician</span>
                </div>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </div>

  <div className={`${THEME["page-section"]}`}>
    <div class="container">
      <h1 class="text-center wow fadeInUp">Our Happy Clients Says About Us</h1>
      <div class="row mt-5">
        <div class="col-lg-4 py-2 wow zoomIn">
          <div className={THEME["card-blog"]}>
            <div className={THEME.header}>
              <div className={THEME["post-category"]}>
                <a href="#">Feedback</a>
              </div>
              <a href="blog-details.html" className={THEME["post-thumb"]}>
                <img src="blog/blog_3.jpg" alt="" />
              </a>
            </div>
            <div className={THEME.body}>
              <h5 className={THEME["post-title"]}><a href="blog-details.html">Dr Sweta is best homeopathic doctor. She expert in disease of ladies, any kind</a></h5>
              <div className={THEME["site-info"]}>
                <div className={`${THEME["avatar"]} mr-2`}>
                  <div className={THEME["avatar-img"]} >
                    <img src="img/cat-1.jpg" alt="" />
                  </div>
                  <span>Priyanka</span>
                </div>
                <span class="mai-time"></span> 25 | Female
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 py-2 wow zoomIn">
          <div className={THEME["card-blog"]}>
            <div className={THEME.header}>
              <div className={THEME["post-category"]}>
                <a href="#">Feedback</a>
              </div>
              <a href="blog-details.html" className={THEME["post-thumb"]}>
                <img src="blog/blog_1.jpg" alt="" />
              </a>
            </div>
            <div className={THEME.body}>
              <h5 className={THEME["post-title"]}><a href="blog-details.html">HomeoRx provide best online and offline homeopathic services at low fee </a></h5>
              <div className={THEME["site-info"]}>
                <div className={`${THEME["avatar"]} mr-2`}>
                  <div className={THEME["avatar-img"]}>
                    <img src="person/person_1.jpg" alt="" />
                  </div>
                  <span>Aman</span>
                </div>
                <span class="mai-time"></span> 45 | Male
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 py-2 wow zoomIn">
          <div className={THEME["card-blog"]}>
            <div className={THEME.header}>
              <div className={THEME["post-category"]}>
                <a href="#">Feedback</a>
              </div>
              <a href="blog-details.html" className={THEME["post-thumb"]}>
                <img src="blog/blog_2.jpg" alt="" />
              </a>
            </div>
            <div className={THEME.body}>
              <h5 className={THEME["post-title"]}><a href="blog-details.html">Dr. DK Singh is an expert physician deals with chronic disease in NCR </a></h5>
              <div className={THEME["site-info"]}>
                <div className={`${THEME["avatar"]} mr-2`}>
                  <div className={THEME["avatar-img"]}>
                    <img src="person/person_2.jpg" alt="" />
                  </div>
                  <span>Manoj</span>
                </div>
                <span class="mai-time"></span> 65 | Male
              </div>
            </div>
          </div>
        </div>

        {/* <div class="col-12 text-center mt-4 wow zoomIn">
          <a href="blog.html"  className={`${THEME.btn} ${THEME["btn-primary"]}`}>Read More</a>
        </div> */}

      </div>
    </div>
  </div>
   {/* <!-- .page-section --> */}

    {/* deals with section  */}
    <div class={`${THEME["page-section"]} bg-light`}>
      <div class="container">
        <h1 class="text-center wow fadeInUp">Our Healthcare Treatments</h1>
        <p className="text-center m-0 wow">Find our best homeopathic treatment for below disease</p>
        <div className={"row justify-content-center"}>
          
          <div className="col-md-3 py-3 py-md-0 mt-2">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-primary"]} ${THEME["text-white"]}`}>
                <span className="mai-leaf-outline"></span>
              </div>
              <p><span>Piles</span></p>
            </div>
          </div>

          <div className="col-md-3 py-3 py-md-0 mt-2">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-primary"]} ${THEME["text-white"]}`}>
                <span className="mai-leaf-outline"></span>
              </div>
              <p><span>Leucoderma</span></p>
            </div>
          </div>

          <div className="col-md-3 py-3 py-md-0 mt-2">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-primary"]} ${THEME["text-white"]}`}>
                <span className="mai-leaf-outline"></span>
              </div>
              <p><span>Breast lump</span></p>
            </div>
          </div>

          <div className="col-md-3 py-3 py-md-0 mt-2">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-primary"]} ${THEME["text-white"]}`}>
                <span className="mai-leaf-outline"></span>
              </div>
              <p><span>Cancer</span></p>
            </div>
          </div>

          <div className="col-md-3 py-3 py-md-0 mt-2">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-primary"]} ${THEME["text-white"]}`}>
                <span className="mai-leaf-outline"></span>
              </div>
              <p><span>Kidney Stone</span></p>
            </div>
          </div>

          <div className="col-md-3 py-3 py-md-0 mt-2">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-primary"]} ${THEME["text-white"]}`}>
                <span className="mai-leaf-outline"></span>
              </div>
              <p><span>Filariasis</span></p>
            </div>
          </div>

          <div className="col-md-3 py-3 py-md-0 mt-2">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-primary"]} ${THEME["text-white"]}`}>
                <span className="mai-leaf-outline"></span>
              </div>
              <p><span>Chronic headache</span></p>
            </div>
          </div>

          <div className="col-md-3 py-3 py-md-0 mt-2">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-primary"]} ${THEME["text-white"]}`}>
                <span className="mai-leaf-outline"></span>
              </div>
              <p><span>Elephantiasis</span></p>
            </div>
          </div>

          <div className="col-md-3 py-3 py-md-0 mt-2">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-primary"]} ${THEME["text-white"]}`}>
                <span className="mai-leaf-outline"></span>
              </div>
              <p><span>Ear discharge</span></p>
            </div>
          </div>

          <div className="col-md-3 py-3 py-md-0 mt-2">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-primary"]} ${THEME["text-white"]}`}>
                <span className="mai-leaf-outline"></span>
              </div>
              <p><span>Back Ache</span></p>
            </div>
          </div>

          <div className="col-md-3 py-3 py-md-0 mt-2">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-primary"]} ${THEME["text-white"]}`}>
                <span className="mai-leaf-outline"></span>
              </div>
              <p><span>Sciatica</span></p>
            </div>
          </div>

          <div className="col-md-3 py-3 py-md-0 mt-2">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-primary"]} ${THEME["text-white"]}`}>
                <span className="mai-leaf-outline"></span>
              </div>
              <p><span>Tumor</span></p>
            </div>
          </div>

          <div className="col-md-3 py-3 py-md-0 mt-2">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-primary"]} ${THEME["text-white"]}`}>
                <span className="mai-leaf-outline"></span>
              </div>
              <p><span>Gastric Problem</span></p>
            </div>
          </div>

          <div className="col-md-3 py-3 py-md-0 mt-2">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-primary"]} ${THEME["text-white"]}`}>
                <span className="mai-leaf-outline"></span>
              </div>
              <p><span>Alopecia (Hair fall)</span></p>
            </div>
          </div>

          <div className="col-md-3 py-3 py-md-0 mt-2">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-primary"]} ${THEME["text-white"]}`}>
                <span className="mai-leaf-outline"></span>
              </div>
              <p><span>Infertility</span></p>
            </div>
          </div>

          <div className="col-md-3 py-3 py-md-0 mt-2">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-primary"]} ${THEME["text-white"]}`}>
                <span className="mai-leaf-outline"></span>
              </div>
              <p><span>Obesity</span></p>
            </div>
          </div>

          <div className="col-md-3 py-3 py-md-0 mt-2">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-primary"]} ${THEME["text-white"]}`}>
                <span className="mai-leaf-outline"></span>
              </div>
              <p><span>Night fall</span></p>
            </div>
          </div>

          <div className="col-md-3 py-3 py-md-0 mt-2">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-primary"]} ${THEME["text-white"]}`}>
                <span className="mai-leaf-outline"></span>
              </div>
              <p><span>Impotence</span></p>
            </div>
          </div>

          <div className="col-md-3 py-3 py-md-0 mt-2">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-primary"]} ${THEME["text-white"]}`}>
                <span className="mai-leaf-outline"></span>
              </div>
              <p><span>Constipation</span></p>
            </div>
          </div>

          <div className="col-md-3 py-3 py-md-0 mt-2">
            <div className={`${THEME["card-service"]} ${THEME.wow} ${THEME.fadeInUp}`}>
              <div className={`${THEME["circle-shape"]} ${THEME["bg-primary"]} ${THEME["text-white"]}`}>
                <span className="mai-leaf-outline"></span>
              </div>
              <p><span>Other</span></p>
            </div>
          </div>


        </div>
      </div>
    </div>

  <div id="makeEnquiry" ref={ref}></div>
  <Enquiry  />
   {/* <!-- .page-section --> */}

  <div  className={`${THEME["page-section"]} ${THEME["banner-home"]} ${THEME["bg-image"]}`} style={{backgroundImage: "url(banner-pattern.svg)",marginBottom:"-50px",display:"none"}}>
    <div class="container py-5 py-lg-0">
      <div class="row align-items-center">
        <div class="col-lg-4 wow zoomIn">
          <div class={`${THEME["img-banner"]} d-none d-lg-block`}>
            <img src="mobile_app.png" alt="" />
          </div>
        </div>
        <div class="col-lg-8 wow fadeInRight">
          <h1 class="font-weight-normal mb-3">Get easy access of all features using One Health Application</h1>
          <a href="#"><img src="google_play.svg" alt="" /></a>
          <a href="#" class="ml-2"><img src="app_store.svg" alt="" /></a>
        </div>
      </div>
    </div>
  </div> 
  {/* <!-- .banner-home -->   */}
        
        
        </div>

        </Base>
    )
}
export default Store