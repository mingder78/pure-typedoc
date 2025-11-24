import { type BaseNodeClass, BaseNode, createP2PNode } from '@yourorg/pure-typedoc';

const testNode = createP2PNode("chain", BaseNode);
const nodeInstance = new testNode() as BaseNode; 
const node: BaseNodeClass = await nodeInstance.create();
console.log("✅ Node created:", node.libp2p.peerId.toString());
