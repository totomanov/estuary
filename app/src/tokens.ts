import wNEON from "./images/wNEON.svg"
import wSOL from "./images/wSOL.svg"
import USDT from "./images/USDT.svg"
import USDC from "./images/USDC.svg"

export type Token = {
  address: string,
  symbol: string,
  logo: string
}

export const tokens: Token[] = [
  {
    symbol: 'wNEON',
    address: "0x202c35e517fa803b537565c40f0a6965d7204609",
    logo: wNEON,
  },
  {
    symbol: 'wSOL',
    address: "0xc7Fc9b46e479c5Cb42f6C458D1881e55E6B7986c",
    logo: wSOL,
  },
  {
    symbol: 'USDT',
    address: "0x5f0155d08eF4aaE2B500AefB64A3419dA8bB611a",
    logo: USDT,
  },
  {
    symbol: 'USDC',
    address: "0xEA6B04272f9f62F997F666F07D3a974134f7FFb9",
    logo: USDC,
  },
];
