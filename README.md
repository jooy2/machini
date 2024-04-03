# machini

> [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jooy2/machini/blob/master/LICENSE) ![Programming Language Usage](https://img.shields.io/github/languages/top/jooy2/machini) ![Commit Count](https://img.shields.io/github/commit-activity/y/jooy2/machini) [![npm downloads](https://img.shields.io/npm/dm/machini.svg)](https://www.npmjs.com/package/machini) [![npm latest package](https://img.shields.io/npm/v/machini/latest.svg)](https://www.npmjs.com/package/machini) ![npm maintenance](https://img.shields.io/npms-io/maintenance-score/machini) ![npm quality](https://img.shields.io/npms-io/quality-score/machini) ![minified size](https://img.shields.io/bundlephobia/min/machini) ![github repo size](https://img.shields.io/github/repo-size/jooy2/machini) [![Followers](https://img.shields.io/github/followers/jooy2?style=social)](https://github.com/jooy2) ![Stars](https://img.shields.io/github/stars/jooy2/machini?style=social)

`machini` is a utility to get hardware information about system devices.

- Lightweight, zero-dependency, super-fast!
- You don't need system privileges to get the value.
- Friendly to modern Node.js development and TypeScript.
- Cross-platform (Windows, macOS, Linux) support.

## Installation

`machini` requires `Node.js 18.x` or higher, and the repository is serviced through **[NPM](https://npmjs.com)**.

`machini` is **ESM-only**. You must use `import` instead of `require` to load the module. There are workarounds available for CommonJS, but we recommend using ESM based on recent JavaScript trends.

After configuring the node environment, you can simply run the following command.

```bash
# via npm
$ npm install machini

# via yarn
$ yarn add machini

# via pnpm
$ pnpm install machini
```

### Using named import (Multiple utilities in a single require) - Recommend

```javascript
import { machineId } from 'machini';

async function main() {
	console.log(await machineId());
}
```

### Using whole class (multiple utilities simultaneously with one object)

```javascript
import Machini from 'machini';

async function main() {
	console.log(await Machini.machineId());
}
```

## Methods

### `machineId (Promise<string>)`

Gets the unique UUID of the current device. Returns an error if it fails to get a value. Returns a `Promise` object, so use `await` or `.then()` to wait for the operation to complete and get the correct value.

The UUID may change when the system is reinstalled or as the virtual machine's environment changes. On some systems, this value can also be modified by the system administrator (but this is rarely utilized as the system may become unstable after modification).

```javascript
console.log(await machineId()); // a642d9e1-6063-4da7-8ea8-2298f989d01d
```

## Contribute

You can report issues on [GitHub Issue Tracker](https://github.com/jooy2/machini/issues). You can also request a pull to fix bugs and add frequently used features.

## License

Copyright © 2024 [Jooy2](https://jooy2.com) <[jooy2.contact@gmail.com](mailto:jooy2.contact@gmail.com)> Released under the MIT license.
