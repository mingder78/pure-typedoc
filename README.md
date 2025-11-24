# my-project (template) with lib typedoc

## example code

👉cat app.ts
```
import { type BaseNodeClass, BaseNode } from './src';
import { createP2PNode } from "./src/utils/mergeMixins";

const testNode = createP2PNode("chain", BaseNode);
const nodeInstance = new testNode() as BaseNode;
const node: BaseNodeClass = await nodeInstance.create();

console.log("✅ Node created:", node.libp2p.peerId.toString());
```

## run

👉bun start
```
$ bun ./app.ts
✅ Node created: 12D3KooWGhouXg3j7A3diZEu3N9weA8AhJ3sFhzb7c4Wm3nfvqEs
```
## vitest

```
👉bun run test
$ vitest

 DEV  v4.0.13 /private/tmp/pure-typedoc

 ✓ test/crudStore.test.ts (5 tests) 11ms
   ✓ CrudStore (5)
     ✓ should create an item 5ms
     ✓ should get an item by id 1ms
     ✓ should update an item 1ms
     ✓ should delete an item 1ms
     ✓ should maintain auto-incrementing ids 0ms

 Test Files  1 passed (1)
      Tests  5 passed (5)
   Start at  13:32:22
   Duration  556ms (transform 188ms, setup 0ms, collect 212ms, tests 11ms, environment 0ms, prepare 13ms)

 PASS  Waiting for file changes...
       press h to show help, press q to quit
```

## install
To install dependencies:

```bash
bun install
```

To run dev:

```bash
bun dev
```

This project was created using `bun init` in bun v1.2.20. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

## build and show docs

```sh
👉bun type-docs
// and
👉bun show-docs
```
## npm publish

👉npm publish --access public
```
bun prepublishOnly
$ bun clean && bun run build && bun type-docs
$ rimraf ./docs/api dist
$ bun run build.mjs
$ typedoc
[info] html generated at ./docs/api
npm notice
npm notice 📦  @yourorg/pure-typedoc@0.0.1
npm notice Tarball Contents
npm notice 1.8kB README.md
npm notice 337B dist/index.d.ts
npm notice 368B dist/index.js
npm notice 143B docs/api/.nojekyll
npm notice 77B docs/api/assets/hierarchy.js
npm notice 2.6kB docs/api/assets/highlight.css
npm notice 12.9kB docs/api/assets/icons.js
npm notice 12.3kB docs/api/assets/icons.svg
npm notice 51.3kB docs/api/assets/main.js
npm notice 154B docs/api/assets/navigation.js
npm notice 711B docs/api/assets/search.js
npm notice 49.4kB docs/api/assets/style.css
npm notice 18.5kB docs/api/classes/CrudStore.html
npm notice 4.7kB docs/api/hierarchy.html
npm notice 20.2kB docs/api/index.html
npm notice 9.1kB docs/api/interfaces/Item.html
npm notice 7.6kB docs/api/modules.html
npm notice 1.4kB package.json
npm notice Tarball Details
npm notice name: @yourorg/pure-typedoc
npm notice version: 0.0.1
npm notice filename: yourorg-pure-typedoc-0.0.1.tgz
npm notice package size: 37.4 kB
npm notice unpacked size: 193.4 kB
npm notice shasum: 51ff81e9654bbc5665e44dbe07baffb2729830e3
npm notice integrity: sha512-TwvWEepUgpa53[...]LyuF2hBrAQmbA==
npm notice total files: 18
npm notice
npm notice Publishing to https://registry.npmjs.org/ with tag latest and public access
+ @yourorg/pure-typedoc@0.0.1

```
## test coverage

👉bun test:coverage
```sh
$ vitest run --coverage

 RUN  v4.0.13 /private/tmp/pure-typedoc
      Coverage enabled with v8

 ✓ test/crudStore.test.ts (7 tests) 13ms
   ✓ CrudStore (7)
     ✓ should create an item 5ms
     ✓ should get an item by id 1ms
     ✓ should update an item 1ms
     ✓ should update a none existing item 2ms
     ✓ should delete an item 0ms
     ✓ should delete a none existing item 0ms
     ✓ should maintain auto-incrementing ids 0ms

 Test Files  1 passed (1)
      Tests  7 passed (7)
   Start at  13:54:44
   Duration  1.13s (transform 124ms, setup 0ms, collect 157ms, tests 13ms, environment 0ms, prepare 117ms)

 % Coverage report from v8
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |
 index.ts |     100 |      100 |     100 |     100 |
----------|---------|----------|---------|---------|-------------------
```
