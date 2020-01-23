const childProcess = require('child_process');

const server = process.env.INPUT_SERVER;
const account = process.env.INPUT_ACCOUNT || 'Administrator';
const password = process.env.INPUT_PASSWORD;
const name = process.env.INPUT_NAME;
const path = process.env.INPUT_PATH;

if (!server) {
  throw new Error('Input required and not supplied: server');
}
if (!password) {
  throw new Error('Input required and not supplied: password');
}
if (!name) {
  throw new Error('Input required and not supplied: name');
}
if (!path) {
  throw new Error('Input required and not supplied: path');
}

const child = childProcess.spawn('PowerShell.exe', [
  '-NoProfile',
  '-File',
  `${__dirname}\\backup.ps1`,
  server,
  account,
  password,
  name,
  path
]);
child.stdout.on('data', (data) => {
  console.log(`${data}`.trim());
});
child.stderr.on('data', (data) => {
  throw new Error(data);
});
child.stdin.end();
