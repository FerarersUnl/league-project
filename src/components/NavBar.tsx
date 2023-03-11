import Link from "next/link";

function Header() {
    

    return (
        <header>
            <h1><Link href="/">LeagueCheck</Link></h1>
            <nav>
                <ul>
                    <li><Link href="/guides">Guías</Link></li>
                    <li><Link href="/champions">Campeónes</Link></li>
                    <li><Link href="/leaderboard">Ranking</Link></li>
                    <li><Link href="/runes">Runas</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;