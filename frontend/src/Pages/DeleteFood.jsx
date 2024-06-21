import React,{useState} from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {useSnackbar} from "notistack";
import Spinner from '../components/Spinner';

const DeleteFood = () => {
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();


  const handleDeleteFood =()=>{
    setLoading(true);
    axios
    .delete(`https://foodweb-backend.onrender.com/food/${id},config`)
    .then(()=>{
      setLoading(false);
      enqueueSnackbar('Food Deleted',{variant:'success'});
      navigate('/admin');

    })
    .catch((error)=>{
      setLoading(false);
      enqueueSnackbar('Error',{variant:'error'})
      console.log(error);
    })

  }
  return (
    
    <div className='p-6 bg-gray-50 flex justify-center items-center'>
      {loading && <Spinner/>}
      <div className='container max-w-lg shadow-lg p-5'>
    <Link to="/admin" className='flex justify-center items-center bg-gray-400 mb-4  w-12 p-2 text-sm rounded-xl'>Back</Link>
    <h2 className='text-2xl mb-4 font-semibold text-gray-600'>Are you sure you want to delete this food item?</h2>
    <button onClick={handleDeleteFood} className='bg-red-500 hover:bg-red-800 text-white py-2 px-4 rounded-lg w-full'>
      Yes,Delete
    </button>
      </div>
    </div>
  )
}

export default DeleteFood