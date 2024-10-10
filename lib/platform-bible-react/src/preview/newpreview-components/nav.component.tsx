export type Page = { name: string; children?: Page[] };

type NavProps = { pages: Page[] };

export default function Nav({ pages }: NavProps) {
  return (
    <nav className="pr-p-4 pr-pt-0">
      <ul className="pr-space-y-2">
        {pages.map((page: Page) => {
          const navPage = (
            <li>
              <a
                href="#"
                className="pr-block pr-py-2 pr-text-sm pr-font-medium pr-text-foreground hover:pr-text-primary"
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
                    className="pr-block pr-py-1 pr-text-sm pr-text-muted-foreground hover:pr-text-primary"
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
