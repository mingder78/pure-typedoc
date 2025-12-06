import { type XNodeClass, XNode, BaseNode, createP2PNode } from './dist/';

const testNode = createP2PNode("chain", XNode, BaseNode);
const nodeInstance = new testNode() as XNode; 
const node: XNodeClass = await nodeInstance.create();
console.log("✅ Node created:", node.libp2p.peerId.toString());
