import React from "react"

const FormInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      className="form-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

export default FormInput
