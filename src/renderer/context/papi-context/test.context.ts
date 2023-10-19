import { createContext } from 'react';

// This should always be defined, so non-null the value
// eslint-disable-next-line no-type-assertion/no-type-assertion
const TestContext = createContext<string>(undefined!);
export default TestContext;
