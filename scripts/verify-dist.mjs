// Static sanity check of site/dist: every page has <title> and lang, internal links resolve,
// and every docs/*.md has a built page.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "site/dist");
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const errors = [];

const pages = walk(dist).filter((f) => f.endsWith(".html"));
const resolves = (url) => {
  const p = join(dist, url);
  return existsSync(p) && (statSync(p).isFile() || existsSync(join(p, "index.html")));
};

for (const f of pages) {
  const html = readFileSync(f, "utf8");
  const rel = relative(dist, f);
  if (!/<html[^>]*\slang="[a-z-]+"/i.test(html)) errors.push(`${rel}: missing lang`);
  if (!/<title>[^<]+<\/title>/i.test(html)) errors.push(`${rel}: missing title`);
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)[^"]*"/g)) {
    if (m[1].startsWith("//")) continue;
    if (!resolves(decodeURIComponent(m[1]))) errors.push(`${rel}: broken link ${m[1]}`);
  }
}

const docsDir = join(root, "docs");
for (const f of walk(docsDir).filter((f) => f.endsWith(".md"))) {
  const slug = relative(docsDir, f).replace(/\.md$/, "");
  const target = slug === "adr/README" ? "docs/adr/index.html" : `docs/${slug}/index.html`;
  if (!existsSync(join(dist, target))) errors.push(`docs/${slug}.md: no built page at ${target}`);
}
for (const need of ["index.html", "docs/index.html", "about/index.html", "404.html", "robots.txt", "favicon.svg"]) {
  if (!existsSync(join(dist, need))) errors.push(`missing ${need}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`verify:dist ok, ${pages.length} pages checked`);
