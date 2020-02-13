const os = require('os');
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const semverInc = require('semver/functions/inc')

const argv = process.argv.slice(2);

const rootDir = fs.realpathSync(process.cwd());

function updateVersion() {
    const packageJson = path.join(rootDir, "package.json");

    const json = JSON.parse(fs.readFileSync(packageJson, 'utf8'));

    json.version = semverInc(json.version, 'patch');

    fs.writeFileSync(packageJson, JSON.stringify(json, null, 2) + os.EOL, 'utf8');
}

if (!argv.includes('nv')) {
    updateVersion();
}

cp.execSync(
    `npm publish . --registry=https://registry.npmjs.org`,
    {
      cwd: rootDir,
      stdio: 'inherit',
    }
);