import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";
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
            <Heading>Inicio</Heading>
            <input
                type="text"
                value={username}
                onChange={(e) => {
                    setUsername(e.currentTarget.value);
                }}
                onKeyDown={handleUserEnter}
            />
            <button onClick={handleUser}>Buscar</button>
        </div>
    );
};

export default Home;
