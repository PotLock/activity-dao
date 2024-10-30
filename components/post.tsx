import { useState, useRef, ChangeEvent } from 'react';
import { css } from "@emotion/css";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTimes, faFaceSmile, faInfoCircle, faEye, faCheck } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

/**
 * To-DO
 * Add posting to farcaster
 * Add signin with farcaster to login
 * add logic for posting to change based on mode or whether passed from feed and then posts to feed
 */
interface PostProps {
  allowImageUpload?: boolean;
  allowMarkdown?: boolean;
  mode?: 'default' | 'vibes-only' | 'vibes-hidden';
  feed?: string; // Add this line
}

// Add this helper function near the top of the component
const isValidUrl = (string: string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

const Post: React.FC<PostProps> = ({ 
  allowImageUpload = true, 
  allowMarkdown = false, 
  mode = 'default',
  feed // Add this line
}) => {
  const [text, setText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageHash, setImageHash] = useState<string | null>(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);  // Move this up here
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProofOfVibes, setIsProofOfVibes] = useState(mode === 'vibes-only');
  const [vibeMetrics, setVibeMetrics] = useState({
    friendliness: 5,
    energy: 5,
    density: 5,
    diversity: 5
  });
  const [eventLink, setEventLink] = useState('');
  const [showMarkdown, setShowMarkdown] = useState(false);
  const [eventLinkError, setEventLinkError] = useState<string>('');
  
  // Add tooltips content
  const tooltips = {
    friendliness: "Rate how welcoming and inclusive the atmosphere was",
    energy: "Measure the overall excitement and activity level",
    density: "How packed or crowded was the space",
    diversity: "Rate the variety in attendance, activities, and experiences"
  };

  // Add this handler for URL validation
  const handleEventLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setEventLink(url);
    
    if (!url) {
      setEventLinkError('');
      return;
    }

    if (!isValidUrl(url)) {
      setEventLinkError('Please enter a valid URL');
      return;
    }

    setEventLinkError('');
  };

  const uploadToPinata = async (file: File) => {
    try {
      console.log('Starting Pinata upload for file:', file.name);
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      console.log('Making request to Pinata...');
      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`
        }
      });
      
      const ipfsHash = response.data.IpfsHash;
      console.log('Pinata upload successful:', response.data);
      
      // Add success toast with IPFS hash
      toast.success(
        <div>
          Successfully uploaded to IPFS!
          <br />
          <small style={{ wordBreak: 'break-all' }}>
            Hash: {ipfsHash}
          </small>
        </div>,
        {
          duration: 5000,
          style: {
            background: '#10B981',
            color: 'white',
          }
        }
      );

      return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    } catch (error) {
      console.error('Error uploading to Pinata:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers
        });
      }
      // Add error toast
      toast.error('Failed to upload image to IPFS', {
        duration: 4000,
      });
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Set local preview immediately for better UX
      setLocalPreviewUrl(URL.createObjectURL(file));
      
      try {
        setIsUploading(true);
        const ipfsUrl = await uploadToPinata(file);
        const hash = ipfsUrl.split('/').pop() || null; // Add null fallback
        setImageHash(hash);
        toast.success('Image uploaded to IPFS successfully');
      } catch (error) {
        console.error('Failed to upload to IPFS:', error);
        toast.error('Failed to upload to IPFS. Using local preview.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const formatVibeCheckResults = (includeMarkdown: boolean) => {
    if (!isProofOfVibes) return '';
    
    if (includeMarkdown) {
      return `\n\n---\n**Vibe Check:**\n` +
        `- Friendliness: ${vibeMetrics.friendliness}/10\n` +
        `- Energy: ${vibeMetrics.energy}/10\n` +
        `- Density: ${vibeMetrics.density}/10\n` +
        `- Diversity: ${vibeMetrics.diversity}/10\n` +
        (eventLink ? `\n🔗 [Event Link](${eventLink})` : '');
    }

    return (
      <>
        <hr />
        <p><strong>Vibe Check:</strong></p>
        <ul>
          <li>Friendliness: {vibeMetrics.friendliness}/10</li>
          <li>Energy: {vibeMetrics.energy}/10</li>
          <li>Density: {vibeMetrics.density}/10</li>
          <li>Diversity: {vibeMetrics.diversity}/10</li>
        </ul>
        {eventLink && (
          <p>🔗 <a href={eventLink}>Event Link</a></p>
        )}
      </>
    );
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;
    
    if (isProofOfVibes && !imageHash && !selectedImage) {
      toast.error("Proof of Vibes requires an image or video", {
        duration: 4000,
      });
      return;
    }

    try {
      const imageUrl = imageHash ? `https://gateway.pinata.cloud/ipfs/${imageHash}` : undefined;
      
      const finalText = text + (isProofOfVibes ? formatVibeCheckResults(true) : '');

      const proofOfVibes = isProofOfVibes ? {
        ...vibeMetrics,
        eventLink: eventLink || undefined
      } : undefined;

      console.log('Submitting post with:', { 
        finalText, 
        imageUrl, 
        proofOfVibes,
        feed // Add this line - will be undefined if not provided
      });

      // Removed onSubmit call
      setText('');
      setSelectedImage(null);
      setLocalPreviewUrl(null);
      setImageHash(null);
      setEventLink('');
      setVibeMetrics({
        friendliness: 5,
        energy: 5,
        density: 5,
        diversity: 5
      });
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post. Please try again.');
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          stack: error.stack
        });
      }
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setLocalPreviewUrl(null);
    setImageHash(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getImagePreviewUrl = () => {
    if (imageHash) {
      return `https://gateway.pinata.cloud/ipfs/${imageHash}`;
    }
    return localPreviewUrl;
  };

  // Separate the preview content into its own component or section
  const renderPreviewContent = () => (
    <div className={css`
      margin: 12px 0;
      padding: 12px;
      background: white;
      border-radius: var(--br-3xs);
    `}>
      {/* Basic preview content - always shown */}
      {!text ? (
        <div className={css`
          color: var(--text-secondary);
          font-style: italic;
        `}>
          Type something to preview
        </div>
      ) : (
        <>
          {showMarkdown ? (
            <ReactMarkdown>{text}</ReactMarkdown>
          ) : (
            <p>{text}</p>
          )}
        </>
      )}
      
      {/* Image preview - try IPFS first, fall back to local */}
      {(imageHash || localPreviewUrl) && (
        <div className={css`
          position: relative;
          display: inline-block;
          margin: 12px 0;
        `}>
          <img
            src={getImagePreviewUrl() || undefined}
            alt="Preview"
            className={css`
              max-width: 200px;
              max-height: 200px;
              object-fit: cover;
              border-radius: var(--br-3xs);
            `}
            onError={(e) => {
              // If IPFS preview fails, fall back to local preview
              const target = e.target as HTMLImageElement;
              if (target.src !== localPreviewUrl && localPreviewUrl) {
                target.src = localPreviewUrl;
              }
            }}
          />
          {isUploading && (
            <div className={css`
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.5);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
            `}>
              Uploading to IPFS...
            </div>
          )}
        </div>
      )}
      
      {/* Proof of vibes preview - only shown when enabled */}
      {isProofOfVibes && (
        <>
          <hr />
          <div className={css`
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-top: 12px;
          `}>
            {Object.entries(vibeMetrics).map(([key, value]) => (
              <div key={key} className={css`
                display: flex;
                justify-content: space-between;
              `}>
                <span>{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                <span>{value}/10</span>
              </div>
            ))}
            {eventLink && (
              <div>
                <a href={eventLink} target="_blank" rel="noopener noreferrer">
                  Event Link
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className={css`
      width: 100%;
      max-width: 100%;
      border: 1px solid #ccc;
      border-radius: var(--br-3xl);
      padding: 16px;
      margin-bottom: 20px;
      background: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.3s ease;
      &:hover {
        box-shadow: 0 0 0 3px var(--color-gold-100);
      }
    `}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
        className={css`
          width: 100%;
          min-height: 100px;
          padding: 12px;
          border: 1px solid var(--border-default-default);
          border-radius: var(--br-3xs);
          margin-bottom: 12px;
          resize: vertical;
          font-family: var(--font-hanken-grotesk);
          font-size: var(--font-size-base);
          &:focus {
            outline: none;
            border-color: var(--color-mediumblue);
          }
        `}
      />

      {/* Move markdown toggle next to preview button */}
      <div className={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 12px;
      `}>
        <div className={css`
          display: flex;
          align-items: center;
          gap: 12px;
        `}>
          {/* Only show Proof of Vibes toggle if mode is 'default' */}
          {mode === 'default' && (
            <label className={css`
              display: flex;
              align-items: center;
              gap: 8px;
              cursor: pointer;
            `}>
              <input
                type="checkbox"
                checked={isProofOfVibes}
                onChange={(e) => setIsProofOfVibes(e.target.checked)}
              />
              Proof of Vibes
            </label>
          )}

          {allowMarkdown && (
            <label className={css`
              display: flex;
              align-items: center;
              gap: 8px;
            `}>
              <input
                type="checkbox"
                checked={showMarkdown}
                onChange={(e) => setShowMarkdown(e.target.checked)}
              />
              Markdown
            </label>
          )}
        </div>

        <div className={css`
          display: flex;
          gap: 12px;
        `}>
          {/* Preview toggle button */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={css`
              background: none;
              border: 1px solid var(--border-default-default);
              padding: 8px 16px;
              border-radius: var(--br-3xs);
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 8px;
              color: ${showPreview ? 'var(--color-mediumblue)' : 'inherit'};
              font-family: var(--font-hanken-grotesk);
              &:hover {
                background: var(--background-default-default);
              }
            `}
          >
            <FontAwesomeIcon icon={faEye} />
            Preview
          </button>

          <button
            onClick={handleSubmit}
            disabled={isUploading || !text.trim()}
            className={css`
              background: var(--color-mediumblue);
              color: white;
              border: none;
              padding: 8px 16px;
              border-radius: var(--br-3xs);
              cursor: pointer;
              font-family: var(--font-hanken-grotesk);
              font-weight: 600;
              transition: background-color 0.3s ease;
              &:disabled {
                background: var(--border-default-default);
                cursor: not-allowed;
              }
              &:hover:not(:disabled) {
                background: var(--color-azure-47);
              }
            `}
          >
            {isUploading ? 'Uploading...' : 'Post'}
          </button>
        </div>
      </div>

      {allowImageUpload && (
        <div className={css`
          margin-bottom: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        `}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />

          {!selectedImage && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className={css`
                background: none;
                border: 1px dashed var(--border-default-default);
                padding: 8px 16px;
                border-radius: var(--br-3xs);
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                font-family: var(--font-hanken-grotesk);
                align-self: flex-start;
                transition: background-color 0.3s ease;
                white-space: nowrap;  // Add this line
                &:hover {
                  background: var(--background-default-default);
                }
              `}
            >
              <FontAwesomeIcon icon={faImage} />
              Add Image
            </button>
          )}

          {localPreviewUrl && (
            <div className={css`
              position: relative;
              display: inline-block;
              margin-bottom: 12px;
              border-radius: var(--br-3xs);
              overflow: hidden;
            `}>
              <img
                src={localPreviewUrl}
                alt="Preview"
                className={css`
                  max-width: 200px;
                  max-height: 200px;
                  object-fit: cover;
                  border-radius: var(--br-3xs);
                `}
              />
              <button
                onClick={removeImage}
                className={css`
                  position: absolute;
                  top: 8px;
                  right: 8px;
                  background: white;
                  border: 1px solid var(--border-default-default);
                  border-radius: 50%;
                  width: 24px;
                  height: 24px;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  transition: background-color 0.3s ease;
                  &:hover {
                    background: var(--background-default-default);
                  }
                `}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Proof of vibes section */}
      {isProofOfVibes && (
        <>
          <div className={css`
            position: relative;
            margin-bottom: ${eventLinkError ? '24px' : '12px'};
          `}>
            <div className={css`
              display: flex;
              align-items: center;
              gap: 8px;
            `}>
              <input
                type="url"
                value={eventLink}
                onChange={handleEventLinkChange}
                placeholder="Event Link"
                className={css`
                  flex: 1;
                  padding: 8px;
                  border: 1px solid ${eventLinkError 
                    ? 'var(--color-error)' 
                    : 'var(--border-default-default)'};
                  border-radius: var(--br-3xs);
                  font-family: var(--font-hanken-grotesk);
                  &:focus {
                    outline: none;
                    border-color: ${eventLinkError 
                      ? 'var(--color-error)' 
                      : 'var(--color-mediumblue)'};
                  }
                `}
              />
              
              {/* Show verification badge for Sola links */}
              {isValidUrl(eventLink) && eventLink.includes('app.sola.day') && (
                <div className={css`
                  display: flex;
                  align-items: center;
                  gap: 4px;
                  padding: 4px 8px;
                  background: var(--color-success-50);
                  color: var(--color-success-700);
                  border-radius: var(--br-3xs);
                  font-size: 12px;
                `}>
                  <FontAwesomeIcon icon={faCheck} />
                  Social Layer Verified
                </div>
              )}
            </div>

            {/* Error message */}
            {eventLinkError && (
              <div className={css`
                position: absolute;
                bottom: -20px;
                left: 0;
                color: var(--color-error);
                font-size: 12px;
              `}>
                {eventLinkError}
              </div>
            )}
          </div>
          
          {/* Add sliders */}
          <div className={css`
            margin-bottom: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
          `}>
            {[
              { label: '❤️ Friendliness', key: 'friendliness' },
              { label: '⚡️ Energy', key: 'energy' },
              { label: '🧊 Density', key: 'density' },
              { label: '🌈 Diversity', key: 'diversity' }
            ].map(({ label, key }) => (
              <div key={key} className={css`
                display: flex;
                align-items: center;
                gap: 12px;
              `}>
                <span className={css`
                  min-width: 120px;
                  display: flex;
                  align-items: center;
                  gap: 4px;
                `}>
                  {label}
                  <span
                    title={tooltips[key as keyof typeof tooltips]}
                    className={css`
                      cursor: help;
                      color: var(--color-mediumblue);
                    `}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} size="sm" />
                  </span>
                </span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={vibeMetrics[key as keyof typeof vibeMetrics]}
                  onChange={(e) => setVibeMetrics(prev => ({
                    ...prev,
                    [key]: parseInt(e.target.value)
                  }))}
                  className={css`flex: 1;`}
                />
                <span>{vibeMetrics[key as keyof typeof vibeMetrics]}/10</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Preview section - moved to bottom */}
      {showPreview && (
        <div className={css`
          margin-top: 20px;
          padding: 16px;
          border: 1px solid var(--border-default-default);
          border-radius: var(--br-3xs);
          background: var(--background-default-default);
        `}>
          <h3>Preview</h3>
          {renderPreviewContent()}
        </div>
      )}
    </div>
  );
};

export default Post;
