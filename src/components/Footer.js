import { NavLink, useNavigate } from "react-router-dom"
import { NavItem } from "reactstrap"

const Footer=()=>{
    let navigate = useNavigate()
    return (
        <div className="container-fluid bg-dark text-secondary mt-5 pt-5" style={{zIndex:"-10"}}>
        <div className="row px-xl-5 pt-5">
            <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
            <h5 className="text-secondary text-uppercase mb-4">Get In Touch</h5>
                <p className="mb-4">HomeoRx | Online Doctor Consultancy and Medicine</p>
                <p className="mb-2"><i class="fa fa-map-marker-alt text-primary mr-3"></i>HomeoRx (Divine Health Care), Wazirabad, Sector 52, Gurgaon, Haryana, 122003</p>
                <p className="mb-2"><i class="fa fa-envelope text-primary mr-3"></i>info@homeorx.in</p>
                <p className="mb-0"><i class="fa fa-phone-alt text-primary mr-3"></i>+91 8929248031</p>
            </div>
            <div className="col-lg-8 col-md-12">
                <div className="row">
                    <div className="col-md-4 mb-5">
                        <h5 className="text-secondary text-uppercase mb-4">Quick Shop</h5>
                        <div className="d-flex flex-column justify-content-start">
                        <NavItem style={{listStyle:"none"}} className="mb-2" >
                                <NavLink to={"/"} className="text-secondary"><i class="fa fa-angle-right mr-2"></i>Home</NavLink>
                            </NavItem>
                            <NavItem style={{listStyle:"none"}} className="mb-2" >
                                <NavLink to={"/cart"} className="text-secondary"><i class="fa fa-angle-right mr-2"></i>Shopping Cart</NavLink>
                            </NavItem>
                            <NavItem style={{listStyle:"none"}} className="mb-2" >
                                <NavLink to={"/home/0"} className="text-secondary"><i class="fa fa-angle-right mr-2"></i>Our Products</NavLink>
                            </NavItem>
                            <NavItem style={{listStyle:"none"}}>
                                <NavLink to={"/return-policy"} className="text-secondary mb-2"><i class="fa fa-angle-right mr-2"></i>Return Policy</NavLink>
                            </NavItem>
                            <NavItem style={{listStyle:"none"}}>
                                <NavLink to={"/privacy-policy"} className="text-secondary mb-2"><i class="fa fa-angle-right mr-2"></i>Privacy Policy</NavLink>
                            </NavItem>
                        </div>
                    </div>
                    <div className="col-md-4 mb-5">
                        <h5 className="text-secondary text-uppercase mb-4">My Account</h5>
                        <div className="d-flex flex-column justify-content-start">

                            <NavItem style={{listStyle:"none"}} className="mb-2" >
                                <NavLink to={"/"} className="text-secondary"><i class="fa fa-angle-right mr-2"></i>Home</NavLink>
                            </NavItem>
                            <NavItem style={{listStyle:"none"}} className="mb-2" >
                                <NavLink to={"/cart"} className="text-secondary"><i class="fa fa-angle-right mr-2"></i>Shopping Cart</NavLink>
                            </NavItem>
                            <NavItem style={{listStyle:"none"}} className="mb-2" >
                                <NavLink to={"/home/0"} className="text-secondary"><i class="fa fa-angle-right mr-2"></i>Our Products</NavLink>
                            </NavItem>
                            {/* <NavItem style={{listStyle:"none"}}>
                                <NavLink to={"/doctor-registration"} className="text-secondary mb-2"><i class="fa fa-angle-right mr-2"></i>Doctor Registration</NavLink>
                            </NavItem> */}
                            <NavItem style={{listStyle:"none"}}>
                                <NavLink to={"/contactus"} className="text-secondary mb-2"><i class="fa fa-angle-right mr-2"></i>Contact Us</NavLink>
                            </NavItem>
                            <NavItem style={{listStyle:"none"}}>
                                <NavLink to={"/aboutus"} className="text-secondary mb-2"><i class="fa fa-angle-right mr-2"></i>About Us</NavLink>
                            </NavItem>
                        </div>
                    </div>
                    <div className="col-md-4 mb-5">
                        <h5 className="text-secondary text-uppercase mb-4">Get In Touch</h5>
                        <p>Login or Signup in order to full access our services</p>

                                    <button onClick={()=>navigate("/signup")} className="btn btn-primary">Sign Up</button>
                                    <button onClick={()=>navigate("/login")} className="btn btn-primary ml-1">Sign In</button>
                                    <br></br>

                        {/* <h6 className="text-secondary text-uppercase mt-4 mb-3">Follow Us</h6>
                        <div className="d-flex">
                            <a className="btn btn-primary btn-square mr-2" href="#"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-primary btn-square mr-2" href="#"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-primary btn-square mr-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                            <a className="btn btn-primary btn-square" href="#"><i className="fab fa-instagram"></i></a>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
        <div className="row border-top mx-xl-5 py-4" style={{borderCcolor: "rgba(256, 256, 256, .1) !important;"}}>
            <div className="col-md-6 px-xl-0">
                <p class="mb-md-0 text-center text-md-left text-secondary">
                    &copy; <a className="text-primary" href="www.homeorx.in">HomeoRx</a>. All Rights Reserved.
                </p>
            </div>
            <div className="col-md-6 px-xl-0 text-center text-md-right">
                <img className="img-fluid" src="img/payments.png" alt="" />
            </div>
        </div>
    </div>
    )
}
export default Footer