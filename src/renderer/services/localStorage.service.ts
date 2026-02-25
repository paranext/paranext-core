const localWindowStorage = {
  getItem(key: string): string | null {
    return localStorage.getItem(`${globalThis.windowId}_${key}`);
  },
  setItem(key: string, value: string): void {
    return localStorage.setItem(`${globalThis.windowId}_${key}`, value);
  },
};

export default localWindowStorage;
