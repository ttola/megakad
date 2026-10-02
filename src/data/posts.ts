export type PostKind = "article" | "talk" | "write-up";

export interface PostItem {
  title: string;
  slug: string;
  kind: PostKind;
  summary: string;
  date: string;
  status: "published";
  tags: string[];
  href: string;
  mark: string;
  color: string;
}

export const postKindMeta: Record<PostKind, Pick<PostItem, "mark" | "color">> = {
  article: { mark: "A", color: "#0A0A0A" },
  talk: { mark: "T", color: "#E6377A" },
  "write-up": { mark: "W", color: "#4F3FB8" },
};
