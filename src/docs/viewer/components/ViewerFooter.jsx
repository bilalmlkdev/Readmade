import { Link } from "react-router-dom";

function Column({ title, links, basePath }) {
  if (!links?.length) return null;
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
        {title}
      </h4>
      <ul className="space-y-2">
        {links.map((item) =>
          item.href ? (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ) : (
            <li key={item.to}>
              <Link
                to={item.to.startsWith("/") ? item.to : `${basePath}/${item.to}`}
                className="text-sm text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

export default function ViewerFooter({ footer, brand, basePath }) {
  if (!footer) return null;

  const columns = footer.columns || [];

  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-12 dark:border-white/10 dark:bg-[#111]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <div className="mb-3 flex items-center gap-2">
            {typeof brand.logo === "string" ? (
              <img src={brand.logo} alt="" className="h-8 w-8" />
            ) : null}
            <span className="dancing-script text-[17px] font-normal text-gray-950 dark:text-white">
              {brand.name}
            </span>
          </div>
          {footer.blurb ? (
            <p className="max-w-xs text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {footer.blurb}
            </p>
          ) : null}
        </div>

        {columns.map((col) => (
          <Column
            key={col.title}
            title={col.title}
            links={col.links}
            basePath={basePath}
          />
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 text-sm text-gray-400 sm:flex-row dark:border-white/10 dark:text-gray-500">
        <span>{footer.copyright}</span>
        {footer.metaLinks?.length ? (
          <div className="flex gap-5">
            {footer.metaLinks.map((link) =>
              link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-950 dark:hover:text-white"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={
                    link.to.startsWith("/") ? link.to : `${basePath}/${link.to}`
                  }
                  className="hover:text-gray-950 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
        ) : null}
      </div>
    </footer>
  );
}
