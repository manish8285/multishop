import {useState,useEffect} from 'react'

const Status=({props})=>{
    const [status,setStatus] = useState([])

    useEffect(()=>{
        setStatus(props)
        //console.log(status)
    },[])
    return (
       
        <>
            <table>{
                props.map((status,i)=>(
                    <>
                    <tr>
                    <td className="status-td"><p className="status-circle" >{i+1}</p></td>
                    <td><p className="status-text">{status.status} <small className='text-warning'>{status.date}</small></p>
                        
                    </td>
                </tr>
                <tr>
                    <td className="status-line"><i class="fas fa-ellipsis-v text-warning"></i></td>
                </tr>
                </>

                ))
                }
            </table>
        </>
    )
}

export default Status