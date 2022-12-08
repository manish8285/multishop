import { useNavigate } from "react-router-dom"
import { Button, FormGroup, Input, Nav, Navbar } from "reactstrap"
import AllProducts from "../components/AllProducts"
import Base from "../components/Base"
import OwlCarousel from 'react-owl-carousel';
import { useEffect, useState } from "react";
import { getAllCategories } from "../services/product-service";
import Footer from "../components/Footer";

const Landing=()=>{
    let navigate =useNavigate()

    const [categories,setCategories]=useState([])

    useEffect(()=>{
        getAllCategories().then(data=>{
            setCategories(data)
            console.log(categories)
        },[])
    },[])
    useEffect(()=>{
        getAllCategories().then(data=>{
            //setCategories(data)
            console.log(categories)
        },[])
    },[categories])

    const goToCategory=()=>{
       const catId= document.getElementById("category").value
        navigate("/category/"+catId)
    }

    const options = {
        margin: 30,
        responsiveClass: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            600: {
                items: 2,
            },
            700: {
                items: 3,
            },
            1000: {
                items: 5,
            }
        },
      };
    return(
        <Base>
            <>

            <Navbar dark color="dark mb-5">
            <Nav className="w-100 row">
                <FormGroup className="w-100 input-group">
                {/* <Input type="select" className="mx-md-1 bg-primary"  style={{maxWidth:"50px"}}>
                    
                    {
                        categories?.map((cat)=>{
                            <option  onClick={()=>navigate("/category/"+cat.id)} > {cat.name}</option>
                        })
                    }
                </Input> */}
                <Input id="category" onChange={()=>goToCategory()} type="select" className="bg-primary mx-md-1" style={{maxWidth:"50px"}} >
                                        <option value="home"  disabled selected > ALL </option>
                                        {
                                            categories.map((category,index)=>(
                                                <option className="px-1" key={index} id={category.id}  value={category.id}  >{category.name}</option>
                                            ))
                                        }
                                        
                                    </Input>
                <Input type="text" className="form-control" id="searchBox" placeholder="Multishop | Search for products"  />
                <div class="input-group-append" onClick={()=>navigate(`/home/${document.getElementById("searchBox").value}`)} >
                                 <span class="input-group-text bg-transparent text-primary">
                                    <i class="fa fa-search"></i>
                                </span>
                             </div>
                </FormGroup>
            </Nav>

        </Navbar>

            <div class="container-fluid mb-3 mt-5">
        <div class="row px-xl-5">
            <div class="col-lg-8">
                <div id="header-carousel" class="carousel slide carousel-fade mb-30 mb-lg-0" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#header-carousel" data-slide-to="0" class="active"></li>
                        <li data-target="#header-carousel" data-slide-to="1"></li>
                        <li data-target="#header-carousel" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item position-relative active" style={{height: "430px"}}>
                            <img class="position-absolute w-100 h-100" src="img/Personal_Care.webp" style={{objectFit:"cover"}} />
                            <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div class="p-3" style={{"max-width":"700px;"}}>
                                    <h1 class="display-4 text-white mb-3 animate__animated animate__fadeInDown">Beauti Products</h1>
                                    <p class="mx-md-5 px-5 animate__animated animate__bounceIn">Buy Homoeopathic natural personal care products</p>
                                    <a class="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" onClick={()=>navigate("/home/facewash")} >Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item position-relative" style={{height: "430px"}}>
                            <img class="position-absolute w-100 h-100" src="img/pain_killer.webp" style={{objectFit: "cover"}} />
                            <div class="carousel-caption d-flex flex-column align-items-center justify-content-center" >
                                <div class="p-3" style={{maxWidth: "700px"}}>
                                    <h1 class="display-4 text-white mb-3 animate__animated animate__fadeInDown">Pain Killer</h1>
                                    <p class="mx-md-5 px-5 animate__animated animate__bounceIn">Buy Most Effective Homoeopathic Pain killer Oil and Medicine</p>
                                    <a class="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" onClick={()=>navigate("/home/pain")}>Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item position-relative" style={{height: "430px"}}>
                            <img class="position-absolute w-100 h-100" src="img/cream_adven.webp" style={{objectFit: "cover"}} />
                            <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div class="p-3" style={{maxWidth: "700px"}}>
                                    <h1 class="display-4 text-white mb-3 animate__animated animate__fadeInDown">Multipurpose Cream</h1>
                                    <p class="mx-md-5 px-5 animate__animated animate__bounceIn">Goodness of Homoeopathic that provide healthy skin and Natural Glow</p>
                                    <a class="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" onClick={()=>navigate("/home/cream")}>Shop Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="product-offer mb-30" style={{height: "200px"}} >
                    <img class="img-fluid" src="img/ml30.webp" alt="" />
                    <div class="offer-text">
                        <h6 class="text-white text-uppercase">Save 20%</h6>
                        <h3 class="text-white mb-3">All Homoeopathic Medicine</h3>
                        <a onClick={()=>navigate("/home/0")} class="btn btn-primary">Shop Now</a>
                    </div>
                </div>
                <div class="product-offer mb-30" style={{height: "200px"}}>
                    <img class="img-fluid" src="img/dropper.jpg" alt="" />
                    <div class="offer-text">
                        <h6 class="text-white text-uppercase">Save 50%</h6>
                        <h3 class="text-white mb-3">All Loose Medicine</h3>
                        <a onClick={()=>navigate("/home/0")} class="btn btn-primary">Shop Now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <div class="container-fluid pt-5">
        <div class="row px-xl-5 pb-3">
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                    <h1 class="fa fa-check text-primary m-0 mr-3"></h1>
                    <h5 class="font-weight-semi-bold m-0">Natural Product</h5>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                    <h1 class="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
                    <h5 class="font-weight-semi-bold m-0">Fast Shipping</h5>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                    <h1 class="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
                    <h5 class="font-weight-semi-bold m-0">0 Side Effect</h5>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="d-flex align-items-center bg-light mb-4" style={{padding: "30px"}}>
                    <h1 class="fa fa-phone-volume text-primary m-0 mr-3"></h1>
                    <h5 class="font-weight-semi-bold m-0">24/7 Support</h5>
                </div>
            </div>
        </div>
    </div>

    {/* category start */}

    <div class="container-fluid pt-5">
        <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span class="bg-secondary pr-3">Categories</span></h2>
        <div class="row px-xl-5 pb-3"  >
            <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                <a class="text-decoration-none" onClick={()=>navigate("/category/1")} >
                    <div class="cat-item d-flex align-items-center mb-4">
                        <div class="overflow-hidden" style={{width: "100px", height: "100px"}}>
                            <img class="img-fluid" src="img/aconite30.webp" alt="" />
                        </div>
                        <div  class="flex-fill pl-3">
                            <h6>30 ml Liquid</h6>
                            <small class="text-body">100 Products</small>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                <a class="text-decoration-none" onClick={()=>{navigate("/home/Reckweg")}}>
                    <div class="cat-item img-zoom d-flex align-items-center mb-4">
                        <div class="overflow-hidden" style={{width: "100px", height: "100px"}}>
                            <img class="img-fluid" src="img/r18.webp" alt="" />
                        </div>
                        <div class="flex-fill pl-3">
                            <h6>Reckweg Series R</h6>
                            <small class="text-body">100 Products</small>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                <a class="text-decoration-none" href="">
                    <div class="cat-item img-zoom d-flex align-items-center mb-4">
                        <div class="overflow-hidden" style={{width: "100px", height: "100px"}}>
                            <img class="img-fluid" src="img/bc12.webp" alt="" />
                        </div>
                        <div class="flex-fill pl-3">
                            <h6>Bio Combination</h6>
                            <small class="text-body">100 Products</small>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                <a class="text-decoration-none" href="">
                    <div class="cat-item img-zoom d-flex align-items-center mb-4">
                        <div class="overflow-hidden" style={{width: "100px", height: "100px"}}>
                            <img class="img-fluid" src="img/aconiteq.webp" alt="" />
                        </div>
                        <div class="flex-fill pl-3">
                            <h6>Mother Tincture</h6>
                            <small class="text-body">100 Products</small>
                        </div>
                    </div>
                </a>
            </div>
            
        </div>
    </div>

    <div class="container-fluid pt-5 pb-3">
        <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span class="bg-secondary pr-3">Featured Products</span></h2>
        <div class="row px-xl-5">
            <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div class="product-item bg-light mb-4">
                    <div class="product-img position-relative overflow-hidden text-center">
                        <img class="img-fluid w-100" src="img/alfa-alfa-tonic.png" style={{maxHeight:"300px",maxWidth:"200px"}} alt="" />
                    </div>
                    <div class="text-center py-4" onClick={()=>navigate("/home/alfalfa")} >
                        <a class="h6 text-decoration-none text-truncate" >Homeopathic Energy Tonic</a>
                        <div class="d-flex align-items-center justify-content-center mt-2">
                            {/* <h5>₹125.00</h5><h6 class="text-muted ml-2"><del>₹150.00</del></h6> */}
                        </div>
                        <div class="d-flex align-items-center justify-content-center mb-1">
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small>(41)</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div class="product-item bg-light mb-4">
                    <div class="product-img position-relative overflow-hidden text-center">
                        <img class="img-fluid w-100" src="img/livtsbl.jpg" style={{maxHeight:"300px",maxWidth:"200px"}}  alt="" />
                    </div>
                    <div class="text-center py-4" onClick={()=>navigate("/home/liver")} >
                        <a class="h6 text-decoration-none text-truncate">Homeopathic Liver Tonic</a>
                        <div class="d-flex align-items-center justify-content-center mt-2">
                            {/* <h5>₹110.00</h5><h6 class="text-muted ml-2"><del>₹150.00</del></h6> */}
                        </div>
                        <div class="d-flex align-items-center justify-content-center mb-1">
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star-half-alt text-primary mr-1"></small>
                            <small>(92)</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div class="product-item bg-light mb-4">
                    <div class="product-img position-relative overflow-hidden text-center">
                        <img class="img-fluid w-100" src="img/stobalsbl.jpg" style={{maxHeight:"300px",maxWidth:"200px"}} alt="" />
                    </div>
                    <div class="text-center py-4" onClick={()=>navigate("/home/cough")} >
                        <a class="h6 text-decoration-none text-truncate" >Homeopathic Cough Syrup</a>
                        <div class="d-flex align-items-center justify-content-center mt-2">
                            {/* <h5>₹55.00</h5><h6 class="text-muted ml-2"><del>₹100.00</del></h6> */}
                        </div>
                        <div class="d-flex align-items-center justify-content-center mb-1">
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star-half-alt text-primary mr-1"></small>
                            <small class="far fa-star text-primary mr-1"></small>
                            <small>(73)</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div class="product-item bg-light mb-4" onClick={()=>navigate("/home/jaborandi")}>
                    <div class="product-img position-relative overflow-hidden text-center">
                        <img class="img-fluid w-100" style={{maxHeight:"300px",minHeight:"250px",maxWidth:"200px"}} src="img/jaborandi.jpg" alt="" />
                    </div>
                    <div class="text-center py-4">
                        <a class="h6 text-decoration-none text-truncate" href="">Homeopathic Hair Oil</a>
                        <div class="d-flex align-items-center justify-content-center mt-2">
                            {/* <h5>₹123.00</h5><h6 class="text-muted ml-2"><del>₹123.00</del></h6> */}
                        </div>
                        <div class="d-flex align-items-center justify-content-center mb-1">
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star-half-alt text-primary mr-1"></small>
                            <small>(88)</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div class="product-item bg-light mb-4">
                    <div class="product-img position-relative overflow-hidden text-center">
                        <img class="img-fluid w-100" style={{maxHeight:"300px",minHeight:"250px",maxWidth:"200px"}} src="img/heklalava.jpg" alt="" />
                    </div>
                    <div class="text-center py-4">
                        <a class="h6 text-decoration-none text-truncate" onClick={()=>navigate("/home/toothpaste")}>Homoeopathic Toothpaste</a>
                        <div class="d-flex align-items-center justify-content-center mt-2">
                            {/* <h5>₹123.00</h5><h6 class="text-muted ml-2"><del>₹123.00</del></h6> */}
                        </div>
                        <div class="d-flex align-items-center justify-content-center mb-1">
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small>(74)</small>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div class="product-item bg-light mb-4">
                    <div class="product-img position-relative overflow-hidden text-center">
                        <img class="img-fluid w-100" style={{maxHeight:"300px",minHeight:"250px",maxWidth:"200px"}} src="img/aquiplus.webp" alt="" />
                    </div>
                    <div class="text-center py-4">
                        <a class="h6 text-decoration-none text-truncate" onClick={()=>navigate("/home/cream")}>Homoeopathic Cream</a>
                        <div class="d-flex align-items-center justify-content-center mt-2">
                            {/* <h5>₹123.00</h5><h6 class="text-muted ml-2"><del>₹123.00</del></h6> */}
                        </div>
                        <div class="d-flex align-items-center justify-content-center mb-1">
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star-half-alt text-primary mr-1"></small>
                            <small class="far fa-star text-primary mr-1"></small>
                            <small>(61)</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div class="product-item bg-light mb-4">
                    <div class="product-img position-relative overflow-hidden text-center">
                        <img class="img-fluid w-100" style={{maxHeight:"300px",maxWidth:"200px"}} src="img/aquiplusfacewash.jpg" alt="" />
                    </div>
                    <div class="text-center py-4">
                        <a class="h6 text-decoration-none text-truncate" onClick={()=>navigate("/home/facewash")}>Homoeopathic Facewash</a>
                        <div class="d-flex align-items-center justify-content-center mt-2">
                            {/* <h5>₹123.00</h5><h6 class="text-muted ml-2"><del>₹123.00</del></h6> */}
                        </div>
                        <div class="d-flex align-items-center justify-content-center mb-1">
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="fa fa-star text-primary mr-1"></small>
                            <small class="far fa-star text-primary mr-1"></small>
                            <small class="far fa-star text-primary mr-1"></small>
                            <small>(58)</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <div class="container-fluid pt-5 pb-3">
        <div class="row px-xl-5">
            <div class="col-md-6">
                <div class="product-offer mb-30" style={{height: "300px"}}>
                    <img class="img-fluid" src="img/doctor1.jpg" alt="" />
                    <div class="offer-text">
                        <h6 class="text-white text-uppercase">Save 90%</h6>
                        <h3 class="text-white mb-3">Doctor Cosultancy at Just ₹200</h3>
                        <a disabled onClick={()=>navigate("/doctors")} class="btn btn-primary">Contact Now</a>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="product-offer mb-30" style={{height: "300px"}}>
                    <img class="img-fluid" src="img/Blood-test.png" alt="" />
                    <div class="offer-text">
                        <h6 class="text-white text-uppercase">Save 50%</h6>
                        <h3 class="text-white mb-3">LAB TESTS AT HOME</h3>
                        <a disabled href="" class="btn btn-primary">Schedule</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Offer End --> */}


    

    <div className="container-fluid py-5 px-xl-5 mx-xl-2">
        <OwlCarousel className="slider-items owl-carousel vendor-carousel" {...options}>
                    <div class="item bg-light p-4">
                        <img src="img/sbl.jpeg" alt="" />
                    </div>
                    <div class="item bg-light p-4">
                        <img src="img/adven.png" alt="" />
                    </div>
                    <div class="item bg-light p-4">
                        <img src="img/reckeweg.jpg" alt="" />
                    </div>
                    <div class="item bg-light p-4">
                        <img src="img/wheezal.jpeg" alt="" />
                    </div>
                    <div class="item bg-light p-4">
                        <img src="img/schwabe.jpeg" alt="" />
                    </div>
                    <div class="item bg-light p-4">
                        <img src="img/bjain.webp"  alt="" />
                    </div>

        </OwlCarousel>
    </div>

            </>
            
        </Base>
    )
}

export default Landing