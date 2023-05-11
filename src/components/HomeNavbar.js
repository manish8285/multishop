import { NavLink, useNavigate } from "react-router-dom"
import { doLogout, getCurrentUserDetail, isLogedIn } from "../auth"

const HomeNavbar=()=>{
    var navigate = useNavigate()
    const logOut=()=>{
            doLogout(()=>{
                isLogedIn();   
            })
            navigate("/")
    }
    return(  
           
     <div>
                  
        <div class="container-fluid">
            <div class="row bg-secondary py-1 px-xl-5">
                <div class="col-lg-6 d-none d-lg-block">
                    <div class="d-inline-flex align-items-center h-100">
                        <a onClick={()=>navigate("/")} class="text-body mr-3" >Home</a>
                        <a onClick={()=>navigate("/cart")} class="text-body mr-3" >Cart</a>
                        <a onClick={()=>{navigate("/myorders")}} class="text-body mr-3" >My Orders</a>
                    </div>
                </div>
                <div class="col-lg-6 text-center text-lg-right">
                    <div class="d-inline-flex align-items-center">
                        <div class="btn-group">
                        {/* <button type="button" class="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">{ isLogedIn()? getCurrentUserDetail().name : ('My Account')}</button> */}
                            
                                {
                                
                                isLogedIn() &&(
                                <>
                                <button type="button" class="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">{  getCurrentUserDetail().name}</button>
                                <div class="dropdown-menu dropdown-menu-right">
                                <button onClick={()=>{navigate("/myorders")}} class="dropdown-item" type="button">My Orders</button>
                                <button onClick={()=>logOut()} class="dropdown-item" type="button">Logout</button>
                                </div>
                                </>
                                )


                                }
                            
                            
                                {
                                    !isLogedIn() && (
                                        <>
                                        <button type="button" class="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">My Account</button>
                                        <div class="dropdown-menu dropdown-menu-right">
                                        <button onClick={()=>navigate("/login")} class="dropdown-item" type="button">Sign in</button>
                                        <button onClick={()=>navigate("/signup")} class="dropdown-item" type="button">Sign up</button>
                                        </div>
                                        </>
                                    )
                                }
                            
                        </div>
                        
                    </div>
                    <div class="d-inline-flex align-items-center d-block d-lg-none">
                        <a  class="btn px-0 ml-2">
                            <i onClick={()=>navigate("/")} class="fas fa-home text-dark"></i>
                            
                        </a>
                        <a  onClick={()=>navigate("/cart")} class="btn px-0 ml-2">
                            <i class="fas fa-shopping-cart text-dark"></i>
                            
                        </a>
                    </div>
                </div>
            </div>

            <div class="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex manish-1">
                <div class="col-lg-4">
                    <a onClick={()=>navigate("/")} class="text-decoration-none">
                        <span class="h1 text-uppercase text-primary bg-dark px-2">Homeo</span>
                        <span class="h1 text-uppercase text-dark bg-primary px-2 ml-n1">Rx</span>
                    </a>
                </div>



                <div class="col-lg-4 col-6 text-right">
                    <p class="m-0">Customer Service</p>
                    <h5 class="m-0">+91 8285482825</h5>
                </div>
            </div>
        </div>
    
    
   
      
      
        
    </div>
    )
    
}

export default HomeNavbar