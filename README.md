# my-project (template) with lib typedoc

## example code

👉cat app.ts
```
import { type Item, CrudStore } from '@yourorg/pure-typedoc';

const sci = new CrudStore()
console.log(sci)
const item: Item = sci.create('sdf')
  sci.create('asdf')
console.log(item)
sci.update(1, 'xxxx')
console.log(sci.getAll())
```

## run

👉bun start
```
$ bun ./app.ts
CrudStore {
  items: [],
  nextId: 1,
  create: [Function: create],
  get: [Function: get],
  getAll: [Function: getAll],
  update: [Function: update],
  delete: [Function: delete],
}
{
  id: 1,
  data: "sdf",
}
[
  {
    id: 1,
    data: "xxxx",
  }, {
    id: 2,
    data: "asdf",
  }
]
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
```

