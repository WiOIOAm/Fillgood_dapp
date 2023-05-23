import React, { useState } from "react"
import DownArrow from "../../images/down-arrow.svg"
import Check from "../../images/check.svg"
import { Networks } from "../../utils/networks"
import Image from 'next/image';


const getInitialState = () => {
  if (typeof window !== "undefined") {
    const Netwrk = localStorage.getItem("network");
    if (Netwrk) {
      return Netwrk;
    } else {
      return Networks.Goerli;
    }
  }
  else return Networks.Goerli
};


const Network = () => {
  const networkOptions = [
    Networks.Sepolia,
    Networks.Goerli,
    Networks.Polygon,
    Networks.Optimism
  ]
  const [isOpen, setIsOpen] = useState(false)
  const [network, setNetwork] = useState(
    getInitialState()
  )

  const handleNetworkSelected = networkOption => {
    if (networkOption !== network) {
      setNetwork(networkOption)
      localStorage.setItem("network", networkOption)
      window.location.reload()
    }
  }

  const ActiveNetwork = ({ network }) => {
    return (
      <div className="active-network">
        {network}
        <Image
          src={DownArrow}
          height="20px"
          alt="down-arrow"
          className={isOpen ? "rotate" : ""}
        />
      </div>
    )
  }

  const NetworkDropdownOption = ({ network }) => {
    return (
      <div
        className="network-dropdown-option"
        onClick={() => {
          handleNetworkSelected(network)
        }}
      >
        <Image
          src={Check}
          height="15px"
          alt="check"
          style={{ marginRight: "10px" }}
        />
        {network}
      </div>
    )
  }

  return (
    <div className="network-dropdown" onClick={() => setIsOpen(!isOpen)}>
      <ActiveNetwork network={network} />
      {isOpen ? (
        <div className="network-options">
          {networkOptions.map(networkOption => (
            <NetworkDropdownOption
              key={networkOption}
              network={networkOption}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default Network
