import type { NextPage } from "next";
import { css } from "@emotion/css";

export type CardType = {
  className?: string;
};

const cardData = [
  {
    title: "Explore Activities",
    description: "Discover a wide range of activities that match your interests. From sports to arts, find something that excites you and connects you with like-minded individuals.",
    emoji: "🔍",
    imageSrc: "/active-card-explore.png",
    imageAlt: "Explore activities illustration",
  },
  {
    title: "Fund the Activity",
    description: "Support and sustain the activities you love by contributing to their growth and creating thriving ecosystems.",
    emoji: "💰",
    imageSrc: "/active-card-fund.png",
    imageAlt: "Fund activity illustration",
  },
  {
    title: "Find An Event IRL",
    description: "Engage in diverse and exciting experiences. Whether it's sports, arts, or something entirely new, immerse yourself in activities that foster meaningful connections and personal growth.",
    emoji: "🗓️",
    imageSrc: "/active-card-event.png",
    imageAlt: "Find event illustration",
  },
  {
    title: "Prove the Activity",
    description: "Showcase your participation and achievements in various activities. Build your profile and gain recognition within the community.",
    emoji: "🏆",
    imageSrc: "/active-card-proof.png",
    imageAlt: "Prove activity illustration",
  },
];

const Card: NextPage<CardType> = ({ className = "" }) => {
  return (
    <>
      {cardData.map((card, index) => (
        <div
          key={index}
          className={[
            css`
              flex: 1;
              box-shadow: 0px 0px 0px 0.85px rgba(17, 24, 28, 0.08),
                0px 0.8px 1.7px -0.85px rgba(17, 24, 28, 0.08),
                0px 1.7px 3.4px rgba(17, 24, 28, 0.04);
              border-radius: var(--br-sm);
              background-color: var(--background-default-default);
              overflow: hidden;
              display: flex;
              flex-direction: column;
              align-items: center; // Center the content horizontally
              justify-content: flex-start;
              padding: var(--padding-md); // Add padding to the card
              box-sizing: border-box;
              gap: var(--gap-2xs); // Reduced gap between image and content
              min-width: 20.25rem;
              max-width: 100%;
              text-align: center;
              font-size: var(--font-size-59xl-3);
              color: var(--color-darkslateblue-300);
              font-family: var(--font-aclonica);
              @media screen and (max-width: 450px) {
                flex: 1;
              }
            `,
            className,
          ].join(" ")}
        >
          <div
            className={css`
              width: 100%;
              max-height: 180px; // Slightly reduced max-height
              overflow: hidden;
              border-radius: var(--br-sm);
              margin-bottom: var(--spacing-xs); // Reduced margin below image
              padding: var(--padding-sm); // Added padding around image
            `}
          >
            <img 
              src={card.imageSrc} 
              alt={card.imageAlt} 
              className={css`
                width: 100%;
                height: auto;
                object-fit: contain;
                object-position: center;
              `}
            />
          </div>
          <div
            className={css`
              align-self: stretch;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 0 var(--padding-sm); // Add horizontal padding
              box-sizing: border-box;
              max-width: 100%;
              font-size: var(--font-size-13xl);
              color: var(--color-darkslateblue-100);
              font-family: var(--font-dynapuff);
            `}
          >
            <div
              className={css`
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: var(--gap-xs); // Increased gap between title and description
                min-height: 9.25rem;
                max-width: 100%;
              `}
            >
              <h1
                className={css`
                  margin: 0; // Remove all margins
                  width: 100%;
                  text-align: center;
                  font-size: inherit;
                  line-height: 1.825rem;
                  font-weight: 600;
                  font-family: inherit;
                  @media screen and (max-width: 1050px) {
                    font-size: var(--font-size-7xl);
                    line-height: 1.438rem;
                  }
                  @media screen and (max-width: 450px) {
                    font-size: var(--font-size-lgi);
                    line-height: 1.125rem;
                  }
                `}
              >
                {card.title}
              </h1>
              <div
                className={css`
                  width: 100%;
                  text-align: center;
                  font-size: var(--font-size-base);
                  font-family: var(--font-alexandria);
                  color: var(--color-slategray-100);
                  overflow-wrap: break-word; // Ensure text wraps and doesn't overflow
                  padding-bottom: var(--padding-sm); // Added bottom padding
                `}
              >
                {card.description}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;