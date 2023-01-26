import React from "react";
import Loginform from "./auth-components/loginform";
import NavbarAuth from "./auth-components/navbar";



export default function Loginpage(){
    
    return(
        <>
        <NavbarAuth/>
        <Loginform/>
        </>
    )
}