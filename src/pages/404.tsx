import Link from 'next/link';
import { NextPage } from 'next';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const PageNotFound: NextPage = () => {
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
      fontSize={'3xl'}
    >
      <Heading
        display="inline-block"
        as="h2"
        fontSize={'80px'}
        bgGradient="linear(to-r, LatamVortex.100, LatamVortex.300)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text mt={3} mb={2} fontWeight={500}>
        Pagina no encontrada :(
      </Text>
      <Text color={'gray.500'} mb={6}>
        La página que estas buscando no se encuentra en nuestros sistemas.
      </Text>

      <Button
        colorScheme="blue"
        bgGradient="linear(to-r, LatamVortex.100, LatamVortex.300)"
        color="white"
        variant="solid"
      >
        <Link href="/">Volver a inicio</Link>
      </Button>
    </Box>
  );
};

export default PageNotFound;
