import { magic } from "./magic"

export const getProvider = () => {
  return magic.wallet.getProvider()
}