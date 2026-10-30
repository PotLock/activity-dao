import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { css } from "@emotion/css";

const source = "https://app.notion.com/p/2979c91a779e46659a5646438af3324c";
const sections = [
  { id: "ethos", title: "Ethos", body: "Touch more grass. Be with more people. Fund activities as public goods. Build community-run ecosystems around activities people love." },
  { id: "what-is", title: "What is an Activity DAO?", body: "An Activity DAO is a decentralized community committed to making an activity happen and persist. Funding, coordination, reputation and governance support the activity—not the other way around." },
  { id: "mechanism", title: "Mechanism design", body: "The three foundations are organizing activities, verifying participation, and funding ongoing activity. Communities can choose mechanisms suited to their activity." },
  { id: "proof", title: "Proof of participation", body: "Evidence can include attendance, frequency, and activity-specific performance. Verification should be transparent, privacy-conscious, and open to dispute." },
  { id: "trust", title: "Reputation and referrals", body: "Referral relationships and a web of trust can help communities coordinate and recognize meaningful contributions. Safeguards are necessary before assigning penalties." },
  { id: "maturity", title: "Maturity and resilience", body: "ActivityDAOs can evolve from informal gatherings to durable, community-funded networks with transparent processes and reduced dependence on individual organizers." },
];
const Handbook: NextPage = () => <main className={css`min-height:100vh;background:#fffdf3;color:#171717;font-family:system-ui,sans-serif;padding:clamp(20px,5vw,72px)`}>
  <Head><title>ActivityDAO Handbook | Build communities around doing</title><meta name="description" content="Explore ActivityDAO principles, proof of participation, funding, reputation and community governance." /></Head>
  <nav aria-label="Breadcrumb"><Link href="/">ActivityDAO</Link> / Handbook</nav>
  <header className={css`max-width:900px;margin:64px auto 36px`}><p>📗 THE ACTIVITY PROLIFERATION COOKBOOK</p><h1 className={css`font-size:clamp(40px,7vw,78px);line-height:1.05;margin:12px 0`}>A handbook for doing things together.</h1><p className={css`font-size:22px;line-height:1.5`}>Find. Do. Prove. Fund. Build resilient communities around shared activities.</p><a href={source} target="_blank" rel="noopener noreferrer">Read the original working handbook ↗</a></header>
  <div className={css`max-width:1100px;margin:auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:28px`}>
    <aside aria-label="On this page" className={css`background:#ffe58c;border-radius:24px;padding:24px;align-self:start`}><h2>Chapters</h2><ol>{sections.map(s=><li key={s.id} className={css`margin:12px 0`}><a href={`#${s.id}`}>{s.title}</a></li>)}</ol></aside>
    <article className={css`min-width:0`}>{sections.map(s=><section key={s.id} id={s.id} className={css`padding:24px 0;border-bottom:1px solid #ddd;scroll-margin-top:24px`}><h2 className={css`font-size:clamp(26px,4vw,38px)`}>{s.title}</h2><p className={css`font-size:18px;line-height:1.8`}>{s.body}</p></section>)}<p>This is an introductory web edition. The linked Notion handbook contains additional working material, diagrams, examples, and references.</p></article>
  </div>
</main>;
export default Handbook;
