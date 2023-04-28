import {
  Stack,
  Flex,
  chakra,
  SimpleGrid,
  Icon,
  Text,
  Box,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import { FcNext } from 'react-icons/fc';

interface InfoProps {
  id: string;
}

interface About {
  title: string;
  text: string;
  icon: ReactElement;
}

const FeatureAbout = ({ title, text, icon }: About) => {
  return (
    <Stack alignItems="center">
      <Flex
        w={16}
        h={16}
        alignItems="center"
        justifyContent="center"
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

const InfoContent = ({ id }: InfoProps) => {
  return (
    <Box p={4} id={id}>
      <chakra.h2 fontSize="3xl" fontWeight="700" textAlign={'center'} p={15}>
        ¿Como fúnciona?
      </chakra.h2>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <FeatureAbout
          icon={<Icon as={FcNext} w={10} h={10} />}
          title={'Busqueda de datos'}
          text={
            'Tomamos los datos que nos brindas para solicitarlos al API de Riot Games'
          }
        />
        <FeatureAbout
          icon={<Icon as={FcNext} w={10} h={10} />}
          title={'Analísis de usuario'}
          text={
            'En base a los datos obtenidos hacemos un analisís con diversos algoritmos para conocer tu modo de juego'
          }
        />
        <FeatureAbout
          icon={<Icon as={FcNext} w={10} h={10} />}
          title={'Muestra de los resultados'}
          text={
            'Te mostramos el resultado final con el historial de partidas y diversas tecnicas que podrían serte de utilidad'
          }
        />
      </SimpleGrid>
    </Box>
  );
};

export default InfoContent;
