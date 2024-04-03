import { exec as processExec } from 'child_process';

export default class Machini {
	static machineId(): Promise<string> {
		return new Promise((resolve, reject) => {
			const platformName = process.platform;
			let execCommands = '';
			let extractRegex: RegExp | null;

			if (platformName === 'win32') {
				execCommands = 'REG QUERY HKLM\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid';
				extractRegex = /MachineGuid\s+REG_SZ\s+(.*)/;
			} else if (platformName === 'darwin') {
				execCommands = "ioreg -rd1 -c IOPlatformExpertDevice | awk '/IOPlatformUUID/'";
				extractRegex = /"IOPlatformUUID"\s=\s"(.*?)"/;
			} else if (platformName === 'freebsd') {
				execCommands = 'kenv -q smbios.system.uuid || sysctl -n kern.hostuuid';
			} else {
				execCommands =
					'(cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname) | head -n 1 || :';
			}

			const execProcess = processExec(
				execCommands,
				{ encoding: 'utf8', windowsHide: true },
				(error, stdout) => {
					if (error) {
						reject(error);
						return;
					}

					const output = stdout.split('\r\n')?.[0] || '';

					if (extractRegex) {
						const extractOutput = extractRegex.exec(output)?.[1];

						if (extractOutput) {
							resolve(extractOutput);
						} else {
							reject(new Error(`Failed to get machine id`));
						}

						return;
					}

					if (output) {
						resolve(output);
						return;
					}

					reject(new Error(`Failed to get machine id`));
				}
			);

			execProcess?.stdin?.end();
		});
	}
}

export { Machini };

export const { machineId } = Machini;
