import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useNavigate, useParams } from "react-router-dom"
import Base from "../components/Base"
import Product from "../components/Product"
import { AddToCart, GetCart } from "../services/cart-service"
import { GetCategoryProducts } from "../services/product-service"

const Category=()=>{
    let navigate = useNavigate()
    
    const {categoryId} = useParams()

    console.log("category id ="+categoryId)
    const [page,setPage] = useState({
        "totalPages":'',
        "pageSize":'',
        "pageNumber":'',
        "totalElements":'',
        "lastPage":false,
        "products":[]

    })

    const [currentPage,setCurrentPage]= useState(0)

    

    const [mycart,setMycart] = useState(GetCart)

    window.addEventListener('cart',()=>{setMycart(GetCart)})

    const myfun=(myproduct)=>{
       
       AddToCart(myproduct)
    }

   

    const changePage=(pageSize=12)=>{
        GetCategoryProducts(categoryId,currentPage,pageSize).then(response=>{
            console.log("fetching products...")
            console.log(response)
            setPage({...page,
                "pageNumber":response.pageNumber,
                "lastPage":response.lastPage,
                "products":[...response.products]
            })
        }).catch(error=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        console.log("page no ="+currentPage)
        changePage()
    },[currentPage])

    return (
        
        <Base>
        <div class="container-fluid mt-3">
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


                    {/* <InfiniteScroll
                        dataLength={page.totalElements}
                        hasMore={!page.lastPage}
                        next={()=>{setCurrentPage(currentPage+1)}}
                        endMessage={    <h1 style={{ textAlign: 'center' }}>...End of Page...</h1>    }
                        className="row"
                        
                    >
    */}
                    <div className="row">
                    {page.products.map(product=>(<Product key={product.id} props={[product,myfun]}  />))}
                    </div>
                    {/* </InfiniteScroll>  */}
                    <div >
                        <nav>
                          <ul class="pagination justify-content-center">
                            {
                                (currentPage>0) &&(
                                    <>
                                    <li class="page-item"><a class="page-link" onClick={()=>setCurrentPage(currentPage-1)}><span>Previous</span></a></li>
                                    <li class="page-item"><a class="page-link" onClick={()=>setCurrentPage(currentPage-1)}>{currentPage}</a></li>
                                    </>
                                )
                            }
                           
                            
                            {
                                (!page.lastPage) && (
                                <>
                                <li class="page-item active"><a class="page-link">{currentPage+1}</a></li>
                                <li class="page-item"><a class="page-link" onClick={()=>setCurrentPage(currentPage+1)}>{currentPage+2}</a></li>
                                </>
                                )
                            }
                            
                            {
                                (!page.lastPage) && (
                                    <li class="page-item"><a class="page-link" onClick={()=>setCurrentPage(currentPage+1)}>Next</a></li>
                                )
                            }
                          </ul>
                        </nav>
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

        </div>
  
    </Base>
    )
}
export default Category