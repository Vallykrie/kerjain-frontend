export interface NewsItem {
  id: number;
  title: string;
  imageUrl: string;
  source: string;
  date: string;
}

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface Story {
  id: number;
  name: string;
  age: number;
  position: string;
  company: string;
  image: string;
  quote: string;
}
