import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaExternalLinkAlt, FaListOl } from "react-icons/fa";
import source from "../data/handbook/maturity-index.json";
import styles from "../styles/handbook-maturity.module.css";

type Stage = typeof source.entries[number];

const stages = source.entries.filter(stage => stage.ranking !== null);
const otherStages = source.entries.filter(stage => stage.ranking === null);
const normalize = (text: string): string =>
  text.replace(/<\/?p\b[^>]*>/gi, "\n").replace(/<[^>]+>/g, "").trim();
const validNotionUrl = (url: string): boolean => /^https:\/\/app\.notion\.com\/p\/[a-zA-Z0-9]+/.test(url);

export default function HandbookMaturityIndex() {
  const [selected, setSelected] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const stage = stages[selected] as Stage;
  return (
    <section aria-labelledby="maturity-explorer-heading" className={styles.root}>
      <div className={styles.headingRow}>
        <div>
          <span className={styles.eyebrow}><FaListOl aria-hidden="true" /> Original Notion database</span>
          <h3 id="maturity-explorer-heading" className={styles.heading}>ActivityDAO Maturity Index</h3>
          <p className={styles.intro}>
            Explore the original stages in ranking order. Each stage builds toward more
            resilient community coordination; this is a reference framework, not a mandatory checklist.
          </p>
        </div>
        <a href={source.source} target="_blank" rel="noopener noreferrer" className={styles.source}>
          Notion database <FaExternalLinkAlt size={11} aria-hidden="true" />
        </a>
      </div>

      <ol className={styles.stageRail} aria-label="Select a maturity stage">
        {stages.map((item, index) => (
          <li key={item.url}>
            <button type="button" onClick={() => setSelected(index)}
              aria-pressed={selected === index}
              className={[styles.stageButton, selected === index ? styles.stageSelected : ""].join(" ")}>
              <span className={styles.stageRank}>{String(item.ranking).padStart(2, "0")}</span>
              <span className={styles.stageName}>{item.name}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className={styles.stepDetails} aria-live="polite">
        <div className={styles.stepIntro}>
          <span className={styles.stepCounter}>Stage {selected + 1} of {stages.length} · Source ranking {stage.ranking}</span>
          <h4>{stage.name}</h4>
          <p className={styles.traits}>{stage.traits || "No traits were provided in the original Notion record."}</p>
        </div>
        {stage.example && (
          <div className={styles.example}>
            <strong>Original example</strong>
            <div><ReactMarkdown>{normalize(stage.example)}</ReactMarkdown></div>
          </div>
        )}
        <div className={styles.relatedLinks}>
          <a href={stage.url} rel="noopener noreferrer" target="_blank">Open original stage <FaExternalLinkAlt size={11} aria-hidden="true" /></a>
          {stage.tools.length > 0 && (
            <details>
              <summary>{stage.tools.length} linked tool records</summary>
              <ul>{stage.tools.filter(validNotionUrl).map((url, index) =>
                <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">Notion tool record {index + 1}</a></li>
              )}</ul>
            </details>
          )}
          {stage.communities.length > 0 && (
            <details>
              <summary>{stage.communities.length} linked community records</summary>
              <ul>{stage.communities.filter(validNotionUrl).map((url, index) =>
                <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">Notion community record {index + 1}</a></li>
              )}</ul>
            </details>
          )}
        </div>
        <div className={styles.stepNavigation}>
          <button type="button" onClick={() => setSelected(index => Math.max(index - 1, 0))}
            disabled={selected === 0}><FaArrowLeft size={12} aria-hidden="true" /> Previous</button>
          <div className={styles.stepPosition} aria-label={`Stage ${selected + 1} of ${stages.length}`}>
            {stages.map((item, index) => <button type="button" key={item.url}
              className={[styles.positionDot, selected === index ? styles.positionActive : ""].join(" ")}
              aria-label={`Go to stage ${index + 1}: ${item.name}`}
              aria-current={selected === index ? "step" : undefined}
              onClick={() => setSelected(index)} />)}
          </div>
          <button type="button" onClick={() => setSelected(index => Math.min(stages.length - 1, index + 1))}
            disabled={selected === stages.length - 1}>Next <FaArrowRight size={12} aria-hidden="true" /></button>
        </div>
      </div>

      <button type="button" className={styles.viewAll} onClick={() => setShowAll(value => !value)}
        aria-expanded={showAll} aria-controls="all-maturity-stages">
        {showAll ? "Hide" : "View"} all {stages.length} ranked stages
      </button>
      <div id="all-maturity-stages" hidden={!showAll}>
        <ol className={styles.allStages}>
          {stages.map((item, index) => (
            <li key={item.url}>
              <a href={item.url} target="_blank" rel="noopener noreferrer"><strong>{item.ranking}. {item.name}</strong></a>
              <p>{item.traits}</p>
              <button type="button" onClick={() => {setSelected(index);setShowAll(false);}}>Explore this stage</button>
            </li>
          ))}
        </ol>
      </div>
      {otherStages.length > 0 && (
        <details className={styles.unranked}>
          <summary><FaCheckCircle aria-hidden="true" /> {otherStages.length} additional unranked Notion {otherStages.length === 1 ? "entry" : "entries"}</summary>
          {otherStages.map(item => <p key={item.url}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
            {item.traits ? ": " + item.traits : " — no ranking or traits provided in Notion"}
          </p>)}
        </details>
      )}
      <p className={styles.provenance}>The stage names, rankings, traits, examples and linked record URLs are imported from the handbook's original Notion database. The interactive navigation is a new reading aid; no stage has been invented or renumbered.</p>
    </section>
  );
}
