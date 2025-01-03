import React, { useContext, useEffect, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'


const LoginPopUp = ({setShowLogin}) => {

    const[currState,setCurrentState]= useState("Login")

    const {url,setToken}=useContext(StoreContext)

    //integrated with backend api
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })

    //take data from input fields and save it in data state
    const onChangeHandler=(e)=>{
        const name=e.target.name
        const value=e.target.value

        //pass previous data and update the value of the field
        setData(data=>({...data,[name]:value}))
    }

 //   useEffect(()=>{
   //     console.log(data)
   // },[data])

    const onLogin=async(e)=>{
        e.preventDefault()
        let newUrl=url;
        if(currState=== "Login"){
            newUrl+= "/api/user/login"
        }
        else{
            newUrl+= "/api/user/register"
        }
        console.log('Request URL:', newUrl); // Debugging: Log request URL
        console.log('Request Data:', data); // Debugging: Log request data
        const response = await axios.post(newUrl, data); // Corrected line
        console.log('Response Data:', response.data); // Debugging: Log response data
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false)

        }
        else{
            alert(response.data.message)
        }
      
    }

  return (
    <div className='login-pop-up'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className='login-popup-title'>
                <h2>{currState}</h2>
                <img  onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />

            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" required />}
                
                <input name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder=" Your Email" required/>
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
                
            </div>
            <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login-popup-condition">
                <input type='checkbox'  required/>
                <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
            {currState ==="Login"
            ?<p>Create a new account?<span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>
            :<p>Already have an account?<span onClick={()=>setCurrentState("Login")}>Login here</span></p>
            }
            

        </form>
    </div>
  )
}

export default LoginPopUp