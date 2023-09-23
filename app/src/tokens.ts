import wNEON from "./images/wNEON.svg"
import USDT from "./images/USDT.png"
import USDC from "./images/USDC.svg"

import erc20Abi from "../../contracts/artifacts/src/interfaces/IERC20.sol/IERC20.json";

export type Token = {
  address: string,
  symbol: string,
  decimals: number,
  logo: string
}

export const tokens: Token[] = [
  {
    symbol: 'wNEON',
    address: "0x11adC2d986E334137b9ad0a0F290771F31e9517F",
    decimals: 18,
    logo: wNEON,
  },
  {
    symbol: 'USDT',
    address: "0x6eEf939FC6e2B3F440dCbB72Ea81Cd63B5a519A5",
    decimals: 6,
    logo: USDT,
  },
  {
    symbol: 'USDC',
    address: "0x512E48836Cd42F3eB6f50CEd9ffD81E0a7F15103",
    decimals: 6,
    logo: USDC,
  },
];

export const resolveTokenBySymbol = (symbol: string): Token => tokens.find((token) => token.symbol === symbol) ?? tokens[0];
export const resolveTokenByAddress = (address: string): Token => tokens.find((token) => token.address.toLowerCase() === address.toLowerCase()) ?? tokens[0];
export const getTokenContract = (token: Token) => ({
  address: token.address,
  abi: erc20Abi.abi,
})