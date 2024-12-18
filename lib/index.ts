import { platform, homedir, userInfo } from 'os';
import { exec as processExec } from 'child_process';

declare type AnyValueObject = { [key: string]: any };

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

export async function machineId(): Promise<string> {
	const platformName = platform();
	let command;

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

export async function sid(): Promise<string> {
	const platformName = platform();

	if (platformName === 'win32') {
		try {
			const profileLists = await execCommand(
				platformName,
				`REG QUERY "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList" /s`
			);

			const profiles: AnyValueObject = {};
			const sections = profileLists.split('HKEY_LOCAL_MACHINE\\');

			sections.forEach((section) => {
				const lines = section
					.split('\n')
					.map((line) => line.trim())
					.filter((line) => line);

				if (lines.length > 0) {
					const keyName: string = lines[0].split('\\').pop() || 'Unknown';
					const profileImagePath = lines.find((line) => line.startsWith('ProfileImagePath'));

					if (profileImagePath) {
						profiles[keyName] = profileImagePath.split('    ').pop() || 'Unknown';
					}
				}
			});

			for (let i = 0; i < Object.keys(profiles).length; i += 1) {
				const key = Object.keys(profiles)[i];
				const value = profiles[key];

				if (value === homedir()) {
					return key;
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error?.message);
			}
		}

		throw new Error('Failed to get machine id');
	}

	if (platformName === 'darwin') {
		try {
			const execResult = await execCommand(
				platformName,
				`dsmemberutil getsid -U ${userInfo().username}`
			);

			if (execResult) {
				return execResult.replace(/\r?\n/g, '');
			}
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error?.message);
			}
		}

		throw new Error('Failed to get machine id');
	}

	throw new Error('Not supported on this operating system.');
}
