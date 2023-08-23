import React, { useContext} from "react";
import { AppContext } from "../../context/context";

function FinishUp() {

  const { setActiveIndex, inputValues, selected} = useContext(AppContext)

  const change = () => {
    setActiveIndex(0)
  };

  return (
    <section className="details">
      <div className="info">
        <h2>Finishing up</h2>
        <small>Double check everything looks okay before confirming</small>
        <div className="container-finish">
          <div>
            <h3>Personal Information</h3>
            <small onClick={change} style={{cursor: 'pointer'}}>Change</small>
            {
              Object.keys(inputValues).map((key) => (
                inputValues[key] !== 'password' || 'confirm_password' ? 
                  <div>
                    {key}: {inputValues[key]}
                  </div> : null
              ))
            }
          </div>
          <div className='choices'>
            {
                selected.map((item, index) => (
                    <div key={index} className='item'>{item}</div>
                ))
            }
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinishUp;