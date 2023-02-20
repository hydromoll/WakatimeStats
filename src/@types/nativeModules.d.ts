export interface INativeModules {
  constantsToExport: () => object;
  getConstants: () => string;
  getData: () => string;
  model: string;
  setData: (value: string) => void;
}

// NativeModules => Object {
//     "constantsToExport": [Function nonPromiseMethodWrapper],
//     "getConstants": [Function anonymous],
//     "getData": [Function nonPromiseMethodWrapper],
//     "model": "Hello from react native",
//     "setData": [Function nonPromiseMethodWrapper],
//   }
