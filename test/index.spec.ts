import assert from 'assert';
import { machineId, sid } from '../dist';

describe('Module Test', () => {
	/*
	 * Sample Response:
	 * Windows: a642d9e1-6063-4da7-8ea8-2298f989d01d
	 * Linux: 5c6ee51d3e514eb4883e4373e320192c
	 * macOS: BAC04154-124A-56E1-BFEB-D6D94FE5DBC0
	 */
	it('machineId', async () => {
		const mId = await machineId();

		let regex;

		switch (process.platform) {
			case 'win32':
			case 'darwin':
			case 'freebsd':
				regex = /^[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}/;
				break;
			default:
				regex = /^[0-9a-zA-Z]{8}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{12}/;
				break;
		}

		assert.match(mId, regex);
	});

	// Example: S-1-5-21-406418252-5582013529-1321253100-2001
	it('sid', async () => {
		const { platform } = process;

		if (platform !== 'win32' && platform !== 'darwin') {
			return;
		}

		const sidResult = await sid();

		assert.match(sidResult, /^S-1-[0-59]-\d{2}-\d{8,10}-\d{8,10}-\d{8,10}-[1-9]\d{1,9}/);
	});
});
