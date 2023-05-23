import { Magic } from "magic-sdk"
import { Networks } from "../utils/networks"
/* import localStorage from "../utils/localStorage" */

const formattedNetwork = () => {
  console.log("magic .js formattedNetwork")
  /* const network = await localStorage() */
  

    const network =  localStorage.getItem("network") 
    console.log("network :" ,network)
    switch (network) {
      case Networks.Optimism:
        return {
          rpcUrl: process.env.REACT_APP_OPTIMISM_RPC_URL,
          chainId: 420
        }
      case Networks.Polygon:
        return {
          rpcUrl: process.env.REACT_APP_POLYGON_RPC_URL,
          chainId: 80001
        }
      case Networks.Goerli:
        return {
          rpcUrl: process.env.REACT_APP_GOERLI_RPC_URL,
          chainId: 5
        }
      default:
        return {
          rpcUrl: process.env.REACT_APP_SEPOLIA_RPC_URL,
          chainId: 11155111
        }
    }

  
  
}

const createMagic = () => (typeof window !== "undefined") && new Magic("pk_live_3247E1E1BB785715",{network: formattedNetwork()});

export const magic = createMagic();
