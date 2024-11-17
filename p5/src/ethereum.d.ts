// ethereum.d.ts
interface Ethereum {
  request: (request: { method: string, params?: Array<any> }) => Promise<any>;
}

interface Window {
  ethereum?: Ethereum;
}
