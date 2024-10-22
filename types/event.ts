export interface Event {
  date: string;
  name: string;
  location: string;
  link: string;
  image: string;
  dao: string;
  description: string;
  isFeatured?: boolean;
}

export interface EventLocation {
  city: string;
  lat: number;
  lng: number;
  events: Event[];
}
