export interface MetaSeo {
  title: string;
  description: string;
  image: string;
  keywords: string[];
  feed: string;
  ogUrl: string;
  author: {
    name: string;
  };
  social: Record<string, string>;
}
