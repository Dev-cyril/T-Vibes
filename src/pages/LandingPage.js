import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/pages/landingPage.css'

export default function LandingPage() {
  return (
    <section className='landPg'>
        <p>Welcome to Saver Bank</p>
        <div className='main'>
            <Link to='/signup'><button>Sign up</button></Link>
            <Link to='/signin'><button>Sign In</button></Link>
        </div>
    </section>
  )
}