import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

// Run the actual TypeScript helper with the project's existing compiler,
// including on supported Node versions without native TypeScript support.
const source = await readFile(new URL("../src/lib/recipient.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
});
const { getRecipientName, MAX_RECIPIENT_NAME_LENGTH } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);

test("personalized links decode spaces, ampersands, apostrophes and Unicode", () => {
  for (const [query, name] of [
    ["to=Budi%20Santoso", "Budi Santoso"],
    ["to=Budi+Santoso", "Budi Santoso"],
    ["to=Budi%20%26%20Keluarga", "Budi & Keluarga"],
    ["to=Ibu%20Nur%27aini", "Ibu Nur'aini"],
    ["to=Jose%CC%81%20%E6%9D%8E", "José 李"],
  ]) assert.equal(getRecipientName(new URLSearchParams(query)), name);
});

test("missing, empty and whitespace-only names use the general invitation", () => {
  for (const query of ["", "other=Guest", "to=", "to=%20%20%09%0A", "to=%E2%80%8B"]) {
    assert.equal(getRecipientName(new URLSearchParams(query)), "");
  }
});

test("extra whitespace and invisible control characters are normalized", () => {
  assert.equal(getRecipientName(new URLSearchParams({ to: "  Budi\n\t Santoso\u0000  " })), "Budi Santoso");
});

test("names are bounded to the RSVP input limit without broken surrogate pairs", () => {
  assert.equal(getRecipientName(new URLSearchParams({ to: "A".repeat(150) })).length, MAX_RECIPIENT_NAME_LENGTH);
  assert.equal(getRecipientName(new URLSearchParams({ to: "A".repeat(99) + "😊" })), "A".repeat(99));
});

test("query decoding happens only once and malformed escapes do not throw", () => {
  assert.equal(getRecipientName(new URLSearchParams("to=100%2525%20Happy")), "100%25 Happy");
  assert.doesNotThrow(() => getRecipientName(new URLSearchParams("to=%E0%A4%A")));
});

test("duplicate names use the first value and markup stays plain text", () => {
  assert.equal(getRecipientName(new URLSearchParams("to=Budi&to=Other")), "Budi");
  assert.equal(getRecipientName(new URLSearchParams({ to: "<b>Budi</b>" })), "<b>Budi</b>");
});
