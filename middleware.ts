import createMiddleware from "next-intl/middleware";
import { supportedLocales } from "./i18n/locales";

export default createMiddleware({
  locales: supportedLocales,
  defaultLocale: "en",
});

export const config = {
  matcher: ["/((?!api|_next|(?:[.-]*)\\..*).*)"],
};
