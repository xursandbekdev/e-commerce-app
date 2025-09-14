import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from "util";

// TypeScript uchun globalni aniqlash:
declare const global: typeof globalThis;

if (typeof global.TextEncoder === "undefined") {
  // @ts-ignore
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
  // @ts-ignore
  global.TextDecoder = TextDecoder as typeof global.TextDecoder;
}
