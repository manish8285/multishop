import { useState } from "react";
import Footer from "./Footer";
import HomeNavbar from "./HomeNavbar";
import PrescriptionOrder from "./PrescriptionOrder";
import SideNavbar from "./SideNavbar";
import TopNavbar from "./TopNavbar";

const Base=({children})=>{

    // document.title="MULTISHOP | Best Product cheap  Price - Diwali Offer"
    // document.querySelector('meta[name="description"]').setAttribute("content", "Get Best Deal On Diwali Products with Best Quality | Free home Delivery");
    return(
        <div>
                    <SideNavbar  />
                    <div className=""  id="bodyArea">
                    <TopNavbar />
                    {children}

                    <Footer />
                    </div>  
                    
            </div>
        
    )
}

export default Base;