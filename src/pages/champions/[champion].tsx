import { useRouter } from "next/router";

function ChampionsName() {
    const router = useRouter();
    const champion = router.query.champion;
    return <h1>{champion}</h1>;
}

export default ChampionsName;
