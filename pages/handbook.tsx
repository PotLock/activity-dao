import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  FaArrowUp, FaBars, FaBookOpen, FaCheck, FaChevronDown, FaChevronLeft, FaChevronUp,
  FaChevronRight, FaCode, FaCompress, FaCopy, FaExpand,
  FaExternalLinkAlt, FaLink, FaTimes, FaMinus, FaPlus, FaArrowLeft, FaArrowRight
} from "react-icons/fa";
import preamble from "../data/handbook/preamble.json";
import part1 from "../data/handbook/part-1.json";
import part2 from "../data/handbook/part-2.json";
import part3 from "../data/handbook/part-3.json";
import part4 from "../data/handbook/part-4.json";
import part5 from "../data/handbook/part-5.json";
import part6 from "../data/handbook/part-6.json";
import part7 from "../data/handbook/part-7.json";
import { handbookMarkdown, handbookSearchText } from "../utils/handbook-format";
import styles from "../styles/handbook-reader.module.css";

const source = "https://app.notion.com/p/2979c91a779e46659a5646438af3324c";
const handbookUrl = "https://activity-dao-omega.vercel.app/handbook";
const chapters = [part1, part2, part3, part4, part5, part6, part7]
  .flatMap(part => part.chapters)
  .map((chapter, index) => ({
    ...chapter,
    id: "chapter-" + (index + 1),
    number: index + 1,
    readable: handbookMarkdown(chapter.content),
    searchable: handbookSearchText(chapter.content),
    readMinutes: Math.max(1, Math.ceil(handbookSearchText(chapter.content).split(/\s+/).filter(Boolean).length / 200))
  }));

const totalReadMinutes = chapters.reduce((total, chapter) => total + chapter.readMinutes, 0);

const handbookJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "The ActivityDAO Handbook — The Activity Proliferation Cookbook",
  description: "A working handbook for community-led activities, funding, proof and governance.",
  inLanguage: "en",
  url: handbookUrl,
  isBasedOn: source,
  hasPart: chapters.map(chapter => ({
    "@type": "CreativeWork",
    name: chapter.title,
    url: handbookUrl + "#" + chapter.id
  }))
}).replace(/</g, "\\u003c");

const Handbook: NextPage = () => {
  // On wide screens the TOC is a sticky sidebar; on mobile it is a compact disclosure.
  const [desktopTocOpen, setDesktopTocOpen] = useState(true);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string[]>(chapters.map(chapter => chapter.id));
  const [sourceMode, setSourceMode] = useState(false);
  const [copiedChapter, setCopiedChapter] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [textSize, setTextSize] = useState(1);
  const [readingProgress, setReadingProgress] = useState(0);

  const visibleChapters = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return needle
      ? chapters.filter(chapter => chapter.title.toLowerCase().includes(needle) || chapter.searchable.includes(needle))
      : chapters;
  }, [query]);

  // Keep the contents sidebar aligned with the section in the reading viewport.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(entries => {
      const inView = entries.filter(entry => entry.isIntersecting);
      if (inView.length) {
        inView.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActiveSection(inView[0].target.id);
      }
    }, { rootMargin: "-10% 0px -65% 0px" });
    visibleChapters.forEach(chapter => {
      const section = document.getElementById(chapter.id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [visibleChapters]);

  // Measure progress across the article, not the entire marketing page.
  useEffect(() => {
    const onScroll = () => {
      const article = document.getElementById("handbook-content");
      if (!article) return;
      const articleTop = article.getBoundingClientRect().top + window.scrollY;
      const end = articleTop + article.offsetHeight - window.innerHeight * 0.5;
      const progress = Math.round(100 * (window.scrollY - articleTop) / Math.max(1, end - articleTop));
      const bounded = Math.min(100, Math.max(0, progress));
      setReadingProgress(previous => previous === bounded ? previous : bounded);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [visibleChapters, expanded, sourceMode, textSize]);

  const toggleChapter = (id: string) => {
    setExpanded(previous =>
      previous.includes(id) ? previous.filter(value => value !== id) : [...previous, id]);
  };

  const navigateToChapter = (id: string) => {
    setActiveSection(id);
    setExpanded(previous => previous.includes(id) ? previous : [...previous, id]);
    setMobileTocOpen(false);
  };

  const copyOriginal = async (id: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedChapter(id);
    } catch {
      setCopiedChapter(null);
    }
  };

  const sidebarClassName = [
    styles.sidebar,
    desktopTocOpen ? "" : styles.sidebarCollapsed
  ].filter(Boolean).join(" ");

  const tocBodyClassName = [
    styles.sidebarContent,
    desktopTocOpen ? "" : styles.sidebarContentDesktopClosed,
    mobileTocOpen ? styles.sidebarContentMobileOpen : ""
  ].filter(Boolean).join(" ");

  return (
    <div id="handbook-top" className={styles.page}>
      <div className={styles.progressTrack} role="progressbar" aria-label="Reading progress" aria-valuenow={readingProgress} aria-valuemin={0} aria-valuemax={100}>
        <div className={styles.progressFill} style={{ width: `${readingProgress}%` }} />
      </div>
      <Head>
        <title>ActivityDAO Handbook | The Activity Proliferation Cookbook</title>
        <meta name="description" content="Read the ActivityDAO handbook on activity-based communities, proof of participation, funding, reputation and governance." />
        <meta name="robots" content="index,follow,max-snippet:-1" />
        <link rel="canonical" href={handbookUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="ActivityDAO Handbook" />
        <meta property="og:description" content="The Activity Proliferation Cookbook — read the original working handbook and community-building mechanisms." />
        <meta property="og:url" content={handbookUrl} />
        <meta name="twitter:card" content="summary" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: handbookJsonLd }} />
      </Head>

      <a href="#handbook-content" className={styles.skipLink}>Skip to handbook content</a>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <Link href="/">ActivityDAO</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Handbook</span>
        <span className={styles.breadcrumbEnd}><Link href="/daos">Explore communities</Link></span>
      </nav>

      <header className={styles.hero}>
        <p className={styles.eyebrow}>📗 The Activity Proliferation Cookbook</p>
        <h1 className={styles.heroTitle}>The ActivityDAO Handbook</h1>
        <p className={styles.heroDescription}>
          Explore how people build sustainable communities around shared activities,
          with all 26 original handbook sections kept intact.
        </p>
        <ol className={styles.activityFlow} aria-label="ActivityDAO participation cycle">
          {[
            { step: "Find", description: "Discover your community" },
            { step: "Do", description: "Make the activity happen" },
            { step: "Prove", description: "Recognize participation" },
            { step: "Fund", description: "Sustain the activity" }
          ].map((item, index) => (
            <li key={item.step} className={styles.activityStep}>
              <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.stepCopy}>
                <strong>{item.step}</strong>
                <small>{item.description}</small>
              </span>
            </li>
          ))}
        </ol>
        <a className={styles.sourceLink} href={source} target="_blank" rel="noopener noreferrer">
          Original Notion handbook <FaExternalLinkAlt size={12} aria-hidden="true" />
        </a>
        <span className={styles.historicalNote}>
          Working draft originally written in 2024 · {chapters.length} sections · Approximately {totalReadMinutes} minutes of reading. Proposed mechanisms may not reflect current product capabilities.
        </span>
        <details className={styles.originalDraft}>
          <summary className={styles.originalDraftSummary}>Original 2024 introduction (verbatim)</summary>
          <div className={styles.originalDraftContent}>
            <ReactMarkdown>{handbookMarkdown(preamble.content)}</ReactMarkdown>
          </div>
        </details>
      </header>

      <div className={[styles.workspace,desktopTocOpen ? styles.workspaceOpen : styles.workspaceCollapsed].join(" ")}>
        <aside className={sidebarClassName} aria-label="Handbook table of contents">
          <div className={styles.tocHead}>
            <h2 className={styles.tocHeading}><FaBookOpen aria-hidden="true" /> Contents</h2>
            <button
              type="button"
              className={styles.desktopToggle}
              title={desktopTocOpen ? "Collapse table of contents" : "Expand table of contents"}
              aria-label={desktopTocOpen ? "Collapse table of contents" : "Expand table of contents"}
              aria-expanded={desktopTocOpen}
              aria-controls="handbook-toc-list"
              onClick={() => setDesktopTocOpen(value => !value)}
            >
              {desktopTocOpen ? <FaChevronLeft aria-hidden="true" /> : <FaChevronRight aria-hidden="true" />}
            </button>
            <button
              type="button"
              className={styles.mobileToggle}
              title={mobileTocOpen ? "Close table of contents" : "Open table of contents"}
              aria-label={mobileTocOpen ? "Close table of contents" : "Open table of contents"}
              aria-expanded={mobileTocOpen}
              aria-controls="handbook-toc-list"
              onClick={() => setMobileTocOpen(value => !value)}
            >
              <span className={styles.mobileToggleLabel}>
                {mobileTocOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
                Contents · {chapters.length} sections
              </span>
              {mobileTocOpen ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}
            </button>
          </div>

          <div id="handbook-toc-list" className={tocBodyClassName}>
            <label className={styles.searchLabel} htmlFor="handbook-search">Search the handbook</label>
            <input
              id="handbook-search"
              type="search"
              className={styles.searchInput}
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Find a section or concept"
            />
            <div className={styles.tocToolbar} aria-label="Reading controls">
              <button type="button" className={styles.iconButton}
                title="Expand all sections" aria-label="Expand all sections"
                onClick={() => setExpanded(chapters.map(chapter => chapter.id))}>
                <FaExpand aria-hidden="true" />
              </button>
              <button type="button" className={styles.iconButton}
                title="Collapse all sections" aria-label="Collapse all sections"
                onClick={() => setExpanded([])}>
                <FaCompress aria-hidden="true" />
              </button>
              <span className={styles.chapterCount}>{visibleChapters.length} of {chapters.length}</span>
            </div>
            <hr className={styles.tocDivider} />
            <nav aria-label="Handbook chapters">
              <ol className={styles.tocList}>
                {visibleChapters.map(chapter => (
                  <li key={chapter.id} className={styles.tocItem}>
                    <a href={"#" + chapter.id}
                      className={[styles.tocLink, activeSection === chapter.id ? styles.tocLinkActive : ""].join(" ")}
                      aria-current={activeSection === chapter.id ? "location" : undefined}
                      onClick={() => navigateToChapter(chapter.id)}>
                      <span className={styles.tocNumber}>{String(chapter.number).padStart(2, "0")}</span>
                      <span>{chapter.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </aside>

        <main id="handbook-content" className={styles.article}>
          <div className={styles.readerBar}>
            <span className={styles.readerBarLabel}>Reading · {visibleChapters.length} sections · {readingProgress}%</span>
            <div className={styles.readerActions}>
              <span className={styles.readerStatus}>Text size</span>
              <button type="button" className={styles.iconButton} title="Decrease text size"
                aria-label="Decrease handbook text size" disabled={textSize === 0}
                onClick={() => setTextSize(previous => Math.max(0, previous - 1))}>
                <FaMinus aria-hidden="true" />
              </button>
              <span className={styles.readerScale} aria-label={"Text size " + (textSize + 1) + " of 3"}>A</span>
              <button type="button" className={styles.iconButton} title="Increase text size"
                aria-label="Increase handbook text size" disabled={textSize === 2}
                onClick={() => setTextSize(previous => Math.min(2, previous + 1))}>
                <FaPlus aria-hidden="true" />
              </button>
              <span className={styles.actionDivider} aria-hidden="true" />
              <span className={styles.readerStatus}>View:</span>
              <button type="button" aria-label="Readable formatted view" title="Readable formatted view"
                aria-pressed={!sourceMode}
                className={[styles.iconButton,!sourceMode ? styles.iconButtonActive : ""].join(" ")}
                onClick={() => setSourceMode(false)}><FaBookOpen aria-hidden="true" /></button>
              <button type="button" aria-label="Exact Notion source view" title="Exact Notion source view"
                aria-pressed={sourceMode}
                className={[styles.iconButton,sourceMode ? styles.iconButtonActive : ""].join(" ")}
                onClick={() => setSourceMode(true)}><FaCode aria-hidden="true" /></button>
            </div>
          </div>

          {visibleChapters.length === 0 ? (
            <div className={styles.emptyState} role="status">
              <h2>No matching sections</h2>
              <p>Try searching for funding, governance, reputation, or proof of activity.</p>
              <button type="button" className={styles.iconButton} onClick={() => setQuery("")}
                title="Clear handbook search" aria-label="Clear handbook search">
                <FaTimes aria-hidden="true" />
              </button>
            </div>
          ) : visibleChapters.map((chapter, index) => {
            const isOpen = expanded.includes(chapter.id);
            return (
              <section className={styles.section} id={chapter.id} key={chapter.id}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitleGroup}>
                    <span className={styles.sectionNumber}>Section {String(chapter.number).padStart(2, "0")} · ≈{chapter.readMinutes} min read</span>
                    <h2 className={styles.sectionHeading}>{chapter.title}</h2>
                  </div>
                  <div className={styles.sectionActions}>
                    <button type="button" className={styles.iconButton}
                      title={isOpen ? "Collapse section" : "Expand section"}
                      aria-label={(isOpen ? "Collapse " : "Expand ") + chapter.title}
                      aria-expanded={isOpen} aria-controls={chapter.id + "-content"}
                      onClick={() => toggleChapter(chapter.id)}>
                      {isOpen ? <FaChevronDown aria-hidden="true" /> : <FaChevronRight aria-hidden="true" />}
                    </button>
                    <button type="button" className={styles.iconButton}
                      title="Copy original Notion section" aria-label={"Copy original text of " + chapter.title}
                      onClick={() => copyOriginal(chapter.id, chapter.content)}>
                      {copiedChapter === chapter.id
                        ? <FaCheck aria-hidden="true" />
                        : <FaCopy aria-hidden="true" />}
                    </button>
                    <a href={"#" + chapter.id} className={styles.iconButton}
                      title="Direct link to section" aria-label={"Direct link to " + chapter.title}>
                      <FaLink aria-hidden="true" />
                    </a>
                  </div>
                </div>
                {copiedChapter === chapter.id && <span className={styles.srOnly} role="status">Section copied</span>}
                <div className={styles.sectionBody} id={chapter.id + "-content"} hidden={!isOpen}>
                  {sourceMode ? (
                    <pre className={styles.sourceCode}>{chapter.content}</pre>
                  ) : (
                    <div className={styles.prose} style={{ fontSize: [16, 18, 20][textSize] }}>
                      <ReactMarkdown>{chapter.readable || "See the original Notion handbook for this section."}</ReactMarkdown>
                    </div>
                  )}
                  <nav className={styles.sectionFooter} aria-label={"Navigate from " + chapter.title}>
                    {index > 0 ? (
                      <a className={styles.navLink} href={"#" + visibleChapters[index - 1].id}
                        onClick={() => navigateToChapter(visibleChapters[index - 1].id)}>
                        <FaArrowLeft size={12} aria-hidden="true" /> Previous section
                      </a>
                    ) : <span />}
                    {index < visibleChapters.length - 1 ? (
                      <a className={styles.navLink} href={"#" + visibleChapters[index + 1].id}
                        onClick={() => navigateToChapter(visibleChapters[index + 1].id)}>
                        Next section <FaArrowRight size={12} aria-hidden="true" />
                      </a>
                    ) : (
                      <a className={styles.navLink} href="#handbook-top">Back to beginning <FaArrowUp size={12} aria-hidden="true" /></a>
                    )}
                  </nav>
                </div>
              </section>
            );
          })}
          <footer className={styles.footer}>
            Media and Notion database embeds are linked or attributed to their original source.
            Exact original copy remains available through the source-view icon.
            <p className={styles.contributePrompt}>
              Found an outdated reference or a formatting issue?
              {" "}<a href="https://github.com/PotLock/activity-dao/issues/new" target="_blank" rel="noopener noreferrer">Suggest an improvement</a>.
            </p>
            <p><a href="#handbook-top" className={styles.backToTop}><FaArrowUp aria-hidden="true" /> Back to top</a></p>
          </footer>
        </main>
      </div>
    </div>
  );
};
export default Handbook;
