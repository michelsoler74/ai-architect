const { execSync } = require('child_process');
const fs = require('fs');
let out = '';
try { out += execSync('git status').toString(); } catch(e){}
try { out += '\n\n' + execSync('git remote -v').toString(); } catch(e){}
try { out += '\n\n' + execSync('git log -n 5').toString(); } catch(e){}
try { out += '\n\n' + execSync('git branch -vv').toString(); } catch(e){}
fs.writeFileSync('g:/webapppromting/git_status_check.txt', out);
