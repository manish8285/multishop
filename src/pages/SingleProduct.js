
import { useNavigate } from "react-router-dom"
import Base from "../components/Base"
import SingleProductComponent from "../components/SingleProductComponent"


const SingleProduct=()=>{
    let navigate=useNavigate()

    return (
        <Base>
        <>
        <div class="container-fluid mt-3">
        <div class="row px-xl-5">
            <div class="col-12">
                <nav class="breadcrumb bg-light mb-30">
                    <a class="breadcrumb-item text-dark" onClick={()=>navigate("/")} >Home</a>
                    <a class="breadcrumb-item text-dark"  >Product</a>
                </nav>
            </div>
        </div>
    </div>
    
        <SingleProductComponent />
        
        </>
        </Base>
    )
}
export default SingleProduct