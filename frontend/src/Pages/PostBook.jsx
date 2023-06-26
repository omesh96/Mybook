 import React, { useEffect, useState } from 'react'
 import "../Css/PostBook.css"
 import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const initData={
  image:"",
  title:"",
  author:"",
  yearOfRelease:"",
  genre:"",
  price:"",
  rating:"",
  about:""
}
 
 const PostBook = () => {
  const [inputData,setInputData]=useState(initData)
  const [url,setUrl]=useState("")
  const [imageUrl,setImageUrl]=useState("")
  const navigate=useNavigate()
  const [loading,setLoading]=useState(false)
  const {imnage,title,author,yearOfRelease,genre,price,rating,about}=inputData
   
  // alert function from toastify  //
  const alertError=(msg)=> toast.error(msg)
     const alertSuccess=(msg)=>toast.success(msg)

 // posting data to database //
 useEffect(()=>{
  // saving post to mongo Db 
  if(url){
    setLoading(true)
     fetch("https://tame-ox-train.cyclic.app/sellbook/addbook",{
         method:"POST",
         headers:{
             "Content-Type":"application/json",
             "Authorization":"Bearer "+ localStorage.getItem("Buycartoken")
         },
         body:JSON.stringify({
          image:url,
          title:inputData.title,
          author:inputData.author,
          yearOfRelease:inputData.yearOfRelease,
          genre:inputData.genre,
          price:inputData.price,
          rating:inputData.rating,
          about:inputData.about
         })
     }).then(res=>res.json())
     .then(data=> {if(data.error){
         alertError(data.error)
         setLoading(false)
     } else{
         alertSuccess("Successfully Posted...!")
         setLoading(false)
       //  navigate("/")
     }
 })
     .catch(err=> console.log(err))
  }
  
},[url])

  const handleChange=(e)=>{
    const {value,name}=e.target
    setInputData({
     ...inputData,
     [name]:value
    })
    console.log(inputData)
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log("data",inputData)
    postDetails()
  }

  // posting image to cloudinary 
  const postDetails=()=>{
   
    console.log("imageUrl",imageUrl)
    const data=new FormData();
    data.append("file",imageUrl)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","omeshcloud")
    fetch("https://api.cloudinary.com/v1_1/omeshcloud/image/upload",{
        method:"POST",
        body:data
    }).then(res=>res.json())
    .then((data)=> setUrl(data.url))
    .catch(err=> console.log(err))

   
 }
 const loadFile=(event)=>{
  var output = document.getElementById('output');
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function() {
    URL.revokeObjectURL(output.src) // free memory
  }
}
  if(loading){
    return  <div class="loadingio-spinner-spinner-977el9wwy2v"><div class="ldio-4j5ay0xf86g">
    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div></div>
  
  }
  return (
     <div className='sellcardiv'>
     <div className='carformContainer'>
     <div className='carform'>
         <form action="" onSubmit={handleSubmit}>
         <div className='img_look'>
         <img id='output' src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png' />
         </div>
       <div className='carform1'>
       <FormLabel>Image of Book</FormLabel>
      <Input type="file" accept='image/*'  onChange={(event)=>{
                loadFile(event);
                setImageUrl(event.target.files[0])
            }} />
      <FormLabel>Title</FormLabel>
      <Input type='text' placeholder='ex-Lords of Ring, HarryPotter' value={title} name="title" onChange={handleChange } />

     

  <FormLabel>Author</FormLabel>
  <Input type='text' placeholder='ex- Prem Chandra, Deen Dayal' value={author} name="author" onChange={handleChange } />

  <FormLabel>Year of Release</FormLabel>
  <Input type='number' placeholder='ex- 2010,2021' value={yearOfRelease} name="yearOfRelease" onChange={handleChange} />

  <FormLabel>Genre</FormLabel>
  <Select placeholder='Select color' style={{backgroundColor:"tomato"}} value={genre} name="genre" onChange={handleChange}>
    
    <option value="Action">Action</option>
    <option value="Adventure">Adventure</option>
    <option value="Comedy">Comedy</option>
    <option value="Romance">Romance</option>
  </Select>
 
  <FormLabel>Price </FormLabel>
  <Input type='number' placeholder='ex- 1000,200,300' value={price} name="price" onChange={handleChange} />
       </div>
       <div className='carform2'>
       <FormLabel>Rating</FormLabel>
      <Input type='number' placeholder='ex- 1,2,3....' value={rating} name="rating" onChange={handleChange} />
      <FormLabel>Description</FormLabel>
      <Input type='text' placeholder='ex-About Book....' value={about} name="about" onChange={handleChange} />

  
     
      <Input type="submit" />
       </div>


       
         </form>
      </div>
      
     </div>
     </div>
   )
 }
 
 export default PostBook