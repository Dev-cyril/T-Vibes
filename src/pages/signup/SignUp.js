import React, { useState, useEffect, useContext } from 'react';
import '../../styles/pages/signUp.css';
import { AppContext } from '../../context/context';

export default function SignUp ({ components }) {
  const { isButtonDisabled, activeIndex, setActiveIndex, inputValues} = useContext(AppContext)
  const ActiveComponent = components[activeIndex];

  useEffect(() => {
    if (isButtonDisabled) {
      setActiveIndex(activeIndex);
    }
  }, [isButtonDisabled, activeIndex]);

  const next = () => {
    setActiveIndex(prevIndex => prevIndex + 1);
  };

  const previous = () => {
    setActiveIndex(prevIndex => prevIndex - 1);
  };

  const finish = async() => {
    const url = 'https://tvibes.onrender.com/api/signup/'
    const signUpRequest = inputValues
    const params = {
      method: 'POST',
      body: JSON.stringify(signUpRequest)
    }
    
    try{
      const response = await fetch(url, params);
      if (response.token){
          setAuthenticated(true)
          next()
          // navigate('/dashboard')
      }
    }
    catch(err){
      alert(err)
    }
  }

  return (
      <div className='sect'>
        <aside>
          <div className={`div`}>
            <div className={`number ${activeIndex === 0 ? 'active' : ''}`}>1</div>
            <div>
              <h3> Step 1<br /> <span>YOUR INFO</span> </h3>
            </div>
          </div>
          <div className={`div`}>
            <div className={`number ${activeIndex === 1 ? 'active' : ''}`}>2</div>
            <div>
              <h3> Step 2<br /> <span>SELECT MUSIC FAVE</span> </h3>
            </div>
          </div>
          <div className={`div`}>
            <div className={`number ${activeIndex === 2 ? 'active' : ''}`}>3</div>
            <div>
              <h3> Step 3<br /> <span>FINISH</span> </h3>
            </div>
          </div>
        </aside>
        <div className="container">
          {ActiveComponent && <ActiveComponent />}
          {
            (activeIndex < components.length - 1) ?
              <div className="button-wrapper">
                {activeIndex >= 1 && components.length - 1 && <p className="back-button" onClick={previous}>Go back</p>}
                <div className="button-container">
                  {activeIndex < components.length - 1 ? (
                    <button disabled={isButtonDisabled} className="next-button" onClick={next}>
                      Next step
                    </button>
                  ) : (
                    <button disabled={isButtonDisabled} className="finish-button" onClick={finish}>
                      Confirm
                    </button>
                  )}
                </div>
              </div>
              : null
          }
        </div>
      </div>
  );
};