import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AddToCart, GetCart, SubstractFromCart } from "../services/cart-service"
import { BASE_URL, DRIVE_IMAGE_URL } from "../services/helper"
import { GetProductById } from "../services/product-service"


const SingleProductComponent=()=>{
    const {productId}=useParams()
   // console.log(productId)
    const [product,setProduct]=useState({"images":[]})
    let navigate = useNavigate()
    const [mycart,setMycart] = useState(GetCart)

    window.addEventListener('cart',()=>{setMycart(GetCart)})

    const fetchProduct=()=>{
        GetProductById(productId).then((data)=>{
            setProduct(data);
        }).catch((error)=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        fetchProduct(productId)
    },[])

    return(
        <>
        <div class="container-fluid pb-5 mt-3">
        <div class="row px-xl-5">
            <div class="col-lg-5 mb-30">
                
                        
                <img class="w-100 h-100" src={DRIVE_IMAGE_URL+product.images[0]?.name} alt="Image"/>
                        
               
            </div>
            <div class="col-lg-7 h-auto mb-30">
                <div class="h-100 bg-light p-30">
                    <h3>{product.name}</h3>
                    <div class="d-flex mb-3">
                        <div class="text-primary mr-2">
                            <small class="fas fa-star"></small>
                            <small class="fas fa-star"></small>
                            <small class="fas fa-star"></small>
                            <small class="fas fa-star-half-alt"></small>
                            <small class="far fa-star"></small>
                        </div>
                        <small class="pt-1">(99 Reviews)</small>
                    </div>
                    <h3>Rs {product.price}</h3><h6 class="text-muted ml-2"><del>Rs {product.mrp}</del></h6>
                    <p class="mb-4">{product.description?.substring(0,50)}</p>
                  
                
                    <div class="d-flex align-items-center mb-4 pt-2">
                        <div class="input-group quantity mr-3" style={{width: "130px"}}>
                            <div class="input-group-btn">
                                <button onClick={()=>{SubstractFromCart(product.id)}} class="btn btn-primary btn-minus">
                                    <i class="fa fa-minus"></i>
                                </button>
                            </div>
                            <input type="text" class="form-control bg-secondary border-0 text-center" value="1"/>
                            <div class="input-group-btn">
                                <button onClick={()=>AddToCart(product)} class="btn btn-primary btn-plus">
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <button onClick={()=>{AddToCart(product)}} class="btn btn-primary px-3"><i class="fa fa-shopping-cart mr-1"></i> Add To
                            Cart</button>
                    </div>
                    <div class="d-flex pt-2">
                        <strong class="text-dark mr-2">Share on:</strong>
                        <div class="d-inline-flex">
                            <a class="text-dark px-2" href="">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a class="text-dark px-2" href="">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a class="text-dark px-2" href="">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                            <a class="text-dark px-2" href="">
                                <i class="fab fa-pinterest"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row px-xl-5">
            <div class="col">
                <div class="bg-light p-30">
                    <div class="nav nav-tabs mb-4">
                        <a class="nav-item nav-link text-dark active" data-toggle="tab" href="#tab-pane-1">Images</a>
                        <a class="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-2">Description</a>
                        {/* <a class="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-3">Reviews (0)</a> */}
                    </div>
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="tab-pane-1">
                            <h4 class="mb-3">More Images</h4>
                            {
                            product.images.map((img)=>(
                                <img className={"img-fluid w-100"} key={img.id} src={DRIVE_IMAGE_URL+img.name} alt="Image"/>
                                ))
                            }
                        </div>
                        <div class="tab-pane fade" id="tab-pane-2">
                            <h4 class="mb-3">Product Description</h4>
                            <p>{product.description}</p>
                                <div class="row">
        
                            </div>
                        </div>
    
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div onClick={()=>navigate("/cart")} className="bg-dark p-2 floating-cart">
            <a  class="btn px-0 ml-3 d-flex">
                                <h6 className="text-primary mr-1">Buy Now | Go To Cart  </h6>
                                <i class="fas fa-shopping-cart text-primary fa-2x"></i>
                                <span style={{height:"50%"}} class="badge text-secondary border border-secondary rounded-circle">{mycart.cartlist.length}</span>
            </a>
    <div>
                        
                        </div>    
            </div>
    </>
    )
}
export default SingleProductComponent