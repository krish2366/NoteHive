import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {

  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({email:"",password:""})

  const onChange = (e) =>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }


  const handleSubmit = async (e) =>{
    e.preventDefault()
    const data ={email: credentials.email,password: credentials.password}
    const response = await fetch("http://localhost:5000/api/auth/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(data),
    })
    const json = await response.json()
    console.log(json)

    if(json.success){
      localStorage.setItem('token',json.authToken)
      navigate("/")
      props.showAlert("Logged-in Successfully","success")
    }else{
      props.showAlert("wrong credentionals","danger")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="container m-auto mt-5 w-75">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={credentials.email}
            name="email"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={onChange}
            value={credentials.password}
            name="password"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
