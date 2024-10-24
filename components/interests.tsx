import type { NextPage } from "next";
import { css } from "@emotion/css";
import interestsData from "../data/interests.json"; 
import { useState } from "react"; 
import { useRouter } from "next/router"; 

const Interests: NextPage = () => {
  const [hoveredActivity, setHoveredActivity] = useState<string | null>(null); 
  const router = useRouter();

  const handleInterestClick = (interest: any) => {

    router.push(`/interest/${interest.id_slug}`);
  };

  return (
    <>
      <div>
        {interestsData.map((interest) => (
          <span 
            key={interest.id_slug} 
            onClick={() => handleInterestClick(interest)}
            onMouseEnter={() => setHoveredActivity(interest.activity)}
            onMouseLeave={() => setHoveredActivity(null)} 
            style={{ margin: '0 5px', fontSize: '24px', position: 'relative', cursor: 'pointer' }} 
          >
            {interest.emoji}
            {hoveredActivity === interest.activity && ( 
              <span style={{ position: 'absolute', top: '25px', background: 'white', border: '1px solid black', padding: '5px', borderRadius: '5px', zIndex: 1000 }}>
                {interest.activity}
              </span>
            )}
          </span>
        ))}
      </div>
      
      <p>Please select an interest to view the feed.</p>
    </>
  );
};

export default Interests;     
