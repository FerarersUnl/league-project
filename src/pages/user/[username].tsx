import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

type Data = {
    name: string;
};

export default function UserName({
    data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div>
            <h1>Información de {data.name}</h1>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (
    context
) => {
    const API = process.env.RIOT_API;
    const USER = context.query.username;
    const res = await fetch(
        `https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${USER}?api_key=${API}`
    );
    const data: Data = await res.json();

    return {
        props: {
            data,
        },
    };
};
