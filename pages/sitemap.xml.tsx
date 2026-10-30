import type { GetServerSideProps } from "next";
import communities from "../data/daos.json";

const base = "https://activity-dao-omega.vercel.app";
const escapeXml = (value: string) => value.replace(/[<>&"']/g, char =>
  ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" }[char] || char)
);

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const paths = [
    "/", "/handbook", "/daos", "/events",
    ...communities.filter(dao => dao.id).map(dao => `/dao/${encodeURIComponent(dao.id)}`),
  ];
  const urls = Array.from(new Set(paths))
    .map(path => `  <url><loc>${escapeXml(base + path)}</loc></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
  res.end(xml);
  return { props: {} };
};
const Sitemap = () => null;
export default Sitemap;
