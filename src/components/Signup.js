import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cnfpassword:""})

  const onChange = (e) =>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) =>{

    e.preventDefault()

    if(credentials.password === credentials.cnfpassword && credentials.password !== ""){

      const data ={name: credentials.name,email: credentials.email,password: credentials.password}

      const response = await fetch("http://localhost:5000/api/auth/createuser",{
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
        props.showAlert("Account Created Successfully","success")
      }else{
        props.showAlert("wrong credentionals","danger")
      }

    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="container m-auto mt-5 w-75">
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            aria-describedby="nameHelp"
            onChange={onChange}
            value={credentials.name}
            name="name"
          />
          
        </div>
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
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputConfirmPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputConfirmPassword1"
            onChange={onChange}
            value={credentials.cnfpassword}
            name="cnfpassword"
            required
            minLength={5}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
