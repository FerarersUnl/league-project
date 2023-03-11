import { useRouter } from "next/router";

function UserName() {
    const router = useRouter();
    const username = router.query.username;
    return <h1>Bienvenido de vuelta, {username}</h1>
}

export default UserName;