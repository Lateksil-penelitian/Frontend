import { extendTheme } from '@chakra-ui/react';

import colors from './foundations/colors';
import Button from './components/Button';

const theme = extendTheme({
  colors,
  components: {
    Button,
  },
});

export default theme;
