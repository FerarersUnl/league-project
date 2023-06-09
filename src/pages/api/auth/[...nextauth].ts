import NextAuth from "next-auth/next";
import DiscordProvider from "next-auth/providers/discord";

const scopes = ["identify"].join(" ");

export default NextAuth({
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
            authorization: { params: { scope: scopes } },
        }),
    ],
});
