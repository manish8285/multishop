import { DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavItem, NavLink, UncontrolledDropdown } from "reactstrap"
import { NavLink as ReactLink, useNavigate } from "react-router-dom"
import { sidebarToggler } from "../services/sidebar-service"
import { doLogout, getCurrentUserDetail, isLogedIn } from "../auth"

const TopNavbar=()=>{
    let navigate = useNavigate()
    //console.log(isLogedIn())

    return (
        <Navbar dark
        color="dark"
        >
            <NavbarBrand onClick={()=>{sidebarToggler()}}>
                <i class="fas fa-bars"></i>
            </NavbarBrand>
            <Nav>
                <NavItem>
                <NavLink tag={ReactLink} to="/" ><i class="fas fa-home"></i> Home</NavLink>
                </NavItem>
                {
                    isLogedIn() && (<NavItem className="dropdown">
                        <UncontrolledDropdown nav inNavbar className='mr-5'>
                       <DropdownToggle nav caret className=''><i class="far fa-user"></i> {getCurrentUserDetail().name} <i class="fas fa-chevron-down"></i></DropdownToggle>
                       <DropdownMenu >
                         <DropdownItem onClick={()=>navigate("/profile")}  ><i className="fas fa-user-circle"> </i> Profile </DropdownItem>
                       
                         <DropdownItem onClick={()=>{doLogout(()=>{isLogedIn();navigate("/login")})}}  >Logout <i class="fas fa-sign-out-alt"></i> </DropdownItem>
                       </DropdownMenu>
                     </UncontrolledDropdown>
                    </NavItem>)
                }

{
                    !isLogedIn() && (<NavItem className="dropdown">
                        <NavLink onClick={()=>navigate("/login")} ><i class="far fa-user"></i> Log In</NavLink>
                    </NavItem>)
                }
            </Nav>
        </Navbar>
    )
}
export default TopNavbar