import React from 'react'
import '../../css/input.css';

const Input = ({type, placeholder, name, value, onChange, Component}) => {
  return (
    <div class="inputGroup">
      <input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} autocomplete="off" />
      <label for={name}>{name}</label>
      {Component}
    </div>
  )
}

export default Input