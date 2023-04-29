import { Container } from '@chakra-ui/react';

import InfoHeader from '@/components/InfoHeader';
import InfoContent from '@/components/InfoContent';
import SearchBar from '@/components/SearchBar';
import InfoFooter from '@/components/InfoFooter';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Container maxW={'7xl'}>
      <InfoHeader />
      <SearchBar />
      <InfoContent id="functional" />
      <InfoFooter id="more" />
    </Container>
  );
};

export default Home;
