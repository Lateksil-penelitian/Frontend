import Image from 'next/image';

const NextImage = ({ alt, quality = '100', ...props }) => (
  <Image alt={alt} quality={quality} {...props} />
);

export default NextImage;
