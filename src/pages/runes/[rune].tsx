import { useRouter } from "next/router";

function RunesName() {
    const router = useRouter();
    const rune = router.query.rune;
    return <h1>{rune}</h1>
}

export default RunesName;