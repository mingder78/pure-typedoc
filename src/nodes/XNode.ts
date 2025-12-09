import { createLibp2p, type Libp2p, type Libp2pOptions } from "libp2p";
import { logger } from "@libp2p/logger";
import { circuitRelayTransport } from "@libp2p/circuit-relay-v2";
import { noise } from "@chainsafe/libp2p-noise";
import { yamux } from "@chainsafe/libp2p-yamux";
import { bootstrap } from "@libp2p/bootstrap";
import { pubsubPeerDiscovery } from "@libp2p/pubsub-peer-discovery";
import { floodsub } from "@libp2p/floodsub";
import { ping } from "@libp2p/ping";

import { tcp } from "@libp2p/tcp";

const log = logger("test");

// merge with BaseNode is required

export const PUBSUB_PEER_DISCOVERY = "browser-peer-discovery";

export interface XNodeClass {
  libp2p: Libp2p;
  options: Libp2pOptions;
  create: () => void;
  stop: () => void;
}

export class XNode {
  libp2p: Libp2p;
  options: Libp2pOptions = {
    addresses: {
      listen: [
        "/ip4/0.0.0.0/tcp/9001/ws",
        "/ip4/0.0.0.0/tcp/9002",
        // 👇 Required to create circuit relay reservations in order to hole punch browser-to-browser WebRTC connections
        "/p2p-circuit",
        // 👇 Listen for webRTC connection
      ],
    },
    transports: [
      // 👇 Required to create circuit relay reservations in order to hole punch browser-to-browser WebRTC connections
      // 添加@libp2p/circuit-relay-v2-transport支持
      circuitRelayTransport({}),
    ],
    connectionEncrypters: [noise()],
    streamMuxers: [yamux()],
    connectionGater: {
      // Allow private addresses for local testing
      denyDialMultiaddr: async () => false,
    },
    peerDiscovery: [
      bootstrap({
        // add your relay multiaddr here ! and rerun this client code
        list: [
          "/ip4/127.0.0.1/tcp/9001/ws/p2p/12D3KooWBfL9scKjoU1wqJgyokVUbrZc1zpwVamsxRpMatDhFrtZ",
        ],
      }),
    ],
    services: {
      pubsub: floodsub(),
      ping: ping(),
    },
  };
  constructor(libp2p: Libp2p) {
    this.libp2p = libp2p;
  }

  // ✅ static async factory
  /**
   * Create a new libp2p peer with bootstrap nodes.
   * @returns {Promise<P2PNode>} A promise that resolves to a P2PNode instance.
   * @example
   * ```typescript
   * import { P2PNode } from '@yourorg/libp2p-sdk/P2PNode';
   *
   * const main = async () => {
   *  const p2p = await P2PNode.create()
   *  console.log('Node is ready:', p2p.libp2p.peerId.toString())
   * // Example: listen for peer discovery
   *  p2p.libp2p.addEventListener('peer:discovery', (evt) => {
   *  console.log('Discovered:', evt.detail.id.toString())
   *  })
   *
   *  // Later, stop it
   *  // await p2p.stop()
   * }
   * main()
   * ```
   **/
  async create(): Promise<XNode> {
    const libp2p: Libp2p = await createLibp2p(this.options);
    await libp2p.start();
    log("✅ X Node libp2p started with id:", libp2p.peerId.toString());

    libp2p.addEventListener("peer:discovery", (evt) => {
      const peer = evt.detail;
      console.log(
        `🛑 Peer ${libp2p.peerId.toString()} discovered: ${peer.id.toString()}`
      );
    });

    return new XNode(libp2p);
  }

  async stop() {
    await this.libp2p.stop();
    log("🛑 libp2p stopped");
  }
}
