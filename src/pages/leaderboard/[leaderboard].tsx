import { useRouter } from "next/router";

function LeaderboardUser() {
    const router = useRouter();
    const user = router.query.leaderboard;
    return <h1>Usuario {user}</h1>
}

export default LeaderboardUser;