import { useEffect, useState } from "react"
import { Button, Card, CardBody, Container, Form, Input, Table } from "reactstrap"
import Base from "../components/Base"
import { getCurrentUserDetail } from "../auth";
import {getCustomer, updateLocalUser, updateUser} from "../services/user_service";
import { SaveCustomerAddress } from "../services/order-service";
import { toast } from "react-toastify";

const Profile=()=>{
    const [user,setUser]=useState(getCurrentUserDetail())
    const [customer,setCustomer]=useState({
        "address":[]
    });

    useEffect(()=>{
        getCustomer().then(data=>{
            setCustomer(data)
        }).catch(error=>{
            console.log(error)
        })
        console.log(customer)
    },[])

    const profileEdit=()=>{
        document.getElementById("multishop-pane-1").style.display="none"
        document.getElementById("multishop-pane-2").style.display="block"
    }

    const backProfileEdit=()=>{
        document.getElementById("multishop-pane-1").style.display="block"
        document.getElementById("multishop-pane-2").style.display="none"
    }
    const updateGender=()=>{
        const sex= document.getElementById("gender").value
        console.log("updating gender "+sex)
        setUser({...user,"gender":sex})

    }

    const updateProfile=()=>{
        console.log(user)
        
        updateUser(user).then(data=>{
            toast.success("user has been updated successfully")
            setUser(data)
            updateLocalUser(data)
            backProfileEdit()
        }).catch(error=>{
            console.log(error)
        })
    }


    
    return (
        <Base>
            <Container className="text-center">
                <div id="multishop-pane-1">
                <Card style={{maxWidth:"600px",margin:"5px auto"}}>
                    <CardBody>
                    <Container className="text-center">
                    <i class="far fa-user fa-4x"></i>
                    <i onClick={()=>profileEdit()} class="far fa-edit myHover text-primary"></i>
                    <br />
                    <h4>{user.name.toUpperCase()}</h4>
                    </Container>

                    <Table>
                        <tbody>
                            <tr>
                                <th>Email :</th>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <th>Mobile No :</th>
                                <td>{user.mobile}</td>
                            </tr>
                            <tr>
                                <th>Gender :</th>
                                <td>{user.gender}</td>
                            </tr>
                            <tr>
                                <th>User Type :</th>
                                <td>{user.roles.map(role=>(role.name+" "))}</td>
                            </tr>
                        </tbody>
                    </Table>
                    </CardBody>
                </Card>

                
                {customer?.address?.map((add,i)=>(
                    <Card style={{maxWidth:"600px",margin:"5px auto"}} key={i}>
                    <CardBody>
                    <i class="fas fa-map-marker-alt mx-2"></i>
                    <h4>Address {i+1}</h4>

                    <Table>
                        <tbody>
                            <tr>
                                <th>Name :</th>
                                <td>{add.name}</td>
                            </tr>
                            <tr>
                                <th>Address :</th>
                                <td>{add.address}</td>
                            </tr>
                            <tr>
                                <th>City :</th>
                                <td>{add.city}</td>
                            </tr>
                            <tr>
                                <th>Pin Code :</th>
                                <td>{add.pincode}</td>
                            </tr>
                            <tr>
                                <th>State :</th>
                                <td>{add.state}</td>
                            </tr>
                            <tr>
                                <th>Mobile :</th>
                                <td>{add.mobile}</td>
                            </tr>
                        </tbody>
                    </Table>
                    </CardBody>
                </Card>
                ))}
            </div>
            <div id="multishop-pane-2">
                {/* profile edit card */}
                <Card style={{maxWidth:"600px",margin:"5px auto"}}>
                    <CardBody>
                    <Container className="text-center">
                    <i class="far fa-user fa-4x"></i>
                    <i class="far fa-edit myHover text-primary"></i>
                    <br />
                    <h4>Edit Profile</h4>
                    </Container>
                    <Form>
                    <Table>
                        <tbody>
                            <tr>
                                <th>Name :</th>
                                <td><Input type="text" id="name" onChange={(event)=>setUser({...user,"name":event.target.value})} value={user.name} /></td>
                            </tr>
                            <tr>
                                <th>Mobile No :</th>
                                <td><Input type="number" onChange={(event)=>setUser({...user,"mobile":event.target.value})} value={user.mobile} /></td>
                            </tr>
                            <tr>
                                <th>Gender :</th>
                                <td><Input onChange={()=>updateGender()} id="gender"  className="form-control" type="select" >
                                    <option  value="MALE">MALE</option>
                                    <option  value="FEMALE" >FEMALE</option>
                                    </Input></td>
                            </tr>
                            
                            <tr>
                                <th>About :</th>
                                <td><Input type="text" onChange={(event)=>setUser({...user,"about":event.target.value})} value={user.about} /></td>
                            </tr>
                            
                        </tbody>
                    </Table>
                    <Button onClick={()=>backProfileEdit()}>Back</Button> <Button onClick={()=>updateProfile()} className="btn-success">Submit</Button>
                    </Form>
                    </CardBody>
                </Card>
            </div>
            </Container>

        </Base>
    )
}
export default Profile