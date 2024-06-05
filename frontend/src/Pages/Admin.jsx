import React,{useEffect,useState} from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';


const Admin = () => {
  const [food,setFood]=useState([]);
  const [loading,setLoading]=useState(false);


  useEffect(()=>{
    setLoading(true);
    axios
      .get('http://localhost:3000/food')
      .then((response)=>{
        setFood(response.data.data);
        setLoading(false);
      })
      .catch((error)=>{
        console.log(error);
        setLoading(false);
      });
  }
  )
  return (
    <div className='bg-gray-400'>
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col" className="py-3 px-5">  # </th>
              <th scope="col" className="py-3 px-5"> Name </th>
              <th scope="col" className= "py-3 px-5" > Price In Centsscope </th>
              <th scope="col" className= "py-3 px-5" >  </th>
            </tr>
          </thead>
          <tbody>
            {food.map((food,index)=>{

              <tr>
              <td className='py-3 px-5'>{index+1} </td>
              <td className='py-3 px-5'>{food.name} </td>
              <td className='py-3 px-5'>{food.priceInCents}</td>
              <td className='py-3 px-5'>
              
              <div>
                <div>
                  <Link to= "/" className=''></Link>
                  <Link to= "/"  ></Link>
                </div>
              </div>


              </td>
            </tr>
            })}
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin