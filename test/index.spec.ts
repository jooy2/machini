import assert from 'assert';
import { machineId } from '../dist';

/*
 * Sample Response:
 * Windows: a642d9e1-6063-4da7-8ea8-2298f989d01d
 * Linux: 5c6ee51d3e514eb4883e4373e320192c
 * macOS: BAC04154-124A-56E1-BFEB-D6D94FE5DBC0
 */
describe('Module Test', () => {
	it('machineId', async () => {
		const mId = await machineId();

		let regex;

		switch (process.platform) {
			case 'win32':
			case 'darwin':
			case 'freebsd':
				regex = /[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}/;
				break;
			default:
				regex = /[0-9A-Z]{32}/;
				break;
		}

		assert.match(mId, regex);
	});
});
