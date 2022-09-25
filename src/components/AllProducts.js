import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AddToCart, GetCart } from "../services/cart-service";
import { GetAllProducts, searchProduct } from "../services/product-service";
import Product from "./Product";

const AllProducts=()=>{
    const [page,setPage] = useState({
        "totalPages":'',
        "pageSize":'',
        "pageNumber":'',
        "totalElements":'',
        "lastPage":false,
        "products":[]

    })

    let navigate = useNavigate()

    const [mycart,setMycart] = useState(GetCart)

    window.addEventListener('cart',()=>{setMycart(GetCart)})

    const myfun=(myproduct)=>{
       
       AddToCart(myproduct)
    }

    useEffect(()=>{
        changePage();
    },[])

    const searchForProduct=(key)=>{
        searchProduct(key).then(response=>{
            console.log(response)
            setPage(response)

        }).catch(error=>{
            console.log(error)
        })
    }



    const changePage=(pageNumber=0,pageSize=5)=>{
        GetAllProducts(pageNumber,pageSize).then(response=>{
            console.log(response)
            setPage(response)
        }).catch(error=>{
            console.log(error)
        })
    }


    return(
      
        <div>
            <div class="container-fluid bg-dark mb-30 py-2">
                <div class="row px-xl-5 mx-1">
                        <div class="input-group">
                            <input type="text" onChange={(event)=>{searchForProduct(event.target.value)}} class="form-control" placeholder="Search for products" />
                            <div class="input-group-append">
                                <span class="input-group-text bg-transparent text-primary">
                                    <i class="fa fa-search"></i>
                                </span>
                            </div>
                        </div>
                       
                </div>
                  
            </div>

            <div class="col-lg-9 col-md-8 offset-md-1">
            
                

                <div class="row pb-3">
                    {/* <div class="col-12 pb-1">
                        <div class="d-flex align-items-center justify-content-between mb-4">
                           
                            <div class="ml-2">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Sorting</button>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <a class="dropdown-item" href="#">Latest</a>
                                        <a class="dropdown-item" href="#">Popularity</a>
                                        <a class="dropdown-item" href="#">Best Rating</a>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div> */}


                    {page.products.map(product=>(<Product key={product.id} props={[product,myfun]}  />))}
                        
                    
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

    </div>
    )
}

export default AllProducts