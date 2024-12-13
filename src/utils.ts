import { summary } from "motion/react-client";

export const getFormattedDate = (targetDate: Date): string => {
  const year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  const paddedMonth = month < 10 ? `0${month}` : String(month);
  const paddedDate = date < 10 ? `0${date}` : String(date);

  return `${year}-${paddedMonth}-${paddedDate}`;
};

export const frontendData = [
  {
    imgPath: "/img/icons/nextjs.png",
    name: "Next.js",
  },
  {
    imgPath: "/img/icons/typescript.png",
    name: "Typescript",
  },
  {
    imgPath: "/img/icons/react.png",
    name: "React",
  },
  {
    imgPath: "/img/icons/redux.png",
    name: "Redux",
  },
  {
    imgPath: "/img/icons/axios.png",
    name: "Axios",
  },
  {
    imgPath: "/img/icons/recoil.png",
    name: "Recoil",
  },
  {
    imgPath: "/img/icons/reactquery.png",
    name: "React Query",
  },
  {
    imgPath: "/img/icons/reactrouter.png",
    name: "React Router",
  },
  {
    imgPath: "/img/icons/styledcomponent.png",
    name: "Styled Component",
  },
  {
    imgPath: "/img/icons/javascript.png",
    name: "Javascript",
  },
];

export const backendData = [
  {
    imgPath: "/img/icons/nodejs.png",
    name: "Node.js",
  },
  {
    imgPath: "/img/icons/expressjs.png",
    name: "Express.js",
  },
  {
    imgPath: "/img/icons/prisma.png",
    name: "Prisma",
  },
  {
    imgPath: "/img/icons/supabase.png",
    name: "Supabase",
  },
];

export const databaseData = [
  {
    imgPath: "/img/icons/firebase.png",
    name: "Firebase",
  },
  {
    imgPath: "/img/icons/graphql.png",
    name: "GraphQL",
  },
  {
    imgPath: "/img/icons/apolloserver.png",
    name: "Apollo Server",
  },
  {
    imgPath: "/img/icons/netlify.png",
    name: "Netlify",
  },
];

export const projectData = [
  {
    id: 0,
    logoPath: "/img/work/logo/instagram_logo.svg",
    name: "INSTAGRAM",
    category: "TEAM PROJECT",
    date: "2024/09 - 2024/10",
    platform: "SNS 플랫폼",
    assignment: "상세페이지 + 마이프로필",
    summary:
      "Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum.Bibendum a imperdiet tortor purus dolor id. Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum ",
    barcode: "INSTAGRAM",
    skillStack: ["React", "Firebase", "React-Router-Dom"],
  },
  {
    id: 1,
    logoPath: "/img/work/logo/aurora_logo.svg",
    name: "AURORA",
    category: "TEAM PROJECT",
    date: "2024/09 - 2024/10",
    platform: "SNS 플랫폼",
    assignment: "상세페이지 + 마이프로필",
    summary:
      "Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum .Bibendum a imperdiet tortor purus dolor id. Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum ",
    barcode: "AURORA",
    skillStack: ["React", "Firebase", "React-Router-Dom"],
  },
  {
    id: 2,
    logoPath: "/img/work/logo/joongonara_logo.svg",
    name: "JOONGONARA",
    category: "TEAM PROJECT",
    date: "2024/09 - 2024/10",
    platform: "SNS 플랫폼",
    assignment: "상세페이지 + 마이프로필",
    summary:
      "Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum .Bibendum a imperdiet tortor purus dolor id. Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum ",
    barcode: "JOONGONARA",
    skillStack: ["React", "Firebase", "React-Router-Dom"],
  },
  {
    id: 3,
    logoPath: "/img/work/logo/rrl_logo.svg",
    name: "RRL",
    category: "PERSONAL PROJECT",
    date: "2024/09 - 2024/10",
    platform: "SNS 플랫폼",
    assignment: "상세페이지 + 마이프로필",
    summary:
      "Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum .Bibendum a imperdiet tortor purus dolor id. Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum ",
    barcode: "DOUBLERL",
    skillStack: ["React", "Firebase", "React-Router-Dom"],
  },
  {
    id: 4,
    logoPath: "/img/work/logo/instagram_logo.svg",
    name: "KILLBILL",
    category: "PERSONAL PROJECT",
    date: "2024/09 - 2024/10",
    platform: "SNS 플랫폼",
    assignment: "상세페이지 + 마이프로필",
    summary:
      "Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum .Bibendum a imperdiet tortor purus dolor id. Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum ",
    barcode: "KILLBILL",
    skillStack: ["React", "Firebase", "React-Router-Dom"],
  },
  {
    id: 5,
    logoPath: "/img/work/logo/instagram_logo.svg",
    name: "PROJECT",
    category: "PERSONAL PROJECT",
    date: "2024/09 - 2024/10",
    platform: "SNS 플랫폼",
    assignment: "상세페이지 + 마이프로필",
    summary:
      "Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum .Bibendum a imperdiet tortor purus dolor id. Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum ",
    barcode: "PROJECT",
    skillStack: ["React", "Firebase", "React-Router-Dom"],
  },
  {
    id: 6,
    logoPath: "/img/work/logo/instagram_logo.svg",
    name: "PROJECT ",
    category: "PERSONAL PROJECT",
    date: "2024/09 - 2024/10",
    platform: "SNS 플랫폼",
    assignment: "상세페이지 + 마이프로필",
    summary:
      "Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum .Bibendum a imperdiet tortor purus dolor id. Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum ",
    barcode: "PROJECT ",
    skillStack: ["React", "Firebase", "React-Router-Dom"],
  },
  {
    id: 7,
    logoPath: "/img/work/logo/instagram_logo.svg",
    name: "PROJECT",
    category: "PERSONAL PROJECT",
    date: "2024/09 - 2024/10",
    platform: "SNS 플랫폼",
    assignment: "상세페이지 + 마이프로필",
    summary:
      "Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum .Bibendum a imperdiet tortor purus dolor id. Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum ",
    barcode: "PROJECT",
    skillStack: ["React", "Firebase", "React-Router-Dom"],
  },
  {
    id: 8,
    logoPath: "/img/work/logo/instagram_logo.svg",
    name: "PROJECT",
    category: "PERSONAL PROJECT",
    date: "2024/09 - 2024/10",
    platform: "SNS 플랫폼",
    assignment: "상세페이지 + 마이프로필",
    summary:
      "Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum .Bibendum a imperdiet tortor purus dolor id. Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum ",
    barcode: "PROJECT",
    skillStack: ["React", "Firebase", "React-Router-Dom"],
  },
  {
    id: 9,
    logoPath: "/img/work/logo/instagram_logo.svg",
    name: "PROJECT",
    category: "PERSONAL PROJECT",
    date: "2024/09 - 2024/10",
    platform: "SNS 플랫폼",
    assignment: "상세페이지 + 마이프로필",
    summary:
      "Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum .Bibendum a imperdiet tortor purus dolor id. Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum ",
    barcode: "PROJECT",
    skillStack: ["React", "Firebase", "React-Router-Dom"],
  },
  {
    id: 10,
    logoPath: "/img/work/logo/instagram_logo.svg",
    name: "PROJECT",
    category: "PERSONAL PROJECT",
    date: "2024/09 - 2024/10",
    platform: "SNS 플랫폼",
    assignment: "상세페이지 + 마이프로필",
    summary:
      "Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum .Bibendum a imperdiet tortor purus dolor id. Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum ",
    barcode: "PROJECT",
    skillStack: ["React", "Firebase", "React-Router-Dom"],
  },
  {
    id: 11,
    logoPath: "/img/work/logo/instagram_logo.svg",
    name: "PROJECT",
    category: "PERSONAL PROJECT",
    date: "2024/09 - 2024/10",
    platform: "SNS 플랫폼",
    assignment: "상세페이지 + 마이프로필",
    summary:
      "Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum .Bibendum a imperdiet tortor purus dolor id. Lorem ipsum dolor sit amet consectetur. ipsum dolor sit amet consectetur Mi vulputateametvulputate interdum ",
    barcode: "PROJECT",
    skillStack: ["React", "Firebase", "React-Router-Dom"],
  },
];
