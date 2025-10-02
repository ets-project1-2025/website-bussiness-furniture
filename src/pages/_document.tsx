import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="id">
        <Head>
          {/* Favicon and app icons */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          
          {/* Preconnect to external domains for performance */}  
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          
          {/* DNS prefetch for external resources */}
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          
          {/* Meta theme color for mobile browsers */}
          <meta name="theme-color" content="#ffffff" />
          
          {/* Additional SEO meta tags */}
          <meta name="application-name" content="FurnitureKami" />
          <meta name="apple-mobile-web-app-title" content="FurnitureKami" />
          <meta name="msapplication-TileColor" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
