import type { NextPage } from "next";
import { css } from "@emotion/css";
import events from "../data/events.json";
import { format, parseISO, isAfter, isBefore, isToday, isThisWeek, isThisMonth, isThisYear, startOfQuarter, endOfQuarter, endOfYear, addYears } from "date-fns";
import { useState, useMemo } from "react";
import { 
  TextField, 
  Select, 
  MenuItem, 
  InputLabel, 
  OutlinedInput,
  FormControl
} from "@mui/material";

export type EventsListType = {
  className?: string;
};

const EventCard = ({ event }: { event: { date: string; name: string; location: string; link: string; image: string } }) => {
  const eventDate = parseISO(event.date);
  const day = format(eventDate, "dd");
  const month = format(eventDate, "MMM").toUpperCase();

  return (
    <div
      className={css`
        flex: 1;
        min-width: calc(33.33% - 1rem);
        max-width: calc(33.33% - 1rem);
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
        @media screen and (max-width: 1050px) {
          min-width: calc(50% - 1rem);
          max-width: calc(50% - 1rem);
        }
        @media screen and (max-width: 768px) {
          min-width: 100%;
          max-width: 100%;
        }
      `}
    >
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
              <div
                className={css`
                  background-color: var(--color-lemonchiffon);
                  color: var(--color-gold-100);
                  border-radius: var(--br-7xs);
                  padding: var(--padding-6xs-5) var(--padding-6xs);
                  font-weight: 600;
                `}
              >
                All Day
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

const EventsList: NextPage<EventsListType> = ({ className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");

  const filteredEvents = useMemo(() => {
    return events
      .filter(event => {
        const eventDate = parseISO(event.date);
        const now = new Date();

        // Apply search filter
        const searchMatch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.description.toLowerCase().includes(searchTerm.toLowerCase());

        // Apply location filter
        const locationMatch = selectedLocation === "" || event.location === selectedLocation;

        // Apply time filter
        let timeMatch = true;
        switch (timeFilter) {
          case "past":
            timeMatch = isBefore(eventDate, now);
            break;
          case "today":
            timeMatch = isToday(eventDate);
            break;
          case "thisWeek":
            timeMatch = isThisWeek(eventDate);
            break;
          case "thisMonth":
            timeMatch = isThisMonth(eventDate);
            break;
          case "thisQuarter":
            const quarterStart = startOfQuarter(now);
            const quarterEnd = endOfQuarter(now);
            timeMatch = isAfter(eventDate, quarterStart) && isBefore(eventDate, quarterEnd);
            break;
          case "thisYear":
            timeMatch = isThisYear(eventDate);
            break;
          case "nextYear":
            timeMatch = isAfter(eventDate, endOfYear(now)) && isBefore(eventDate, endOfYear(addYears(now, 1)));
            break;
          default:
            timeMatch = true;
        }

        return searchMatch && locationMatch && timeMatch;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [searchTerm, selectedLocation, timeFilter]);

  const locations = useMemo(() => {
    return Array.from(new Set(events.map(event => event.location))).sort();
  }, []);

  const getCounts = useMemo(() => {
    const now = new Date();
    const counts = {
      all: events.length,
      past: 0,
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
      thisQuarter: 0,
      thisYear: 0,
      nextYear: 0
    };

    events.forEach(event => {
      const eventDate = parseISO(event.date);
      if (isBefore(eventDate, now)) counts.past++;
      if (isToday(eventDate)) counts.today++;
      if (isThisWeek(eventDate)) counts.thisWeek++;
      if (isThisMonth(eventDate)) counts.thisMonth++;
      if (isAfter(eventDate, startOfQuarter(now)) && isBefore(eventDate, endOfQuarter(now))) counts.thisQuarter++;
      if (isThisYear(eventDate)) counts.thisYear++;
      if (isAfter(eventDate, endOfYear(now)) && isBefore(eventDate, endOfYear(addYears(now, 1)))) counts.nextYear++;
    });

    return counts;
  }, []);

  return (
    <div className={className} id="events-list">
      <div className={css`
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin-bottom: 2rem;
        align-items: center;
        width: 100%;
        @media (max-width: 768px) {
          flex-wrap: wrap;
        }
      `}>
        <TextField
          style={{ flex: '1 1 auto' }}
          variant="outlined"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <img
                width="16px"
                height="16px"
                src="/search.svg"
                style={{ marginRight: "8px" }}
              />
            ),
          }}
        />
        <div className={css`
          display: flex;
          gap: 1rem;
          flex: 0 0 auto;
          @media (max-width: 768px) {
            width: 100%;
          }
        `}>
          <FormControl style={{ width: '150px' }}> 
            <InputLabel>Location</InputLabel>
            <Select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value as string)}
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
          <FormControl style={{ width: '150px' }}>
            <InputLabel>Time</InputLabel>
            <Select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as string)}
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
              {Object.entries(getCounts).map(([key, count]) => (
                count > 0 && (
                  <MenuItem key={key} value={key}>
                    {key === 'all' ? 'All Events' : 
                     key === 'past' ? 'Past Events' :
                     key.charAt(0).toUpperCase() + key.slice(1)} ({count})
                  </MenuItem>
                )
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      {filteredEvents.length > 0 ? (
        <div className={css`
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: flex-start;
          width: 100%;
        `}>
          {filteredEvents.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      ) : (
        <h3 className={css`
          text-align: center;
          width: 100%;
          margin-top: 2rem;
          color: var(--color-gray-500);
        `}>
          No events found
        </h3>
      )}
    </div>
  );
};

export default EventsList;