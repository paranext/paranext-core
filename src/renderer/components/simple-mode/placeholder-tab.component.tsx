export type PlaceholderTabProps = {
  tabName: string;
};

/** Placeholder content for tabs that don't have a real webview implementation yet */
export function PlaceholderTab({ tabName }: PlaceholderTabProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        gap: 8,
        color: 'var(--muted-foreground, #888)',
      }}
    >
      <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>{tabName}</p>
      <p style={{ fontSize: '0.85rem' }}>Coming soon</p>
    </div>
  );
}

export default PlaceholderTab;
