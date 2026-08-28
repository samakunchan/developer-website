import React from 'react';

export interface PictureAsset {
  sources: Record<string, string>;
  img: {
    src: string;
    w: number;
    h: number;
  };
}

interface ImageStaticProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: PictureAsset;
  alt: string;
  sizes?: string;
}

export const ImageStatic: React.FC<ImageStaticProps> = ({
  src: imageAsset,
  alt,
  sizes = '100vw',
  className = '',
  loading = 'lazy',
  ...restProps
}: ImageStaticProps) => {
  if (!imageAsset || !imageAsset.sources || !imageAsset.img) return null;

  return (
    <picture>
      {Object.entries(imageAsset.sources).map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        src={imageAsset.img.src}
        width={imageAsset.img.w}
        height={imageAsset.img.h}
        alt={alt}
        loading={loading}
        decoding="async"
        className={className}
        {...restProps}
      />
    </picture>
  );
};
