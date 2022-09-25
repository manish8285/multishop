import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../services/helper"

const Product=({props})=>{
    let navigate = useNavigate()
    const product = props[0] 
    return(
        <div class="col-lg-4 col-md-6 col-sm-6 pb-1">
                        <div onClick={()=>navigate(`/product/${product.id}`)} class="product-item bg-light mb-4">
                            <div class="product-img position-relative overflow-hidden">
                                <img class="img-fluid w-100" src={BASE_URL+"images/products/"+product?.images[0]?.name} alt="" />
                                <div class="product-action">
                                    <button class="btn btn-outline-dark btn-square" onClick={()=>props[1](product)} ><i class="fa fa-shopping-cart"></i></button>
                                    <a class="btn btn-outline-dark btn-square" href=""><i class="far fa-heart"></i></a>
                                    <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-sync-alt"></i></a>
                                    <a class="btn btn-outline-dark btn-square" href=""><i class="fa fa-search"></i></a>
                                </div>
                            </div>
                            <div class="text-center py-4">
                                <a class="h6 text-decoration-none text-truncate" href="">{product.name}</a>
                                <div class="d-flex align-items-center justify-content-center mt-2">
                                    <h5>Rs {product.price}</h5><h6 class="text-muted ml-2"><del>Rs {product.mrp}</del></h6>
                                </div>
                                <div class="d-flex align-items-center justify-content-center mb-1">
                                    <small class="fa fa-star text-primary mr-1"></small>
                                    <small class="fa fa-star text-primary mr-1"></small>
                                    <small class="fa fa-star text-primary mr-1"></small>
                                    <small class="fa fa-star text-primary mr-1"></small>
                                    <small class="fa fa-star text-primary mr-1"></small>
                                    <small>({product.quantity})</small>
                                </div>
                            </div>
                        </div>
                    </div>
    )
}

export default Product