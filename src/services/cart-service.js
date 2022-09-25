import { useState } from "react"

export const GetCart=()=>{
   let mycart = localStorage.getItem("mycart")
   if(mycart != null){
       return JSON.parse(mycart)
   }
   return {'cartlist':[]}
}

export const AddToCart=(myproduct)=>{
    let mycart = GetCart()
    let contain = true;

            mycart.cartlist.map((item,num)=>{
                if(item.product.id ===myproduct.id){
                    let q = parseInt(item.quantity)
                   //creating new array with updated data
                   let updatedCart = [...mycart.cartlist]
                   updatedCart.splice(num,1,{"productId":myproduct.id,"quantity":q+1,"product":myproduct})
                   //replacing my cart array
                   
                   //setMycart({"cartlist":updatedCart})
                   mycart.cartlist=updatedCart
                   contain=false  
                }
             } )
        if(contain){
            // setMycart({
            //     "cartlist":[...mycart.cartlist,{"productId":myproduct.id,"quantity":1,"product":myproduct}]
            // })
            mycart.cartlist=[...mycart.cartlist,{"productId":myproduct.id,"quantity":1,"product":myproduct}]
        }
        console.log(mycart)
    localStorage.setItem("mycart",JSON.stringify(mycart))
    window.dispatchEvent(new Event('cart'))
}
export const SubstractFromCart=(productId)=>{
    let mycart = GetCart()
    mycart.cartlist.map((item,num)=>{
        if(item.product.id ===productId){
            let q = parseInt(item.quantity)
            if(q==1)
            return
            mycart.cartlist[num].quantity=q-1
        }
     } )
     localStorage.setItem("mycart",JSON.stringify(mycart))
     window.dispatchEvent(new Event('cart'))

}
export const RemoveFromCart=(productId)=>{
    let mycart = GetCart()
    let i=-1
    mycart.cartlist.map((item,num)=>{
        if(item.product.id ===productId){
            i=num
        }
     } )
     mycart.cartlist.splice(i,1)
     localStorage.setItem("mycart",JSON.stringify(mycart))
     window.dispatchEvent(new Event('cart'))
}