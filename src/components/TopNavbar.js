import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap"
import { NavLink as ReactLink } from "react-router-dom"
import { sidebarToggler } from "../services/sidebar-service"

const TopNavbar=()=>{
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
                <NavItem className="sidebarItem">
                    <NavLink tag={ReactLink} to="/cart"><i class="fas fa-shopping-cart"></i> My Cart</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    )
}
export default TopNavbar