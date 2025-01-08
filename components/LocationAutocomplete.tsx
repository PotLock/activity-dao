import { useState, useEffect } from 'react';
import { TextField, List, ListItem, Paper } from '@mui/material';
import { css } from '@emotion/css';

interface Location {
  display_name: string;
  lat: string;
  lon: string;
}

interface Props {
  value: string;
  onChange: (value: string, location?: Location) => void;
  placeholder?: string;
  size?: 'small' | 'medium';
}

const LocationAutocomplete = ({ value, onChange, placeholder = "Enter location", size = 'small' }: Props) => {
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (value.length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=5`,
          {
            headers: {
              'Accept-Language': 'en-US,en;q=0.9',
            },
          }
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [value]);

  return (
    <div className={css`
      position: relative;
      width: 100%;
    `}>
      <TextField
        fullWidth
        size={size}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => {
          // Delay hiding suggestions to allow clicking them
          setTimeout(() => setShowSuggestions(false), 200);
        }}
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <Paper className={css`
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 1000;
          margin-top: 4px;
          max-height: 200px;
          overflow-y: auto;
        `}>
          <List>
            {suggestions.map((suggestion, index) => (
              <ListItem
                key={index}
                button
                onClick={() => {
                  onChange(suggestion.display_name, suggestion);
                  setShowSuggestions(false);
                }}
                className={css`
                  padding: 8px 16px;
                  &:hover {
                    background-color: #f5f5f5;
                  }
                `}
              >
                {suggestion.display_name}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default LocationAutocomplete;
