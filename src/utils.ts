export const getFormattedDate = (targetDate: Date): string => {
  const year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  const paddedMonth = month < 10 ? `0${month}` : String(month);
  const paddedDate = date < 10 ? `0${date}` : String(date);

  return `${year}-${paddedMonth}-${paddedDate}`;
};

export const getFormattedTime = (targetTime: Date): string => {
  const hours = targetTime.getHours();
  const minutes = targetTime.getMinutes();

  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 === 0 ? 12 : hours % 12;

  const paddedHours = hours12 < 10 ? `${hours12}` : String(hours12);
  const paddedMinutes = minutes < 10 ? `0${minutes}` : String(minutes);

  return `${paddedHours}:${paddedMinutes} ${period}`;
};

export const frontendData = [
  {
    id: 1,
    imgPath: "/img/icons/nextjs.png",
    name: "Next.js",
  },
  {
    id: 2,
    imgPath: "/img/icons/typescript.png",
    name: "Typescript",
  },
  {
    id: 3,
    imgPath: "/img/icons/react.png",
    name: "React",
  },
  {
    id: 4,
    imgPath: "/img/icons/redux.png",
    name: "Redux",
  },
  {
    id: 5,
    imgPath: "/img/icons/axios.png",
    name: "Axios",
  },
  {
    id: 6,
    imgPath: "/img/icons/recoil.png",
    name: "Recoil",
  },
  {
    id: 7,
    imgPath: "/img/icons/reactquery.png",
    name: "React Query",
  },
  {
    id: 8,
    imgPath: "/img/icons/reactrouter.png",
    name: "React Router",
  },
  {
    id: 9,
    imgPath: "/img/icons/styledcomponent.png",
    name: "Styled Component",
  },
  {
    id: 10,
    imgPath: "/img/icons/javascript.png",
    name: "Javascript",
  },
];

export const backendData = [
  {
    id: 1,
    imgPath: "/img/icons/nodejs.png",
    name: "Node.js",
  },
  {
    id: 2,
    imgPath: "/img/icons/expressjs.png",
    name: "Express.js",
  },
  {
    id: 3,
    imgPath: "/img/icons/prisma.png",
    name: "Prisma",
  },
  {
    id: 4,
    imgPath: "/img/icons/supabase.png",
    name: "Supabase",
  },
  {
    id: 5,
    imgPath: "/img/icons/graphql.png",
    name: "GraphQL",
  },
  {
    id: 6,
    imgPath: "/img/icons/apolloserver.png",
    name: "Apollo Server",
  },
];

export const deploymentData = [
  {
    id: 1,
    imgPath: "/img/icons/firebase.png",
    name: "Firebase",
  },
  {
    id: 2,
    imgPath: "/img/icons/netlify.png",
    name: "Netlify",
  },
  {
    id: 3,
    imgPath: "/img/icons/vercel.png",
    name: "Vercel",
  },
];

export const utilitiesData = [
  {
    id: 1,
    imgPath: "/img/icons/git.png",
    name: "Git",
  },
  {
    id: 2,
    imgPath: "/img/icons/github.png",
    name: "Github",
  },
  {
    id: 3,
    imgPath: "/img/icons/figma.png",
    name: "Figma",
  },
  {
    id: 4,
    imgPath: "/img/icons/slack.png",
    name: "Slack",
  },
];

export const projectData = [
  {
    id: 0,
    logoPath: "/img/work/logo/instagram_logo.svg",
    pagePath: "/img/work/page/instagram.jpeg",
    videoPath: "/video/instagram.mp4",
    urlPath: "https://ytg-instagram-5th.web.app",
    name: "INSTAGRAM",
    category: "TEAM PROJECT",
    date: "2024.09-2024.10",
    platform: "SNS Platform",
    assignment: "Detail + MyProfile",
    summary:
      "React.js를 사용하여 프로필 및 피드 구성, 게시물 업로드 및 관리, 실시간 상호작용(댓글 달기/게시물 업로드), 사용자 인증(회원가입/로그인)와 같은 C.R.U.D기능을 구현한 인스타그램 클론 코딩 웹 사이트.",
    barcode: "INSTAGRAM",
    skillStack: ["React", "Firebase", "React-Router-Dom"],
  },
  {
    id: 1,
    logoPath: "/img/work/logo/aurora_logo.svg",
    pagePath: "/img/work/page/auroraplus.jpg",
    videoPath: "/video/auroraplus.mp4",
    urlPath: "https://auroraplus-3fc8e.web.app",
    name: "AURORA",
    category: "TEAM PROJECT",
    date: "2024.11-2024.12",
    platform: "OTT Platform",
    assignment: "Main",
    summary:
      "Typescript를 사용하여 서비스 소개하는 랜딩 페이지 구성, 사용자 인증(로그인), 해당 컨텐츠 트레일러 제공,데이터 필터링(추천순, 장르)을 통한 검색 기능을 구현한 디지니플러스 클론 코딩 웹 사이트",
    barcode: "AURORA",
    skillStack: ["Typescript", "Recoil", "React-Query"],
  },
  {
    id: 2,
    logoPath: "/img/work/logo/joongonara_logo.svg",
    pagePath: "/img/work/page/joonggonara.jpg",
    videoPath: "/video/joonggonanara.mp4",
    urlPath: "https://junggonara-8874f.web.app/",
    name: "JOONGONARA",
    category: "TEAM PROJECT",
    date: "2024.08 - 2024.9",
    platform: "E-Commerce",
    assignment: "Detail + Header",
    summary:
      "Javascript를 사용하여 사용자 인증(로그인/회원가입), 장바구니 기능(LocalStorage), 구매 및 결제창 구현, 매물 위치 제공(카카오맵 API),최근 검색어 저장 기능을 구현한 중고나라 클론 코딩 웹 사이트",
    barcode: "JOONGONARA",
    skillStack: ["Javascript", "Scss", "Html"],
  },
  {
    id: 3,
    logoPath: "/img/work/logo/killbill.png",
    pagePath: "/img/work/page/killbill.jpg",
    videoPath: "/video/killbill.mp4",
    urlPath: "https://killbill-4412b.web.app/",
    name: "KILLBILL",
    category: "PERSONAL PROJECT",
    date: "2024.08",
    platform: "Movie Review",
    assignment: "Main + Review + OST",
    summary:
      "Javascript를 사용하여 영화 트레일러 및 소개 페이지 구현, 관람객 평점 및 리뷰 작성/저장 기능(LocalStorage), 영화 OST 사운드 트랙 제공 기능을 구현한 KILL BLL 웹 사이트",
    barcode: "KILLBILL",
    skillStack: ["Javascript", "Scss", "Html"],
  },
  {
    id: 4,
    logoPath: "/img/work/logo/rrl_logo.svg",
    pagePath: "/img/work/page/rrl.jpg",
    videoPath: "/video/rrl.mp4",
    urlPath: "https://double-rl.web.app",
    name: "RRL",
    category: "PERSONAL PROJECT",
    date: "2024.07",
    platform: "Shopping mall",
    assignment: "Main",
    summary:
      "Javascript를 사용하여 근처 매장 위치 제공(카카오맵 API), 룩북 컬렌션 UI구현, 리미티드 아이템 슬라이더 구현(Slick)을 구현한 DoubleRL 웹 사이트",
    barcode: "DOUBLERL",
    skillStack: ["Javascript", "Scss", "Html"],
  },
];
