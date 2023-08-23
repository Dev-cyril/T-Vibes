import React, { useState, createContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Redirect from '../pages/Redirect';
import SignUp from '../pages/signup/SignUp';
import SetPreference from '../pages/signup/SetPreference';
import PersonalInfo from '../pages/signup/PersonalInfo';
import FinishUp from '../pages/signup/Finish';
import Success from '../pages/signup/success';

export const AppContext = createContext()
const signUpComponents = [PersonalInfo, SetPreference, FinishUp, Success]

export default function Context() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [authenticated, setAuthenticated] = useState(false)
  const [inputValues, setInputValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const [selected, setSelected] = useState([])

  useEffect(() => {
    if (isButtonDisabled) {
      setActiveIndex(activeIndex);
    }
  }, [isButtonDisabled, activeIndex]);
  return (
    <AppContext.Provider value={{ selected, setSelected, activeIndex, setActiveIndex, isButtonDisabled, setIsButtonDisabled, authenticated, setAuthenticated, inputValues, setInputValues}}>
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignUp components={signUpComponents} />} />
                <Route path="/signin" element={<SignIn />} />
                {
                  authenticated ? <Route path="/dashboard" element={<Dashboard />} /> : <Route path="/signin" element={<SignIn />} />
                }
                <Route path="/not-found" element={<Redirect />} />
                <Route path="*" element={<Navigate to="/not-found" />} />
            </Routes>
        </Router>
    </AppContext.Provider>
  )
}
