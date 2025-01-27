import React from 'react';
import { css } from "@emotion/css";
import { FaTwitter, FaDiscord, FaGithub } from 'react-icons/fa';
import Image from 'next/image'; 
import guildPic from '../public/guild.jpg'; 

const Footer: React.FC = () => {
  return (
    <footer
      className={css`
        background-color: #f8f8f8;
        padding: 1rem;
        width: 100%;
      `}
    >
      <div
        className={css`
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <div
          className={css`
            display: flex;
            align-items: center;
            gap: 1rem;
          `}
        >
          <a
            href="https://twitter.com/activity_dao"
            target="_blank"
            rel="noopener noreferrer"
            className={css`
              color: #666;
              transition: color 0.3s ease;
              &:hover {
                color: #1DA1F2;
              }
            `}
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://discord.gg/mmEv99x9QK" // Replace with your Discord invite link
            target="_blank"
            rel="noopener noreferrer"
            className={css`
              color: #666;
              transition: color 0.3s ease;
              &:hover {
                color: #7289DA;
              }
            `}
          >
            <FaDiscord size={20} />
          </a>
          <a
            href="https://github.com/potlock/acitvity-dao"
            target="_blank"
            rel="noopener noreferrer"
            className={css`
              color: #666;
              transition: color 0.3s ease;
              &:hover {
                color: #333;
              }
            `}
          >
            <FaGithub size={20} />
          </a>
          
          <a
            href="https://guild.xyz/activities" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={guildPic} 
              alt="Guild Icon" 
              width={20} 
              height={20} 
              className={css`
                border-radius: 50%; 
                opacity: 0.7;
                transition: opacity 0.3s ease;
                &:hover {
                  opacity: 1;
                }
              `}
            />
          </a>
        </div>
        <div
          className={css`
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            font-size: 1rem;
            color: #666;
          `}
        >
          <span>Built with ❤️ by </span>
          <a
            href="https://potlock.org"
            target="_blank"
            rel="noopener noreferrer"
            className={css`
              color: inherit;
              text-decoration: none;
              transition: opacity 0.3s ease;
              &:hover {
                opacity: 0.7;
              }
            `}
          >
            🫕 POTLOCK
          </a>
        </div>
        <div className={css`width: 52px;`}></div> {/* Spacer to balance the layout */}
      </div>
    </footer>
  );
};

export default Footer;
