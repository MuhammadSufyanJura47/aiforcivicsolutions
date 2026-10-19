export type Sponsor = {
  image: string;
  name: string;
  type: string;
};

export const sponsors: Sponsor[] = [
  {
    image: "/images/sponsors/community-one.png",
    name: "Community One",
    type: "Gold Sponsor",
  },
  {
    image: "/images/sponsors/community-two.png",
    name: "Community Two",
    type: "Silver Sponsor",
  },
  {
    image: "/images/sponsors/community-three.png",
    name: "Community Three",
    type: "Community Partner",
  },
];
