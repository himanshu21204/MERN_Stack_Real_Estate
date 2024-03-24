import '../../loginregister.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate()
    const [borderInput, setBorderInput] = useState("");
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState(""); 
    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const { data } = await axios.post('/login', {
                email, password
            });
            if (data.error) {
                setError(data.error)
                setBorderInput("1px solid red");
            }
            else {
                setError("")
                if(data.user.email === "hkp341@gmail.com"){
                    localStorage.setItem('isCreater',true);
                }
                localStorage.setItem('email',data.user.email);
                localStorage.setItem('userId',data.user._id);
                setData({})
                localStorage.setItem('isLogin',true);
                navigate('/');
            }
        
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <section className="containerlogin forms">
                <div className="form login">
                    <div className="form-content">
                        <header className='headerlogin'>Login</header>
                        <form action="#">
                            <div className="field input-field row">
                                <lable style={{marginTop:"11px"}} className="col-2 text-center">Email:</lable>
                                <input type="email" style={error && error.includes('Email') ? { border: borderInput } : null} placeholder="Email" className="input col" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                            </div>
                            <div className='row'>
                                <div className='col-2'></div>
                                {error && error.includes('Email') && <div className="error-msg col" style={{color:"red"}}>{error}</div>}    
                            </div> 
                            <div className="field input-field row">
                                <lable style={{marginTop:"11px"}} className="col-2 text-center">Password:</lable>
                                <input type="password" style={error && error.includes('Password') ? { border: borderInput } : null} placeholder="Password" className="password col" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                            </div>
                            <div className='row'>
                                <div className='col-2'></div>
                                {error && error.includes('Password') && <div className="error-msg col" style={{color:"red"}}>{error}</div>}    
                            </div> 
                            <div className='row mt-2'>
                                <div className='col-2'></div>
                                {error && error.includes('No user found') && <div className="error-msg col" style={{color:"red"}}>{error}</div>}    
                            </div> 
                            <div className="form-link">
                                {/* <a href="#" className="forgot-pass">Forgot password?</a> */}
                            </div>
                            <div className="field button-field">
                                <button type='submit' onClick={loginUser} >Login</button>
                            </div>
                        </form>
                        <div className="form-link">
                            <span>Don't have an account? <Link to='/register' className="link signup-link">Signup</Link></span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;