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
} from "@mui/material";
import { FaQrcode, FaCamera, FaClipboardCheck } from "react-icons/fa";
import NAVBAR from "../../components/n-a-v-b-a-r";
import Footer from "../../components/Footer";

const CreateCommit: NextPage = () => {
  const [entryMethod, setEntryMethod] = useState<"manual" | "url">("manual");
  const [selectedToken, setSelectedToken] = useState("usdc");
  const [allowPartner, setAllowPartner] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<string>("");

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
          <div className={css`margin-bottom: 2rem;`}>
            <h2 className={css`
              font-size: 1.25rem;
              font-weight: 600;
              margin-bottom: 0.5rem;
            `}>Event Details</h2>
            <p className={css`
              color: #6B7280;
              margin-bottom: 1rem;
            `}>Choose how you want to enter your event details</p>
            
            <div className={css`
              display: flex;
              gap: 1rem;
              margin-bottom: 1rem;
            `}>
              <Button
                variant={entryMethod === "manual" ? "contained" : "outlined"}
                onClick={() => setEntryMethod("manual")}
                sx={{
                  borderRadius: '25px',
                  textTransform: 'none',
                  backgroundColor: entryMethod === "manual" ? '#facc15' : 'transparent',
                  color: entryMethod === "manual" ? '#000' : '#666',
                  border: '1px solid #E5E7EB',
                  '&:hover': {
                    backgroundColor: entryMethod === "manual" ? '#f59e0b' : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                Manual Entry
              </Button>
              <Button
                variant={entryMethod === "url" ? "contained" : "outlined"}
                onClick={() => setEntryMethod("url")}
                sx={{
                  borderRadius: '25px',
                  textTransform: 'none',
                  backgroundColor: entryMethod === "url" ? '#facc15' : 'transparent',
                  color: entryMethod === "url" ? '#000' : '#666',
                  border: '1px solid #E5E7EB',
                  '&:hover': {
                    backgroundColor: entryMethod === "url" ? '#f59e0b' : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                Import from URL
              </Button>
            </div>

            {entryMethod === "url" && (
              <div className={css`
                display: flex;
                gap: 1rem;
              `}>
                <TextField
                  fullWidth
                  placeholder="Enter Event URL"
                  size="small"
                />
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    backgroundColor: '#facc15',
                    color: '#000',
                    '&:hover': {
                      backgroundColor: '#f59e0b',
                    },
                  }}
                >
                  Import
                </Button>
              </div>
            )}
          </div>

          {/* Event Commit Section */}
          <div className={css`margin-bottom: 2rem;`}>
            <h2 className={css`
              font-size: 1.25rem;
              font-weight: 600;
              margin-bottom: 1.5rem;
            `}>Event Commit</h2>

            <FormControl fullWidth className={css`margin-bottom: 1.5rem;`}>
              <InputLabel>Token</InputLabel>
              <Select
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
                label="Token"
              >
                <MenuItem value="usdc">USDC</MenuItem>
                <MenuItem value="usdt">USDT</MenuItem>
                <MenuItem value="eth">ETH</MenuItem>
              </Select>
            </FormControl>

            <div className={css`margin-bottom: 1.5rem;`}>
              <TextField
                fullWidth
                label="Deposit Amount"
                type="number"
                size="small"
              />
              <p className={css`
                color: #6B7280;
                font-size: 0.875rem;
                margin-top: 0.5rem;
              `}>This amount will be pooled with other participant's fund</p>
            </div>

            <div className={css`
              margin-bottom: 1.5rem;
              color: #6B7280;
            `}>
              <p>Creator fee</p>
              <p className={css`
                font-size: 0.875rem;
                margin-top: 0.25rem;
              `}>Note: to prevent spam, creating commit costs 0.001 ETH</p>
            </div>

            <Alert 
              severity="info"
              sx={{
                backgroundColor: '#F3F4F6',
                color: '#6B7280',
                marginBottom: '1.5rem',
              }}
            >
              Protocol fees is 2%. This fee is fixed by the platform
            </Alert>

            <div className={css`
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 1rem;
              margin-bottom: 1.5rem;
            `}>
              <TextField
                label="Join Commit Date and Time"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Claim Reward Date and Time"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
              />
            </div>

            <div className={css`margin-bottom: 1.5rem;`}>
              <h3 className={css`
                font-size: 1rem;
                font-weight: 600;
                margin-bottom: 1rem;
              `}>Verification Method</h3>
              <div className={css`
                display: flex;
                gap: 1rem;
              `}>
                <Button
                  variant={verificationMethod === "qr" ? "contained" : "outlined"}
                  onClick={() => setVerificationMethod("qr")}
                  startIcon={<FaQrcode />}
                  sx={{
                    borderRadius: '25px',
                    textTransform: 'none',
                    backgroundColor: verificationMethod === "qr" ? '#facc15' : 'transparent',
                    color: verificationMethod === "qr" ? '#000' : '#666',
                    border: '1px solid #E5E7EB',
                    '&:hover': {
                      backgroundColor: verificationMethod === "qr" ? '#f59e0b' : 'rgba(0, 0, 0, 0.04)',
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
                    borderRadius: '25px',
                    textTransform: 'none',
                    backgroundColor: verificationMethod === "photo" ? '#facc15' : 'transparent',
                    color: verificationMethod === "photo" ? '#000' : '#666',
                    border: '1px solid #E5E7EB',
                    '&:hover': {
                      backgroundColor: verificationMethod === "photo" ? '#f59e0b' : 'rgba(0, 0, 0, 0.04)',
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
                    borderRadius: '25px',
                    textTransform: 'none',
                    backgroundColor: verificationMethod === "manual" ? '#facc15' : 'transparent',
                    color: verificationMethod === "manual" ? '#000' : '#666',
                    border: '1px solid #E5E7EB',
                    '&:hover': {
                      backgroundColor: verificationMethod === "manual" ? '#f59e0b' : 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  Manual Verification
                </Button>
              </div>
            </div>

            <div className={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 1.5rem;
            `}>
              <span>Allow Accountability Partner</span>
              <Switch
                checked={allowPartner}
                onChange={(e) => setAllowPartner(e.target.checked)}
              />
            </div>

            {allowPartner && (
              <TextField
                fullWidth
                label="Partner Wallet Address (optional)"
                placeholder="0x..."
                className={css`margin-bottom: 2rem;`}
              />
            )}
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
                borderRadius: '25px',
                textTransform: 'none',
                color: '#666',
                border: '1px solid #E5E7EB',
                padding: '0.5rem 2rem',
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: '25px',
                textTransform: 'none',
                backgroundColor: '#facc15',
                color: '#000',
                padding: '0.5rem 2rem',
                '&:hover': {
                  backgroundColor: '#f59e0b',
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
