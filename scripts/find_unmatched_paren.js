const fs = require('fs');
const p = 'd:/Projects/Personal/personal_portfolio/app/admin/dashboard/experience/page.tsx';
const s = fs.readFileSync(p, 'utf8');
let stack = [];
let line = 1;
for (let i = 0; i < s.length; i++) {
  const ch = s[i];
  if (ch === '\n') line++;
  if (ch === '(') stack.push({ pos: i, line });
  else if (ch === ')') {
    if (stack.length) stack.pop();
    else console.log('unmatched ) at', line);
  }
}
if (stack.length) {
  console.log('unmatched ( count', stack.length);
  const last = stack[stack.length - 1];
  console.log('last unmatched at line', last.line, 'pos', last.pos);
  const lines = s.split(/\r?\n/);
  const idx = last.line - 1;
  const start = Math.max(0, idx - 6);
  const end = Math.min(lines.length, idx + 6);
  for (let i = start; i < end; i++) {
    console.log((i + 1).toString().padStart(4, ' '), lines[i]);
  }
  const contextStart = Math.max(0, last.pos - 80);
  const contextEnd = Math.min(s.length, last.pos + 80);
  console.log('\nCONTEXT:\n' + s.slice(contextStart, contextEnd));
} else {
  console.log('no unmatched (');
}
