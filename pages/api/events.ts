import type { NextApiRequest, NextApiResponse } from "next";
import type { Event } from "../../types/event";

type SolaEvent = {
  id?: string | number;
  title?: string;
  start_time?: string;
  location?: unknown;
  cover_url?: string | null;
  owner?: { username?: string | null } | null;
};
type ProviderResponse = {
  data?: { events?: SolaEvent[] };
  errors?: unknown[];
};
type ApiPayload = { events: Event[]; source: "sola" | "unavailable" };

const endpoint = "https://graph.sola.day/v1/graphql";
const query = `
  query FetchUpcomingEvents($currentTime: timestamp!, $oneYearLater: timestamp!) {
    events(
      where: {
        display: {_neq: "private"},
        start_time: {_gte: $currentTime, _lte: $oneYearLater},
        status: {_in: ["open", "new", "normal"]}
      },
      order_by: {start_time: asc},
      limit: 100
    ) {
      id
      title
      start_time
      location
      cover_url
      owner { username }
    }
  }
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiPayload | { error: string }>) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  try {
    const now = new Date();
    const nextYear = new Date(now);
    nextYear.setUTCFullYear(now.getUTCFullYear() + 1);
    const response = await fetch(endpoint, {
      method: "POST",
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: {
          currentTime: now.toISOString().split(".")[0] + "Z",
          oneYearLater: nextYear.toISOString().split(".")[0] + "Z",
        },
      }),
    });
    if (!response.ok) throw new Error("Provider unavailable");
    const data = (await response.json()) as ProviderResponse;
    if (!Array.isArray(data.data?.events) || data.errors?.length) throw new Error("Invalid provider response");

    const events: Event[] = data.data.events.flatMap(event => {
      if (!event.id || !event.title || !event.start_time) return [];
      const date = new Date(event.start_time);
      if (Number.isNaN(date.getTime())) return [];
      const username = typeof event.owner?.username === "string" ? event.owner.username : "Community organizer";
      const location = typeof event.location === "string" && event.location.trim()
        ? event.location : "Location not specified";
      return [{
        id: String(event.id),
        date: event.start_time,
        name: event.title,
        location,
        link: `https://app.sola.day/event/detail/${encodeURIComponent(String(event.id))}`,
        image: typeof event.cover_url === "string" && /^https:\/\//.test(event.cover_url)
          ? event.cover_url : "/activitymanicon.svg",
        dao: username,
        description: `Event by ${username}`,
      }];
    });
    return res.status(200).json({ events, source: "sola" });
  } catch {
    // A failed external provider must not block first-party event discovery.
    return res.status(200).json({ events: [], source: "unavailable" });
  } finally {
    clearTimeout(timeout);
  }
}
