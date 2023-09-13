import React, { useState } from "react";
import './forgot.css'
import { useNavigate } from "react-router-dom";
import Validation from "../validationform/validationfrom";
import {CgDanger} from "react-icons/cg"
import {TiTick} from "react-icons/ti";
export default function Forgot(){
    const[email,setEmail]=useState("")
    const[newPassword,setNewPassword]=useState("")
    const[confirmPassword,setConfirmPassword]=useState("")
    const[errors,setErrors]=useState({})
    const[nameCheck,setNameCheck]=useState(false);
    const[Message,setMessage]=useState("");
    const[propsMessage,setPropsMessage]=useState("")
    const[props,setProps]=useState(false)
    const[propMsg,setPropMsg]=useState(false)

    const navigate=useNavigate();

    
    const handleSubmitForgot=async(e)=>{
        e.preventDefault();
        var errData = Validation({email})
        setErrors(errData)
        console.log(errData)
        console.log(errors)
        if(errData.email_verify==="success"){
            let userDetails={
                Email:email,
            }
            let options={
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userDetails)
            }
            
            try{
                const response=await fetch("http://localhost:5176/api/UserDetails/forgot",options)
                console.log(response)
                const responseCode=await response.json();
                console.log(responseCode)
                if(response.status===200){
                    console.log(responseCode.prop)
                    setMessage("Mail is successfully verified!")
                    setNameCheck(true)
                }
                else{
                    console.log(responseCode.prop)
                    setMessage("User Not Exist, Please Try Again!")
                }
            }
            catch(error){
                alert(error.msg)
                console.log(error.msg)
            }
        }
    }

    const handleSubmitNewPassword=async(e)=>{
        e.preventDefault();
        let Data={newPassword,confirmPassword}
        console.log(Data);
        var errMsg=Validation(Data)
        setErrors(errMsg)
        console.log(errors)
        if(errMsg.newPassword_verify==="success" && errMsg.confirmPassword_verify==="success"){
            if(newPassword===confirmPassword){
                let userDetails={
                    Email:email,
                    Password:confirmPassword
                }
                let options={
                    method:"POST",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body:JSON.stringify(userDetails),
                }
                
                const response=await fetch("http://localhost:5176/api/UserDetails/newpassword",options);
                console.log(response)
                const responseCode=await response.json();
    
                if(response.status===200){
                    console.log(responseCode.prop)
                    setPropsMessage("password is successfully updated!")
                    setProps(false)
                    setPropMsg(true)
                    setTimeout(()=>{navigate("/",{replace:true})},3000)
                    
                }
                else{
                    setPropsMessage(responseCode.prop)
                    setProps(true)
                    console.log(responseCode.prop)
                }
    
            }
            else{
                setPropsMessage("passwords must be same, enter again!")
                setProps(true)
            }
        }
    }

    const handleFocus=((e)=>{
        const n=e.target.name;
        errors[n]="";
    })
    // const handleChange=(e)=>{
    //     const {name,value}=e.target;
    //     setFormData({...formData,[name]:value})
    // }
    // const handleNewPassword=(e)=>{
    //     const {name,value}=e.target;
    //     setNewData({...newData,[name]:value})
    // }
    
    return(
        <div className="forgot">
            <div className="forgot-card">
                <div className="forgot-right">
                    {propMsg?<div className="container prop-container">
                        <p>{propsMessage}</p><TiTick className="icon"></TiTick>
                        </div>:""}
                    {props?<div className="error-container container">
                        <CgDanger className="icon"/><p>{propsMessage}</p>  
                    </div>:""}
                    <h1 className="forgot-right-heading">Forgot Password</h1>
                    <form className="forgot-right-form" onSubmit={handleSubmitForgot}>
                        {errors.email && <span className="span-element">{errors.email}</span>}
                        <input type="email" name="email" placeholder="Email" className="forgot-right-input" onChange={(e)=>{setEmail(e.target.value)}} onFocus={handleFocus}/>
                        <button className="forgot-right-button" type="submit">Forgot Password</button>
                    </form>
                    <p className={nameCheck?"green position":"span-element position"}>{Message}</p>
                    <div className={nameCheck?"block-item":"none-item"}>
                        <h1 className="forgot-heading">Create New Password</h1>
                        <form className="forgot-right-form" onSubmit={handleSubmitNewPassword}>
                            {errors.newPassword && <span className="span-element">{errors.newPassword}</span>}
                            <input type="password" name="newPassword" placeholder="New Password" className="forgot-right-input" onFocus={handleFocus} onChange={(e)=>{setNewPassword(e.target.value)}}/>

                            {errors.confirmPassword && <span className="span-element">{errors.confirmPassword}</span>}
                            <input type="password" name="comfirmPassword" placeholder="Confirm Password" className="forgot-right-input" onFocus={handleFocus} onChange={(e)=>{setConfirmPassword(e.target.value)}} />
                            <button className="forgot-right-button reset-button" type="submit">Reset Password</button>
                        </form>
                    </div>
                </div>
                <div className="forgot-left">
                    <h1 className="forgot-left-heading">Hello World</h1>
                    <p className="forgot-left-paragraph">Strength and growth come only through continuous effort and struggle.</p>
                    <p>"If you're confused about what to do,
                        it's a sign that your enemy is winning."</p>
                </div>
            </div>
        </div>
    )
}