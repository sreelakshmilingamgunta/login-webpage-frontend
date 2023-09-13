import React,{useState} from "react";
import './signup.css'
import { useNavigate } from "react-router-dom";
import Validation from "../validationform/validationfrom";
import {CgDanger} from "react-icons/cg"
import {TiTick} from "react-icons/ti";
function Signup(){
    const [formData,setFormData]=useState({username:"",email:"",password:"",confirmPassword:""})
    const[errors,setErrors]=useState({})
    const[propsMessage,setPropsMessage]=useState("")
    const[props,setProps]=useState(false)
    const[propMsg,setPropMsg]=useState(false)

    const navigate=useNavigate();

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
    }
    
    const handleSubmit= async (e) =>{
        e.preventDefault();
        var errData=Validation(formData)
        setErrors(errData)

        if(errData.email_verify==="success" && errData.password_verify==="success" && errData.confirmPassword_verify==="success"){
            if(formData.password===formData.confirmPassword){
                let userDetails={
                    Name:formData.username,
                    Email:formData.email,
                    Password:formData.password,
                }
                let options={
                    method:"POST",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify(userDetails),
                }
                const response=await fetch("http://localhost:5176/api/UserDetails/signup",options);
                console.log(response)
                const responseCode=await response.json();
                console.log(responseCode)
                if(response.status===200){
                    console.log(responseCode.prop);
                    setPropsMessage("User created successfully!")
                    setProps(false)
                    setPropMsg(true)
                    // setTimeout(()=>{navigate('/logout',{replace:true})},4000)
                }
                else{
                    setPropsMessage("The Mail is Already Exit!")
                    setProps(true)
                    setPropMsg(false)
                }
            
            }
            else{
                setPropsMessage("Both the passwords should be same. Please try again!")
                setProps(true)
                setPropMsg(false)
                errors.email_verify="";
                errors.password_verify="";
                errors.confirmPassword_verify=""
            }
        }
    }

    const OnClickLogin=()=>{
        navigate("/",{replace:true})
    }
    const handleFocus=((event)=>{
        const n=event.target.name;
        console.log(n)
        errors[n]="";
    });
    return(
        <div className="signup">
            <div className="card">
                <div className="right">
                    {propMsg?<div className="container prop-container">
                        <p>{propsMessage}</p><TiTick className="icon"></TiTick>
                        </div>:""}
                    {props?<div className="error-container container">
                        <CgDanger className="icon"/><p>{propsMessage}</p>  
                    </div>:""}
                    <h1>Sign Up</h1>
                    <form className="right-form" onSubmit={handleSubmit}>
                        {errors.username && <span className="span-element">{errors.username}</span>}
                        <input type="text" name="username" placeholder="Username"  className="right-input" value={formData.username} onChange={handleChange} onFocus={handleFocus}/>

                        {errors.email && <span className="span-element">{errors.email}</span>}
                        <input type="email" name="email" placeholder="Email" className="right-input" value={formData.email} onChange={handleChange} onFocus={handleFocus}/>

                        {errors.password && <span className="span-element">{errors.password}</span>}
                        <input type="password" name="password" placeholder="Password" className="right-input" value={formData.password} onChange={handleChange} onFocus={handleFocus}/>

                        {errors.confirmPassword && <span className="span-element">{errors.confirmPassword}</span>}
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" className="right-input" value={formData.confirmPassword} onChange={handleChange} onFocus={handleFocus}/>
                        <button className="right-button" type="submit">SignUp</button>
                    </form>
                </div>
                <div className="signup-left">
                    <h1 className="left-heading">Hello World</h1>
                    <p className="left-paragraph">Every problem is a gift  without problems we would not grow.</p>
                    <span className="span">Do you have an account?</span>
                    <button className="left-button" onClick={OnClickLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}
export default Signup;