// @ts-check
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import checkFile from "eslint-plugin-check-file";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "check-file": checkFile,
    },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        {
          "src/**/*.{ts,tsx}": "KEBAB_CASE",
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "src/app/**/": "NEXT_JS_APP_ROUTER_CASE",
          "src/!(app)/**/": "KEBAB_CASE",
        },
        { ignoreWords: ["12912184-1dc3-4db8-9405-3d5f772d2753"] },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "studio/node_modules/**",
    "studio/dist/**",
    "studio/.sanity/**",
  ]),
]);

export default eslintConfig;
