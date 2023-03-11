import { useState } from "react";
import { useRouter } from "next/router";

function Home() {
    const router = useRouter();

    const [username, setUsername] = useState('');

    const handleUser = () => {
        router.push(`/user/${username}`);
    }

    const handleUserEnter = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            router.push(`/user/${username}`);
        }
    }
    
    return (
        <div>
            <h1>Inicio</h1>
            <input 
                type="text"
                value={username}
                onChange={e => { setUsername(e.currentTarget.value) }}
                onKeyDown={handleUserEnter}
            />
            <button onClick={handleUser}>Buscar</button>
        </div> 
    )
}

export default Home;