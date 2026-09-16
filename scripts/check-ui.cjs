// Run the interface interaction and stylesheet regression checks.
const { spawnSync } = require('node:child_process');
const result = spawnSync(process.execPath, ['--test','test/Interface.test.js'], {stdio:'inherit'});
process.exit(result.status ?? 1);
