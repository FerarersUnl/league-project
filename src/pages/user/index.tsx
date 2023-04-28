import { Container } from "@chakra-ui/react";
import { NextPage } from "next";
import SearchBar from "@/components/SearchBar";
import TutorialSteps from "@/components/TutorialSteps";

const User: NextPage = () => {
    return (
        <Container maxW={"5xl"}>
            <SearchBar />
            <TutorialSteps />
        </Container>
    );
};

export default User;
