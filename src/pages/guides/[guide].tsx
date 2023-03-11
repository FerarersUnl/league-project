import { useRouter } from "next/router";

function GuideNumber() {
    const router = useRouter();
    const name = router.query.guide;
    return <h1>{name}</h1>
}

export default GuideNumber;