import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""})
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxMGQ0ODRiYWRiNDMzY2MwMzY4MmEyIn0sImlhdCI6MTY2MjEzMTY3Mn0.M9LiFyIIf5lmsxq-dk6NvfyQBn_eu7uRM4JFPFEN1uE'
            },

            body: JSON.stringify({email: credentials.email,password:credentials.password })
        });
        // getNote();
        const json=await response.json();
        console.log(json)
        if(json.success){
            //redirect
            localStorage.setItem('token',json.authtoken)
            props.showAlert("Logged in Successfully", "success")

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
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password}  />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login