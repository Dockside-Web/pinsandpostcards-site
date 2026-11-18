import { getCollection, type CollectionEntry } from "astro:content";

export type Release = CollectionEntry<"changelog">;

/** Every version, newest first (by date, then by version on the same day). */
export async function getReleases(): Promise<Release[]> {
  const releases = await getCollection("changelog");
  const parts = (v: string) => v.split(".").map(Number);
  const byVersion = (a: string, b: string) => {
    const [x, y] = [parts(a), parts(b)];
    for (let i = 0; i < Math.max(x.length, y.length); i++) if ((x[i] ?? 0) !== (y[i] ?? 0)) return (y[i] ?? 0) - (x[i] ?? 0);
    return 0;
  };
  return releases.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || byVersion(a.data.version, b.data.version));
}

/** Its own place on the page, to link to: "1.1.2" → "v1-1-2" (/changelog#v1-1-2). */
export const releaseAnchor = (version: string) => `v${version.replaceAll(".", "-")}`;
