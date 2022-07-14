import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Login(props) {
    const history=useHistory();
    const [credentials,setCredentails]=useState({email:"",password:""});

    const onChange=(e)=>
    {
        setCredentails({...credentials,[e.target.name]:e.target.value});
    }

    const onSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({email:credentials.email,password:credentials.password}),
            }
          );
        const json=await response.json();
        console.log(json);
        if(json.success)
        {
            //redirect to home page
            localStorage.setItem('token',json.authToken);
            history.push("/");
            props.showalert('Login Successfully','success');
        }
        else
        {
            props.showalert("Invalid Credentials","danger");
        }
    }


  return (
    <div className="mt-2">
      <h2>Login to continue using INoteBook</h2>
      <div className="my-4"></div>
      <form onSubmit={onSubmit}>
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            placeholder="Password"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Login
        </button>
      </form>
    </div>
  );
}
