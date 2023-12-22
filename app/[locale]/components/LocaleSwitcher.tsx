import { useLocale } from "next-intl";
import Link from "next/link";
import { supportedLocales } from "@/i18n/locales";

const activeClass = "text-blue-500";

const LocaleSwitcher = () => {
  const locale = useLocale();

  return (
    <div className="flex">
      {supportedLocales.map((lang) => (
        <Link href={`/${lang}`} key={lang}>
          <button
            className={`btn ${
              locale === lang ? `btn-link ${activeClass}` : "btn-ghost"
            }`}
          >
            {lang.toUpperCase()}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default LocaleSwitcher;
