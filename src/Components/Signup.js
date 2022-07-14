import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Signup(props) {

    const [credentials,setCredentails]=useState({name:"",email:"",password:"",confirmpassword:""})
    const history=useHistory();


    const onChange=(e)=>
    {
        setCredentails({...credentials,[e.target.name]:e.target.value});
    }

    const onSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch(
            "http://localhost:5000/api/auth/createuser",
            {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}),
            }
          );
        const json=await response.json();
        console.log(json);
        if(json.success)
        {
            //redirect to login page
            localStorage.setItem('token',json.authToken);
            history.push("/login")
            props.showalert('Account created successfully','success');
        }
        else
        {
          props.showalert('Invalid Credentials','danger');
        }
    }


  return (
    <div className="mt-2">
      <h2>Register yourself for using INoteBook</h2>
      <div className="my-4"></div>
      <form onSubmit={onSubmit}>
      <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter your name"
            onChange={onChange}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
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
            placeholder="Password"
            onChange={onChange}
            minLength={5} required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmpassword"
            name="confirmpassword"
            placeholder="Retype Password"
            onChange={onChange}
            minLength={5} required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
