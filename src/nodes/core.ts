import type { Libp2p } from 'libp2p' 
export const PUBSUB_PEER_DISCOVERY = "browser-peer-discovery";

export function getAddresses(libp2p: Libp2p): string {
  return libp2p
    .getMultiaddrs()
    .map((ma) => {
      return  `${ma.toString()}`// `<li class="text-sm break-all"><button class="bg-teal-500 hover:bg-teal-700 text-white mx-2" onclick="navigator.clipboard.writeText('${ma.toString()}')">Copy</button>${ma.toString()}</li>`;
    })
    .join(",");
}