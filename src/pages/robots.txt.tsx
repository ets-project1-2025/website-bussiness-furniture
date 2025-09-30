import { GetServerSideProps } from "next";

export default function RobotsTxt() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robotsTxt = `
User-agent: *
Allow: /

Sitemap: https://furniturekami.vercel.app/sitemap.xml
  `.trim();

  res.setHeader("Content-Type", "text/plain");
  res.write(robotsTxt);
  res.end();

  return {
    props: {},
  };
};