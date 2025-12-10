import { createLibp2p, type Libp2p, type Libp2pOptions } from 'libp2p'
import { identify } from '@libp2p/identify'
import { ping } from '@libp2p/ping'
import { logger } from '@libp2p/logger'
import {
    WebRTC,
    WebSockets,
    WebSocketsSecure,
    WebTransport,
    Circuit,
    WebRTCDirect,
} from "@multiformats/multiaddr-matcher";
const log = logger('test')

export interface BaseNodeClass {
    libp2p: Libp2p;
    options: Libp2pOptions;
    create: () => BaseNode;
    stop: () => void;
    findPeers: () => void;
}

export class BaseNode {
    libp2p: Libp2p;
    options: Libp2pOptions = {
        services: {
            identify: identify(),
            ping: ping(),
        }
    }
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

    async create(): Promise<BaseNode> {
        const RELAY_ADDRESS = '/dns6/14490944-bced-4f7a-90d0-5469826d6d01.pub.instances.scw.cloud/tcp/443/wss/p2p/12D3KooW9scFmH8UkU39qG5WKWY5WW3MRTERUqLPCoqLQ1oAPpS4';
        const libp2p: Libp2p = await createLibp2p(this.options)
        await libp2p.start()
        log('✅ Base Node libp2p started with id:', libp2p.peerId.toString())

        libp2p.addEventListener('self:peer:update', (event: any) => {
            console.log('🛠️  Self peer updated:', event.detail)
            // Update multiaddrs list, only show WebRTC addresses
            libp2p.getMultiaddrs().forEach(ma => {
                console.log('🛠️  Checking multiaddr: (only show relay related) 💖 ', ma)
                if (ma.toString() == `${RELAY_ADDRESS}/p2p-circuit/p2p/${libp2p.peerId}`) {
                    const listenAddress = ma.toString()
                    console.log(`🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗 Listening on relay address: ${listenAddress}`)
                } else {
                    console.log(`🔗💩🔗 Listening on ${ma.toString()}`)
                }
            })
        })
        libp2p.addEventListener('connection:open', (event: any) => {
            console.log('connection opened:', event)
            log('Peer multiple addrs:', libp2p.getMultiaddrs().map(a => a.toString()))
        })
        libp2p.addEventListener('connection:close', (event: any) => {
            console.log('💩 connection closed:', event.detail.remoteAddr.toString())
            //log('💩 connection closed:', event)
        })

        return new BaseNode(libp2p);
    }

    async stop() {
        await this.libp2p.stop()
        log('🛑 libp2p stopped')
    }

    async findPeers() {
        // Simulate finding peers on channel
        setTimeout(() => {
            console.log("🔵 Found peers on channel:", this.libp2p.getPeers());
        }, 5000);
    }
}
