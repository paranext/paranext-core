import { createContext, useContext, useState, useMemo, ReactNode } from 'react';

export interface SimpleModeContextValue {
  /** The project selected in the toolbar project selector */
  selectedProjectId: string | undefined;
  setSelectedProjectId: (id: string | undefined) => void;
  /** The currently active tool tab ID in the tools panel */
  activeToolTabId: string;
  setActiveToolTabId: (id: string) => void;
  /** Whether the optional extra panel is visible */
  extraPanelVisible: boolean;
  setExtraPanelVisible: (visible: boolean) => void;
}

const SimpleModeContext = createContext<SimpleModeContextValue | undefined>(undefined);

export function SimpleModeProvider({ children }: { children: ReactNode }) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);
  const [activeToolTabId, setActiveToolTabId] = useState<string>('bibleTexts');
  const [extraPanelVisible, setExtraPanelVisible] = useState(false);

  const value = useMemo(
    () => ({
      selectedProjectId,
      setSelectedProjectId,
      activeToolTabId,
      setActiveToolTabId,
      extraPanelVisible,
      setExtraPanelVisible,
    }),
    [selectedProjectId, activeToolTabId, extraPanelVisible],
  );

  return <SimpleModeContext.Provider value={value}>{children}</SimpleModeContext.Provider>;
}

export function useSimpleModeContext(): SimpleModeContextValue {
  const context = useContext(SimpleModeContext);
  if (!context) throw new Error('useSimpleModeContext must be used within SimpleModeProvider');
  return context;
}
