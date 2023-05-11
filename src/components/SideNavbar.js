import { NavLink as ReactLink, useNavigate } from "react-router-dom"
import { useState } from "react";
import { Button, Container, Nav, Navbar , NavbarBrand, NavItem, NavLink} from "reactstrap"
import { doLogout, getCurrentUserDetail, isLogedIn } from "../auth"
import { sidebarToggler } from "../services/sidebar-service"
import PrescriptionOrder from "./PrescriptionOrder";

const SideNavbar=()=>{
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    var navigate = useNavigate()
    const logOut=()=>{
            doLogout(()=>{
                isLogedIn();   
            })
            navigate("/")
    }

    return (
        <div className='' style={{display:"none"}} id="sideNavbar">
            <Container className="mb-5" >
            <Button onClick={()=>sidebarToggler()} className="ml-5 pl-5 btn-dark" style={{float:"right"}}><i class="fas fa-times"></i></Button>
            </Container>
            
            <Navbar dark>
                <NavbarBrand className="text-center">
                <i class="fas fa-user-circle fa-3x"> </i>
                <br />
                {
                     isLogedIn() &&(
                        <>
                        <p style={{whiteSpace:"break-spaces"}} onClick={()=>navigate("/profile")} >{  getCurrentUserDetail().name}</p>
                        </>
                        ) 
                }
                {
                                    !isLogedIn() && (
                                        <>
                                        <p onClick={()=>navigate("/login")} type="button">Sign in</p>
                                        </>
                                    )
                                }
                </NavbarBrand>

                <Nav navbar>
                {
                    isLogedIn() && (
                        <>
                        
                        <NavItem className="sidebarItem">
                        <NavLink className="p-1" tag={ReactLink} onClick={()=>logOut()} ><i class="fas fa-sign-out-alt"></i> Logout</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink className="p-1" tag={ReactLink} to="#"  onClick={()=>toggle()}><i class="fas fa-camera"></i> Prescription</NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink className="p-1" tag={ReactLink} to="/patients" ><i class="fas fa-user-shield"></i> Patients</NavLink>
                        </NavItem>
                        <NavItem   className="sidebarItem">
                        <NavLink className="p-1" tag={ReactLink} to="/myorders"><i class="fas fa-box-open"></i> My Orders</NavLink>
                        </NavItem>
                        <NavItem   className="sidebarItem">
                        <NavLink style={{whiteSpace:"nowrap"}} className="p-1" tag={ReactLink} to="/consultation"><i class="fas fa-stethoscope"></i> Dr Consultation</NavLink>
                        </NavItem>
                        <NavItem   className="sidebarItem">
                        <NavLink className="p-1" tag={ReactLink} to="/myappointments"><i class="fas fa-handshake"></i> Appointments</NavLink>
                        </NavItem>
                        </>
                    )
                }    

                <NavItem  className="sidebarItem">
                <NavLink className="p-1" tag={ReactLink} to="/"><i class="fas fa-home"></i> Home</NavLink>
                </NavItem>
                <NavItem  className="sidebarItem">
                <NavLink className="p-1" tag={ReactLink} to="/cart"><i class="fas fa-shopping-cart"></i> Cart</NavLink>
                </NavItem>
                <NavItem  className="sidebarItem">
                <NavLink className="p-1" tag={ReactLink} to="/home/0"><i class="fas fa-prescription-bottle-alt"></i> Buy Medicine</NavLink>
                </NavItem>

                </Nav>
                
            </Navbar>
            <PrescriptionOrder props={[toggle,modal]} ></PrescriptionOrder>
        </div>
    )
}

export default SideNavbar