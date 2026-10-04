import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const originals = [
  {
    "file": "adam.png",
    "sha256": "67f3ad11ef092e65c215d4bc1cad911cec25463c7e95bc32fe46141b40305bcb"
  },
  {
    "file": "salma.png",
    "sha256": "b20a9ed235fa22c4fa0a30ea794f0423319dd557a2a73894521ea8c4b3ff53e2"
  }
];

for (const original of originals) {
  test(`Supplied character artwork is unchanged: ${original.file}`, async () => {
    const image = await readFile(new URL(`../public/artwork/${original.file}`, import.meta.url));
    assert.equal(createHash("sha256").update(image).digest("hex"), original.sha256);
  });
}

test("Homepage references original characters, not generated substitutes", async () => {
  const hero = await readFile(new URL("../src/components/HeroArtwork.tsx", import.meta.url), "utf8");
  assert.ok(hero.includes('/artwork/adam.png'));
  assert.ok(hero.includes('/artwork/salma.png'));
  assert.ok(!hero.includes("wedding-keepsake-3d"));
});
