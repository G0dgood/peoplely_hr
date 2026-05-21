const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all .tsx files in app directory
const findFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, fileList);
    } else if (filePath.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  }
  return fileList;
};

const files = findFiles(path.join(process.cwd(), 'app'));

const regex1 = /<div>\s*<h1 className="text-2xl font-bold text-gray-900 dark:text-white">([^<]+)<\/h1>\s*<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">([^<]+)<\/p>\s*<\/div>/g;
const regex2 = /<div>\s*<h1 className="text-2xl font-bold text-gray-900 dark:text-white">([^<]+)<\/h1>\s*<\/div>/g;
const regex3 = /<h1 className="text-2xl font-bold text-gray-900 dark:text-white">([^<]+)<\/h1>/g; // Solo h1 tags without div wrapper

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  let modified = false;

  // Replace full div > h1 + p
  content = content.replace(regex1, (match, title, desc) => {
    modified = true;
    return `<PageHeader title="${title}" description="${desc}" />`;
  });

  // Replace full div > h1
  content = content.replace(regex2, (match, title) => {
    modified = true;
    return `<PageHeader title="${title}" />`;
  });
  
  if (modified) {
    // Check if PageHeader is already imported
    if (!content.includes('PageHeader')) {
      console.log(`Failed to inject PageHeader import in ${file} because it should already be there since we replaced it, but wait, it's not imported yet`);
    }
    
    if (!content.includes('import { PageHeader }')) {
      // Find the last import statement
      const importRegex = /^import\s+.*?;?\s*$/gm;
      let lastIndex = 0;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        lastIndex = match.index + match[0].length;
      }
      
      const importStatement = `\nimport { PageHeader } from "@/components/ui/page-header";\n`;
      if (lastIndex > 0) {
        content = content.slice(0, lastIndex) + importStatement + content.slice(lastIndex);
      } else {
        content = importStatement + content;
      }
    }
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content);
      console.log(`Updated ${file}`);
    }
  }
}
