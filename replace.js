const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/border-gray-100/g, 'border-gray-200');
      // Wait, if I change 100 to 200, I should probably change 200 to 300 to make them all more visible.
      // But let's just make everything border-gray-300
      content = content.replace(/border-gray-100/g, 'border-gray-300');
      content = content.replace(/border-gray-200/g, 'border-gray-300');
      fs.writeFileSync(fullPath, content);
    }
  }
}

replaceInDir('./app');
replaceInDir('./components');
