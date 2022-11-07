import { useEffect, useState } from "react"
import Base from "../components/Base"
import { AddToCart, GetCart, RemoveFromCart, SubstractFromCart } from "../services/cart-service"
import { BASE_URL, DRIVE_IMAGE_URL } from "../services/helper"
import { Navigate, useNavigate } from "react-router-dom";

const Cart=()=>{
    const [mycart,setMycart]= useState(GetCart())
    const [subtotal,setSubtotal] = useState(0)
    const [shipping,setShipping] = useState(0)

    let navigate = useNavigate()

    window.addEventListener('cart',()=>{
        setMycart(GetCart())
    })

    const updateSubTotal=()=>{
        let total = 0
        mycart.cartlist.map((item)=>{
        total=total+item.product.price*item.quantity
        })
        setSubtotal(total)
    }
    useEffect(()=>{
        updateSubTotal()
    },[mycart])


    return (
        <Base>
        <>
        <div class="container-fluid mt-3">
        <div class="row px-xl-5">
            <div class="col-12">
                <nav class="breadcrumb bg-light mb-30">
                    <a class="breadcrumb-item text-dark" onClick={()=>navigate("/")} >Home</a>
                    <a class="breadcrumb-item text-dark" >Cart</a>
                </nav>
            </div>
        </div>
    </div>

            <div class="container-fluid mt-2">
        <div class="row px-xl-5">
            <div class="col-lg-8 table-responsive mb-5">
                <table class="table table-light table-borderless table-hover text-center mb-0">
                    <thead class="thead-dark">
                        <tr>
                            <th>Products</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody class="align-middle">
                        {
                            mycart.cartlist.map(item=>(

                                <tr>
                            <td class="align-middle"><img src={DRIVE_IMAGE_URL+item.product.images[0].name} alt="product image" style={{width: "50px"}} /> {item.product.name}</td>
                            <td class="align-middle">{item.product.price}</td>
                            <td class="align-middle">
                                <div class="input-group quantity mx-auto" style={{width: "100px"}}>
                                    <div class="input-group-btn">
                                        <button onClick={()=>{SubstractFromCart(item.product.id)}} class="btn btn-sm btn-primary btn-minus" >
                                        <i class="fa fa-minus"></i>
                                        </button>
                                    </div>
                                    <input type="text" class="form-control form-control-sm bg-secondary border-0 text-center" value={item.quantity} />
                                    <div class="input-group-btn">
                                        <button onClick={()=>AddToCart(item.product)} class="btn btn-sm btn-primary btn-plus">
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </td>
                            <td class="align-middle">{item.product.price*item.quantity}</td>
                            <td class="align-middle"><button onClick={()=>RemoveFromCart(item.product.id)} class="btn btn-sm btn-danger"><i class="fa fa-times"></i></button></td>
                        </tr>
                            ))
                        }
                        
                    </tbody>
                    
                    
                    
                </table>
                <button onClick={()=>navigate("/")} class="text-center btn btn-block btn-primary font-weight-bold my-3 py-3">{(mycart.cartlist.length==0)?`You don't have any item in your cart. Add ?`:`Add More Item`}</button>
            </div>
            <div class="col-lg-4">
                <form class="mb-30" action="">
                    <div class="input-group">
                        <input type="text" class="form-control border-0 p-4" placeholder="Coupon Code" />
                        <div class="input-group-append">
                            <button class="btn btn-primary">Apply Coupon</button>
                        </div>
                    </div>
                </form>
                <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-secondary pr-3">Cart Summary</span></h5>
                <div class="bg-light p-30 mb-5">
                    <div class="border-bottom pb-2">
                        <div class="d-flex justify-content-between mb-3">
                            <h6>Subtotal</h6>
                            <h6>Rs{subtotal}</h6>
                        </div>
                        <div class="d-flex justify-content-between">
                            <h6 class="font-weight-medium">Shipping</h6>
                            <h6 class="font-weight-medium">Rs{shipping}</h6>
                        </div>
                    </div>
                    <div class="pt-2">
                        <div class="d-flex justify-content-between mt-2">
                            <h5>Total</h5>
                            <h5>Rs{shipping+subtotal}</h5>
                        </div>
                        <button onClick={()=>navigate("/checkout")} class="btn btn-block btn-primary font-weight-bold my-3 py-3">Proceed To Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
        </Base>
        
    )
}
export default Cart