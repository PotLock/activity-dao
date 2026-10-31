import styles from "../styles/handbook-learning-path.module.css";

type Step = {
  title: string;
  image: string;
  description: string;
  href: string;
  action: string;
};
const steps: Step[] = [
  {
    title: "Explore activities",
    image: "/active-card-explore.png",
    description: "Discover communities organized around something people love doing.",
    href: "/daos",
    action: "Explore communities",
  },
  {
    title: "Find an event",
    image: "/active-card-event.png",
    description: "Join an activity in person and meet other participants.",
    href: "/events",
    action: "Browse events",
  },
  {
    title: "Prove participation",
    image: "/active-card-proof.png",
    description: "Understand evidence, attribution, trust and community reputation.",
    href: "#chapter-9",
    action: "Read proof mechanisms",
  },
  {
    title: "Fund the activity",
    image: "/active-card-fund.png",
    description: "Explore ways communities can sustain recurring activities.",
    href: "#chapter-8",
    action: "Read mechanism design",
  },
];
export default function HandbookLearningPath() {
  return (
    <section className={styles.root} aria-labelledby="handbook-path-heading">
      <div className={styles.intro}>
        <span>ILLUSTRATED LEARNING PATH</span>
        <h3 id="handbook-path-heading">From discovery to sustained activity</h3>
        <p>These are the original four illustrations used on the ActivityDAO landing page, reused here to connect the handbook concepts to the rest of the site. Links describe navigation, not guarantees that every funding or proof feature is implemented.</p>
      </div>
      <ol className={styles.grid}>
        {steps.map((step, index) => (
          <li key={step.title} className={styles.card}>
            <figure>
              <div className={styles.image}>
                <img src={step.image} alt="" loading="lazy" decoding="async"/>
              </div>
              <figcaption>
                <span className={styles.number}>0{index + 1}</span>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
                <a href={step.href}>{step.action}<span aria-hidden="true"> →</span></a>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
    </section>
  );
}
