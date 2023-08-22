import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../context/context';
import { Link } from 'react-router-dom';

const PersonalInfo = () => {
  const {inputValues, setInputValues} = useContext(AppContext)
  const {next, isButtonDisabled, setIsButtonDisabled} = useContext(AppContext)

  useEffect(() => {
    const { first_name, last_name, email, password, confirm_password } = inputValues
    setIsButtonDisabled(!(first_name !== '' && last_name !== '' && email !== '' && password !== '' && confirm_password === password));
  }, [inputValues, setIsButtonDisabled]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({ ...prevValues, [name]: value.trim() }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isButtonDisabled) {
      e.preventDefault();
      next();
    }
  };

  return (
    <section className="details">
      <div className="info">
        <h2>Let's get you started</h2>
        <small>Please provide your name, email, and phone number</small>
        <form>
          <div className="form-group col-1-2">
            <label htmlFor="name">First Name <span className='form-help'>*</span> </label>
            <div className="form-field">
              <span className="form-field-container">
                <input
                  type="text"
                  name="first_name"
                  placeholder="e.g. Joseph Doe"
                  maxLength="35"
                  autoComplete="on"
                  required
                  onKeyDown={handleKeyDown}
                  onChange={handleInputChange}
                  value={inputValues.first_name !== '' ? inputValues.first_name : ''}
                />
                <i className="form-field-icon"></i>
              </span>
            </div>
          </div>
          <div className="form-group col-1-2">
            <label htmlFor="name">Last Name <span className='form-help'>*</span> </label>
            <div className="form-field">
              <span className="form-field-container">
                <input
                  type="text"
                  name="last_name"
                  placeholder="e.g. Joseph Doe"
                  maxLength="35"
                  autoComplete="on"
                  required
                  onKeyDown={handleKeyDown}
                  onChange={handleInputChange}
                  value={inputValues.last_name !== ''? inputValues.last_name : ''}
                />
                <i className="form-field-icon"></i>
              </span>
            </div>
          </div>
          <div className="form-group col-1-2">
            <label htmlFor="email">Email Address <span className='form-help'>*</span> </label>
            <div className="form-field">
              <span className="form-field-container">
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. johndoe@email.com"
                  maxLength="55"
                  autoComplete="on"
                  required
                  onKeyDown={handleKeyDown}
                  onChange={handleInputChange}
                  value={inputValues.email !== '' ? inputValues.email : ''}
                />
                <i className="form-field-icon"></i>
              </span>
            </div>
          </div>
          <div className="form-group col-1-2">
            <label htmlFor="phone">Password <span className='form-help'>*</span> </label>
            <div className="form-field">
              <span className="form-field-container">
                <input
                  type="password"
                  id="phone"
                  name="password"
                  required
                  onKeyDown={handleKeyDown}
                  onChange={handleInputChange}
                  maxLength={15}
                  minLength={8}
                  placeholder='Minimum of 8 characters and maximum of 15 characters...'
                  value={inputValues.password !== '' ? inputValues.password : ''}
                />
                <i className="form-field-icon"></i>
              </span>
            </div>
          </div>
          <div className="form-group col-1-2">
            <label htmlFor="phone">Confirm Password <span className='form-help'>*</span> </label>
            <div className="form-field">
              <span className="form-field-container">
                <input className={`${inputValues.password !== inputValues.confirm_password} ? invalid : ''`}
                  value={inputValues.confirm_password !== '' ? inputValues.confirm_password : ''}
                  type="password"
                  placeholder='Must be equal to your password...'
                  id="phone"
                  name="confirm_password"
                  required
                  onKeyDown={handleKeyDown}
                  onChange={handleInputChange}
                  maxLength={15}
                  minLength={8}
                />
                <i className="form-field-icon"></i>
              </span>
            </div>
          </div>
        </form>
      </div>
    <small>Already have an account? <Link to='/signin'>Log in</Link></small>
    </section>
  );
};

export default PersonalInfo;