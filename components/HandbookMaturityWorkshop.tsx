import { useMemo, useState } from "react";
import { FaCheck, FaClipboard, FaRedo, FaSearch } from "react-icons/fa";
import source from "../data/handbook/maturity-index.json";
import styles from "../styles/handbook-workshop.module.css";

const stages = source.entries.filter(item => item.ranking !== null);
type Evidence = Record<string, boolean>;
const plainText = (value: string) => value.replace(/<[^>]+>/g, "").trim();

export default function HandbookMaturityWorkshop() {
  const [community, setCommunity] = useState("");
  const [stage, setStage] = useState(0);
  const [evidence, setEvidence] = useState<Evidence>({});
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const current = stages[stage];
  const completed = stages.filter(item => evidence[item.url]).length;
  const summary = useMemo(() => {
    const label = community.trim() || "Unnamed community";
    const checked = stages.filter(item => evidence[item.url]).map(item => String(item.ranking) + ": " + item.name);
    return [
      "ActivityDAO Maturity Workshop — " + label,
      "Reference: " + source.source,
      "Self-assessment only, not official proof or a certified maturity score.",
      "Stages marked with evidence: " + completed + " of " + stages.length,
      checked.length ? "Marked stages:\n" + checked.join("\n") : "No stages marked yet.",
      "Stage being reviewed: " + String(current.ranking) + " — " + current.name,
      note.trim() ? "Notes:\n" + note.trim() : "",
    ].filter(Boolean).join("\n\n");
  }, [community, stage, evidence, note, completed, current]);

  const copySummary = async () => {
    try { await navigator.clipboard.writeText(summary); setCopied(true); }
    catch { setCopied(false); }
  };
  const clear = () => { setCommunity("");setStage(0);setEvidence({});setNote("");setCopied(false); };

  return (
    <aside className={styles.root} aria-labelledby="maturity-workshop-heading">
      <div className={styles.headingRow}>
        <div>
          <span className={styles.eyebrow}><FaSearch aria-hidden="true" /> Community planning exercise</span>
          <h3 id="maturity-workshop-heading">Where is your ActivityDAO today?</h3>
          <p>Review the original Notion stages one at a time. Mark a stage only when you have evidence to support it. These checks stay on this page and are not saved or submitted.</p>
        </div>
        <span className={styles.count} aria-live="polite">{completed}/{stages.length} marked</span>
      </div>
      <div className={styles.progressTrack} role="progressbar" aria-label="Stages marked with evidence"
        aria-valuemin={0} aria-valuemax={stages.length} aria-valuenow={completed}>
        <span style={{ width: (100 * completed / stages.length) + "%" }} />
      </div>
      <div className={styles.controls}>
        <label className={styles.field}>
          Community name (optional)
          <input type="text" value={community} onChange={event => {setCommunity(event.target.value);setCopied(false);}}
            placeholder="e.g. our running community" maxLength={100} />
        </label>
        <label className={styles.field}>
          Review a stage
          <select value={stage} onChange={event => {setStage(Number(event.target.value));setCopied(false);}}>
            {stages.map((item, index) => <option value={index} key={item.url}>{item.ranking}. {item.name}</option>)}
          </select>
        </label>
      </div>
      <div className={styles.review}>
        <h4>{current.name}</h4>
        <p className={styles.traits}><strong>Original traits:</strong> {current.traits || "Not specified in Notion"}</p>
        {current.example && <p className={styles.example}><strong>Original example:</strong> {plainText(current.example)}</p>}
        <label className={styles.checkLabel}>
          <input type="checkbox" checked={Boolean(evidence[current.url])}
            onChange={event => {setEvidence(previous => ({...previous,[current.url]:event.target.checked}));setCopied(false);}} />
          <span>I have evidence that our community has reached this stage.</span>
        </label>
        <p className={styles.guidance}>Marking this box is a private planning note, not verification. Maturity can be non-linear; an unchecked earlier stage does not prevent you from reviewing later stages.</p>
      </div>
      <label className={styles.field}>
        Evidence notes and next action (optional)
        <textarea value={note} onChange={event => {setNote(event.target.value);setCopied(false);}}
          maxLength={2500} rows={3} placeholder="What evidence do we have? What should we do next?" />
      </label>
      <div className={styles.actions}>
        <button type="button" onClick={copySummary} className={styles.primary}>
          {copied ? <FaCheck aria-hidden="true"/> : <FaClipboard aria-hidden="true"/>}
          {copied ? "Summary copied" : "Copy planning summary"}
        </button>
        <button type="button" onClick={clear} className={styles.secondary}><FaRedo aria-hidden="true"/> Reset exercise</button>
      </div>
      <p className={styles.footnote}>This exercise adds no account, storage, score, or server-side tracking. It is separate from the original Notion entries and cannot certify an ActivityDAO's maturity.</p>
    </aside>
  );
}
