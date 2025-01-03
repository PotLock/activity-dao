import type { NextPage } from "next";
import { css } from "@emotion/css";
import { useState } from "react";
import { 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  Switch,
  FormControl,
  InputLabel,
  Alert,
  IconButton 
} from "@mui/material";
import { FaCamera, FaQrcode, FaClipboardCheck } from "react-icons/fa";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import NAVBAR from "../../components/n-a-v-b-a-r";
import Footer from "../../components/Footer";

const labelStyle = css`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
  display: block;
`;

const sectionHeadingStyle = css`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
`;

const CreateCommit: NextPage = () => {
  const [entryMethod, setEntryMethod] = useState<"manual" | "url">("manual");
  const [selectedToken, setSelectedToken] = useState("usdc");
  const [allowPartner, setAllowPartner] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<string>("qr");
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [eventDescription, setEventDescription] = useState('');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [customFields, setCustomFields] = useState<Array<{ name: string; value: string }>>([
    { name: '', value: '' }
  ]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEventImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={css`
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    `}>
      <NAVBAR />
      
      <main className={css`
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem 1rem;
        margin-top: 5rem;
      `}>
        <div className={css`
          max-width: 800px;
          width: 100%;
        `}>
          {/* Header */}
          <div className={css`
            text-align: center;
            margin-bottom: 3rem;
          `}>
            <h1 className={css`
              font-size: 2rem;
              font-weight: 600;
              margin-bottom: 0.5rem;
            `}>Create a Commit</h1>
            <p className={css`
              color: #6B7280;
            `}>Fill in the required fields to create a commit</p>
          </div>

          {/* Event Details Section */}
          <div className={css`margin-bottom: 3rem;`}>
            <h2 className={sectionHeadingStyle}>Event Details</h2>
            <p className={css`
              color: #6B7280;
              font-size: 0.875rem;
              margin-bottom: 1.5rem;
            `}>Choose how you want to enter your event details</p>

            {/* Entry Method Selection */}
            <div className={css`
              display: flex;
              gap: 1rem;
              margin-bottom: 2rem;
              justify-content: flex-start;
            `}>
              <Button
                variant={entryMethod === "manual" ? "contained" : "outlined"}
                onClick={() => setEntryMethod("manual")}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  backgroundColor: entryMethod === "manual" ? '#facc15' : '#f5f5f5',
                  color: entryMethod === "manual" ? '#000' : '#666',
                  border: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: entryMethod === "manual" ? '#f59e0b' : '#e5e5e5',
                    boxShadow: 'none',
                    border: 'none',
                  },
                }}
              >
                Manual Entry
              </Button>
              <Button
                variant={entryMethod === "url" ? "contained" : "outlined"}
                onClick={() => setEntryMethod("url")}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  backgroundColor: entryMethod === "url" ? '#facc15' : '#f5f5f5',
                  color: entryMethod === "url" ? '#000' : '#666',
                  border: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: entryMethod === "url" ? '#f59e0b' : '#e5e5e5',
                    boxShadow: 'none',
                    border: 'none',
                  },
                }}
              >
                Import from URL
              </Button>
            </div>

            {/* URL Import Field - Only shown when URL method is selected */}
            {entryMethod === "url" && (
              <div className={css`margin-bottom: 2rem;`}>
                <label className={labelStyle}>Event URL</label>
                <div className={css`
                  display: flex;
                  gap: 1rem;
                `}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter event URL"
                  />
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: '8px',
                      textTransform: 'none',
                      backgroundColor: '#facc15',
                      color: '#000',
                      border: 'none',
                      boxShadow: 'none',
                      px: 4,
                      '&:hover': {
                        backgroundColor: '#f59e0b',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    Import
                  </Button>
                </div>
              </div>
            )}

            {/* Common Event Details Fields */}
            {/* Image Upload */}
            <div className={css`margin-bottom: 2rem;`}>
              <label className={labelStyle}>Upload Image</label>
              <div className={css`
                width: 120px;
                height: 120px;
                border-radius: 50%;
                background-color: #F3F4F6;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                position: relative;
                background-image: url(${imagePreview});
                background-size: cover;
                background-position: center;
              `}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={css`display: none;`}
                  id="event-image-upload"
                />
                <label htmlFor="event-image-upload" className={css`
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                `}>
                  {!imagePreview && <FaCamera size={24} color="#9CA3AF" />}
                </label>
              </div>
            </div>

            {/* Event Name */}
            <div className={css`margin-bottom: 2rem;`}>
              <label className={labelStyle}>Event Name</label>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter event name"
              />
            </div>

            {/* Event Description */}
            <div className={css`margin-bottom: 2rem;`}>
              <label className={labelStyle}>Event Description</label>
              <TextField
                fullWidth
                multiline
                rows={4}
                size="small"
                placeholder="Enter event description"
                inputProps={{ maxLength: 250 }}
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />
              <p className={css`
                color: #6B7280;
                font-size: 0.875rem;
                margin-top: 0.5rem;
                text-align: right;
              `}>{eventDescription.length}/250 characters</p>
            </div>

            {/* Date Range and Location */}
            <div className={css`
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 2rem;
              margin-bottom: 2rem;
            `}>
              <div>
                <label className={labelStyle}>Start Date and Time</label>
                <DateTimePicker
                  value={dateRange[0]}
                  onChange={(newValue) => setDateRange([newValue, dateRange[1]])}
                  slotProps={{
                    textField: { size: 'small' },
                  }}
                />
              </div>
              <div>
                <label className={labelStyle}>End Date and Time</label>
                <DateTimePicker
                  value={dateRange[1]}
                  onChange={(newValue) => setDateRange([dateRange[0], newValue])}
                  slotProps={{
                    textField: { size: 'small' },
                  }}
                />
              </div>
              <div>
                <label className={labelStyle}>Location</label>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter location"
                />
              </div>
            </div>

            {/* Custom Fields Section */}
            <div className={css`margin-bottom: 2rem;`}>
              <label className={labelStyle}>Custom Fields</label>
              
              {/* Custom Fields List */}
              {customFields.map((field, index) => (
                <div key={index} className={css`
                  margin-bottom: 1rem;
                `}>
                  <div className={css`
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-bottom: 0.5rem;
                  `}>
                    <TextField
                      size="small"
                      placeholder="Field name"
                      value={field.name}
                      onChange={(e) => {
                        const newFields = [...customFields];
                        newFields[index].name = e.target.value;
                        setCustomFields(newFields);
                      }}
                    />
                    <TextField
                      size="small"
                      placeholder="Value"
                      value={field.value}
                      onChange={(e) => {
                        const newFields = [...customFields];
                        newFields[index].value = e.target.value;
                        setCustomFields(newFields);
                      }}
                    />
                  </div>
                  <div className={css`
                    display: flex;
                    justify-content: flex-end;
                  `}>
                    <Button
                      onClick={() => {
                        const newFields = customFields.filter((_, i) => i !== index);
                        setCustomFields(newFields);
                      }}
                      size="small"
                      sx={{
                        textTransform: 'none',
                        color: '#666',
                        padding: '0',
                        minWidth: 'auto',
                        '&:hover': {
                          background: 'none',
                        }
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}

              {/* Custom Fields Buttons */}
              <div className={css`
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
                margin-top: 1rem;
              `}>
                <Button
                  variant="outlined"
                  onClick={() => setCustomFields([])}
                  fullWidth
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    backgroundColor: '#f5f5f5',
                    color: '#000',
                    border: 'none',
                    boxShadow: 'none',
                    padding: '0.5rem',
                    '&:hover': {
                      backgroundColor: '#e5e5e5',
                      border: 'none',
                      boxShadow: 'none',
                    },
                  }}
                >
                  Remove All
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setCustomFields([...customFields, { name: '', value: '' }])}
                  fullWidth
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    backgroundColor: '#facc15',
                    color: '#000',
                    border: 'none',
                    boxShadow: 'none',
                    padding: '0.5rem',
                    '&:hover': {
                      backgroundColor: '#f59e0b',
                      border: 'none',
                      boxShadow: 'none',
                    },
                  }}
                >
                  Add Custom Field
                </Button>
              </div>
            </div>
          </div>

          {/* Event Commit Section */}
          <div className={css`margin-bottom: 3rem;`}>
            <h2 className={sectionHeadingStyle}>Event Commit</h2>

            <div className={css`margin-bottom: 2rem;`}>
              <label className={labelStyle}>Token</label>
              <FormControl fullWidth>
                <Select
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value)}
                >
                  <MenuItem value="usdc">USDC</MenuItem>
                  <MenuItem value="usdt">USDT</MenuItem>
                  <MenuItem value="eth">ETH</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className={css`margin-bottom: 2rem;`}>
              <label className={labelStyle}>Deposit Amount</label>
              <TextField
                fullWidth
                type="number"
                size="small"
                placeholder="Enter amount"
              />
              <p className={css`
                color: #6B7280;
                font-size: 0.875rem;
                margin-top: 0.5rem;
              `}>This amount will be pooled with other participant's fund</p>
            </div>

            <div className={css`margin-bottom: 2rem;`}>
              <label className={labelStyle}>Creator Fee</label>
              <TextField
                fullWidth
                type="number"
                size="small"
                placeholder="Enter amount"
                defaultValue="0.001"
                disabled
              />
              <p className={css`
                color: #6B7280;
                font-size: 0.875rem;
                margin-top: 0.5rem;
              `}>Note: to prevent spam, creating commit costs 0.001 ETH</p>
            </div>

            <Alert 
              severity="info"
              sx={{
                backgroundColor: '#F3F4F6',
                color: '#6B7280',
                marginBottom: '2rem',
              }}
            >
              Protocol fees is 2%. This fee is fixed by the platform
            </Alert>

            <div className={css`
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 2rem;
              margin-bottom: 2rem;
            `}>
              <div>
                <label className={labelStyle}>Join Commit Date and Time</label>
                <TextField
                  type="datetime-local"
                  fullWidth
                  size="small"
                />
              </div>
              <div>
                <label className={labelStyle}>Claim Reward Date and Time</label>
                <TextField
                  type="datetime-local"
                  fullWidth
                  size="small"
                />
              </div>
            </div>

            <div className={css`margin-bottom: 2rem;`}>
              <label className={labelStyle}>Verification Method</label>
              <div className={css`
                display: flex;
                gap: 1rem;
              `}>
                <Button
                  variant={verificationMethod === "qr" ? "contained" : "outlined"}
                  onClick={() => setVerificationMethod("qr")}
                  startIcon={<FaQrcode />}
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    backgroundColor: verificationMethod === "qr" ? '#facc15' : '#f5f5f5',
                    color: verificationMethod === "qr" ? '#000' : '#666',
                    border: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: verificationMethod === "qr" ? '#f59e0b' : '#e5e5e5',
                      boxShadow: 'none',
                      border: 'none',
                    },
                  }}
                >
                  QR Code
                </Button>
                <Button
                  variant={verificationMethod === "photo" ? "contained" : "outlined"}
                  onClick={() => setVerificationMethod("photo")}
                  startIcon={<FaCamera />}
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    backgroundColor: verificationMethod === "photo" ? '#facc15' : '#f5f5f5',
                    color: verificationMethod === "photo" ? '#000' : '#666',
                    border: 'none',
                    boxShadow: 'none',
                    px: 3,
                    '&:hover': {
                      backgroundColor: verificationMethod === "photo" ? '#f59e0b' : '#e5e5e5',
                      boxShadow: 'none',
                      border: 'none',
                    },
                  }}
                >
                  Photo Upload
                </Button>
                <Button
                  variant={verificationMethod === "manual" ? "contained" : "outlined"}
                  onClick={() => setVerificationMethod("manual")}
                  startIcon={<FaClipboardCheck />}
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    backgroundColor: verificationMethod === "manual" ? '#facc15' : '#f5f5f5',
                    color: verificationMethod === "manual" ? '#000' : '#666',
                    border: 'none',
                    boxShadow: 'none',
                    px: 3,
                    '&:hover': {
                      backgroundColor: verificationMethod === "manual" ? '#f59e0b' : '#e5e5e5',
                      boxShadow: 'none',
                      border: 'none',
                    },
                  }}
                >
                  Manual Verification
                </Button>
              </div>
            </div>

            <div className={css`margin-bottom: 2rem;`}>
              <div className={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
              `}>
                <h2 className={sectionHeadingStyle} style={{ margin: 0 }}>Allow Accountability Partner</h2>
                <Switch
                  checked={allowPartner}
                  onChange={(e) => setAllowPartner(e.target.checked)}
                />
              </div>

              {allowPartner && (
                <div className={css`margin-top: 1.5rem;`}>
                  <label className={labelStyle}>Partner Wallet Address</label>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="0x..."
                  />
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className={css`
            display: flex;
            justify-content: space-between;
            gap: 1rem;
          `}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                color: '#666',
                backgroundColor: '#f5f5f5',
                border: 'none',
                boxShadow: 'none',
                padding: '0.5rem 2rem',
                '&:hover': {
                  backgroundColor: '#e5e5e5',
                  border: 'none',
                  boxShadow: 'none',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                backgroundColor: '#facc15',
                color: '#000',
                border: 'none',
                boxShadow: 'none',
                padding: '0.5rem 2rem',
                '&:hover': {
                  backgroundColor: '#f59e0b',
                  boxShadow: 'none',
                },
              }}
            >
              Create Commit
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateCommit;
