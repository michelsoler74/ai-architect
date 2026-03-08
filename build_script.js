const { execSync } = require('child_process');
const fs = require('fs');
try {
  const output = execSync('npm.cmd run build', { cwd: 'g:/webapppromting' });
  fs.writeFileSync('g:/webapppromting/build.log', output.toString() + '\\nSUCCESS');
} catch (error) {
  fs.writeFileSync('g:/webapppromting/build.log', error.stdout?.toString() + '\\n' + error.stderr?.toString() + '\\nERROR: ' + error.message);
}
