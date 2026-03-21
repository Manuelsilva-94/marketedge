import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const inputPath = path.join(projectRoot, 'docs', 'kalshi-series.json');

const raw = readFileSync(inputPath, 'utf8');
const json = JSON.parse(raw);
const series = json.series || [];
const byCat = {};

series.forEach(s => {
  const cat = s.category || 'unknown';
  if (!byCat[cat]) byCat[cat] = [];
  byCat[cat].push(s.ticker);
});

const lines = ['Total series: ' + series.length];
Object.entries(byCat)
  .sort()
  .forEach(([cat, tickers]) => {
    lines.push('\n// ' + cat + ' (' + tickers.length + ')');
    lines.push(JSON.stringify(tickers));
  });

const output = lines.join('\n');
const outputPath = path.join(projectRoot, 'docs', 'kalshi-series-summary.txt');
writeFileSync(outputPath, output, 'utf8');

console.log(output);
console.log('\n→ Exportado a docs/kalshi-series-summary.txt');