import React, { useState } from 'react'
import { useNavigate,Link} from 'react-router-dom';
import {enqueueSnackbar, useSnackbar} from "notistack";
import Spinner from '../components/Spinner';

const CreateFood = () => {

  const[name,setName]=useState('');
  const [priceInCents,setPriceInCents]=useState(``);

  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const {enqueueSnackbar} = useSnackbar();

  const [img,setImg]= useState(null);
  const [imgPreview,setImgPreview] = useState(null);


const handleFileChange = (e)=>{
  const selectedfile = e.traget.file[0];
  setImg(selectedfile);
  if(selectedfile){
    const reader = new FileReader();
    reader.onload=()=>{
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(selectedfile);
   
  }  else {
    setImgPreview(null);
  }
}

const uploadFile = async()=>{

}

const handleSaveFood = async ()=>{

}

  return (
    <div className='p-6 bg-gray-50 min-h-screen flex justify-center items-center'>
      {loading && <Spiner/>}
      <div className='container max-w-lg shadow-lg rounded-lg bg-white p-5'>
      <Link to="/admin" className='flex justify-center items-center bg-gray-400 mb-4  w-12 p-2 text-sm rounded-xl'>Back</Link>
      <h1 className='text-3xl font-semibold text-gray-800 my-4'>Create Food</h1>
      <div className='space-y-4'>


        <label className='block text-lg text-gray-600 mb-2 ' htmlFor='name'>Name</label>
        <input 
        type="text"  
     
        id="name"
        value={name}
        onChange={(e)=>setName(e.traget.value)}
        className='w-full border border-gray-300 px-4 py-2 rounded-md'
        required


         />



<label className='block text-lg text-gray-600 mb-2 ' htmlFor='priceInCents'>PriceInCents</label>
        <input 
        type="number"  
        id="priceIncents"
        value={priceInCents}
        onChange={(e)=>setPriceInCents(e.traget.value)}
        className='w-full border border-gray-300 px-4 py-2 rounded-md'
        required


         />




<label className='block text-lg text-gray-600 mb-2 ' htmlFor= 'img'> UploadImage</label>
        <input 
        type="file"  
        id="img"
       accept='image/*'
        onChange={handleFileChange}
        className='w-full border border-gray-300 px-4 py-2 rounded-md'
        required


         />

         {imgPreview && (
          <div className='my-4'> <img src='{imgPreview} alt="Preview" className="max-w-full h-auto "'/></div>
         )}
         <button className='w-full bg-green-500 hover:bg-green-800 text-white' onClick={handleSaveFood}>Save</button>
      </div>
      </div>
    </div>
  )
}

export default CreateFood