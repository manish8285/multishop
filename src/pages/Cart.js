import { useEffect, useState } from "react"
import Base from "../components/Base"
import { AddToCart, GetCart, RemoveFromCart, SubstractFromCart } from "../services/cart-service"
import { BASE_URL, DRIVE_IMAGE_URL } from "../services/helper"
import { Navigate, useNavigate } from "react-router-dom";
import { GetMyDeliveryCharge } from "../services/order-service";

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
        setSubtotal(total+shipping)
    }

    const calculateDeliveryCharge=()=>{
        const pincode=document.getElementById("pincode").value
        if(pincode!=""){
            console.log(pincode)
            GetMyDeliveryCharge(pincode).then(price=>{
                setShipping(price);
            }).catch(error=>{
                console.log(error)
            })
        }
    }
    const validatePinCode=(event)=>{
       let pincode =event.target.value
        if(pincode.toString().length >=6){
            calculateDeliveryCharge()
        }
    }

    useEffect(()=>{
        updateSubTotal()
        calculateDeliveryCharge()
    },[mycart])


    return (
        <Base>
        <>
        <div className="container-fluid mt-3">
        <div className="row px-xl-5">
            <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                    <a className="breadcrumb-item text-dark" onClick={()=>navigate("/")} >Home</a>
                    <a className="breadcrumb-item text-dark" >Cart</a>
                </nav>
            </div>
        </div>
    </div>

            <div className="container-fluid mt-2">
        <div className="row px-xl-5">
            <div className="col-lg-8 table-responsive mb-5">
                <table className="table table-light table-borderless table-hover text-center mb-0">
                    <thead className="thead-dark">
                        <tr>
                            <th>Products</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody className="align-middle">
                        {
                            mycart.cartlist.map((item,index)=>(

                                <tr key={index}>
                            <td className="align-middle"><img src={DRIVE_IMAGE_URL+item.product.images[0].name} alt="product image" style={{width: "50px"}} /> {item.product.name}</td>
                            <td className="align-middle">{item.product.price}</td>
                            <td className="align-middle">
                                <div className="input-group quantity mx-auto" style={{width: "100px"}}>
                                    <div className="input-group-btn">
                                        <button onClick={()=>{SubstractFromCart(item.product.id)}} className="btn btn-sm btn-primary btn-minus" >
                                        <i className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                    <input type="text" className="form-control form-control-sm bg-secondary border-0 text-center" value={item.quantity} />
                                    <div className="input-group-btn">
                                        <button onClick={()=>AddToCart(item.product)} className="btn btn-sm btn-primary btn-plus">
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </td>
                            <td className="align-middle">{item.product.price*item.quantity}</td>
                            <td className="align-middle"><button onClick={()=>RemoveFromCart(item.product.id)} className="btn btn-sm btn-danger"><i className="fa fa-times"></i></button></td>
                        </tr>
                            ))
                        }
                        
                    </tbody>
                    
                    
                    
                </table>
                <button onClick={()=>navigate("/")} className="text-center btn btn-block btn-primary font-weight-bold my-3 py-3">{(mycart.cartlist.length==0)?`You don't have any item in your cart. Add ?`:`Add More Item`}</button>
            </div>
            <div className="col-lg-4">
                <form  className="mb-30">
                    <div className="input-group">
                        <input type="number" id="pincode" onChange={(event)=>validatePinCode(event)} className="form-control border-0 p-4" placeholder="Enter PIN Code To Check Shipping Fee" />
                        {/* <div class="input-group-append">
                            <button onClick={()=>calculateDeliveryCharge()} class="btn btn-primary">Apply</button>
                        </div> */}
                    </div>
                </form>
                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Cart Summary</span></h5>
                <div className="bg-light p-30 mb-5">
                    <div className="border-bottom pb-2">
                        <div className="d-flex justify-content-between mb-3">
                            <h6>Subtotal</h6>
                            <h6>₹{subtotal}</h6>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h6 className="font-weight-medium">Shipping</h6>
                            <h6 className="font-weight-medium"> ₹{shipping}</h6>
                        </div>
                    </div>
                    <div className="pt-2">
                        <div className="d-flex justify-content-between mt-2">
                            <h5>Total</h5>
                            <h5>₹{shipping+subtotal}</h5>
                        </div>
                        <button onClick={()=>navigate("/checkout")} className="btn btn-block btn-primary font-weight-bold my-3 py-3">Proceed To Checkout</button>
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