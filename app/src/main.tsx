import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { neonDevnet } from 'wagmi/chains'
import { Web3Modal } from '@web3modal/react'

const chains = [neonDevnet]
const projectId = "2bab6da282cd799aa11b471c94cdd3d5"

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})

const ethereumClient = new EthereumClient(wagmiConfig, chains)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>

      <WagmiConfig config={wagmiConfig}>
        <App />
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} themeVariables={{
        "--w3m-accent-color": "#dc44ac"
      }} />

    </ChakraProvider>
  </React.StrictMode>,
)
