/**
 * Present Notion-flavored Markdown as ordinary Markdown while retaining
 * verbatim data/handbook content. No remote Notion fetch at runtime.
 */
const sourceUrl = "https://app.notion.com/p/2979c91a779e46659a5646438af3324c";

const attribute = (attributes: string, name: string): string | undefined => {
  const match = attributes.match(new RegExp("(?:^|\\s)" + name + '="([^"]*)"'));
  return match?.[1];
};

const externalLink = (url: string | undefined, label: string): string =>
  url && /^https?:\/\/[^ )]+$/i.test(url)
    ? "[" + label + "](" + url + ")"
    : "[" + label + "](" + sourceUrl + ")";

export function handbookMarkdown(raw: string): string {
  return raw
    .replace(/\r\n/g, "\n")
    .replace(/^#{1,3}\s+[^\n]*\n+/, "")
    .replace(/<table-of-contents\b[^>]*\/>/gi, "\n\nThe chapter list is available in the collapsible Contents sidebar.\n\n")
    .replace(/<database\b([^>]*)>([\s\S]*?)<\/database>/gi, (_match, attrs: string, label: string) =>
      "\n\n> **" + label.trim() + ":** " + externalLink(attribute(attrs, "url"), "Open original Notion database") + "\n\n")
    .replace(/<link-preview\b([^>]*)\/>/gi, (_match, attrs: string) =>
      "\n\n> " + externalLink(attribute(attrs, "source") || attribute(attrs, "url"), "View linked source") + "\n\n")
    .replace(/<mention\b([^>]*)\/>/gi, (_match, attrs: string) =>
      externalLink(attribute(attrs, "url"), "Notion reference"))
    .replace(/<video\b([^>]*)\/>/gi, (_match, attrs: string) =>
      "\n\n> **Video:** " + externalLink(attribute(attrs, "source"), "Watch source recording") + "\n\n")
    .replace(/<image\b[^>]*\/>/gi,
      "\n\n> **Illustration:** See the image in the [original handbook](" + sourceUrl + ").\n\n")
    .replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_match, level: string, inner: string) =>
      "\n\n" + "#".repeat(Math.min(6, Number(level) + 1)) + " " + inner.trim() + "\n\n")
    .replace(/<callout\b[^>]*>([\s\S]*?)<\/callout>/gi, (_match, inner: string) =>
      "\n\n> " + inner.trim().split("\n").filter(Boolean).join("\n> ") + "\n\n")
    .replace(/<li\b[^>]*>\s*/gi, "\n- ")
    .replace(/\s*<\/li>/gi, "\n")
    .replace(/<\/?(?:ul|ol)\b[^>]*>/gi, "\n")
    .replace(/<b\b[^>]*>/gi, "**").replace(/<\/b>/gi, "**")
    .replace(/<strong\b[^>]*>/gi, "**").replace(/<\/strong>/gi, "**")
    .replace(/<i\b[^>]*>/gi, "*").replace(/<\/i>/gi, "*")
    .replace(/<em\b[^>]*>/gi, "*").replace(/<\/em>/gi, "*")
    .replace(/<\/?u\b[^>]*>/gi, "")
    .replace(/<p\b[^>]*\/>/gi, "\n\n")
    .replace(/<\/?p\b[^>]*>/gi, "\n\n")
    .replace(/<\/?(?:columns|column|toggle|div)\b[^>]*>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\\\{/g, "{").replace(/\\\}/g, "}")
    .replace(/^\s*-\s*\n\s*/gm, "- ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function handbookSearchText(raw: string): string {
  return handbookMarkdown(raw).replace(/[#*_>\[\]()]/g, " ").toLowerCase();
}
