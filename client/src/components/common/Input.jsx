import React from 'react'
import '../../css/input.css';

const Input = ({type, placeholder, name, value, onChange, required}) => {
  return (
    <div class="inputGroup">
      <input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} autocomplete="off" />
      <label for={name}>{name}</label>
    </div>
  )
}

export default Input