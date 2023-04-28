import {
  GridItem,
  chakra,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  VStack,
} from '@chakra-ui/react';

interface InfoProps {
  id: string;
}

interface RoadMap {
  heading: string;
  text: string;
}

const FeatureRoad = ({ heading, text }: RoadMap) => {
  return (
    <GridItem>
      <chakra.h3 fontSize="xl" fontWeight="600">
        {heading}
      </chakra.h3>
      <chakra.p>{text}</chakra.p>
    </GridItem>
  );
};

const InfoFooter = ({ id }: InfoProps) => {
  return (
    <Box as={Container} maxW="7xl" mt={14} p={4} id={id}>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
        gap={4}
      >
        <GridItem colSpan={1}>
          <VStack alignItems="flex-start" spacing="20px">
            <chakra.h2 fontSize="3xl" fontWeight="700">
              Roadmap
            </chakra.h2>
            <chakra.p>¿Tienes alguna duda o sugerencia?</chakra.p>
            <Button size="md">
              <a
                href="mailto:ferarersunl@hotmail.com?Subject=Interesado%20en%20el%20sistema"
                target={'_blank'}
              >
                Contactame
              </a>
            </Button>
          </VStack>
        </GridItem>
        <GridItem>
          <Flex>
            <chakra.p>
              Este proyecto nacio como un reto personal para superarme en el
              ámbito que más me interesa. Estaremos constantemente actualizando
              el sistema para que después puedas encontrar mas información,
              conseguir tips y counterpicks, e incluso se puedan publicar
              momentos divertidos que te hayan ocurrido durante una partida.
            </chakra.p>
          </Flex>
        </GridItem>
      </Grid>
      <Divider mt={12} mb={12} />

      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        gap={{ base: '8', sm: '12', md: '16' }}
      >
        <FeatureRoad
          heading={'Primera Fase'}
          text={
            'Implementación de la busqueda de personas y recopilación de datos de invocador.'
          }
        />
        <FeatureRoad
          heading={'Segunda Fase'}
          text={
            'Implementación de busqueda de partida, counterpicks disponibles para el contrarrestar al adversario.'
          }
        />
        <FeatureRoad
          heading={'Tercera Fase'}
          text={
            'Implementación de guías de personajes, recopilación de runas y ítemización.'
          }
        />
        <FeatureRoad
          heading={'Cuarta Fase'}
          text={
            'Implementación de posts de mejores/divertidas jugadas en foros.'
          }
        />
      </Grid>
      <br />
    </Box>
  );
};

export default InfoFooter;
