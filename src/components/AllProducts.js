import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { AddToCart, GetCart } from "../services/cart-service";
import { GetAllProducts, searchProduct } from "../services/product-service";
import Product from "./Product";
import InfiniteScroll from 'react-infinite-scroll-component';
import { FormGroup, Input, Nav, Navbar, NavbarBrand } from "reactstrap";

const AllProducts=()=>{
    const [page,setPage] = useState({
        "totalPages":'',
        "pageSize":'',
        "pageNumber":'',
        "totalElements":'',
        "lastPage":false,
        "products":[]

    })

    const {q}=useParams()
   // console.log("q = "+q)
    const [currentPage,setCurrentPage]= useState(0)

    let navigate = useNavigate()

    const [mycart,setMycart] = useState(GetCart)

    window.addEventListener('cart',()=>{setMycart(GetCart)})

    const myfun=(myproduct)=>{
       
       AddToCart(myproduct)
    }

    useEffect(()=>{
        console.log(currentPage)
        changePage();
    },[currentPage])

    const searchForProduct=(key)=>{
        searchProduct(key).then(response=>{
            console.log(response)
            setPage(response)

        }).catch(error=>{
            console.log(error)
        })
    }


    if(q!=0){
        searchForProduct(q)
    }

    const changePage=(pageSize=3)=>{
        GetAllProducts(currentPage,pageSize).then(response=>{
            console.log("fetching products ...")
            console.log(response)
            setPage({...page,
                "pageNumber":response.pageNumber,
                "lastPage":response.lastPage,
                "products":[...page.products,...response.products]
            })
        }).catch(error=>{
            console.log(error)
        })
    }


    return(
      
        <div>
            {
        //     <div class="container-fluid bg-dark mb-30 py-2">
        //         <div class="row px-xl-5 mx-1">
        //                 <div class="input-group">
        //                     <input type="text" onChange={(event)=>{searchForProduct(event.target.value)}} class="form-control" placeholder="Search for products" />
        //                     <div class="input-group-append">
        //                         <span class="input-group-text bg-transparent text-primary">
        //                             <i class="fa fa-search"></i>
        //                         </span>
        //                     </div>
        //                 </div>
                       
        //         </div>
                  
        //     </div>

            }
        <Navbar dark color="dark mb-5">
            <Nav className="w-100 row">
                <FormGroup className="w-100 input-group">
                <Input type="select" className="mx-md-1 bg-primary"  style={{maxWidth:"50px"}}>
                    <option selected>All</option>
                    <option>Category One</option>
                    <option>Category Two</option>
                </Input>
                <Input type="text" className="form-control" placeholder="Multishop | Search for products" onChange={(event)=>{searchForProduct(event.target.value)}} />
                <div class="input-group-append">
                                 <span class="input-group-text bg-transparent text-primary">
                                    <i class="fa fa-search"></i>
                                </span>
                             </div>
                </FormGroup>
            </Nav>

        </Navbar>


  
    <div class="container-fluid">
        <div class="row">
          
            <div class="col-md-2 col-md-offset-2 not-mobile">
           
                <h5 class="section-title position-relative text-uppercase mb-3"><span class="bg-secondary pr-3">Filter by price</span></h5>
                <div class="bg-light p-4 mb-30">
                    <form>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="radio" name="short" class="custom-control-input" checked id="price-all" />
                            <label class="custom-control-label" for="price-all">All Price</label>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="radio" name="short" class="custom-control-input" id="price-1" />
                            <label class="custom-control-label" for="price-1">High To Low</label>
                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="radio" name="short" class="custom-control-input" id="price-2" />
                            <label class="custom-control-label" for="price-2">Low To High</label>
                        </div>
                       
                    </form>
                </div>
                </div>

            <div class="col-md-7">


                    <InfiniteScroll
                        dataLength={page.totalElements}
                        hasMore={!page.lastPage}
                        next={()=>{setCurrentPage(currentPage+1)}}
                        endMessage={    <h1 style={{ textAlign: 'center' }}>...End of Page...</h1>    }
                        className="row"
                        
                    >
                    {page.products.map(product=>(<Product key={product.id} props={[product,myfun]}  />))}
                    </InfiniteScroll>
               
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
    </div>
    )
}

export default AllProducts