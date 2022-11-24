import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Input, Label } from "reactstrap"
import { getCurrentUserDetail, isLogedIn } from "../auth"
import Base from "../components/Base"
import { ClearCart, GetCart } from "../services/cart-service"
import { privateAxios } from "../services/helper"
import { GetMyDeliveryCharge, PlaceOrderRequest, SaveCustomerAddress } from "../services/order-service"
import { login,getCutomer } from "../services/user_service"

const Checkout=()=>{
    let navigate =useNavigate()
    //if not login ask for login
    
    useEffect(()=>{
        if(!isLogedIn()){
            navigate("/login")
            
        }
    },[])


    
    const [myCart,setMycart]=useState(GetCart())
    const [shipping,setShipping] = useState(0)
    const [subtotal,setSubtotal] = useState(0)

    //declare list of items for  order
    let items = []
    

    //declare customer
    const [customer,setCustomer]=useState({
        "address":"",
        "id":"",
        "userId":"",
        "address":[],
        "orders":[]
    })

    //declare address for order
    const [daddress,setDaddress]=useState({
        "name":"",
        "city":"",
        "pincode":"",
        "mobile":"",
        "address":"",
        "state":""
    })

    //declare order
    const [order,setOrder] =useState({
        "items":[],
        "address":null,
        "ordertype":"",
        "amount":""
    })

    //fetch customer 
    useEffect(()=>{
        if(isLogedIn()){
        privateAxios.get(`customer/${getCurrentUserDetail().id}`).then((data)=>{
            setCustomer(data.data)
         }).catch(error=>{
             console.log(error)
         })
         setMycart(GetCart())
        }
        
     },[])

    //update and set address to order
    const updateDaddress=(event)=>{
        setDaddress({
            ...daddress,
            [event.target.id]:event.target.value
        })
       
    }

    
     // converting to order's items from cart items 
    useEffect(()=>{
        myCart.cartlist.map((item)=>{
            let unit ={
                "product":item.product,
                "quantity":item.quantity,
                "price":item.product.price*item.quantity
            }
            items.push(unit)
        })
        setOrder({
            ...order,
            "items":items
        })
        updateSubTotal()
    },[myCart])


    //if don't have any product send to my cart page
    if(myCart?.cartlist?.length==0){
        toast.info("You don't have any item in your cart")
        navigate("/cart")
    }
    //calculate shipping charge
    const calculateDeliveryCharge=()=>{
        const pincode=order?.address?.pincode
        console.log("pincode ="+pincode)
        if(pincode != undefined && pincode != ""){
            GetMyDeliveryCharge(pincode).then(price=>{
                setShipping(price);
            }).catch(error=>{
                console.log(error)
            })
        }
    }

    const shippingCharge=(pincode)=>{
        if(pincode.toString().length>=6){
            GetMyDeliveryCharge(pincode).then(price=>{
                setShipping(price)
            }).catch(error=>{
                console.log(error)
            })
        }
    }

    //set address to order
    // useEffect(()=>{
    //     setOrder({
    //         ...order,
    //         "address":daddress
    //     })
    //     calculateDeliveryCharge()
    // },[daddress])


    const updateSubTotal=()=>{
        let total = 0
        myCart.cartlist.map((item)=>{
        total=total+item.product.price*item.quantity
        })
        setSubtotal(total)
        // setOrder({
        //     ...order,
        //     "amount":subtotal
        // })
    }

    const selectAddress=(addressId)=>{
        console.log(addressId)
        customer.address.map((add)=>{
            if(add.id==addressId){
                setDaddress(add)
                shippingCharge(add.pincode)
            }
        })
    }

    const saveAddress=()=>{
        SaveCustomerAddress(daddress).then((data)=>{
            setDaddress(data)
            toast.success("Your Address has been saved !!!")
            navigate("/checkout")
            window.location.reload();
           // console.log(data)
        }).catch((error)=>{
            console.log(error)
        })
    }

     const placeOrder=()=>{
            if(order.address.name==''){
                toast.error("Please select Address")
                return
            }
            else if(order.ordertype==""){
                toast.error("Please select Payment Option")
                return
            }
            PlaceOrderRequest(order).then((data)=>{
                toast.success("Order has been placed successfully")
                //console.log(data)
                ClearCart();
                navigate("/myorders")
            }).catch((error)=>{
                console.log(error)
            })
     }

    return(
        
    <Base>
        <div class="container-fluid mt-3">
        <div class="row px-xl-5">
            <div class="col-12">
                <nav class="breadcrumb bg-light mb-30">
                    <a class="breadcrumb-item text-dark" href="#">Home</a>
                    <a class="breadcrumb-item text-dark" onClick={()=>navigate("/cart")}>Cart</a>
                    <span class="breadcrumb-item active">Checkout</span>
                </nav>
            </div>
        </div>
    </div>



        <div class="container-fluid">
        <div class="row px-xl-5">
            <div class="col-lg-8">
                <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-secondary pr-3">Delivery Address</span></h5>
                <div class="bg-light p-30 mb-5">
                    <div class="">

                    {
                        customer.address.map((address,index)=>(
                            <div class=" form-group" key={index}>
                            <div class="custom-control custom-radio">
                            <Input class="custom-control-input" onChange={()=>selectAddress(address.id)} type="radio" id={'address'+address.id} name="address" /> 
                            <Label for={'address'+address.id} className="form-control" style={{height:"auto"}} >{address.name}<br />  {address.address}
                             {' '+address.city} {address.pincode} {address.state} <br /> {address.mobile}</Label>
                            </div>
                            </div>
                        ))
                    }
                    


                       
                    <div class="form-group">
                    <div class="custom-control custom-radio">
                            <input type="radio" class="custom-control-input" name="address" id="shipto"/>
                            <label class="custom-control-label" for="shipto"  data-toggle="collapse" data-target="#shipping-address">Add New Shipping Address</label>
                    </div>
                    </div>
                    </div>
                </div>
                <div class="collapse mb-5" id="shipping-address">
                    <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-secondary pr-3">New Delivery Address</span></h5>
                    <div class="bg-light p-30">
                        <div class="row">
                        <div class="col-md-6 form-group">
                                <label>Address Line 1</label>
                                <input class="form-control" style={{height:"80px"}} id="address" onChange={(event)=>updateDaddress(event)} value={daddress.address} type="textarea" placeholder="House No, Street,etc"/>
                            </div>
                            <div class="col-md-6 form-group">
                                <label>Full Name</label>
                                <input class="form-control" id="name" onChange={(event)=>updateDaddress(event)} value={daddress.name} type="text" />
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Mobile No</label>
                                <input class="form-control" id="mobile" onChange={(event)=>updateDaddress(event)} value={daddress.mobile} type="text"/>
                            </div>
                            
                            <div class="col-md-6 form-group">
                                <label>City</label>
                                <input class="form-control" id="city" onChange={(event)=>updateDaddress(event)} value={daddress.city} type="text" />
                            </div>
                            <div class="col-md-6 form-group">
                                <label>State</label>
                                <input class="form-control" type="text" id="state" onChange={(event)=>updateDaddress(event)} value={daddress.state} />
                            </div>
                            <div class="col-md-6 form-group">
                                <label>PIN Code</label>
                                <input class="form-control" id="pincode" onChange={(event)=>updateDaddress(event)} value={daddress.pincode} type="text" placeholder="123"/>
                            </div>
                            <button onClick={()=>saveAddress()} class="btn btn-primary font-weight-bold py-3">Save Address</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-secondary pr-3">Order Total</span></h5>
                <div class="bg-light p-30 mb-5">
                    <div class="border-bottom">
                        <h6 class="mb-3">Products</h6>
                        {
                            order.items.map((item,index)=>(
                                <div class="d-flex justify-content-between" key={index}>
                                    <p>{item.product.name.substring(0,30)} X {item.quantity} </p>
                                    <p>Rs{item.price}</p>
                                </div>
                            ))
                        }

                    </div>
                    <div class="border-bottom pt-3 pb-2">
                        <div class="d-flex justify-content-between mb-3">
                            <h6>Subtotal</h6>
                            <h6>Rs{subtotal}</h6>
                        </div>
                        <div class="d-flex justify-content-between">
                            <h6 class="font-weight-medium">Shipping</h6>
                            <h6 class="font-weight-medium">Rs {shipping}</h6>
                        </div>
                    </div>
                    <div class="pt-2">
                        <div class="d-flex justify-content-between mt-2">
                            <h5>Total</h5>
                            <h5>Rs{subtotal+shipping}</h5>
                        </div>
                    </div>
                </div>
                <div class="mb-5">
                    <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-secondary pr-3">Payment</span></h5>
                    <div class="bg-light p-30">
                        <div class="form-group">
                            <div class="custom-control custom-radio">
                                <input onChange={()=>{setOrder({...order,"ordertype":"postpaid"})}} type="radio" class="custom-control-input" name="payment" id="cod"/>
                                <label class="custom-control-label" for="cod">Cash On Delivery (COD)</label>
                            </div>
                        </div>

                        
                        <button onClick={()=>placeOrder()} class="btn btn-block btn-primary font-weight-bold py-3">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </Base>

    )
}
export default Checkout