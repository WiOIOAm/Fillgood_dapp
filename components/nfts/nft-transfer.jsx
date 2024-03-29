import React, { useEffect, useState } from "react"
import FormButton from "../ui/form-button"
import FormInput from "../ui/form-input"
import CardLabel from "../ui/card-label"
import ErrorText from "../ui/error"
import { getNftContractAddress } from "../../utils/contracts"
import { nftAbi } from "../../utils/contract-abis"
import { useUser } from "../../contexts/UserContext"
import { useWeb3 } from "../../contexts/Web3Context"

const NftTransfer = () => {
  const { user } = useUser()
  const { web3 } = useWeb3()
  const [tokenId, setTokenId] = useState("")
  const [toAddress, setToAddress] = useState("")
  const [disabled, setDisabled] = useState(!tokenId || !toAddress)
  const [toAddressError, setToAddressError] = useState(false)
  const [tokenIdError, setTokenIdError] = useState(false)

  useEffect(() => {
    setDisabled(!toAddress || !tokenId)
    setTokenIdError(false)
    setToAddressError(false)
  }, [tokenId, toAddress])

  const mintNFT = () => {
    if (!web3.utils.isAddress(toAddress)) return setToAddressError(true)
    if (isNaN(Number(tokenId))) return setTokenIdError(true)
    setDisabled(true)
    const contractAddress = getNftContractAddress()
    const contract = new web3.eth.Contract(nftAbi, contractAddress)
    contract.methods
      .transferFrom(user, toAddress, tokenId)
      .send({ from: user })
      .on("transactionHash", hash => {
        console.log("Transaction hash:", hash)
      })
      .then(receipt => {
        setToAddress("")
        setTokenId("")
        console.log("Transaction receipt:", receipt)
      })
      .catch(error => {
        setDisabled(false)
        console.error(error)
      })
  }

  return (
    <div>
      <CardLabel leftHeader="Transfer NFT" />
      <FormInput
        value={toAddress}
        onChange={e => setToAddress(e.target.value)}
        placeholder="Receiving Address"
      />
      {toAddressError ? <ErrorText>Invalid address</ErrorText> : null}
      <FormInput
        value={tokenId}
        onChange={e => setTokenId(e.target.value)}
        placeholder="Token Id"
      />
      {tokenIdError ? (
        <ErrorText className="error">Invalid token ID</ErrorText>
      ) : null}
      <FormButton
        onClick={mintNFT}
        disabled={!toAddress || !tokenId || disabled}
      >
        Transfer
      </FormButton>
    </div>
  )
}

export default NftTransfer
