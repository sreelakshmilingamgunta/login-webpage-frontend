import React, { useState } from "react";
import './login.css'
import { useNavigate} from "react-router-dom";
import Validation from "../validationform/validationfrom"
import {CgDanger} from "react-icons/cg"
import { TiTick} from "react-icons/ti";
function Login(){
    const[formData,setFormData]=useState({email:"",password:""})
    const[errors,setErrors]=useState({email:false,password:false})
    // const[store,setStore]=useState({})
    const[propsMessage,setPropsMessage]=useState("")
    const[props,setProps]=useState(false)
    const[propMsg,setPropMsg]=useState(false)

    const navigate=useNavigate();

    const handleChange=(e)=>{
        const{name,value}=e.target;
        setFormData({...formData,[name]:value})
    }

    const handleBlur=(e)=>{
        const {name}=e.target
        setErrors({...errors,
            [name]:!errors.name
        })
    }
  
    const handleSubmitLogin=async(e)=>{
        e.preventDefault();
        var errData=Validation(formData)
        // setStore(errData)

        setErrors({email:true,password:true})

        if(errData.email_verify==="success" && errData.password_verify==="success"){
            let userDetails={
                Email:formData.email,
                Password:formData.password,
            }
            let options={
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userDetails)
            }
            try{
                const response=await fetch("http://localhost:5176/api/UserDetails/login",options);
                console.log(response);
                const jsonResponse=await response.json();
                console.log(jsonResponse);

                if(response.status===200){
                    console.log(jsonResponse.prop);
                    setPropsMessage(jsonResponse.prop)
                    setPropMsg(true)
                    setProps(false)
                    // setTimeout(()=>{navigate('/forgot',{replace:true}) },3000) 
                        
                }
                else{
                    setPropsMessage(jsonResponse.prop);
                    setProps(true);
                    setPropMsg(false)
                }
            }catch(error){
                alert(error.msg)
                console.log(error.msg)
            }
        }
    }
    const OnClickSignup=()=>{
        navigate("/signup",{replace:true})
    }
    const OnClickForgot=()=>{
        navigate('/forgot',{replace:true})
    }
    return(
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1 className="left-heading">Hello World</h1>
                    <p className="left-paragraph">Start for free and get attractive offers from the community.</p>
                    <div className="sign-up-div">
                        <span className="span">Don't you have an account?</span>
                        <button className="left-button" onClick={OnClickSignup}>Sign up</button>
                    </div>
                </div>
                <div className="right">
                    {propMsg?<div className="container prop-container">
                        <p>{propsMessage}</p><TiTick className="icon"></TiTick>
                        </div>:""}
                    {props?<div className="error-container container">
                        <CgDanger className="icon"/><p>{propsMessage}</p>  
                    </div>:""}
                    <h1>LogIn</h1>
                    <form className="right-form" onSubmit={handleSubmitLogin}>
                        <input type="email" name="email" placeholder="User Mail" value={formData.email} onChange={handleChange} className="right-input"  onBlur={handleBlur}/>
                        {errors.email && <span className="span-element">{Validation(formData).email}</span>}

                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="right-input"  onBlur={handleBlur}/>
                        {errors.password && <span className="span-element">{Validation(formData).password}</span>}
                        
                        <span className="forgot-element" onClick={OnClickForgot}>Forgot Password?</span>
                        <button className="right-button" type="submit">Log in</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;