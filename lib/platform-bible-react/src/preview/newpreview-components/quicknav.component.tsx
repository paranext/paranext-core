export type NavEntry = { id: string; name: string };
type QuickNavProps = { sections?: NavEntry[] };

const defaultSections = [{ id: '', name: '↑' }];

export default function QuickNav({ sections = [] }: QuickNavProps) {
  return (
    <nav className="tw-hidden tw-w-64 tw-p-6 sm:tw-block">
      <div className="tw-sticky tw-top-20">
        <h3 className="tw-mb-2 tw-text-sm tw-font-medium">On This Page</h3>
        <ul className="tw-space-y-2 tw-text-sm">
          {[...sections, ...defaultSections].map((section: NavEntry) => {
            return (
              <li>
                <a
                  href={`#${section.id}`}
                  className="tw-text-muted-foreground hover:tw-text-primary"
                >
                  {section.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
