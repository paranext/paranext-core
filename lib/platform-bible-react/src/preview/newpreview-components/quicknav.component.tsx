export type NavEntry = { id: string; name: string };
type QuickNavProps = { sections?: NavEntry[] };

const defaultSections = [{ id: '', name: '↑' }];

export default function QuickNav({ sections = [] }: QuickNavProps) {
  return (
    <nav className="pr-hidden pr-w-64 pr-p-6 sm:pr-block">
      <div className="pr-sticky pr-top-20">
        <h3 className="pr-mb-2 pr-text-sm pr-font-medium">On This Page</h3>
        <ul className="pr-space-y-2 pr-text-sm">
          {[...sections, ...defaultSections].map((section: NavEntry) => {
            return (
              <li>
                <a
                  href={`#${section.id}`}
                  className="pr-text-muted-foreground hover:pr-text-primary"
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
