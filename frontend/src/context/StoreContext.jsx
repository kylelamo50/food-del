import { createContext, useEffect, useState } from "react";
//import { food_list } from "../assets/assets";
import axios, { toFormData } from "axios";

export const StoreContext= createContext(null)

const StoreContextProvider=(props)=>{

    const [cartItems,setCartItems]=useState({});
    const url="http://localhost:4000";
    const [token,setToken]=useState("")


    /*
    const [cartItems,setCartItems]=useState({
     1:2,
     2:3})
    */

    const addToCart=async(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))   //if cart is empty//prev means that you're working with the most uptodate state
                                                           //... prev creates a shallow copy of that state
                                                           //states are immutable meaning it cannot be modified.Therefore, a copy is created
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))  //if item is already in the cart //[1]: prev[1] + 1
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart=async(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    useEffect(()=>{
        console.log(cartItems);
    },[cartItems])
    
   const getTotalCartAmount=()=>{
    
        let total=0;
        if (Object.keys(cartItems).length === 0) {
            return 0; // Return 0 if the cart is empty
        }

       
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=food_list.find((product)=>product._id===item);
                
                if (itemInfo) { // Ensure itemInfo is defined
                    total += itemInfo.price * cartItems[item];
                }
            }
           
            
        }
        return total;
   }
   


   const [food_list,setFoodList]= useState([])
   
   //get food list from the database
   const fetchFoodList=async ()=>{
        const response = await axios.get(url+"/api/food/list");
       // console.log(response)
        setFoodList(response.data.data)
   }

   const loadCartData = async (token) => {
    try {
        const response = await axios.post(url+"/api/cart/get",{}, { headers: { token }});
        setCartItems(response.data.cartData);
    } catch (error) {
        console.error("Error loading cart data:", error);
        // Optionally, show an error message to the user or take alternative actions.
    }
};

      //load food data onto the frontend whenever the page is loaded 
    useEffect(()=>{
        async function loadData(){
            await fetchFoodList()
            if(localStorage.getItem("token")){               //if token is present in the local storage
                setToken(localStorage.getItem("token"));      //set the token in the state variable 
                await loadCartData(localStorage.getItem("token")) //load the cart data
            } 
            else {
                console.log("No token found in localStorage.");
            }
        }
        loadData();
       },[])

    const contextValue={
        food_list,cartItems,setCartItems,addToCart,removeFromCart,getTotalCartAmount,url,token,setToken //can access variables and functions in any component

    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}


export default StoreContextProvider;
  
/*

### Explanation:
1. **Initialize [token](http://_vscodecontentref_/5)**: The [token](http://_vscodecontentref_/6) state is initialized from local storage, where it is stored after the user logs in.
2. **Add to Cart**: When adding an item to the cart, the [token](http://_vscodecontentref_/7) is included in the request headers to authenticate the request.
3. **Remove from Cart**: Similarly, when removing an item from the cart, the [token](http://_vscodecontentref_/8) is included in the request headers.

### How to Set the [token](http://_vscodecontentref_/9) After Login

When the user logs in, the server sends back a JWT, which you store in local storage and update the [token](http://_vscodecontentref_/10) state.

### Example Login Function
```

*/
