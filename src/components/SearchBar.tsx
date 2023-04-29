import {
  Container,
  Stack,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Flex,
  Text,
  Image,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');

  const handleUser = () => {
    router.push(`/user/${username}`);
  };

  const handleUserEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      router.push(`/user/${username}`);
    }
  };

  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Conoce los detalles de{' '}
          <Text as={'span'} color={'#4a81ca'}>
            tu usuario
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          Introduce tu nombre de invocador, por el momento solo es posible
          buscar un invocador a la vez pero estamos trabajando para un mejor
          sistema en futuras actualizaciones, ¡estén atentos!
        </Text>
        <InputGroup>
          <Input
            autoComplete="true"
            placeholder="Nombre"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.currentTarget.value);
            }}
            onKeyDown={handleUserEnter}
          />
          <InputRightElement width="4.5rem">
            <Button onClick={handleUser}>Buscar</Button>
          </InputRightElement>
        </InputGroup>

        <Flex
          w={'full'}
          alignContent={'center'}
          alignItems={'center'}
          textAlign={'center'}
        >
          <Image
            alt={'LeagueClient'}
            fit={'cover'}
            align={'center'}
            margin={'auto'}
            w={'25%'}
            h={'25%'}
            src={'/logo.svg'}
          />
        </Flex>
      </Stack>
    </Container>
  );
};

export default SearchBar;
