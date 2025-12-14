import { type RelayClientNodeClass, RelayClientNode, BaseNode, createP2PNode } from './src';

const testNode = createP2PNode("chain", RelayClientNode, BaseNode);
const nodeInstance = new testNode() as RelayClientNode; 
const node: RelayClientNodeClass = await nodeInstance.create();
//console.log(nodeInstance.options)
console.log("✅ Node created:", node.libp2p.peerId.toString());
console.log("---------------------------------")
console.log('PeerID: ', node.libp2p.peerId.toString())
console.log('Multiaddrs: ', node.libp2p.getMultiaddrs())

