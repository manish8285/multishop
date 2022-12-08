import { NavLink as ReactLink, useNavigate } from "react-router-dom"
import { Button, Container, Nav, Navbar , NavbarBrand, NavItem, NavLink} from "reactstrap"
import { doLogout, getCurrentUserDetail, isLogedIn } from "../auth"
import { sidebarToggler } from "../services/sidebar-service"

const SideNavbar=()=>{
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
                <NavbarBrand className="text-centere">
                <i class="fas fa-user-circle fa-3x"> </i>
                <br />
                {
                     isLogedIn() &&(
                        <>
                        <p onClick={()=>navigate("/profile")} >{  getCurrentUserDetail().name}</p>
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
                        <NavItem   className="sidebarItem">
                        <NavLink className="p-1" tag={ReactLink} to="/myorders"><i class="fas fa-box-open"></i> My Orders</NavLink>
                        </NavItem>
                        <NavItem   className="sidebarItem">
                        <NavLink style={{whiteSpace:"nowrap"}} className="p-1" tag={ReactLink} to="/myappointments"><i class="fas fa-stethoscope"></i> Appointments</NavLink>
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
        </div>
    )
}

export default SideNavbar