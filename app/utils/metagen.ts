import type { MetaBasicInfo } from "~/utils/meta-constants";

const getCanonicalUrl = (urlSuffix: string): string => {
  return "https://merelaager.ee" + urlSuffix + "/";
};

const genOpenGraph = (
  basicInfo: MetaBasicInfo,
  canonicalUrl: string
): object[] => {
  return [
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:site_name",
      content: "Laoküla merelaager"
    },
    {
      property: "og:locale",
      content: "et"
    },
    {
      property: "og:url",
      content: canonicalUrl
    },
    {
      property: "og:image",
      content: "https://merelaager.ee/media/img/merelaager_banner.jpg"
    },
    {
      property: "og:title",
      content: basicInfo[0].title
    },
    {
      property: "og:description",
      content: basicInfo[1].content
    }
  ];
};

const getTwitterMeta = (): object[] => {
  return [
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@merelaager" }
  ];
};

const genCanonical = (canonicalUrl: string): object[] => {
  return [{ tagName: "link", rel: "canonical", href: canonicalUrl }];
};

const getFavicons = (): object[] => {
  return [
    {
      tagName: "link",
      rel: "icon",
      sizes: "196x196",
      type: "image/png",
      href: "/img/favicons/favicon-196x196.png"
    }
  ];
};

// Keep per-user pages out of search results.
export const genPrivateMetaData = (basicInfo: MetaBasicInfo): object[] => {
  return (basicInfo as object[])
    .concat([{ name: "robots", content: "noindex" }])
    .concat(getFavicons());
};

export const genMetaData = (
  basicInfo: MetaBasicInfo,
  urlSuffix: string
): object[] => {
  const canonicalUrl = getCanonicalUrl(urlSuffix);
  return (basicInfo as object[])
    .concat(genOpenGraph(basicInfo, canonicalUrl))
    .concat(getTwitterMeta())
    .concat(genCanonical(canonicalUrl))
    .concat(getFavicons());
};
