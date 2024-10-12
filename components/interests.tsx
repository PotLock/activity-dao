import type { NextPage } from "next";
import { css } from "@emotion/css";
import Feed from "./feed";
import interestsData from "../data/interests.json"; // Import the JSON data
import { useState } from "react"; // Import useState for hover state

const Interests: NextPage = () => { // Fixed the type definition
  const [hoveredActivity, setHoveredActivity] = useState<string | null>(null); // State for hovered activity
  const [selectedInterest, setSelectedInterest] = useState<any>(null); // State for selected interest

  return (
    <>

      <div>
        {interestsData.map((interest) => (
          <span 
            key={interest.id_slug} 
            onClick={() => {
              setSelectedInterest(interest); // Set selected interest
              setHoveredActivity(null); // Clear hovered activity on click
            }} // Update selected interest based on interest click
            onMouseEnter={() => setHoveredActivity(interest.activity)} // Set hovered activity
            onMouseLeave={() => setHoveredActivity(null)} // Clear hovered activity
            style={{ margin: '0 5px', fontSize: '24px', position: 'relative', cursor: 'pointer' }} // Style for spacing and size
          >
            {interest.emoji}
            {hoveredActivity === interest.activity && ( // Conditionally render activity text
              <span style={{ position: 'absolute', top: '25px', background: 'white', border: '1px solid black', padding: '5px', borderRadius: '5px', zIndex: 1000 }}>
                {interest.activity}
              </span>
            )}
          </span>
        ))}
      </div>
      {selectedInterest ? (
        <Feed farcaster_channel={selectedInterest.id_slug} emoji={selectedInterest.emoji} />
      ) : (
        <p>Please select an interest to view the feed.</p>
      )}

      {/* Content for feed */}
    </>
  );
};

export default Interests;     
