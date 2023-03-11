import { useRouter } from "next/router";
import {
    Heading,
    InputGroup,
    Input,
    Button,
    InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";

import type { NextPage } from "next";

const Home: NextPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");

    const handleUser = () => {
        router.push(`/user/${username}`);
    };

    const handleUserEnter = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            router.push(`/user/${username}`);
        }
    };

    return (
        <div>
            <Heading as="h1" size="4xl" noOfLines={1}>
                Encuentra un jugador
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
        </div>
    );
};

export default Home;
