import React from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallback?: React.ReactNode;
}

const SafeImage: React.FC<SafeImageProps> = ({ src, fallback, ...props }) => {
  const [error, setError] = React.useState(false);

  if (error || !src) {
    return <>{fallback}</>;
  }

  // Check if the src is an external URL
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return (
      <img
        src={src}
        {...props}
        onError={() => setError(true)}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
    );
  }

  // For internal images, use Next.js Image component
  return <Image src={src} {...props} onError={() => setError(true)} />;
};

export default SafeImage;
