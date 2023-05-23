import React from "react"
import Image from 'next/image';
import Loading from "../../images/loading.svg"

const ConnectButton = ({ onClick, disabled }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <button className="connect-button" onClick={onClick} disabled={disabled}>
        {disabled ? (
          <div className="loadingContainer" style={{ width: "100%" }}>
            <Image className="loading" alt="loading" src={Loading} />
          </div>
        ) : (
          "Connect"
        )}
      </button>
    </div>
  )
}

export default ConnectButton
