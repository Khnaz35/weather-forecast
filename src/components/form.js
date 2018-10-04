import React from 'react';

const Form = (props) => {
  const { handleSubmit, handleChange, inputEmpty} = props;
  // let disabled = inputEmpty ? 'disabled' : null;
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-input-container'>
        <input type='text'
          placeholder='Search by city name...'
          name='search'
          onChange={handleChange}>

        </input>
        <div className='styled-select blue semi-square'>
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
