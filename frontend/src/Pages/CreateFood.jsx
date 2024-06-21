import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSnackbar } from "notistack";
import axios from 'axios';
import Spinner from '../components/Spinner';

const CreateFood = () => {
  const [name, setName] = useState('');
  const [priceInCents, setPriceInCents] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImg(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImgPreview(null);
    }
  };

  const uploadFile = async () => {
    if (!img) {
      enqueueSnackbar('No image selected', { variant: 'warning' });
      return null;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      enqueueSnackbar('Authentication required', { variant: 'error' });
      return null;
    }

    const data = new FormData();
    data.append('file', img);

    try {
      const uploadUrl = 'https://foodweb-backend.onrender.com/upload-image';
      const res = await axios.post(uploadUrl, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const { secure_url } = res.data;
      enqueueSnackbar('Image uploaded successfully', { variant: 'success' });
      return secure_url;

    } catch (error) {
      console.error('Upload error', error);
      enqueueSnackbar('Failed to upload an image', { variant: 'error' });
      return null;
    }
  };

  const handleSaveFood = async () => {
    if (!name || !priceInCents) {
      enqueueSnackbar('Please fill all required fields', { variant: 'warning' });
      return;
    }

    const price = parseInt(priceInCents);
    if (isNaN(price) || price <= 0) {
      enqueueSnackbar('Price must be a positive number', { variant: 'warning' });
      return;
    }

    if (name.length < 2 || name.length > 30) {
      enqueueSnackbar('Food name must be 2 to 30 characters long', { variant: 'warning' });
      return;
    }

    setLoading(true);

    try {
      const uploadedImageUrl = await uploadFile();
      if (!uploadedImageUrl) {
        throw new Error('Image upload failed');
      }

      const formData = {
        name,
        priceInCents,
        image: uploadedImageUrl
      };

      const token = localStorage.getItem('token');
      if (!token) {
        enqueueSnackbar('Authentication failed', { variant: 'error' });
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      };

      await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/food`, formData, config);
      enqueueSnackbar('Food saved successfully', { variant: 'success' });
      navigate('/admin');
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar('Error saving food: ' + (error.response?.data?.message || error.message), { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-6 bg-gray-50 min-h-screen flex justify-center items-center'>
      {loading && <Spinner />}
      <div className='container max-w-lg shadow-lg rounded-lg bg-white p-5'>
        <Link to="/admin" className='flex justify-center items-center bg-gray-400 mb-4  w-12 p-2 text-sm rounded-xl'>Back</Link>
        <h1 className='text-3xl font-semibold text-gray-800 my-4'>Create Food</h1>
        <div className='space-y-4'>
          <label className='block text-lg text-gray-600 mb-2' htmlFor='name'>Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full border border-gray-300 px-4 py-2 rounded-md'
            required
          />

          <label className='block text-lg text-gray-600 mb-2' htmlFor='priceInCents'>Price (in cents)</label>
          <input
            type="number"
            id="priceInCents"
            value={priceInCents}
            onChange={(e) => setPriceInCents(e.target.value)}
            className='w-full border border-gray-300 px-4 py-2 rounded-md'
            required
          />

          <label className='block text-lg text-gray-600 mb-2' htmlFor='img'>Upload Image</label>
          <input
            type="file"
            id="img"
            accept='image/*'
            onChange={handleFileChange}
            className='w-full border border-gray-300 px-4 py-2 rounded-md'
            required
          />

          {imgPreview && (
            <div className='my-4'>
              <img src={imgPreview} alt="Preview" className="max-w-full h-auto" />
            </div>
          )}

          <button className='w-full bg-green-500 hover:bg-green-800 text-white py-2 rounded-md' onClick={handleSaveFood}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default CreateFood;
