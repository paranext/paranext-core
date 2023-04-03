import { createContext } from 'react';

// This should always be defined, so non-null the value
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export default createContext<string>(undefined!);
