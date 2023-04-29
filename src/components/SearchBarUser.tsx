import {
  Stack,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Text,
} from '@chakra-ui/react';
import router from 'next/router';
import { useState } from 'react';

const SearchBarUser = () => {
  const [username, setUsername] = useState('');

  const handleUser = () => {
    router.push(`/user/${username}`);
  };

  const handleUserEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      router.push(`/user/${username}`);
    }
  };

  const handleUserClick = (e: React.MouseEvent) => {
    router.push(`/user/${username}`);
  };
  return (
    <Stack textAlign={'center'} align={'center'} spacing={{ base: 8, md: 10 }}>
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
      <InputGroup>
        <Input
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
    </Stack>
  );
};

export default SearchBarUser;
