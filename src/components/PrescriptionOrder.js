import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { isLogedIn } from "../auth";
import { addPrescription, addPrescriptionImage, PlaceOrderRequest, SaveCustomerAddress } from "../services/order-service";
import { getCustomer } from "../services/user_service";

const PrescriptionOrder=({props})=>{
    let navigate = useNavigate()
    const [order,setOrder] = useState({
        
        notes:"",
        address:{
            name:"",
            state:"",
            city:"",
            pincode:"",
            mobile:"",
            address:""
        }
    })

    const updateAddress=(event)=>{
        setOrder({
            ...order,
            address:{...order.address,
            [event.target.id]:event.target.value
            }
        })
    }

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }
    const firstPart=()=>{
        document.querySelector("#form1").style.display="block"
        document.querySelector("#part2").style.display="none"
        document.querySelector("#btnNext").style.display="block"
        document.querySelector("#btnBack").style.display="none"
        document.querySelector("#btnSubmit").style.display="none"

    }
    const secondPart=()=>{
        if(!isLogedIn()){
            navigate("/login")
        }
        document.querySelector("#form1").style.display="none"
        document.querySelector("#part2").style.display="block"
        document.querySelector("#btnNext").style.display="none"
        document.querySelector("#btnBack").style.display="block"
        document.querySelector("#btnSubmit").style.display="block"

    }

    const uploadPrescription=()=>{
       addPrescription(order).then(data=>{
           setOrder(data)
           console.log("added order",data)
           const form = document.forms.namedItem("form1");
            const formData = new FormData(form)
           addPrescriptionImage(data.id,formData).then(data=>{
               document.querySelector("#part3").style.display="block"
               document.querySelector("#part2").style.display="none"
               document.querySelector("#btnSubmit").style.display="none"
               document.querySelector("#btnBack").style.display="none"
               toast("Prescription Added Successfully !!!")
               console.log(data)
           }).catch(error=>console.log(error))
       })
        // getCustomer().then(data=>{

        //     console.log(data)
        // }).catch(error=>console.log(error))
        // console.log(order)
        // PlaceOrderRequest(order).then(data=>{
        //     setOrder(data)
        //     console.log(data)
        // }).catch(error=>console.log(error))
    }



    
    return (
        <Container>
            <Modal isOpen={props[1]} toggle={()=>props[0]()} >
                <ModalHeader toggle={()=>props[0]()}> <i class="fas fa-clipboard-list text-success"></i> Upload Prescription To Order Medicine</ModalHeader>
                <ModalBody>
                    <Form name="form1" id="form1" method="post" enctype="multipart/form-data">
                        <Container className="text-center">
                        {selectedFile &&  <img style={{width: "100px", height: "150px",paddingRight:"5px"}} src={preview} /> }
                        <Label className="myHover" for="prescription">
                        <i class="fas fa-cloud-upload-alt fa-4x"></i>
                        </Label>
                        </Container>
                        
                        <Input type="file" onChange={(event)=>onSelectFile(event)} id="prescription" name="prescription" hidden />
                    </Form>
                    <Form>
                        
                        <div style={{display:"none"}} id="part2">
                        <FormGroup className="mt-2">
                        <Input type="textarea" rows="2" cols="2" id="notes" onChange={(event)=>setOrder({...order,notes:event.target.value})} placeholder="If any message" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Address</Label>
                            <Input type="text" value={order.address.name} onChange={(event)=>updateAddress(event)} id="name" placeholder="Enter Name" />
                        </FormGroup>
                        <FormGroup>
                        <Input type="number" id="mobile" value={order.address.mobile} onChange={(event)=>updateAddress(event)} placeholder="Enter Mobile No" />
                        </FormGroup>
                        <FormGroup>
                        <Input type="textarea" rows="2" cols="2" id="address" value={order.address.address} onChange={(event)=>updateAddress(event)} placeholder="Enter Your Complete Address" />
                        </FormGroup>
                        <FormGroup>
                        <Input type="number" id="pincode" value={order.address.pincode} onChange={(event)=>updateAddress(event)} placeholder="6 digits PIN code" />
                        </FormGroup>
                        <FormGroup>
                        <Input type="text" id="city" value={order.address.city} onChange={(event)=>updateAddress(event)} placeholder="City" />
                        </FormGroup>
                        <FormGroup>
                        <Input type="text" id="state" value={order.address.state} onChange={(event)=>updateAddress(event)} placeholder="State" />
                        </FormGroup>
                        </div>
                    </Form>
                    <div style={{display:"none"}} id="part3">
                    <Container className="text-center">
                    <i class="far fa-check-circle fa-4x text-success"></i>
                    <p>Prescription Uploaded Successfully, Go to My Orders to Choose Payment Option</p>
                    </Container>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button style={{display:"none"}} id="btnBack" color="primary" onClick={()=>firstPart()}>
                    Back
                </Button>
                <Button id="btnNext" color="primary" onClick={()=>secondPart()}>
                    Next
                </Button>
                <Button style={{display:"none"}} id="btnSubmit" color="success" onClick={()=>uploadPrescription()}>
                    Submit
                </Button>{' '}
                <Button color="secondary" onClick={()=>props[0]()}>
                    Cancel
                </Button>
                </ModalFooter>
            </Modal>
        </Container>
    )
}
export default PrescriptionOrder