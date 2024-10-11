import type { NextPage } from "next";
import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faRetweet, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns'; // Import the function

interface FeedProps {
  channelId: string; // Added prop type definition
}

interface Post {
  hash: string;
  thread_hash: string;
  parent_hash: string | null;
  parent_url: string;
  root_parent_url: string;
  parent_author: {
    fid: number | null;
  };
  author: {
    object: string;
    fid: number;
    custody_address: string;
    username: string;
    display_name: string;
    pfp_url: string;
    profile: {
      bio: {
        text: string;
      };
    };
    follower_count: number;
    following_count: number;
    verifications: string[];
    verified_addresses: {
      eth_addresses: string[];
      sol_addresses: string[];
    };
    active_status: string;
    power_badge: boolean;
  };
  text: string;
  timestamp: string;
  embeds: {
    url: string;
    metadata: {
      content_type: string;
      content_length: number | null;
      _status: string;
      html: {
        charset: string;
      };
    };
  }[];
  reactions: {
    likes_count: number;
    recasts_count: number;
    likes: {
      fid: number;
      fname: string;
    }[];
    recasts: any[]; // Adjust type as necessary
  };
  replies: {
    count: number;
  };
  channel: {
    object: string;
    id: string;
    name: string;
    image_url: string;
  };
  mentioned_profiles: any[]; // Adjust type as necessary
}

const Feed: NextPage<FeedProps> = ({ channelId }) => { // Updated to accept channelId
  const [posts, setPosts] = useState<Post[]>([]); // State to hold posts
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://api.neynar.com/v2/farcaster/feed/channels`, {
          params: {
            channel_ids: channelId,
            with_recasts: true,
            with_replies: true,
            members_only: true,
            limit: 25,
          },
          headers: {
            accept: 'application/json',
            api_key: process.env.NEXT_PUBLIC_NEYNAR_API,
          },
        });
        setPosts(Array.isArray(response.data.casts) ? response.data.casts : []); // Updated to set posts from response.casts
        console.log(JSON.stringify(response.data, null, 2));
      } catch (error: any) { // Added type assertion
        console.error("Error fetching posts:", error.response ? error.response.data : error.message); // Improved error logging
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts(); // Call the fetch function
  }, [channelId]);

  const handleShare = (username: string, hash: string) => {
    const shareLink = `https://warpcast.com/${username}/${hash}`;
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard!");
  };

  return (
    <>
      <div className={css` 
        display: flex; 
        align-items: center; 
        font-size: 24px; 
        font-weight: bold; 
        margin-bottom: 20px; 
      `}>
        <span className={css` 
          display: inline-flex; 
          align-items: center; 
          justify-content: center; 
          width: 40px; 
          height: 40px; 
          border-radius: 50%; 
          background-color: #f0f0f0; 
          margin-right: 10px; 
        `}>
          🛑 {/* Default icon emoji */}
        </span>
        <span>r/{channelId} {/* Displaying the channelId as a subreddit-style header */}</span>
      </div>
      {isLoading ? (
        <div>Loading...</div> // Loading state
      ) : (
        <div className={css` 
          display: flex; 
          flex-wrap: wrap; /* Allow wrapping to the next line */
          justify-content: space-between; /* Space between cards */
        `}>
          {posts.map((post: Post) => (
            <div key={post.hash} className={css`
              flex: 1 1 calc(33.33% - 10px); /* 3 cards in a row with spacing */
              margin: 5px; /* Margin between cards */
              border: 1px solid #ccc; 
              border-radius: 8px; 
              padding: 16px; 
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              background: #fff;
            `}>
              <div className={css`
                display: flex; 
                align-items: center; 
                margin-bottom: 10px;
                position: relative; /* For tooltip positioning */
                cursor: pointer; /* Change cursor to pointer for better UX */
              `}>
                <a href={`https://warpcast.com/${post.author.username}`} target="_blank" rel="noopener noreferrer">
                  <img src={post.author.pfp_url} alt={post.author.username} className={css`
                    width: 40px; 
                    height: 40px; 
                    border-radius: 50%; 
                    margin-right: 10px;
                  `} />
                </a>
                <a href={`https://warpcast.com/${post.author.username}`} target="_blank" rel="noopener noreferrer" className={css`
                  text-decoration: none; /* Remove underline */
                  color: inherit; /* Inherit color from parent */
                  position: relative; /* For tooltip positioning */
                `}>
                  <h3>
                    {post.author.display_name}
                    {post.author.power_badge && <span>✨</span>} {/* Lightnight emoji if has power badge */}
                  </h3>
                </a>
                <span className={css`
                  color: lightgray; 
                  margin-left: 10px; 
                  font-size: 14px; 
                `}>
                  {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })} {/* Display time ago */}
                </span>
                <div className={css`
                  display: none; /* Hide tooltip by default */
                  position: absolute; 
                  background: white; 
                  border: 1px solid #ccc; 
                  border-radius: 8px; 
                  padding: 10px; 
                  z-index: 10; 
                  top: 50px; 
                  left: 0; 
                  width: 200px; 
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                `}>
                  <div>{post.author.display_name} @{post.author.username}</div>
                  {post.author.profile.bio.text && <p>{post.author.profile.bio.text}</p>}
                  <div>
                    {post.author.follower_count !== null && (
                      <span>{post.author.follower_count} Followers</span>
                    )}
                    {post.author.following_count !== null && (
                      <span>{post.author.following_count} Following</span>
                    )}
                  </div>
                </div>
              </div>
              <p className={css`
                font-family: 'Hanken Grotesk', sans-serif; /* Set font to Hanken Grotesk */
                margin-bottom: 20px; /* Add margin to separate from stats */
              `}>
                {post.text.includes('http') ? (
                  <a href={post.text} target="_blank" rel="noopener noreferrer">{post.text}</a>
                ) : (
                  post.text
                )}
              </p>
              {post.embeds.map((embed) => (
                embed.metadata && (
                  embed.metadata.content_type.includes("image") ? (
                    <img src={embed.url} alt={post.author.username} className={css`
                      max-width: 100%; 
                      height: auto; 
                      border-radius: 8px;
                      display: block; /* Ensure image is block-level */
                    `} />
                  ) : embed.metadata.content_type.includes("video") ? (
                    <video controls className={css`
                      max-width: 100%; 
                      height: auto; 
                      border-radius: 8px;
                    `}>
                      <source src={embed.url} type={embed.metadata.content_type} />
                      Your browser does not support the video tag.
                    </video>
                  ) : null
                )
              ))}
              <div className={css`
                display: flex; 
                justify-content: space-between; 
                margin-top: auto; /* Push stats to the bottom */
                margin-top: 10px;
              `}>
                <span>
                  <FontAwesomeIcon icon={faThumbsUp} /> {post.reactions.likes_count}
                </span>
                <span>
                  <FontAwesomeIcon icon={faRetweet} /> {post.reactions.recasts_count}
                </span>
                <button onClick={() => handleShare(post.author.username, post.hash)} className={css`
                  background-color: #0070f3; 
                  color: white; 
                  border: none; 
                  border-radius: 4px; 
                  padding: 5px 10px; 
                  cursor: pointer;
                `}>
                  <FontAwesomeIcon icon={faShareAlt} /> {/* Share icon */}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Empty page content */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        Powered by <a href="https://warpcast.com" target="_blank" rel="noopener noreferrer">Farcaster</a>
      </div>
    </>
  );
};

export default Feed;     
