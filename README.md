# machini

> [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jooy2/machini/blob/main/LICENSE) ![Programming Language Usage](https://img.shields.io/github/languages/top/jooy2/machini) ![Commit Count](https://img.shields.io/github/commit-activity/y/jooy2/machini) [![npm downloads](https://img.shields.io/npm/dm/machini.svg)](https://www.npmjs.com/package/machini) [![npm latest package](https://img.shields.io/npm/v/machini/latest.svg)](https://www.npmjs.com/package/machini) ![minified size](https://img.shields.io/bundlephobia/min/machini) ![github repo size](https://img.shields.io/github/repo-size/jooy2/machini) [![Followers](https://img.shields.io/github/followers/jooy2?style=social)](https://github.com/jooy2) ![Stars](https://img.shields.io/github/stars/jooy2/machini?style=social)

`machini` is a utility to get hardware information about system devices.

- Lightweight and Fast!
- It doesn't use any additional modules - it utilizes pure Node.js APIs.
- You don't need system privileges to get the value.
- Friendly to modern **Node.js** development and [**TypeScript**](https://www.typescriptlang.org).
- Cross-platform (Windows, macOS, Unix/Linux) support.

## Installation

> [!NOTE]
>
> `machini` is a module that runs on the Node.js runtime and is not available in a typical web environment (client). Since it utilizes the runtime of Node.js to get device information, it defeats the purpose of getting the end user's device information. To get the client's device ID, consider a solution like UUID (`randomUUID` in `crypto`).

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

```javascript
import { machineId } from 'machini';

async function main() {
	console.log(await machineId());
}
```

## Methods

### `machineId (Promise<string>)`

Gets the unique UUID of the current device. Throws an error if the value is not retrieved. Returns a `Promise` object, so use `await` or `.then()` to wait for the operation to complete and get the correct value.

The UUID may change when the system is reinstalled or as the virtual machine's environment changes. On some systems, this value can also be modified by the system administrator (but this is rarely utilized as the system may become unstable after modification).

This method returns the same value for every user on the system.

```javascript
console.log(await machineId()); // a642d9e1-6063-4da7-8ea8-2298f989d01d
```

### `sid (Promise<string>)`

Gets the Security Identifier (SID) value for the current user on the device. Throws an error if the value is not obtained.

The SID value is only supported on Windows and macOS. Other OSes throw an error.

Also, the SID value used on macOS is a value created for the directory service. If you don't trust this value, use the `machineId` method instead.

This value can be changed by the user.

```javascript
console.log(await sid()); // S-1-5-21-406418252-5582013529-1321253100-2001
```

## Contributing

Anyone can contribute to the project by reporting new issues or submitting a pull request. For more information, please see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Please see the [LICENSE](LICENSE) file for more information about project owners, usage rights, and more.
