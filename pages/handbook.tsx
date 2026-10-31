import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import { css } from "@emotion/css";
import part1 from "../data/handbook/part-1.json";
import part2 from "../data/handbook/part-2.json";
import part3 from "../data/handbook/part-3.json";
import part4 from "../data/handbook/part-4.json";
import part5 from "../data/handbook/part-5.json";
import part6 from "../data/handbook/part-6.json";
import part7 from "../data/handbook/part-7.json";

const source = "https://app.notion.com/p/2979c91a779e46659a5646438af3324c";
const chapters = [part1, part2, part3, part4, part5, part6, part7].flatMap(part => part.chapters).map((chapter, index) => ({
  ...chapter,
  id: `chapter-${index + 1}`,
}));
const cleanText = (raw: string) => raw
  .replace(/<image[^>]*source="([^"]+)"[^>]*\/>/g, "[Original Notion image: $1]")
  .replace(/<video[^>]*source="([^"]+)"[^>]*\/>/g, "[Original video: $1]")
  .replace(/<database[^>]*url="([^"]+)"[^>]*>[\s\S]*?<\/database>/g, "[Original Notion database: $1]")
  .replace(/<mention[^>]*url="([^"]+)"[^>]*\/>/g, "[Notion reference: $1]")
  .replace(/<[^>]*>/g, "")
  .replace(/\\\{/g, "{").replace(/\\\}/g, "}");
const ReadingContent = ({ content, verbatim }: { content: string; verbatim: boolean }) => {
  if (verbatim) return <pre className={css`white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;font:inherit;line-height:1.65`}>{content}</pre>;
  return <div className={css`font-size:clamp(16px,1.5vw,18px);line-height:1.85;color:#29251d;overflow-wrap:anywhere;& p{margin:0 0 1.1em};& a{color:#704500;text-decoration:underline}`}>
    {cleanText(content).split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index} className={css`white-space:pre-line`}>{paragraph.trim()}</p>)}
  </div>;
};
const Handbook: NextPage = () => {
  const [query, setQuery] = useState("");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>(chapters.map(chapter => chapter.id));
  const [verbatim, setVerbatim] = useState(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const visible = useMemo(() => chapters.filter(chapter =>
    (chapter.title + " " + cleanText(chapter.content)).toLowerCase().includes(query.trim().toLowerCase())
  ), [query]);
  const copySection = async (id: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopyStatus(id);
    } catch {
      setCopyStatus(null);
    }
  };
  const toggle = (id: string) => setExpanded(previous =>
    previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]);
  return <main className={css`min-height:100vh;background:#fffdf3;color:#171717;font-family:system-ui,sans-serif;padding:clamp(20px,4vw,64px)`}>
    <Head>
      <title>ActivityDAO Handbook | The Activity Proliferation Cookbook</title>
      <meta name="description" content="Read the ActivityDAO handbook: activity funding, proof of participation, governance, reputation, and community operations." />
      <meta name="robots" content="index,follow,max-snippet:-1" />
      <meta property="og:title" content="ActivityDAO Handbook" />
      <meta property="og:description" content="The Activity Proliferation Cookbook — original handbook and practical community-building mechanisms." />
    </Head>
    <nav aria-label="Breadcrumb"><Link href="/">ActivityDAO</Link> / Handbook</nav>
    <header className={css`max-width:1000px;margin:48px auto`}>
      <p>📗 THE ACTIVITY PROLIFERATION COOKBOOK</p>
      <h1 className={css`font-size:clamp(36px,6vw,72px);line-height:1.1;margin:12px 0`}>The ActivityDAO Handbook</h1>
      <p className={css`font-size:clamp(17px,2vw,22px);line-height:1.5`}>Explore the original handbook section by section. This historical working draft is preserved from Notion; references and proposed features are not necessarily current.</p>
      <a href={source} target="_blank" rel="noopener noreferrer">Original Notion handbook ↗</a>
    </header>
    <button type="button" aria-expanded={navigationOpen} aria-controls="handbook-navigation" onClick={() => setNavigationOpen(!navigationOpen)} className={css`display:block;margin:0 auto 18px;padding:12px 18px;background:#ffe58c;border:2px solid #171717;border-radius:12px;min-height:44px;cursor:pointer;@media(min-width:850px){display:none}`}>{navigationOpen ? "Hide chapters" : "Browse chapters"}</button>
    <div className={css`max-width:1200px;margin:auto;display:grid;grid-template-columns:minmax(0,1fr);gap:24px;@media(min-width:850px){grid-template-columns:minmax(230px,290px) minmax(0,1fr);align-items:start}`}>
      <aside id="handbook-navigation" className={css`display:${navigationOpen ? "block" : "none"};@media(min-width:850px){display:block};background:#ffe58c;border-radius:20px;padding:24px;align-self:start;min-width:0;@media(min-width:850px){position:sticky;top:24px;max-height:calc(100vh - 48px);overflow-y:auto}`}>
        <label htmlFor="handbook-search">Search all {chapters.length} sections</label>
        <input id="handbook-search" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search chapters and content" className={css`display:block;width:100%;min-height:44px;padding:10px;margin:12px 0;border:2px solid #171717;border-radius:8px`} />
        <div className={css`display:flex;flex-wrap:wrap;gap:8px;margin:12px 0`}><button type="button" onClick={() => setExpanded(chapters.map(chapter => chapter.id))} className={css`padding:10px;border-radius:8px;cursor:pointer`}>Expand all</button><button type="button" onClick={() => setExpanded([])} className={css`padding:10px;border-radius:8px;cursor:pointer`}>Collapse all</button></div><button type="button" onClick={() => setVerbatim(!verbatim)} aria-pressed={verbatim} className={css`padding:10px;border-radius:8px;cursor:pointer`}>{verbatim ? "Readable view" : "Show exact Notion markup"}</button>
        <nav aria-label="Handbook chapters"><ol className={css`padding-left:20px;line-height:1.8;font-size:14px;& li{margin-bottom:8px};& a{color:#231e15;text-underline-offset:3px}`}>{visible.map(chapter => <li key={chapter.id}><a href={`#${chapter.id}`}>{chapter.title}</a></li>)}</ol></nav>
      </aside>
      <article className={css`min-width:0`}>
        <p role="status">{visible.length} of {chapters.length} sections shown</p>
        {visible.length === 0 && <p>No matching sections. Try another keyword.</p>}
        {visible.map(chapter => <section id={chapter.id} key={chapter.id} className={css`background:white;border:1px solid #e7dfc9;border-radius:18px;padding:clamp(18px,3vw,36px);margin-bottom:20px;scroll-margin-top:24px;box-shadow:0 4px 20px rgba(40,30,10,.04)`}>
          <h2 className={css`font-size:clamp(22px,3vw,32px);overflow-wrap:anywhere`}>{chapter.title}</h2>
          <button type="button" aria-expanded={expanded.includes(chapter.id)} aria-controls={`${chapter.id}-content`} onClick={() => toggle(chapter.id)} className={css`border:1px solid #171717;background:#ffe58c;border-radius:8px;padding:10px 16px;cursor:pointer;min-height:44px`}>{expanded.includes(chapter.id) ? "Collapse section" : "Read section"}</button>
          <div className={css`display:flex;flex-wrap:wrap;gap:12px;margin-top:12px;align-items:center`}><button type="button" onClick={() => copySection(chapter.id, chapter.content)} className={css`border:1px solid #171717;border-radius:8px;background:white;padding:10px 16px;min-height:44px;cursor:pointer`}>{copyStatus === chapter.id ? "Copied original copy" : "Copy original copy"}</button><a href={`#${chapter.id}`} className={css`padding:10px`}>Section permalink</a></div>
          <div id={`${chapter.id}-content`} hidden={!expanded.includes(chapter.id)} className={css`margin-top:22px;padding-top:18px;border-top:1px solid #eee6d6`}>
            <ReadingContent content={chapter.content} verbatim={verbatim} />
          </div>
        </section>)}
        <p>Some images, embedded databases and interactive Notion blocks are represented as source references in the readable view. Use the exact-markup view or original Notion page to inspect their provenance.</p>
      </article>
    </div>
  </main>;
};
export default Handbook;
