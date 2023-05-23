import React, { useEffect,useState } from 'react'

/* .getItem("network") */

export default function localStorage() {
    
    const [value, setValue] = useState({});

    useEffect(()=>{
        if (window!=="undefined"){
            console.log(" 1111")
            setValue(localStorage.getItem("network")) 
            console.log("value 2 : ", value)
            
        }
    })
  return value;
}