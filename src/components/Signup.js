import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"", email:"",password:"", cpassword:""})
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const  {name,email,password}=credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({name,email,password })
        });
        // getNote();
        const json=await response.json();
        console.log(name);
        console.log(email);
        console.log(password);

        console.log(json)
        if(json.success){
            localStorage.setItem('token',json.authtoken)
            props.showAlert("Account Created Successfully", "success")

            navigate("/")
        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }
            
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    } 
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name"  name="name" aria-describedby="emailHelp" onChange={onChange}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email"  aria-describedby="emailHelp" onChange={onChange}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password"  minLength={5} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} onChange={onChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup