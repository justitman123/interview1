// Пост-шаг сборки: TypeScript не добавляет .js к относительным import'ам,
// а браузерный ESM их требует. Здесь дописываем .js к относительным путям
// в собранных файлах dist, чтобы demo.html грузился в браузере.
// В исходниках .ts импорты остаются без расширения — тогда Jest резолвит
// именно .ts (TS-тест исполняет TS-код, JS-тест — JS-код).
const fs = require("fs");
const path = require("path");

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith(".js")) fix(p);
  }
}

function fix(file) {
  const src = fs.readFileSync(file, "utf8");
  const out = src.replace(
    /(from\s+["'])(\.[^"']*?)(["'])/g,
    (m, a, spec, c) =>
      spec.endsWith(".js") || spec.endsWith(".json") ? m : `${a}${spec}.js${c}`
  );
  if (out !== src) fs.writeFileSync(file, out);
}

walk(path.join(__dirname, "dist"));
