const test = require("node:test");
const assert = require("node:assert/strict");
const communities = require("../data/daos.json");
const events = require("../data/events.json");
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
