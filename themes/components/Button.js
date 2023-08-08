const sizeLg = {
  lg: {
    fontSize: 'md',
  },
};

const sizesMd = {
  md: {
    fontSize: 'sm',
  },
};

const baseVariantSolid = {
  color: 'white',
};

const variantSolid = {
  'lateksil-solid': () => ({
    ...baseVariantSolid,
    bg: 'lateksil-main',
    _hover: {
      bg: 'lateksil-main-2',
    },
    _loading: {
      bg: 'lateksil-main',
    },
  }),
};

const variantDanger = {
  'lateksil-danger': () => ({
    ...baseVariantSolid,
    bg: 'lateksil-red',
    _hover: {
      bg: 'lateksil-red',
    },
    _loading: {
      bg: 'lateksil-red',
    },
  }),
};

const Button = {
  sizes: {
    ...sizeLg,
    ...sizesMd,
  },
  variants: {
    ...variantSolid,
    ...variantDanger,
  },
};

export default Button;
