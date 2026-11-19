import { site } from "../site.config";

/** A link into the app, e.g. appLink("/signup"). */
export const appLink = (path: string) => `${site.app.url}${path}`;

export const signupUrl = appLink("/signup");
export const loginUrl = appLink("/login");
// The read-only demo: its own address, which signs whoever opens it in to the demo account.
export const demoUrl = site.app.demoUrl;
