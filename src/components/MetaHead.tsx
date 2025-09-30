import Head from "next/head";
import { useRouter } from "next/router";

interface MetaHeadProps {
  title?: string;
  description: string;
  featuredImage?: string;
  type?: string;
  keywords?: string;
  canonicalUrl?: string;
}

const siteUrl = "https://furniturekami.vercel.app"; // Updated to be more relevant to the furniture website

const MetaHead: React.FC<MetaHeadProps> = ({
  title,
  description,
  featuredImage,
  type = "website",
  keywords,
  canonicalUrl
}) => {
  const router = useRouter();
  const fullUrl = `${siteUrl}${router.asPath}`;

  return (
    <Head>
      {/* Basic SEO */}
      <title>{title ? `${title} - FurnitureKami` : 'FurnitureKami - Furnitur Berkualitas'}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="FurnitureKami" />
      <meta name="robots" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl || fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title || 'FurnitureKami - Furnitur Berkualitas'} />
      <meta property="og:description" content={description} />
      {featuredImage && <meta property="og:image" content={featuredImage} />}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title || 'FurnitureKami - Furnitur Berkualitas'} />
      <meta property="twitter:description" content={description} />
      {featuredImage && <meta property="twitter:image" content={featuredImage} />}
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      
      {/* Viewport for responsive design */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
};

export default MetaHead;
