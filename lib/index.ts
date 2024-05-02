import { platform } from 'os';
import { exec as processExec } from 'child_process';

export default class Machini {
	static machineId(): Promise<string> {
		return new Promise((resolve, reject) => {
			const platformName = platform();
			let execCommands = '';

			if (platformName === 'win32') {
				execCommands =
					'for /f "tokens=3 delims= " %i in (\'REG QUERY HKLM\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid ^| findstr MachineGuid\') do @echo %i';
			} else if (platformName === 'darwin') {
				execCommands =
					"ioreg -rd1 -c IOPlatformExpertDevice | awk '/IOPlatformUUID/' | cut -d '\"' -f4";
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

					const output = platformName === 'win32' ? stdout : stdout.split('\r\n')?.[0] || '';

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
