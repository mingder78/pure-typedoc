import { createLibp2p, type Libp2p, type Libp2pOptions } from "libp2p";
import { logger } from "@libp2p/logger";
import { circuitRelayTransport } from "@libp2p/circuit-relay-v2";
import { noise } from "@chainsafe/libp2p-noise";
import { yamux } from "@chainsafe/libp2p-yamux";
import { bootstrap } from "@libp2p/bootstrap";
import { pubsubPeerDiscovery } from "@libp2p/pubsub-peer-discovery";
import { floodsub } from "@libp2p/floodsub";
import { ping } from "@libp2p/ping";
import { PUBSUB_PEER_DISCOVERY } from "./core";
import { tcp } from "@libp2p/tcp";
import { webSockets } from "@libp2p/websockets";

const log = logger("test");

// merge with BaseNode is required

export interface RelayClientNodeClass {
  libp2p: Libp2p;
  options: Libp2pOptions;
  create: () => void;
  stop: () => void;
}

export class RelayClientNode {
  libp2p: Libp2p;
  options: Libp2pOptions = {
    addresses: {
      listen: [
        // 👇 Required to create circuit relay reservations in order to hole punch browser-to-browser WebRTC connections
        "/p2p-circuit",
        // 👇 Listen for webRTC connection
      ],
    },
    transports: [
      // 👇 Required to create circuit relay reservations in order to hole punch browser-to-browser WebRTC connections
      // 添加@libp2p/circuit-relay-v2-transport支持
      circuitRelayTransport({}),
      webSockets({
        // 允許所有WebSocket連接包括不帶TLS的
      }),
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
          '/dns6/14490944-bced-4f7a-90d0-5469826d6d01.pub.instances.scw.cloud/tcp/443/wss/p2p/12D3KooW9scFmH8UkU39qG5WKWY5WW3MRTERUqLPCoqLQ1oAPpS4',
          '/dns6/14490944-bced-4f7a-90d0-5469826d6d01.pub.instances.scw.cloud/tcp/9001/wss/p2p/12D3KooW9scFmH8UkU39qG5WKWY5WW3MRTERUqLPCoqLQ1oAPpS4',
       ////////////////   "/ip4/127.0.0.1/tcp/9001/ws/p2p/12D3KooWBfL9scKjoU1wqJgyokVUbrZc1zpwVamsxRpMatDhFrtZ",
        ],
      }),      pubsubPeerDiscovery({
        interval: 10_000,
        topics: [PUBSUB_PEER_DISCOVERY],
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
  async create(): Promise<RelayClientNode> {
    const libp2p: Libp2p = await createLibp2p(this.options);
    await libp2p.start();
    log("✅ X Node libp2p started with id:", libp2p.peerId.toString());

    libp2p.addEventListener("peer:discovery", async (evt) => {
      console.log("🛑🛑 peer:discovery", evt.detail);
  const maddrs = evt.detail.multiaddrs.map((ma) =>
      ma.encapsulate(`/p2p/${evt.detail.id.toString()}`)
    );
    console.log(
      `Discovered new peer (${evt.detail.id.toString()}). Dialling:`,
      maddrs.map((ma) => ma.toString())
    );
    try {
      await libp2p.dial(maddrs); // dial the new peer
      console.log(`🛑 Successfully connected to peer: ${evt.detail.id.toString()}`);
    } catch (err: any) {
      // Silently handle connection failures - this is normal in P2P networks
      // Only log if it's an unexpected error type
      if (!err.message.includes('Could not connect')) {
        console.warn(`Unexpected P2P error: ${err.message}`);
      }
    }
    });

    return new RelayClientNode(libp2p);
  }

  async stop() {
    await this.libp2p.stop();
    log("🛑 libp2p stopped");
  }
}
