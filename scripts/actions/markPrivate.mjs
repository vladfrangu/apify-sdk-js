import { readdir, readFile, writeFile } from 'node:fs/promises';

const [_, packageToIgnore] = process.argv;

if (!packageToIgnore) {
	throw new Error('Missing package provided to ignore from marking as private');
}

const packagesDir = new URL('../../packages/', import.meta.url);

const packages = await readdir(packagesDir);

for (const pkg of packages) {
	if (pkg === packageToIgnore) {
		continue;
	}

	const pkgJsonPath = new URL(`${pkg}/package.json`, packagesDir);
	const pkgJson = JSON.parse(await readFile(pkgJsonPath, 'utf-8'));
	pkgJson.private = true;
	await writeFile(pkgJsonPath, JSON.stringify(pkgJson, null, '\t'));
}
