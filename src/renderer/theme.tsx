const THEME = 'dark'; // currently available: <empty>, dark, paratext-light, paratext-dark

export const SCROLLBAR_STYLES = `
  ::-webkit-scrollbar {
    width: 14px;
    height: 14px;
    background-color: hsl(var(--muted) / 0.5);
  }

  ::-webkit-scrollbar-track {
    background-color: hsl(var(--muted) / 0.5);
  }

  ::-webkit-scrollbar-thumb {
    background-color: hsl(var(--muted-foreground) / 0.3);
    border-radius: 6px;
    border: 0;
    background-clip: content-box;
    min-width: 32px;
    min-height: 32px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: hsl(var(--muted-foreground) / 0.5);
  }

  ::-webkit-scrollbar-track:vertical {
    margin: 1px 0 1px 0;
  }

  ::-webkit-scrollbar-track:horizontal {
    margin: 0 1px 0 1px;
  }

  ::-webkit-scrollbar-corner {
    background: transparent;
  }

  /* Buttons */
  ::-webkit-scrollbar-button {
    border-style: solid;
    height: 16px;
    width: 16px;
  }

  /* Up */
  ::-webkit-scrollbar-button:vertical:decrement {
    border-width: 0 7px 14px 7px;
    border-color: transparent transparent hsl(var(--muted-foreground)) transparent;
  }

  ::-webkit-scrollbar-button:vertical:decrement:hover {
    border-color: transparent transparent hsl(var(--foreground) / 0.7) transparent;
  }


  /* Down */
  ::-webkit-scrollbar-button:vertical:increment {
    border-width: 14px 7px 0 7px;
    border-color: hsl(var(--muted-foreground)) transparent transparent transparent;
  }

  ::-webkit-scrollbar-button:vertical:increment:hover {
    border-color: hsl(var(--foreground) / 0.7) transparent transparent transparent;
  }


  /* Left */
  ::-webkit-scrollbar-button:horizontal:decrement {
    border-width: 7px 14px 7px 0;
    border-color: transparent hsl(var(--muted-foreground)) transparent transparent;
  }

  ::-webkit-scrollbar-button:horizontal:decrement:hover {
    border-color: transparent hsl(var(--foreground) / 0.7) transparent transparent;
  }


  /* Right */
  ::-webkit-scrollbar-button:horizontal:increment {
    border-width: 7px 0 7px 14px;
    border-color: transparent transparent transparent hsl(var(--muted-foreground));
  }

  ::-webkit-scrollbar-button:horizontal:increment:hover {
    border-color: transparent transparent transparent hsl(var(--foreground) / 0.7);
  }
  `;

export default THEME;
