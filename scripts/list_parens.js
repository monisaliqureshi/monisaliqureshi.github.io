const fs = require('fs');
const p = 'd:/Projects/Personal/personal_portfolio/app/admin/dashboard/experience/page.tsx';
const s = fs.readFileSync(p, 'utf8');
let line = 1;
let parens = [];
for (let i = 0; i < s.length; i++) {
  const ch = s[i];
  if (ch === '\n') line++;
  if (ch === '(') parens.push({pos: i, line});
}
const beforeLine = 1;
for (const pinfo of parens) {
  if (pinfo.line <= 120) {
    const contextStart = Math.max(0, pinfo.pos - 40);
    const contextEnd = Math.min(s.length, pinfo.pos + 40);
    console.log('line', pinfo.line, 'pos', pinfo.pos);
    console.log(s.slice(contextStart, contextEnd));
    console.log('---');
  }
}
