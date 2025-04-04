import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="light">
      <Head />
      <body className="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 transition-colors duration-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}