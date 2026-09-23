export default function ViewerBreadcrumb({ section, page, rootLabel = "Docs" }) {
  return (
    <nav
      className="mb-4 flex flex-wrap items-center gap-1.5 text-[13px] text-gray-400 dark:text-gray-500"
      aria-label="Breadcrumb"
    >
      <span>{rootLabel}</span>
      <span aria-hidden="true">/</span>
      {section ? (
        <>
          <span>{section.title}</span>
          <span aria-hidden="true">/</span>
        </>
      ) : null}
      <span className="font-medium text-gray-800 dark:text-gray-200">
        {page.title}
      </span>
      {page.description ? (
        <span className="ml-2 hidden text-gray-400 sm:inline dark:text-gray-500">
          {page.description}
        </span>
      ) : null}
    </nav>
  );
}
