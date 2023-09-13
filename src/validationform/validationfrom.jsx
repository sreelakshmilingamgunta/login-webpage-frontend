export default function Validation(inputValues){
    console.log(inputValues)
    let validationErrors={}
    if(inputValues.username===""){
        validationErrors.username="*UserName is required"
    }

    if (inputValues.email==="") {
      validationErrors.email = '*Email is required';
    } else if (!/\S+@\S+\.\S+/.test(inputValues.email)) {
      // validationErrors.email = 'Please ingress a valid email address';
      validationErrors.email="";
    } else{
      validationErrors.email_verify="success"
    }


    const password = inputValues.password;
    if(password!==undefined){
      if (password==="") {
        validationErrors.password = '*password is required';
      } else if (password.length < 6) {
        validationErrors.password = 'Password must be longer than 6 characters';
      } else if (password.length >= 20) {
        validationErrors.password = 'Password must shorter than 20 characters';
      } else{
        validationErrors.password_verify="success"
      }
    }
    

    const newPassword = inputValues.newPassword;
    if(newPassword!==undefined){
      if (newPassword==="") {
        validationErrors.newPassword = '*password is required';
      } else if (newPassword.length < 6) {
        validationErrors.newPassword = 'Password must be longer than 6 characters';
      } else if (newPassword.length >= 20) {
        validationErrors.newPassword = 'Password must shorter than 20 characters';
      } else{
        validationErrors.newPassword_verify="success"
      }
    }

    const confirmPassword = inputValues.confirmPassword;
    if(confirmPassword!==undefined){
      if (confirmPassword==="") {
        validationErrors.confirmPassword = '*password is required';
      } else if (confirmPassword.length < 6) {
        validationErrors.confirmPassword = 'Password must be more than 6 characters';
      } else if (confirmPassword.length >= 20) {
        validationErrors.confirmPassword = 'Password must be less than 20 characters';
      }else{
        validationErrors.confirmPassword_verify="success"
      }
    }
    return validationErrors
}