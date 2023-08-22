import React, { useState, useContext } from 'react'
import '../styles/pages/SignIn.css'
import '../styles/pages/signUp.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { AppContext } from '../context/context';

export default function SignIn() {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('');
    const navigate = useNavigate()
    const [ isLoading, setIsloading ] = useState(true);
    const { setAuthenticated } = useContext(AppContext)

    const submit = async() => {
        await auth()
    }

    const auth = async () =>{
        const request = {
            username: email,
            password: password
        }

        const params = {
            method: 'POST',
            body: JSON.stringify(request)
        }
        console.log(params.body)
        try{
            const response = await fetch('https://tvibes.onrender.com/api/login/', params)
            // const responseData = await response.json()
            console.log(Response)
            setAuthenticated(true)
            // navigate('/dashboard')
        }
        catch (error){
            console.error(error)
        }
        finally{
            setIsloading(false)
        }
    }

  return (
    <div className='loginContainer'>
        <div class="form-group col-1-2">
            <label for="your-email">Email Address <span>*</span></label>
            <div class="form-field">
                <span class="form-field-container">
                    <input type="email" name="your-email" id="your-email"
                        placeholder="e.g. youremail@gmail.com"
                        accesskey="e" onChange={(e) => setEmail(e.target.value)}/>
                </span>
            </div>
        </div>
        <div class="form-group col-1-2">
            <label for="your-Password">Password <span>*</span></label>
            <div class="form-field">
                <span class="form-field-container">
                    <input type="password" name="your-Password" accesskey="p" 
                        onChange={(e) => setPassword(e.target.value)}/>
                </span>
            </div>
        </div>
        <div class="form-group col-1-2">
            <div class="form-field">
                <span class="form-field-container">
                    <button className='next-button' type='submit' onClick={submit}>Sign in</button>
                </span>
            </div>
        </div>
        <n3>Do not have an account? <Link to='/signup'>Sign Up</Link></n3>
    </div>
  )
}