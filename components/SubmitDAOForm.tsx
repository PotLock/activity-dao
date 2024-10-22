import React, { useState, useEffect } from 'react';
// mport { isValidEthereumAddressOrDomain } from '../utils/isEth';
import { css } from "@emotion/css";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Grid,
  SelectChangeEvent,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { toast } from 'react-toastify';
import daoData from "../data/daos.json";
import { Octokit } from "@octokit/rest";
// import SafeImage from './SafeImage';

const allMaturityTags = Array.from(new Set(daoData.flatMap(dao => dao.maturity)));
const allTags = Array.from(new Set(daoData.flatMap(dao => dao.tags)));

const networks = ['ETH', 'BSC', 'POLYGON', 'NEAR', 'SOL', 'BASE', 'ARB'];

const NetworkSelect: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => (
  <Select
    value={value}
    onChange={(e) => onChange(e.target.value as string)}
    displayEmpty
    fullWidth
  >
    <MenuItem value="" disabled>Select Network</MenuItem>
    {networks.map((network) => (
      <MenuItem key={network} value={network}>{network}</MenuItem>
    ))}
  </Select>
);

const SubmitDAOForm: React.FC = () => {
  const [devMode, setDevMode] = useState(false);

  const defaultDevValues = {
    name: 'Activity DAO',
    icon: 'https://activity.community/-emoji-light-bulb.svg',
    description: 'the movement to have community run & funded ecosystems around every dope activity',
    url: 'https://activitiy.community',
    tags: ['Wellness'],
    maturity: ['Idea'],
    emoji: '👨‍',
    treasuryAddress: 'https://activity.community/treasury',
    github: 'https://github.com/potlock/activity_dao',
    twitter: 'https://twitter.com/activity_dao',
    banner: 'https://pbs.twimg.com/profile_banners/1635444352959885313/1727340394/1500x500',
    exists: true,
    featured: false,
    order: daoData.length + 1,
    treasuryAddresses: [{ network: 'ETH', address: '0x1234567890123456789012345678901234567890' }],
    farcaster_channel: 'activity',
    telegram: 'https://t.me/activitydao',
    discord: 'https://discord.gg/activitydao',
    farcaster_user: 'activity_dao',
  };

  const [formData, setFormData] = useState(devMode ? defaultDevValues : {
    name: '',
    icon: '',
    description: '',
    url: '',
    tags: [] as string[],
    maturity: [] as string[],
    emoji: '',
    treasuryAddress: '',
    github: '',
    twitter: '',
    banner: '',
    exists: true,
    featured: true,
    order: daoData.length + 1,
    treasuryAddresses: [{ network: '', address: '' }],
    farcaster_channel: '',
    telegram: '',
    discord: '',
    farcaster_user: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [iconPreview, setIconPreview] = useState<string>('');
  const [bannerPreview, setBannerPreview] = useState<string>('');
  const [bannerLoading, setBannerLoading] = useState<boolean>(false);
  const [bannerError, setBannerError] = useState<boolean>(false);
  const [pullRequestUrl, setPullRequestUrl] = useState<string>('');

  const validateField = (name: string, value: unknown): string => {
    switch (name) {
      case 'name':
        return typeof value === 'string' && value ? '' : 'Name is required';
      case 'icon':
        return typeof value === 'string' && isValidUrl(value) ? '' : 'Invalid Icon URL';
      case 'description':
        return typeof value === 'string' && value.length >= 50 ? '' : 'Description must be at least 50 characters';
      case 'url':
        return typeof value === 'string' && isValidUrl(value) ? '' : 'Invalid URL';
      case 'tags':
        return Array.isArray(value) && value.length > 0 ? '' : 'At least one tag is required';
      case 'maturity':
        return Array.isArray(value) && value.length > 0 ? '' : 'At least one maturity level is required';
      case 'emoji':
        return typeof value === 'string' && value.trim().length > 0 ? '' : 'Emoji is required';
      case 'treasuryAddress':
        return typeof value === 'string' ? (value ? (isValidUrl(value) ? '' : 'Invalid Treasury Address URL') : '') : '';
      case 'github':
        return typeof value === 'string' ? (value ? (isValidUrl(value) ? '' : 'Invalid GitHub URL') : '') : '';
      case 'twitter':
        return typeof value === 'string' ? (value ? (isValidUrl(value) ? '' : 'Invalid Twitter URL') : '') : '';
      case 'banner':
        return typeof value === 'string' ? (value ? (isValidUrl(value) ? '' : 'Invalid Banner URL') : '') : '';
      case 'treasuryAddresses':
        if (!Array.isArray(value) || value.length === 0) {
          return 'At least one treasury address is required';
        }
        for (const address of value) {
          if (!address.network || !address.address) {
            return 'Network and address are required for all treasury addresses';
          }
          // Commented out Ethereum address validation
          // if (!isValidUrl(address.address) && !isValidEthereumAddressOrDomain(address.address)) {
          //   return 'Invalid treasury address';
          // }
        }
        return '';
      case 'farcaster_channel':
      case 'telegram':
      case 'discord':
      case 'farcaster_user':
        return typeof value === 'string' ? '' : 'Invalid value';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name as string]: value }));
    setErrors(prev => ({ ...prev, [name as string]: validateField(name as string, value as unknown) }));

    if (name === 'icon') {
      setIconPreview(value as string);
    } else if (name === 'banner') {
      setBannerPreview(value as string);
      setBannerLoading(true);
      setBannerError(false);
    }
  };

  const handleMultipleSelect = (event: SelectChangeEvent<string[]>, fieldName: string) => {
    const value = event.target.value as string[];
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    setErrors(prev => ({ ...prev, [fieldName]: validateField(fieldName, value) }));
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isEmoji = (str: string) => {
    // Remove this function as we're simplifying the emoji validation
    return true;
  };

  const handleTreasuryAddressChange = (index: number, field: 'network' | 'address', value: string) => {
    const newTreasuryAddresses = [...formData.treasuryAddresses];
    newTreasuryAddresses[index][field] = value;
    setFormData(prev => ({ ...prev, treasuryAddresses: newTreasuryAddresses }));
  };

  const handleTreasuryAddressAction = (action: 'add' | 'remove', index?: number) => {
    if (action === 'add') {
      setFormData(prev => ({
        ...prev,
        treasuryAddresses: [...prev.treasuryAddresses, { network: '', address: '' }]
      }));
    } else if (action === 'remove' && index !== undefined) {
      setFormData(prev => ({
        ...prev,
        treasuryAddresses: prev.treasuryAddresses.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      acc[key] = validateField(key, formData[key as keyof typeof formData]);
      return acc;
    }, {} as Record<string, string>);

    // Check for similar DAO names
    const similarDao = daoData.find(dao => 
      dao.name.toLowerCase().includes(formData.name.toLowerCase()) || 
      formData.name.toLowerCase().includes(dao.name.toLowerCase())
    );

    if (similarDao) {
      newErrors.name = `Similar DAO name already exists: ${similarDao.name}`;
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      try {
        const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        if (!githubToken) {
          throw new Error('GitHub token is not set');
        }
        const octokit = new Octokit({ auth: githubToken });

        // Fetch the current content of the file
        const { data: fileData } = await octokit.repos.getContent({
          owner: 'PotLock',
          repo: 'activity-dao',
          path: 'data/daos.json',
          ref: 'main', // Specify the main branch
        });

        if ('content' in fileData) {
          // Decode the content
          const content = Buffer.from(fileData.content, 'base64').toString();
          const currentData = JSON.parse(content);

          // Add the new DAO entry
          currentData.push(formData);

          // Create a new branch name
          const branchName = `submitdao${formData.order}`;

          // Create a new branch
          await octokit.git.createRef({
            owner: 'PotLock',
            repo: 'activity-dao',
            ref: `refs/heads/${branchName}`,
            sha: fileData.sha,
          });

          // Update the file on the new branch
          await octokit.repos.createOrUpdateFileContents({
            owner: 'PotLock',
            repo: 'activity-dao',
            path: 'data/daos.json',
            message: `Add new DAO: ${formData.name}`,
            content: Buffer.from(JSON.stringify(currentData, null, 2)).toString('base64'),
            branch: branchName,
          });

          // Create a pull request
          const { data: pullRequest } = await octokit.pulls.create({
            owner: 'PotLock',
            repo: 'activity-dao',
            title: `Add new DAO: ${formData.name}`,
            head: branchName,
            base: 'main',
            body: `This PR adds a new DAO: ${formData.name}\n\nPlease review the changes and merge if everything looks good.`,
          });

          console.log('New DAO:', formData);
          console.log('Pull Request created:', pullRequest.html_url);
          setOpenSuccessModal(true);
          setPullRequestUrl(pullRequest.html_url);
        } else {
          throw new Error('Unable to fetch file content');
        }
      } catch (error) {
        console.error('Error submitting DAO:', error);
        setErrorMessage('An error occurred while submitting the DAO to GitHub.');
        toast.error('An error occurred while submitting the DAO.');
      }
    } else {
      toast.error('Please correct the errors in the form.');
    }
  };

  useEffect(() => {
    if (devMode) {
      setFormData(defaultDevValues);
    } else {
      setFormData({
        name: '',
        icon: '',
        description: '',
        url: '',
        tags: [],
        maturity: [],
        emoji: '',
        treasuryAddress: '',
        github: '',
        twitter: '',
        banner: '',
        exists: true,
        featured: true,
        order: daoData.length + 1,
        treasuryAddresses: [{ network: '', address: '' }],
        farcaster_channel: '',
        telegram: '',
        discord: '',
        farcaster_user: '',
      });
    }
  }, [devMode]);

  return (
    <>
      <form onSubmit={handleSubmit} className={css`
        max-width: 1200px;
        margin: 0 auto;
      `}>
        <FormControlLabel
          control={
            <Switch
              checked={devMode}
              onChange={(e) => setDevMode(e.target.checked)}
              name="devMode"
              color="primary"
            />
          }
          label="Dev Mode"
        />
        <Box sx={{ mt: 4, mb: 4 }}>
          <h3>Profile Preview</h3>
          <Box sx={{ 
            position: 'relative', 
            width: '100%', 
            height: '200px', 
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            {bannerLoading && (
              <Box sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <CircularProgress />
              </Box>
            )}
            {bannerPreview && !bannerError && (
              <img
                src={bannerPreview}
                alt="Banner preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: bannerLoading ? 'none' : 'block',
                }}
                onLoad={() => setBannerLoading(false)}
                onError={() => {
                  setBannerLoading(false);
                  setBannerError(true);
                }}
              />
            )}
            {(bannerError || !bannerPreview) && !bannerLoading && (
              <Box sx={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                bgcolor: '#e0e0e0',
                color: '#999'
              }}>
                No Banner Image
              </Box>
            )}
            <Avatar
              src={formData.icon || undefined}
              alt="Icon preview"
              sx={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                width: '80px',
                height: '80px',
                border: '4px solid white',
              }}
            >
              {!formData.icon && 'No Icon'}
            </Avatar>
          </Box>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description || `${formData.description.length}/50 characters`}
              multiline
              rows={4}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Icon URL"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              error={!!errors.icon}
              helperText={errors.icon}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="URL"
              name="url"
              value={formData.url}
              onChange={handleChange}
              error={!!errors.url}
              helperText={errors.url}
              required
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal" error={!!errors.tags} required>
              <InputLabel>Tags</InputLabel>
              <Select
                multiple
                value={formData.tags}
                onChange={(e) => handleMultipleSelect(e, 'tags')}
                input={<OutlinedInput label="Tags" />}
                renderValue={(selected) => (selected as string[]).join(', ')}
              >
                {allTags.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    <Checkbox checked={formData.tags.indexOf(tag) > -1} />
                    <ListItemText primary={tag} />
                  </MenuItem>
                ))}
              </Select>
              {errors.tags && <p className={css`color: red; font-size: 0.75rem;`}>{errors.tags}</p>}
            </FormControl>
            <FormControl fullWidth margin="normal" error={!!errors.maturity} required>
              <InputLabel>Maturity</InputLabel>
              <Select
                multiple
                value={formData.maturity}
                onChange={(e) => handleMultipleSelect(e, 'maturity')}
                input={<OutlinedInput label="Maturity" />}
                renderValue={(selected) => (selected as string[]).join(', ')}
              >
                {allMaturityTags.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    <Checkbox checked={formData.maturity.indexOf(tag) > -1} />
                    <ListItemText primary={tag} />
                  </MenuItem>
                ))}
              </Select>
              {errors.maturity && <p className={css`color: red; font-size: 0.75rem;`}>{errors.maturity}</p>}
            </FormControl>
            <TextField
              label="Emoji"
              name="emoji"
              value={formData.emoji}
              onChange={handleChange}
              error={!!errors.emoji}
              helperText={errors.emoji}
              required
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Treasury Address URL"
              name="treasuryAddress"
              value={formData.treasuryAddress}
              onChange={handleChange}
              error={!!errors.treasuryAddress}
              helperText={errors.treasuryAddress}
              fullWidth
              margin="normal"
            />
            <TextField
              label="GitHub URL"
              name="github"
              value={formData.github}
              onChange={handleChange}
              error={!!errors.github}
              helperText={errors.github}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Twitter URL"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              error={!!errors.twitter}
              helperText={errors.twitter}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Banner URL"
              name="banner"
              value={formData.banner}
              onChange={handleChange}
              error={!!errors.banner}
              helperText={errors.banner}
              fullWidth
              margin="normal"
            />
            {/* <TextField
              label="Order"
              name="order"
              type="number"
              value={formData.order}
              onChange={handleChange}
              fullWidth
              margin="normal"
            /> */}
          </Grid>
        </Grid>
        
        <h3>Treasury Addresses</h3>
        {formData.treasuryAddresses.map((address, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Network</InputLabel>
              <NetworkSelect
                value={address.network}
                onChange={(value) => handleTreasuryAddressChange(index, 'network', value)}
              />
            </FormControl>
            <TextField
              fullWidth
              label="Address"
              value={address.address}
              onChange={(e) => handleTreasuryAddressChange(index, 'address', e.target.value)}
              error={!!errors[`treasuryAddress${index}`]}
              helperText={errors[`treasuryAddress${index}`]}
            />
            <Button onClick={() => handleTreasuryAddressAction('remove', index)}>Remove</Button>
          </Box>
        ))}
        <Button onClick={() => handleTreasuryAddressAction('add')}>Add Treasury Address</Button>

        <TextField
          label="Farcaster Channel"
          name="farcaster_channel"
          value={formData.farcaster_channel}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Telegram"
          name="telegram"
          value={formData.telegram}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Discord"
          name="discord"
          value={formData.discord}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Farcaster User"
          name="farcaster_user"
          value={formData.farcaster_user}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          startIcon={<img width="20.8px" height="20.8px" src="/component-1.svg" />}
          className={css`
            margin-top: 2rem;
            align-self: stretch;
            height: 2.5rem;
            transition: all 0.3s ease;
            &:hover {
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
              animation: rainbow-glow 3s linear infinite;
            }
            @keyframes rainbow-glow {
              0% { box-shadow: 0 0 10px #ff0000; }
              14% { box-shadow: 0 0 10px #ff7f00; }
              28% { box-shadow: 0 0 10px #ffff00; }
              42% { box-shadow: 0 0 10px #00ff00; }
              57% { box-shadow: 0 0 10px #0000ff; }
              71% { box-shadow: 0 0 10px #8b00ff; }
              85% { box-shadow: 0 0 10px #ff00ff; }
              100% { box-shadow: 0 0 10px #ff0000; }
            }
          `}
          sx={{
            textTransform: "none",
            color: "#000",
            fontSize: "19.5px",
            background: "#facc15",
            borderRadius: "8665.8px",
            "&:hover": { background: "#facc15" },
            height: 40,
            width: '100%',
            maxWidth: '200px',
          }}
        >
          Submit DAO
        </Button>
      </form>

      {/* Success Modal */}
      <Dialog open={openSuccessModal} onClose={() => setOpenSuccessModal(false)}>
        <DialogTitle>Success!</DialogTitle>
        <DialogContent>
          Your DAO has been successfully submitted to GitHub and a pull request has been created.
          {pullRequestUrl && (
            <p>
              You can view the pull request here: <a href={pullRequestUrl} target="_blank" rel="noopener noreferrer">{pullRequestUrl}</a>
            </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSuccessModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Error Popup */}
      {errorMessage && (
        <Dialog open={!!errorMessage} onClose={() => setErrorMessage('')}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>
            {errorMessage}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setErrorMessage('')}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default SubmitDAOForm;
