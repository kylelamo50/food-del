import React, { useEffect, useState } from 'react'
import './Home.css'
import Header from '../../Components/Header/Header'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay'
import AppDownload from '../../Components/AppDownload/AppDownload'
import axios from 'axios'

const Home = () => {
  const [category,setCategory]=useState("All");

 
    useEffect(()=>{
      axios.get('https://food-del-backend-8jq0.onrender.com')
      .then(response=>{
        console.log(response.data)
      })
      .catch(err=>console.log(err))
    },[])
      
  
  return (

    
    <div>  
        <Header/>   {/* mout header  in Home*/}
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category} />
        <AppDownload/>
    </div>
  )
}

export default Home