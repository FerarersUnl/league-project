import { ReactNode } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
} from '@chakra-ui/react';

/*
<Heading><Link href="/">LeagueCheck</Link></Heading>
            <nav>
                <ul>
                    <li><Link href="/guides" color="blue.400" _hover={{ color: "blue.500"}}>Guías</Link></li>
                    <li><Link href="/champions" color="blue.400" _hover={{ color: "blue.500"}}>Campeónes</Link></li>
                    <li><Link href="/leaderboard" color="blue.400" _hover={{ color: "blue.500"}}>Ranking</Link></li>
                    <li><Link href="/runes" color="blue.400" _hover={{ color: "blue.500"}}>Runas</Link></li>
                </ul>
                <IconButton mt={4} aria-label="Cambiar color" onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
                </IconButton>
            </nav>
*/

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      {children}
    </Link>
);

export default function Header() {
    const { colorMode, toggleColorMode } = useColorMode(); 
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <header>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-evenly'}>
                <Box>Logo</Box>
                <Button variant='ghost'><Link href="/guides" color="blue.400" _hover={{ color: "blue.500"}}>Guías</Link></Button>
                <Button variant='ghost'><Link href="/champions" color="blue.400" _hover={{ color: "blue.500"}}>Campeónes</Link></Button>
                <Button variant='ghost'><Link href="/leaderboard" color="blue.400" _hover={{ color: "blue.500"}}>Ranking</Link></Button>
                <Button variant='ghost'><Link href="/runes" color="blue.400" _hover={{ color: "blue.500"}}>Runas</Link></Button>

                <Flex alignItems={'center'}>
                    <Stack direction={'row'} spacing={7}>
                    <Button onClick={toggleColorMode}>
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </Button>
                    </Stack>
                </Flex>
                </Flex>
            </Box>
        </header>
    )
}
