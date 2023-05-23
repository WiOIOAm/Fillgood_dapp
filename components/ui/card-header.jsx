import React from "react"

const CardHeader = ({ children, id }) => {
  return (
    <h1 className="card-header" id={id}>
      {children}
    </h1>
  )
}

export default CardHeader
