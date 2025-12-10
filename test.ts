import { type BaseNodeClass, RelayClientNode, BaseNode, createP2PNode } from './src/index.ts';
import { getAddresses } from './src/nodes/core.ts';
async function main() {
    const testNode = createP2PNode("chain", RelayClientNode, BaseNode);
    const x = new testNode() as RelayClientNode;
    x.create().then(async (node) => {
    console.log("✅ Node created:", node.libp2p.peerId.toString());
    console.log("---------------------------------")
    console.log('PeerID: ', node.libp2p.peerId.toString())
    console.log('Multiaddrs: ', getAddresses(node.libp2p))
    repeatLog(node.libp2p.getConnections(), 1000)
})
}

function repeatLog(peers: any, delay: number) {
  function run() {
    console.log("🔵 Found peers on channel:", peers);
    setTimeout(run, delay);
  }

  run();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
