 
import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import "../Css/Yourpost.css"
import {RiHome4Fill} from "react-icons/ri";
import {BiCalendar} from "react-icons/bi"
import { toast } from 'react-toastify'
import {Button, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure} from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom';

 const initValue={
    company:"",
    price:"",
    color:"",
 }

 const updatedData={}  // for updating the data

const Yourpost = () => {
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
        fetch(`https://tame-ox-train.cyclic.app/sellbook/getpost/${JSON.parse(localStorage.getItem("user"))._id}`,{
         headers:{
           "Authorization":"Bearer "+localStorage.getItem("Buycartoken")
         }
        })
        .then((res)=>res.json())
        .then((result)=> {
         console.log("result",result)
          setMyPost(result.post)
          setLoading(false)
      //  //  setUser(result.user)
         setMyName(JSON.parse(localStorage.getItem("user")).name) 
        })
        //console.log("result",result)
        setLoading(false)
        },[reset])

       
      

        

      

         const handleUpdate=(id)=>{
            onOpen()
           updatedRef.current=id
         }
         console.log(updatedRef)
 const updateMyData=async()=>{
    console.log("updateState",updateState)
    setLoading(true)
      try{
        const res = await axios.patch(`https://tame-ox-train.cyclic.app/sellbook/updatedata/${updatedRef.current}`,updateState);
        console.log(res.data);
        setReset(prev=>prev+1)
        onClose()
        alertSuccess("Data Updated Successfully...!")
        setLoading(false)
    }
      catch(err){
        console.log(err)
        onClose()
        setLoading(false)
        alertError("Data is Not Updated ")
      }
 }
         const handleUpdatedChange=(e)=>{
        const {name,value}=e.target
         setUpdateState({
            ...updateState,
            [name]:value
         })
         }

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
    fetch(`https://tame-ox-train.cyclic.app/sellbook/deletepost/${updatedRef.current}`,{
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
      //   console.log("updated",updateState)
        const {company,price,color}=selectData

        if(loading){
            return  <div class="loadingio-spinner-spinner-977el9wwy2v"><div class="ldio-4j5ay0xf86g">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div></div>
          
          }
          if(myPost.length===0){
         return  <div className='nopost'>
          <div class="flip-card">
    <div class="flip-card-inner">
        <div class="flip-card-front">
            <p class="title">No Post Yet</p>
            <p>You haven't posted Your Book yet</p>
        </div>
        <div class="flip-card-back">
            <p class="title">Click Below to post now</p>
            <Button className='backbtn' colorScheme='whatsapp' onClick={()=>navigate("/sellyourcar")}>Post Now</Button>
        </div>
    </div>
</div>
         </div>
          }
  return (
    <div className='yourpost_container'>
        <div className="yourpost">
        <Heading as="h1">Welcome {myName} </Heading>
           <div className='postandsidebar'>
            {/* <div className="sidebar">
            <Heading as="h1">Welcome {myName} </Heading>
           
          
  <FormLabel> Sort ByPrice</FormLabel>
  <Select placeholder='Sort By price' value={price} onChange={(e)=>handlePrice(e.target.value)}>
    <option value="asc">Ascending</option>
    <option value="desc">Desending</option>
  </Select>

  <FormLabel> Sort ByRating</FormLabel>
  <Select placeholder='Sort By price' value={price} onChange={(e)=>handleRating(e.target.value)}>
    <option value="asc">Ascending</option>
    <option value="desc">Desending</option>
  </Select>

  <div className="buttons">
                            <Button style={{width:"100%"}} onClick={()=>setReset(prev=>prev+1)}>Reset Filter</Button>
                          
                        </div>
   

            </div> */}
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
                        <div className="buttons">
                            <Button onClick={()=>handleUpdate(el._id)}>Update</Button>
                            <Button onClick={()=>handleOpenAlert(el._id)}>Delete</Button>
                        </div>
                    </div>
                })}
                </div>
             </div>
        </div>


       
    

      <Modal
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
            <FormLabel>Model</FormLabel>
  <Input type='text' placeholder='enter Title of Book'  name="model" onChange={handleUpdatedChange}  />


            </FormControl>

            <FormControl mt={4}>
            <FormLabel>Title</FormLabel>
  <Input type='text' placeholder='ex- Wagno R, vitara Breza, i-10,safari,thar'  name="title" onChange={handleUpdatedChange}  />

            </FormControl>

             <FormControl  mt={4}>
             <FormLabel>Author</FormLabel>
  <Input type='text' placeholder='enter Author Name' name="author" onChange={handleUpdatedChange} />

             </FormControl>

             <FormControl mt={4}>
             <FormLabel>Year of Release</FormLabel>
             <Input type='text' placeholder='enter Year of Release' name="yearOfRelease" onChange={handleUpdatedChange} />
             </FormControl>

             <FormControl mt={4}>
             <FormLabel>Genre</FormLabel>
             <Select placeholder='Select color' style={{backgroundColor:"tomato"}}  name="genre" onChange={handleUpdatedChange}>
    
    <option value="Action">Action</option>
    <option value="Adventure">Adventure</option>
    <option value="Comedy">Comedy</option>
    <option value="Romance">Romance</option>
  </Select>
             </FormControl>

             <FormControl mt={4}>
             <FormLabel>Price</FormLabel>
      <Input type='number' placeholder='enter price of Book'  name="price" onChange={handleUpdatedChange} />
      
             </FormControl>

             <FormControl mt={4}>
             <FormLabel>Rating</FormLabel>
      <Input type='number' placeholder='enter Rating on scale of 5'  name="rating"  onChange={handleUpdatedChange}  />

             </FormControl>
             <FormControl mt={4}>
             <FormLabel>Description</FormLabel>
  <Input type='text' placeholder='enter some desc.. about Book'  name="about" onChange={handleUpdatedChange} />

             </FormControl>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={updateMyData} >
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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

export default Yourpost