/// <reference types="vite/client" />
/// <reference types="vite-imagetools" />

declare module '*&as=picture' {
  export interface PictureAsset {
    sources: Record<string, string>;
    img: {
      src: string;
      w: number;
      h: number;
    };
  }
  const asset: PictureAsset;
  export default asset;
}
