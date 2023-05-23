import React from "react"

const FormButton = ({ children, onClick, disabled }) => {
  return (
    <button className="form-button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}

export default FormButton
