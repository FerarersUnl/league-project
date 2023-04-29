import { InfoIcon } from '@chakra-ui/icons';
import { Box, Heading, Text } from '@chakra-ui/react';
import { NextPage } from 'next/types';

const Leaderboard: NextPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      py={10}
      px={6}
      minH="100vh"
    >
      <InfoIcon boxSize={'50px'} color={'blue.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        En construcción
      </Heading>
      <Text color={'gray.500'}>
        Estamos trabajando lo más rapido posible para implementar los nuevos
        serivicios. Queda atento a nuestras redes sociales para más información.
      </Text>
    </Box>
  );
};

export default Leaderboard;
