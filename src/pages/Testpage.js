import { useEffect, useState } from "react"
import { GetMyDeliveryCharge } from "../services/order-service"

const Testpage=()=>{

    const [data,setData]=useState(0)

    useEffect(()=>{
        GetMyDeliveryCharge(811213).then(data=>{
            console.log(data)
            setData(data)
        }).catch(error=>{
            console.log(error)
        })
    },[])

    return(
        <>
            <h1>Test Page</h1>
            <p>{data}</p>
        </>
    )
}
export default Testpage