import React from 'react';
import LocationSearchInput from './auto-complete';

const Form = (props) => {
  const { handleSubmit, inputEmpty, handleSelect, selectedAddress} = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-input-container'>
        <LocationSearchInput
          handleSelect={handleSelect}
          selectedAddress={selectedAddress}
        />

        <div className='styled-select'>
          <select name='unit'>
            <option value='farenheit'>&#176;F</option>
            <option value='celcius'>&#176;C</option>
          </select>
        </div>
      </div>
      <button type='submit' disabled={inputEmpty}>Get forecast</button>
    </form>
  )
}

export default Form;
