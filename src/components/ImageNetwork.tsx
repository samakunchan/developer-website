import React from 'react';
import { Image } from '@unpic/react/base';
import { myCustomApiTransformer } from '../core/utils/imageTransformer';

type UnpicImageProps = React.ComponentProps<typeof Image>;

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

type ImageNetworkProps = DistributiveOmit<
  UnpicImageProps,
  'transformer' | 'src' | 'alt'
> & {
  src: string;
  alt: string;
};

export function ImageNetwork({ src, alt, ...props }: ImageNetworkProps) {
  return (
    <Image
      src={src}
      alt={alt}
      transformer={myCustomApiTransformer}
      {...props}
    />
  );
}
