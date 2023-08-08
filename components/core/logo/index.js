import NextImage from '../nextimage';
import Logo from '../../../assets/images/Logo_Lateksil.jpeg';

const LogoSidebar = ({ multiplySize = 1, responsive = false }) => {
  const baseWidth = 128 * multiplySize;
  const baseHeight = 88 * multiplySize;
  return (
    <NextImage
      src={Logo}
      width={baseWidth}
      height={baseHeight}
      layout={responsive ? 'responsive' : undefined}
      priority
    />
  );
};

export default LogoSidebar;
