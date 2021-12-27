import { NextSeo } from "next-seo";

export default function Meta({ pageMeta }) {
  const meta = {
    title: "Protean Industries",
    description: "Welcome to our blog",
    ...pageMeta,
  };
  const SEO = {
    title: meta.title,
    description: meta.description,

    openGraph: {
      title: meta.title,
      description: meta.description,
    },
  };
  return <NextSeo {...SEO} />;
}
