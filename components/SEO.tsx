import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Story, Author } from './types';

interface SEOProps {
  story?: Story;
  author?: Author;
}

const SEO: React.FC<SEOProps> = ({ story, author }) => {
  const siteUrl = 'https://youthstartup.in';
  const siteName = 'YouthStartups.in';
  const twitterHandle = '@youthstartup';

  const title = story ? `${story.title} | ${siteName}` : `${siteName} - Inspiring the Next Generation of Entrepreneurs`;
  const description = story?.excerpt || 'A premium editorial news platform focused on real entrepreneur stories, startup journeys, and business insights.';
  const imageUrl = story?.featuredImage || `${siteUrl}/default-social-image.jpg`;
  const canonicalUrl = story ? `${siteUrl}/article/${story.slug}` : siteUrl;

  const articleSchema = story && author ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    'headline': story.title,
    'image': story.featuredImage,
    'datePublished': new Date(story.publishedAt).toISOString(),
    'author': {
      '@type': 'Person',
      'name': author.name,
    },
    'publisher': {
      '@type': 'Organization',
      'name': siteName,
      'logo': {
        '@type': 'ImageObject',
        'url': `${siteUrl}/logo.png`,
      },
    },
    'description': story.excerpt,
  } : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={story ? 'article' : 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={author?.social?.twitter || twitterHandle} />

      {/* Article Schema */}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
