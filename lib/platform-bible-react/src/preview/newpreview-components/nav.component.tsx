export type Page = { name: string; children?: Page[] };

type NavProps = { pages: Page[] };

export default function Nav({ pages }: NavProps) {
  return (
    <nav className="tw-p-4 tw-pt-0">
      <ul className="tw-space-y-2">
        {pages.map((page: Page) => {
          const navPage = (
            <li>
              <a
                href="#"
                className="tw-block tw-py-2 tw-text-sm tw-font-medium tw-text-foreground hover:tw-text-primary"
              >
                {page.name}
              </a>
            </li>
          );
          const navSubpages =
            page?.children &&
            page.children.map((subpage: Page) => {
              return (
                <li>
                  <a
                    href="#"
                    className="tw-block tw-py-1 tw-text-sm tw-text-muted-foreground hover:tw-text-primary"
                  >
                    {subpage.name}
                  </a>
                </li>
              );
            });
          return (
            <>
              {navPage}
              {navSubpages}
            </>
          );
        })}
      </ul>
    </nav>
  );
}
