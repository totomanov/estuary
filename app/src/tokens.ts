import wNEON from "./images/wNEON.svg"
import wSOL from "./images/wSOL.svg"
import USDT from "./images/USDT.svg"
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
    address: "0x202c35e517fa803b537565c40f0a6965d7204609",
    decimals: 18,
    logo: wNEON,
  },
  {
    symbol: 'wSOL',
    address: "0xc7Fc9b46e479c5Cb42f6C458D1881e55E6B7986c",
    decimals: 18,
    logo: wSOL,
  },
  {
    symbol: 'USDT',
    address: "0x5f0155d08eF4aaE2B500AefB64A3419dA8bB611a",
    decimals: 6,
    logo: USDT,
  },
  {
    symbol: 'USDC',
    address: "0xEA6B04272f9f62F997F666F07D3a974134f7FFb9",
    decimals: 6,
    logo: USDC,
  },
];

export const resolveTokenBySymbol = (symbol: string): Token => tokens.find((token) => token.symbol === symbol) ?? tokens[0];
export const getTokenContract = (token: Token) => ({
  address: token.address,
  abi: erc20Abi.abi,
})