# Estuary
Estuary is a simple application that allows you to stream ERC20 tokens. 

Using the app you can create a new stream by entering its recipient, token, amount and duration. By creating a stream, you are locking the full amount in the Estuary contract. The tokens will unlock linearly for the recipient until the full duration has passed.  The recipient can claim the unlocked amount as often as they want but they must wait for the stream to end to receive all the tokens. Streams can be used to pay on-chain salaries or create token vesting schedules.
## How it's made
This project has a frontend and smart contract. The contracts are written in Solidity, tested using foundry and deployed on the Neon Devnet using hardhat.

The frontend is a React app set up with vite. It uses typescript, the free version of Chakra UI for the components, wagmi and viem for interfacing with the contracts, Fontawesome icons via react-icons and moment.js for handling timestamps.
## Run the frontend
#### Step 1: Clone this repo
```
❯ git clone https://github.com/totomanov/estuary
```

#### Step 2: Navigate to the app directory
```
❯ cd app
```

#### Step 3: Install dependencies
```
❯ npm i
```

#### Step 4: Run the React app locally
```
❯ npm run dev
```
#### Step 5 (Optional): Obtain Neon EVM tokens
https://neonfaucet.org/

#### Step 6 (Optional): Add Neon EVM to Metamask
https://docs.neonfoundation.io/docs/wallet/metamask_setup
