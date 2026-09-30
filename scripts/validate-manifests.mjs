// Validates schema/examples/*.json (must pass) and schema/fixtures/invalid*.json (must fail).
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const load = (p) => JSON.parse(readFileSync(p, "utf8"));

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(load(join(root, "schema/uibubbles.manifest.schema.json")));

let failures = 0;
const files = (dir, prefix) =>
  readdirSync(join(root, dir)).filter((f) => f.endsWith(".json") && f.startsWith(prefix)).map((f) => join(root, dir, f));

for (const f of files("schema/examples", "")) {
  if (validate(load(f))) console.log(`ok    valid    ${f.replace(root + "/", "")}`);
  else {
    failures++;
    console.error(`FAIL  expected valid: ${f}`);
    console.error(ajv.errorsText(validate.errors));
  }
}
const invalid = files("schema/fixtures", "invalid");
if (invalid.length === 0) {
  failures++;
  console.error("FAIL  no invalid fixture found; the negative test would be vacuous");
}
for (const f of invalid) {
  if (validate(load(f))) {
    failures++;
    console.error(`FAIL  expected invalid but it passed: ${f}`);
  } else console.log(`ok    rejected ${f.replace(root + "/", "")} (${validate.errors.length} errors)`);
}
if (failures) process.exit(1);
console.log("manifests: all checks passed");
