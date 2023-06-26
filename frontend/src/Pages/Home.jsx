 
import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import "../Css/Home.css"

import {RiHome4Fill} from "react-icons/ri";
import {BiCalendar} from "react-icons/bi"
import { toast } from 'react-toastify'
import {Button, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure} from "@chakra-ui/react"
import Description from './Description';
import { Link,useNavigate } from 'react-router-dom'
 const initValue={
   
    price:"",
    rating:"",
 }

 const updatedData={}  // for updating the data

const Home = () => {
    const [myPost,setMyPost]=useState([])
    const [myName,setMyName]=useState("")
    const [selectData,setSelectData]=useState(initValue)
    const [reset,setReset]=useState(0)
    const [updateState,setUpdateState]=useState(updatedData)
    const updatedRef=useRef(null)
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [loading,setLoading]=useState(true)
    const navigate=useNavigate()

    const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  // alert function from toastify  //
  const alertError=(msg)=> toast.error(msg)
     const alertSuccess=(msg)=>toast.success(msg)

    // getting all the post of login user  //
    useEffect(()=>{
        setLoading(true)
        fetch(`https://tame-ox-train.cyclic.app/sellbook/getdata`,{
         headers:{
           "Authorization":"Bearer "+localStorage.getItem("Buycartoken")
         }
        })
        .then((res)=>res.json())
        .then((result)=> {
         console.log("result",result)
         setMyPost(result)
         setLoading(false)
       //  setUser(result.user)
      
        })
        //console.log("result",result)
        setLoading(false)
        },[reset])

       

        const handleRating=(query)=>{
          console.log("query",query)
          setLoading(true)
          fetch(`https://tame-ox-train.cyclic.app/sellbook/getalldatasortedbyrating?rating=${query}`,{
              headers:{
                "Authorization":"Bearer "+localStorage.getItem("Buycartoken")
              }
             })
             .then((res)=>res.json())
             .then((result)=> {
              console.log("result",result)
              setMyPost(result.post)
              setLoading(false)
              alertSuccess(`Data is sorted with Rating in ${query} order`)
            //  setUser(result.user)
          //   setMyName(result.user.name) 
             })
      }

        const handlePrice=(query)=>{
            console.log("query",query)
            setLoading(true)
            fetch(`https://tame-ox-train.cyclic.app/sellbook/getalldatasortedbyprice?price=${query}`,{
                headers:{
                  "Authorization":"Bearer "+localStorage.getItem("Buycartoken")
                }
               })
               .then((res)=>res.json())
               .then((result)=> {
                console.log("result",result)
                setMyPost(result.post)
                setLoading(false)
                alertSuccess(`Data is sorted with price in ${query} order`)
              //  setUser(result.user)
            //   setMyName(result.user.name) 
               })
        }

         console.log(updatedRef)

       

          // alert box function //
          
  const handleOpenAlert = (id) => {
    setIsAlertOpen(true);
    updatedRef.current=id
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handleOk = async() => {
    setLoading(true)
    // Perform actions when OK button is clicked
    fetch(`https://average-frog-jodhpurs.cyclic.app/sellcar/deletepost/${updatedRef.current}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("Buycartoken")
            }
         })
         .then((res)=>res.json())
         .then((result)=> {
            console.log(result)
            alertSuccess("Post Deleted Successfully...!")
            setReset(prev=>prev+1)
            setLoading(false)
         })
         .catch((err)=>{
            alertError(err.msg)
           console.log(err)
           setLoading(false)
         })
    handleCloseAlert();
  };

   const showDescription=(id)=>{
   localStorage.setItem("postId",id)
   navigate("/description")
   }
      //   console.log("updated",updateState)
        const {rating,price}=selectData

        if(loading){
            return  <div class="loadingio-spinner-spinner-977el9wwy2v"><div class="ldio-4j5ay0xf86g">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div></div>
          
          }
  return (
    <div className='yourpost_container'>
        <div className="yourpost">
           
           <div className='postandsidebar'>
            <div className="sidebar">
           
          
          
  <FormLabel> Sort ByPrice</FormLabel>
  <Select placeholder='Sort By price' value={price} onChange={(e)=>handlePrice(e.target.value)}>
    <option value="asc">Ascending</option>
    <option value="desc">Desending</option>
  </Select>

         
  <FormLabel> Sort By Rating</FormLabel>
  <Select placeholder='Sort By Rating' value={rating} onChange={(e)=>handleRating(e.target.value)}>
    <option value="asc">Ascending</option>
    <option value="desc">Desending</option>
  </Select>

  <div className="buttons">
                            <Button style={{width:"100%"}} onClick={()=>setReset(prev=>prev+1)}>Reset Filter</Button>
                          
                        </div>
   

            </div>
           <div className='posts'>
                {myPost && myPost.map((el)=>{
                    return <div className='galary' key={el._id}>
                        <img key={el._id} src={el.image} alt="posts" className='items' />
                        <div className="yearandbrand">
                            <p>
                                <BiCalendar></BiCalendar>
                            </p>
                            <p>{`Year of Release ${el.yearOfRelease}`}</p>
                          
                        </div>
                        <div className='kmdrove'>
                            <p>{`Title : ${el.title}`}</p>
                        </div>
                        <div className="price">
                            <p>{`Price :- ₹ ${el.price}`}</p>
                           
                        </div>
                        <div className="yearandbrand">
                         
                            <p>{`Rating:-  ${el.rating}`}</p>
                          
                        </div>
                        {/* <div className="place">
                            <p>{el.Registration_Place}</p>
                        </div> */}
                        <div className="color">
                            <p>{`Author:- ${el.author}`}</p>
                        </div>
                        <div className="kmdrove">
                            <p>{`Description:- ${el.about}`}</p>
                        </div>
                        {/* <div className="buttons">
                           
                            <Button onClick={()=>showDescription(el._id)}>Show Description</Button>
                        </div> */}
                    </div>
                })}
                </div>
             </div>
        </div>


       
    

      {/* <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
            <FormLabel>Company</FormLabel>

<Select placeholder='Select Company' style={{backgroundColor:"tomato"}} name="car_Manufacturer" onChange={handleUpdatedChange}>

<option value="Maruti">Maruti</option>
<option value="Hyundai">Hyundai</option>
<option value="Tata">Tata</option>
<option value="Mahindra">Mahindra</option>
</Select>

            </FormControl>

            <FormControl mt={4}>
            <FormLabel>Model</FormLabel>
  <Input type='text' placeholder='ex- Wagno R, vitara Breza, i-10,safari,thar'  name="model" onChange={handleUpdatedChange}  />

            </FormControl>

             <FormControl  mt={4}>
             <FormLabel>Year</FormLabel>
  <Input type='number' placeholder='ex- 2010,2021' name="year" onChange={handleUpdatedChange} />

             </FormControl>

             <FormControl mt={4}>
             <FormLabel>Paint</FormLabel>
  <Select placeholder='Select color' style={{backgroundColor:"tomato"}}  name="Original_Paint" onChange={handleUpdatedChange} >
    
    <option value="Red">Red</option>
    <option value="White">White</option>
    <option value="Black">Black</option>
    <option value="Blue">Blue</option>
  </Select>
             </FormControl>

             <FormControl mt={4}>
             <FormLabel>No. of Accidents</FormLabel>
  <Input type='number' placeholder='ex- 1,2,3' name="Number_of_accidents_reported" onChange={handleUpdatedChange}  />
      
             </FormControl>

             <FormControl mt={4}>
             <FormLabel>Number_of_previous_buyers</FormLabel>
      <Input type='number' placeholder='ex- 1,2,3....'  name="Number_of_previous_buyers" onChange={handleUpdatedChange} />
      
             </FormControl>

             <FormControl mt={4}>
             <FormLabel>Registration_Place</FormLabel>
      <Input type='text' placeholder='ex- city name....'  name="Registration_Place"  onChange={handleUpdatedChange}  />

             </FormControl>
             <FormControl mt={4}>
             <FormLabel>KMs_on_Odometer</FormLabel>
  <Input type='number' placeholder='ex- 12000,15000....'  name="KMs_on_Odometer" onChange={handleUpdatedChange} />

             </FormControl>
             <FormControl mt={4}>
             <FormLabel>Major_Scratches</FormLabel>
  <Input type='number' placeholder='ex- 1,2,3....'  name="Major_Scratches" onChange={handleUpdatedChange}/>

             </FormControl>
             <FormControl mt={4}>
             <FormLabel>price</FormLabel>
  <Input type='number' placeholder='ex- 500000,110000'  name="price" onChange={handleUpdatedChange} />
 
             </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={updateMyData} >
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}

      <div className='alertbox'>
     
      {isAlertOpen && (
        <div className="alert-box">
          <div className="alert-content">
            <p>Are you want to Delete this Post ?</p>
            <button onClick={handleOk} className='firstbtn'>Yes</button>
            <button onClick={handleCloseAlert} className='secondbtn'>Cancel</button>
          </div>
        </div>
      )}
    </div>

    </div>
  )
}

export default Home