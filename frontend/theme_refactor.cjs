const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/Chat.jsx',
  'src/pages/Home.jsx',
  'src/components/Hero.jsx',
  'src/components/Plan.jsx',
  'src/components/Footer.jsx'
];

const replacements = {
  'bg-zinc-950': 'bg-white dark:bg-zinc-950',
  'bg-zinc-900': 'bg-slate-100 dark:bg-zinc-900',
  'bg-zinc-800': 'bg-slate-200 dark:bg-zinc-800',
  'text-zinc-200': 'text-slate-800 dark:text-zinc-200',
  'text-zinc-300': 'text-slate-700 dark:text-zinc-300',
  'text-zinc-400': 'text-slate-600 dark:text-zinc-400',
  'text-zinc-500': 'text-slate-500 dark:text-zinc-500',
  'text-zinc-600': 'text-slate-400 dark:text-zinc-600',
  'border-zinc-800': 'border-slate-200 dark:border-zinc-800',
  'border-zinc-700': 'border-slate-300 dark:border-zinc-700',
  'text-zinc-100': 'text-slate-900 dark:text-zinc-100',
  'placeholder:text-zinc-600': 'placeholder:text-slate-400 dark:placeholder:text-zinc-600',
  'text-white': 'text-slate-900 dark:text-white', // Be careful with this one, might break primary buttons.
};

// Custom logic for SVGs and specific fixes
const processFile = (file) => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // We should be careful about replacing text-white inside buttons (like indigo-600 text-white)
  // Let's NOT globally replace text-white. We'll handle it selectively or skip it.
  delete replacements['text-white'];
  
  for (const [oldClass, newClass] of Object.entries(replacements)) {
    // Replace whole word matches only using regex boundaries
    const regex = new RegExp(`(?<=[\\s"'\\\`])${oldClass}(?=[\\s"'\\\`])`, 'g');
    content = content.replace(regex, newClass);
  }

  // Handle specific SVG fills in Chat.jsx and Hero.jsx
  content = content.replace(/fill="#ffff"/g, 'fill="currentColor"');
  content = content.replace(/fill="#ffffff"/g, 'fill="currentColor"');

  // Fix the linear gradient in Chat.jsx
  content = content.replace(/from-zinc-950/g, 'from-white dark:from-zinc-950');
  content = content.replace(/via-zinc-950\/50/g, 'via-white\/50 dark:via-zinc-950\/50');

  // Chat.jsx markdown text color fixes
  content = content.replace(/text-white/g, 'text-slate-900 dark:text-white');
  // Revert for buttons and specific components that need to stay white
  content = content.replace(/bg-indigo-600 text-slate-900 dark:text-white/g, 'bg-indigo-600 text-white');
  content = content.replace(/bg-indigo-500 text-slate-900 dark:text-white/g, 'bg-indigo-500 text-white');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${file}`);
};

files.forEach(processFile);
