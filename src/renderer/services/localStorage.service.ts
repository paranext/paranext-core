import { WINDOW_ID } from '@shared/data/platform.data';

const localWindowStorage = {
  getItem(key: string): string | null {
    return localStorage.getItem(`${WINDOW_ID}_${key}`);
  },
  setItem(key: string, value: string): void {
    return localStorage.setItem(`${WINDOW_ID}_${key}`, value);
  },
};

export default localWindowStorage;
