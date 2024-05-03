import { platform } from 'os';
import { exec as processExec } from 'child_process';

const execCommand = (platformName: string, command: string): Promise<string> =>
	new Promise((resolve, reject) => {
		const execCommandProcess = processExec(
			command,
			{ encoding: 'utf8', windowsHide: true },
			(error, stdout) => {
				if (error) {
					reject(error);
					return;
				}

				const output = platformName === 'win32' ? stdout : stdout.split('\r\n')?.[0] || '';

				execCommandProcess?.stdin?.end();

				if (output) {
					resolve(output);
					return;
				}

				reject(new Error(`Command failed`));
			}
		);
	});

export default class Machini {
	static async machineId(): Promise<string> {
		const platformName = platform();
		let command = '';

		if (platformName === 'win32') {
			command =
				'for /f "tokens=3 delims= " %i in (\'REG QUERY HKLM\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid ^| findstr MachineGuid\') do @echo %i';
		} else if (platformName === 'darwin') {
			command = "ioreg -rd1 -c IOPlatformExpertDevice | awk '/IOPlatformUUID/' | cut -d '\"' -f4";
		} else if (platformName === 'freebsd') {
			command = 'kenv -q smbios.system.uuid || sysctl -n kern.hostuuid';
		} else {
			command =
				'(cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname) | head -n 1 || :';
		}

		try {
			return await execCommand(platformName, command);
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error?.message);
			}
		}

		throw new Error('Failed to get machine id');
	}
}

export { Machini };

export const { machineId } = Machini;
