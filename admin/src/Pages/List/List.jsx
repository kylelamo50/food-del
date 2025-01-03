import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({url}) => {
  const [list, setList] = useState([]);
  //const url="http://localhost:4000";
  

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log(response.data);

      if(response.data.success) {
        setList(response.data.data);
      }
      else{
        toast.error(response.data.message);
      }
   
    } catch (error) {
      console.error(error);
    }
  }

 const removeFood = async (id) => {
  const response = await axios.post(`${url}/api/food/remove/`,{id});
  await fetchList();
  if(response.data.success){
    toast.success(response.data.message);
  }
  else{
    toast.error(response.data.message);
  }
 }

  useEffect(() => {
    fetchList();
  }, []) //this function will run whenever the website is loaded

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>category</b>
          <b>Price</b>
          <b>Action</b>
         

        </div>

        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
          );
        })}
    
      </div>
    </div>
  )
}

export default List