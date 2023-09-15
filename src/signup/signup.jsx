import React,{useState} from "react";
import './signup.css'
import { useNavigate } from "react-router-dom";
import Validation from "../validationform/validationfrom";
import {CgDanger} from "react-icons/cg"
import {TiTick} from "react-icons/ti";
function Signup(){
    const [formData,setFormData]=useState({username:"",email:"",newPassword:"",confirmPassword:""})
    const[errors,setErrors]=useState({username:false,email:false,password:false,confirmPassword:false})
    const[propsMessage,setPropsMessage]=useState("")
    const[props,setProps]=useState(false)
    const[propMsg,setPropMsg]=useState(false)

    const navigate=useNavigate();

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
    }

    const handleBlur=(e)=>{
        const {name}=e.target
        setErrors({...errors,
            [name]:!errors.name
        })
    } 
    
    const handleSubmit= async (e) =>{
        e.preventDefault();
        var errData=Validation(formData)
        // setErrors(errData)
        setErrors({username:true,email:true,newPassword:true,confirmPassword:true})

        if(errData.email_verify==="success" && errData.newPassword_verify==="success" && errData.confirmPassword_verify==="success"){
            if(formData.newPassword===formData.confirmPassword){
                let userDetails={
                    Name:formData.username,
                    Email:formData.email,
                    Password:formData.newPassword,
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
            }
        }
    }

    const OnClickLogin=()=>{
        navigate("/",{replace:true})
    }
      
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
                        <input type="text" name="username" placeholder="Username"  className="right-input" value={formData.username} onChange={handleChange} onBlur={handleBlur}/>
                        {errors.username && <span className="span-element">{Validation(formData).username}</span>}

                        <input type="email" name="email" placeholder="Email" className="right-input" value={formData.email} onChange={handleChange} onBlur={handleBlur}/>
                        {errors.email && <span className="span-element">{Validation(formData).email}</span>}

                        <input type="password" name="newPassword" placeholder="Password" className="right-input" value={formData.newPassword} onChange={handleChange} onBlur={handleBlur}/>
                        {errors.newPassword && <span className="span-element">{Validation(formData).newPassword}</span>}

                        <input type="password" name="confirmPassword" placeholder="Confirm Password" className="right-input" value={formData.confirmPassword} onChange={handleChange} onBlur={handleBlur}/>
                        {errors.confirmPassword && <span className="span-element">{Validation(formData).confirmPassword}</span>}
                        <button className="right-button" type="submit">Sign Up</button>
                    </form>
                </div>
                <div className="left">
                    <h1 className="left-heading">Hello World</h1>
                    <p className="left-paragraph">Every problem is a gift  without problems we would not grow.</p>
                    <div className="sign-up-div">
                        <span className="span">Do you have an account?</span>
                        <button className="left-button" onClick={OnClickLogin}>Log in</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Signup;