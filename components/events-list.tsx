import React, { forwardRef, useImperativeHandle, Ref } from 'react';
import type { NextPage } from "next";
import { css } from "@emotion/css";
import staticEvents from "../data/events.json";
import { format, parseISO, isAfter, isBefore, isToday, isThisWeek, isThisMonth, isThisYear, startOfQuarter, endOfQuarter, endOfYear, addYears, isValid } from "date-fns";
import { useState, useMemo, useEffect } from "react";
import Component1 from "./featured-events";
import { 
  TextField, 
  Select, 
  MenuItem, 
  InputLabel, 
  OutlinedInput,
  FormControl,
  IconButton
} from "@mui/material";
import dynamic from 'next/dynamic';
import { Event, EventLocation } from '../types/event'; // Add this import

const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });
const curatedEvents: Event[] = staticEvents
  .filter(event => !Number.isNaN(new Date(event.date).getTime()))
  .map(event => ({ ...event, isFeatured: true })) as Event[];


// Add this type definition

// Add these custom icon components
const ViewListIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
  </svg>
);

const ViewModuleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"/>
  </svg>
);

export type EventsListType = {
  className?: string;
};

interface EventsListProps {
  mode: 'explore' | 'home';
  className?: string;
  hideHeader?: boolean;
  hideDescription?: boolean;
  daoMode?: string;
  interestMode?: string;
  eventsPerPage?: number;
}

const EventCard = ({ event }: { event: Event }) => {
  const eventDate = parseISO(event.date);
  const day = format(eventDate, "dd");
  const month = format(eventDate, "MMM").toUpperCase();

  return (
    <div
      id="event-query"
      className={css`
        flex: 1 0 100%;
        height: 22.875rem;
        border-radius: var(--br-3xl);
        background-color: var(--border-default-default);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        transition: box-shadow 0.3s ease;
        &:hover {
          box-shadow: 0 0 0 3px var(--color-gold-100);
        }
        @media screen and (min-width: 769px) {
          flex: 0 0 calc(50% - 0.5rem);
        }
        @media screen and (min-width: 1051px) {
          flex: 0 0 calc(33.33% - 0.67rem);
        }
        position: relative;
      `}
    >
      {event.isFeatured && (
        <div className={css`
          position: absolute;
          top: 10px;
          left: 10px;
          background-color: var(--color-gold-100);
          color: white;
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: bold;
          z-index: 1;
        `}>
          ⭐ Featured
        </div>
      )}
      <a
        href={event.link}
        target="_blank"
        rel="noopener noreferrer"
        className={css`
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          height: 100%;
        `}
      >
        <div
          className={css`
            flex: 1;
            background-image: url(${event.image});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: var(--padding-xl);
          `}
        >
          <div
            className={css`
              align-self: flex-end;
              background-color: var(--background-default-default);
              border-radius: var(--br-8xs);
              padding: var(--padding-8xs) var(--padding-4xs);
              text-align: center;
              width: 3.5rem;
              height: 3.5rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            `}
          >
            <b className={css`font-size: var(--font-size-9xl-4);`}>{day}</b>
            <b
              className={css`
                font-size: var(--font-size-xs-4);
                color: var(--color-mediumblue);
                font-family: var(--font-dm-sans);
              `}
            >
              {month}
            </b>
          </div>
          <div
            className={css`
              background-color: var(--background-default-default);
              border-radius: var(--br-3xs);
              padding: var(--padding-3xs-5) var(--padding-xs);
              font-family: var(--font-dynapuff);
            `}
          >
            <b className={css`
              font-size: var(--font-size-xl);
              text-align: left;
              display: block;
            `}>{event.name}</b>
            <div
              className={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: var(--gap-6xs);
                font-size: var(--font-size-base);
                color: var(--color-azure-47);
                font-family: var(--font-hanken-grotesk);
              `}
            >
              <div className={css`font-weight: 600;`}>{event.location}</div>
              {/* <div
                className={css`
                  background-color: var(--color-lemonchiffon);
                  color: var(--color-gold-100);
                  border-radius: var(--br-7xs);
                  padding: var(--padding-6xs-5) var(--padding-6xs);
                  font-weight: 600;
                `}
              >
                All Day
              </div> */}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

const ListEventCard = ({ event }: { event: Event }) => {
  const eventDate = parseISO(event.date);
  const day = format(eventDate, "dd");
  const month = format(eventDate, "MMM").toUpperCase();

  return (
    <a
      href={event.link}
      target="_blank"
      rel="noopener noreferrer"
      className={css`
        display: flex;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid var(--border-default-default);
        text-decoration: none;
        color: inherit;
        transition: box-shadow 0.3s ease;
        width: 100%;
        &:last-child {
          border-bottom: none;
        }
        &:hover {
          box-shadow: 0 0 0 3px var(--color-gold-100);
        }
        position: relative;
      `}
    >
      {event.isFeatured && (
        <div className={css`
          position: absolute;
          top: 10px;
          left: 10px;
          background-color: var(--color-gold-100);
          color: white;
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: bold;
          z-index: 1;
        `}>
          ⭐ Featured
        </div>
      )}
      <img
        src={event.image}
        alt={event.name}
        className={css`
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: var(--br-3xs);
          margin-right: 1rem;
        `}
      />
      <div
        className={css`
          flex: 1;
        `}
      >
        <h3
          className={css`
            margin: 0;
            font-size: var(--font-size-xl);
          `}
        >
          {event.name}
        </h3>
        <p
          className={css`
            margin: 0.25rem 0 0;
            color: var(--color-azure-47);
            font-size: 0.8rem;
            font-weight: 400;
          `}
        >
          {event.location}
        </p>
      </div>
      <div
        className={css`
          background-color: var(--background-default-default);
          border-radius: var(--br-8xs);
          padding: var(--padding-8xs) var(--padding-4xs);
          text-align: center;
          width: 3.5rem;
          height: 3.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 1px solid #000;
        `}
      >
        <b className={css`font-size: var(--font-size-9xl-4);`}>{day}</b>
        <b
          className={css`
            font-size: var(--font-size-xs-4);
            color: var(--color-mediumblue);
            font-family: var(--font-dm-sans);
          `}
        >
          {month}
        </b>
      </div>
    </a>
  );
};

// Add these functions at the top of your file
function checkDaoSimilarity(event: Event, mode: string): boolean {
  if (!mode) return true;
  const fields = [event.dao, event.name, event.description].filter((field): field is string => typeof field === 'string');
  return fields.some(field => 
    stringSimilarity(field.toLowerCase(), mode.toLowerCase()) >= 0.9
  );
}

function checkInterestSimilarity(event: Event, mode: string): boolean {
  if (!mode) return true;
  const fields = [event.dao, event.name, event.description].filter((field): field is string => typeof field === 'string');
  const modeWords = mode.toLowerCase().split(/\s+/);
  return fields.some(field => {
    const fieldWords = field.toLowerCase().split(/\s+/);
    return modeWords.some(modeWord => 
      fieldWords.some(fieldWord => 
        stringSimilarity(modeWord, fieldWord) >= 0.8
      )
    );
  });
}

// Add this function near the top of your file, alongside other utility functions
function stringSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  const longerLength = longer.length;
  if (longerLength === 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / longerLength;
}

function editDistance(s1: string, s2: string): number {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  const costs = new Array();
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) {
      costs[s2.length] = lastValue;
    }
  }
  return costs[s2.length];
}

// Define the GraphQL client
// Fetch through ActivityDAO's cacheable server adapter, not directly from Sola in the browser.
// Curated JSON renders on the first paint even when this provider is unavailable.
async function fetchUpcomingEvents(): Promise<Event[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch("/api/events", { signal: controller.signal });
    if (!response.ok) return [];
    const payload: { events?: Event[] } = await response.json();
    return Array.isArray(payload.events) ? payload.events : [];
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

const EventsList = forwardRef<EventsListReturnType, EventsListProps>((props, ref) => {
  const { 
    mode, 
    className = '', 
    hideHeader = false, 
    hideDescription = false, 
    daoMode,
    interestMode,
    eventsPerPage = 9 // Default to 9 events per page
  } = props;

  console.log("EventsList rendered with mode:", mode);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<EventLocation | null>(null);
  const [timeFilter, setTimeFilter] = useState("upcoming");
  const [viewMode, setViewMode] = useState<'gallery' | 'list'>('gallery');
  const [hasMatchingEvents, setHasMatchingEvents] = useState(true);
  const [events, setEvents] = useState<Event[]>(curatedEvents);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    location: null as EventLocation | null,
    time: "upcoming"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    hasMatchingEvents
  }));

  // Keep pagination consistent after changing any search or date filter.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedLocation, timeFilter, daoMode, interestMode]);

  useEffect(() => {
    console.log("useEffect triggered. Setting viewMode based on mode:", mode);
    setViewMode(mode === 'explore' ? 'list' : 'gallery');
  }, [mode]);

  useEffect(() => {
    console.log("Current viewMode:", viewMode);
  }, [viewMode]);

  useEffect(() => {
    console.log("Fetching events...");
    setError(null);
    fetchUpcomingEvents().then(fetchedEvents => {
  
      if (fetchedEvents.length === 0) {
        console.log("No events fetched");
      }
      // Combine fetched events with static events, marking static events as featured
      const combinedEvents = [
        ...curatedEvents,
        ...fetchedEvents
      ];
      setEvents(combinedEvents);
      setIsLoading(false);
    }).catch(err => {
      console.error("Error fetching events:", err);
      setError("Failed to load events. Please try again later.");
      setIsLoading(false);
    });
  }, []);

  const filteredEvents = useMemo(() => {

    
    const filtered = events
      .filter((event: Event) => {
        const daoMatch = !daoMode || checkDaoSimilarity(event, daoMode);
        const interestMatch = !interestMode || checkInterestSimilarity(event, interestMode);
        
        if (!daoMatch || !interestMatch) return false;

        // Apply search filter
        const searchMatch = 
          (event.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
          (event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

        // Apply location filter
        const locationMatch = selectedLocation === null || event.location === selectedLocation.city;

        return searchMatch && locationMatch;
      });

    // Separate featured and non-featured events
    const featuredEvents = filtered.filter(event => event.isFeatured);
    const nonFeaturedEvents = filtered.filter(event => !event.isFeatured);

    // Sort only non-featured events
    nonFeaturedEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Combine featured events (unsorted) with sorted non-featured events
    return [...featuredEvents, ...nonFeaturedEvents];
  }, [events, searchTerm, selectedLocation, daoMode, interestMode]);

  const getCounts = useMemo(() => {
    const now = new Date();
    const counts = {
      all: filteredEvents.length,
      upcoming: 0,
      past: 0,
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
      thisQuarter: 0,
      thisYear: 0,
      nextYear: 0
    };

    filteredEvents.forEach(event => {
      const eventDate = parseISO(event.date);
      if (isAfter(eventDate, now) || isToday(eventDate)) counts.upcoming++;
      if (isBefore(eventDate, now)) counts.past++;
      if (isToday(eventDate)) counts.today++;
      if (isThisWeek(eventDate)) counts.thisWeek++;
      if (isThisMonth(eventDate)) counts.thisMonth++;
      if (isAfter(eventDate, startOfQuarter(now)) && isBefore(eventDate, endOfQuarter(now))) counts.thisQuarter++;
      if (isThisYear(eventDate)) counts.thisYear++;
      if (isAfter(eventDate, endOfYear(now)) && isBefore(eventDate, endOfYear(addYears(now, 1)))) counts.nextYear++;
    });

    return counts;
  }, [filteredEvents]);

  const timeFilteredEvents = useMemo(() => {
    return filteredEvents.filter((event: Event) => {
      const eventDate = parseISO(event.date);
      if (!isValid(eventDate)) return false;
      const now = new Date();

      switch (timeFilter) {
        case 'upcoming':
          return isAfter(eventDate, now) || isToday(eventDate);
        case 'past':
          return isBefore(eventDate, now);
        case 'today':
          return isToday(eventDate);
        case 'thisWeek':
          return isThisWeek(eventDate);
        case 'thisMonth':
          return isThisMonth(eventDate);
        case 'thisQuarter':
          return isAfter(eventDate, startOfQuarter(now)) && isBefore(eventDate, endOfQuarter(now));
        case 'thisYear':
          return isThisYear(eventDate);
        case 'nextYear':
          return isAfter(eventDate, endOfYear(now)) && isBefore(eventDate, endOfYear(addYears(now, 1)));
        case 'all':
        default:
          return true;
      }
    });
  }, [filteredEvents, timeFilter]);

  useEffect(() => {
    setHasMatchingEvents(timeFilteredEvents.length > 0);
  }, [timeFilteredEvents]);

  const locations = useMemo(() => {
    const filteredLocations = filteredEvents.map(event => event.location);
    return Array.from(new Set(filteredLocations)).sort();
  }, [filteredEvents]);

  const pageSize = Math.max(1, eventsPerPage);
  const totalPages = Math.max(1, Math.ceil(timeFilteredEvents.length / pageSize));
  const displayedPage = Math.min(currentPage, totalPages);
  const paginatedEvents = useMemo(() => {
    const startIndex = (displayedPage - 1) * pageSize;
    return timeFilteredEvents.slice(startIndex, startIndex + pageSize);
  }, [timeFilteredEvents, displayedPage, pageSize]);

  const groupedEvents = useMemo(() => {
    const groups: { [key: string]: EventLocation } = {};
    timeFilteredEvents.forEach(event => {
      if (!groups[event.location]) {
        groups[event.location] = {
          city: event.location,
          lat: 0, // You'll need to add latitude data to your events
          lng: 0, // You'll need to add longitude data to your events
          events: []
        };
      }
      groups[event.location].events.push(event);
    });
    return Object.values(groups);
  }, [timeFilteredEvents]);

  const clearFilters = () => {
    setFilters({
      search: "",
      location: null,
      time: "upcoming"
    });
    setSearchTerm("");
    setSelectedLocation(null);
    setTimeFilter("upcoming");
  };

  return (
    <div className={css`
      width: 100%;
      max-width: 100%;
    `}>
      {!hideHeader && (
        <div id="events"
          className={[
            css`
              align-self: stretch;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
              gap: var(--gap-3xs);
              text-align: center;
              font-size: var(--font-size-21xl);
              color: var(--wwwgetminjiapp-black);
              font-family: var(--font-dynapuff);
              width: 100%;
            `,
            className,
          ].join(" ")}
        >
          {mode === 'home' && (
            <div
              className={css`
                align-self: stretch;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                justify-content: flex-start;
                padding: 0 1rem;
                box-sizing: border-box;
                width: 100%;
              `}
            >
              <Component1 developmentIcon="FEATURED EVENTS" />
            </div>
          )}
          <h1
            className={css`
              margin: 0;
              align-self: stretch;
              position: relative;
              font-size: inherit;
              line-height: 3.844rem;
              font-weight: 600;
              font-family: inherit;
              width: 100%;
              @media screen and (max-width: 1050px) {
                font-size: var(--font-size-13xl);
                line-height: 3.063rem;
              }
              @media screen and (max-width: 450px) {
                font-size: var(--font-size-5xl);
                line-height: 2.313rem;
              }
            `}
          >
            Find an Event 🎉
          </h1>
          {!hideDescription && (
            <h3
              className={css`
                margin: 0;
                align-self: stretch;
                position: relative;
                font-size: var(--font-size-5xl);
                line-height: 2.469rem;
                font-weight: 400;
                font-family: var(--font-hanken-grotesk);
                @media screen and (max-width: 450px) {
                  font-size: var(--font-size-lgi);
                  line-height: 2rem;
                }
              `}
            >
              Check out upcoming activity based events!
            </h3>
          )}
        </div>
      )}

      <div className={css`
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box;
        padding: ${mode === "explore" ? "clamp(0.75rem, 3vw, 2rem)" : "clamp(0.5rem, 2vw, 1rem)"};
      `} id="events-list">
        <div className={css`
          display: flex;
          flex-direction: row;
          gap: 1rem;
          margin-bottom: 2rem;
          align-items: center;
          width: 100%;
          flex-wrap: wrap;
        `}>
          <TextField
            style={{ flex: '1 1 240px', minWidth: 0 }}
            variant="outlined"
            label="Search events"
            placeholder="Event name or description"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setFilters(prev => ({ ...prev, search: e.target.value }));
            }}
            InputProps={{
              startAdornment: (
                <img
                  width="16px"
                  height="16px"
                  src="/search.svg"
                  alt=""
                  aria-hidden="true"
                  style={{ marginRight: "8px" }}
                />
              ),
            }}
          />
          <div className={css`
            display: flex;
            gap: 1rem;
            flex: 1 1 340px;
            flex-wrap: wrap;
            min-width: 0;
            align-items: center;
            @media (max-width: 768px) {
              width: 100%;
            }
          `}>
            <FormControl style={{ flex: '1 1 140px', minWidth: 0 }}>
              <InputLabel id="event-location-label">Location</InputLabel>
              <Select
                labelId="event-location-label"
                id="event-location-filter"
                value={selectedLocation?.city || ''}
                onChange={(e) => {
                  const newLocation = locations.find(location => location === e.target.value)
                    ? { city: e.target.value, lat: 0, lng: 0, events: [] }
                    : null;
                  setSelectedLocation(newLocation);
                  setFilters(prev => ({ ...prev, location: newLocation }));
                }}
                input={<OutlinedInput label="Location" />}
                MenuProps={{
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
                }}
              >
                <MenuItem value="">All Locations</MenuItem>
                {locations.map((location) => (
                  <MenuItem key={location} value={location}>{location}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl style={{ flex: '1 1 140px', minWidth: 0 }}>
              <InputLabel id="event-time-label">Time</InputLabel>
              <Select
                labelId="event-time-label"
                id="event-time-filter"
                value={timeFilter}
                onChange={(e) => {
                  setTimeFilter(e.target.value as string);
                  setFilters(prev => ({ ...prev, time: e.target.value as string }));
                }}
                input={<OutlinedInput label="Time" />}
                MenuProps={{
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
                }}
              >
                <MenuItem value="upcoming">Upcoming Events ({getCounts.upcoming})</MenuItem>
                <MenuItem value="all">All Events ({getCounts.all})</MenuItem>
                <MenuItem value="past">Past Events ({getCounts.past})</MenuItem>
                {Object.entries(getCounts).map(([key, count]) => (
                  count > 0 && key !== 'upcoming' && key !== 'all' && key !== 'past' && (
                    <MenuItem key={key} value={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)} ({count})
                    </MenuItem>
                  )
                ))}
              </Select>
            </FormControl>
            <IconButton
              title="Gallery view"
              aria-label="Gallery view"
              aria-pressed={viewMode === 'gallery'}
              color={viewMode === 'gallery' ? 'primary' : 'default'}
              onClick={() => setViewMode('gallery')}
              sx={{ minWidth: 44, minHeight: 44 }}>
              <ViewModuleIcon />
            </IconButton>
            <IconButton
              title="List view"
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
              color={viewMode === 'list' ? 'primary' : 'default'}
              onClick={() => setViewMode('list')}
              sx={{ minWidth: 44, minHeight: 44 }}>
              <ViewListIcon />
            </IconButton>
          </div>
        </div>
        {isLoading ? (
          <div>Loading events...</div>
        ) : error ? (
          <div>{error}</div>
        ) : hasMatchingEvents ? (
          <div className={css`
            width: 100%;
            max-width: 100%;
            padding-top: 2rem;
          `}>
            {viewMode === 'gallery' ? (
              <div className={css`
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                justify-content: flex-start;
                width: 100%;
              `}>
                {paginatedEvents.map((event, index) => (
                  <EventCard key={event.id || `${event.name}-${event.date}`} event={event} />
                ))}
              </div>
            ) : (
              <div className={css`
                display: flex;
                flex-direction: column;
                width: 100%;
              `}>
                {paginatedEvents.map((event, index) => (
                  <ListEventCard key={event.id || `${event.name}-${event.date}`} event={event} />
                ))}
              </div>
            )}
            
            {/* Pagination controls */}
            {totalPages > 1 && <nav aria-label="Event results pagination" className={css`
              display:flex;align-items:center;justify-content:center;flex-wrap:wrap;
              gap:12px;margin-top:24px;font-family:var(--font-hanken-grotesk);
            `}>
              <button type="button"
                className={css`min-height:44px;padding:9px 18px;border:1px solid currentColor;
                  border-radius:24px;background:transparent;cursor:pointer;
                  &:disabled { opacity:.4;cursor:not-allowed; }
                  &:focus-visible { outline:3px solid #a47b08;outline-offset:2px; }`}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={displayedPage === 1}>Previous</button>
              <span aria-live="polite">Page {displayedPage} of {totalPages}</span>
              <button type="button"
                className={css`min-height:44px;padding:9px 18px;border:1px solid currentColor;
                  border-radius:24px;background:transparent;cursor:pointer;
                  &:disabled { opacity:.4;cursor:not-allowed; }
                  &:focus-visible { outline:3px solid #a47b08;outline-offset:2px; }`}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={displayedPage === totalPages}>Next</button>
            </nav>}

          </div>
        ) : (
          <div role="status" className={css`
            text-align:center;width:100%;margin-top:24px;padding:26px 16px;
            border:1px solid #e6ddbd;border-radius:16px;background:#fffdf5;
            color:#3b3526;font-family:var(--font-hanken-grotesk);
          `}>
            <h3 className={css`font-size:22px;line-height:1.3;margin:0 0 12px;color:#27241d`}>
              No matching events
            </h3>
            <p className={css`line-height:1.6;margin:0 0 18px`}>
              {daoMode || interestMode
                ? `No events found for ${daoMode || interestMode}. Try a different filter or explore other communities.`
                : "No events match your filters. Try another date, location, or keyword."}
            </p>
            {daoMode || interestMode ? (
              <a href="/events" className={css`
                display:inline-flex;align-items:center;min-height:44px;
                padding:10px 20px;background:#facc15;color:#171717;text-decoration:none;
                border-radius:24px;font-weight:700;
                &:focus-visible {outline:3px solid #715513;outline-offset:3px;}
              `}>Browse all events</a>
            ) : (
              <button type="button" onClick={clearFilters}
                className={css`min-height:44px;padding:10px 20px;background:#facc15;border:0;
                  border-radius:24px;font-weight:700;cursor:pointer;color:#171717;
                  &:focus-visible {outline:3px solid #715513;outline-offset:3px;}`}>
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

const EventsListComponent = EventsList as typeof EventsList & {
  checkForEvents: (daoName: string) => Promise<boolean>;
};

EventsListComponent.checkForEvents = async (daoName: string): Promise<boolean> => {
  const fetchedEvents = await fetchUpcomingEvents();
  const allEvents = [...fetchedEvents, ...curatedEvents.filter(event => new Date(event.date).getTime() >= Date.now() - 86400000)];
  
  return allEvents.some(event => 
    checkDaoSimilarity(event, daoName) || checkInterestSimilarity(event, daoName)
  );
};

// Add this to the return type of the component
export type EventsListReturnType = {
  hasMatchingEvents: boolean;
};

export default EventsListComponent;
