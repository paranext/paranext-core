// This type file was added to fix the below error in `node_modules/@types/react/index.d.ts:46`.
declare module 'react' {
  namespace React {}
  // @ts-ignore: error TS7022: 'React' implicitly has type 'any' because it does not have a type annotation and is referenced directly or indirectly in its own initializer.
  export = React;
}

export {};
