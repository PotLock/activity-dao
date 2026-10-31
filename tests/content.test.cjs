const test = require("node:test");
const assert = require("node:assert/strict");
const communities = require("../data/daos.json");
const events = require("../data/events.json");
const handbookPreamble = require("../data/handbook/preamble.json");
const handbookParts = Array.from({ length: 7 }, (_, index) =>
  require(`../data/handbook/part-${index + 1}.json`)
);

test("community records have unique IDs and complete first-party descriptions", () => {
  const ids = communities.map(item => item.id);
  assert.equal(new Set(ids).size, ids.length, "Duplicate community IDs");
  for (const community of communities) {
    assert.ok(typeof community.id === "string" && community.id.trim(), "Missing community ID");
    assert.ok(typeof community.name === "string" && community.name.trim(), "Missing community name");
    assert.ok(typeof community.description === "string" && community.description.trim(), "Missing community description");
    assert.ok(Array.isArray(community.tags), "Missing community tags");
    assert.ok(Array.isArray(community.maturity), "Missing community maturity");
    assert.ok(["http:", "https:"].includes(new URL(community.url).protocol), "Invalid community website");
  }
});

test("InjeraDAO is a first-party community with the correct external destination", () => {
  const injera = communities.find(item => item.id === "injera-dao");
  assert.ok(injera, "Missing InjeraDAO");
  assert.equal(injera.url, "https://injera.network");
});

test("curated event records have valid dates and links", () => {
  for (const event of events) {
    assert.ok(event.name && event.description, "Incomplete curated event");
    assert.ok(!Number.isNaN(Date.parse(event.date)), `Invalid date: ${event.name}`);
    if (event.dao !== undefined) assert.equal(typeof event.dao, "string");
    // Legacy entries sometimes have no ticket URL; don't invent a booking link.
    if (event.link) assert.ok(["http:", "https:"].includes(new URL(event.link).protocol), "Invalid event link");
  }
});

test("the imported handbook preserves all original sections and source attribution", () => {
  const source = "https://app.notion.com/p/2979c91a779e46659a5646438af3324c";
  const chapters = handbookParts.flatMap(part => {
    assert.equal(part.source, source);
    return part.chapters;
  });
  assert.ok(chapters.length >= 26, "Handbook import is incomplete");
  const titles = chapters.map(chapter => chapter.title);
  assert.equal(new Set(titles).size, titles.length, "Duplicate handbook sections");
  for (const chapter of chapters) {
    assert.ok(typeof chapter.title === "string" && chapter.title.trim(), "Empty chapter title");
    assert.ok(typeof chapter.content === "string" && chapter.content.trim(), "Empty chapter source");
  }
});

test("handbook preserves the original WIP preamble and original artwork reference", () => {
  assert.equal(handbookPreamble.source,
    "https://app.notion.com/p/2979c91a779e46659a5646438af3324c");
  assert.match(handbookPreamble.content, /version 0\.0\.1 \(WIP\)/);
  assert.match(handbookPreamble.content, /Funding Activity-Based Communities/);
  assert.match(handbookPreamble.content, /The Activity Proliferation Cookbook/);
  assert.match(handbookPreamble.content, /CommunityActivtiesAreAPublicGood\.png/);
});

test("the handbook maturity index imports every ranked and unranked Notion row", () => {
  const index = require("../data/handbook/maturity-index.json");
  assert.equal(index.source, "https://app.notion.com/p/c36f37c9cfdd4520851647e2ade76426");
  assert.equal(index.entries.length, 12);
  const ranked = index.entries.filter(stage => stage.ranking !== null);
  assert.deepEqual(ranked.map(stage => stage.ranking), Array.from({ length: 11 }, (_, index) => index));
  const unranked = index.entries.filter(stage => stage.ranking === null);
  assert.ok(unranked.some(stage => stage.name === "Legal Entity Protecting Members"));
  const names = index.entries.map(stage => stage.name);
  assert.equal(new Set(names).size, names.length);
  for (const stage of index.entries) {
    assert.ok(stage.name && stage.traits !== undefined && stage.example !== undefined);
    assert.ok(stage.url.startsWith("https://app.notion.com/p/"), "Invalid source page");
    assert.ok(Array.isArray(stage.tools) && Array.isArray(stage.communities));
    for (const link of [...stage.tools, ...stage.communities]) {
      assert.ok(link.startsWith("https://app.notion.com/p/"), "Invalid relation URL");
    }
  }
});

test("handbook flywheel and model images reuse original public landing assets", () => {
  const fs = require("node:fs");
  const path = require("node:path");
  for (const file of ["ActivityDAOModelGraphic.png", "ActivityDAOFlywheelGraphic.png"]) {
    const target = path.join(__dirname, "..", "public", file);
    assert.ok(fs.existsSync(target), "Missing landing image: " + file);
    const signature = fs.readFileSync(target).subarray(0, 8);
    assert.equal(signature.toString("hex"), "89504e470d0a1a0a", "Invalid PNG header: " + file);
  }
});
