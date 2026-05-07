const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'src', 'pages', 'Journal.tsx');
const text = fs.readFileSync(file, 'utf8');
const re = /question:\s*"([^"\\]*(?:\\.[^"\\]*)*)"/g;
let m;
const questions = [];
while ((m = re.exec(text)) !== null) {
  // unescape quotes
  const q = m[1].replace(/\\"/g, '"');
  questions.push(q);
}
const counts = {};
questions.forEach((q, i) => {
  if (!counts[q]) counts[q] = {count:0, indices:[]};
  counts[q].count += 1;
  counts[q].indices.push(i+1);
});
const duplicates = Object.entries(counts).filter(([k,v]) => v.count > 1).map(([k,v]) => ({question:k, count:v.count, indices:v.indices}));
console.log('Total questions found:', questions.length);
if (duplicates.length === 0) {
  console.log('No duplicate questions found.');
  process.exit(0);
} else {
  console.log('Duplicates:');
  duplicates.forEach(d => {
    console.log(`- (${d.count}) times: "${d.question}" — positions: ${d.indices.join(', ')}`);
  });
  process.exit(0);
}
