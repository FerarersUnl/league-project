import { Schema, model, connect } from "mongoose";

interface IUser {
    name: string;
    lastName?: string;
    summoner: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    lastName: { type: String, required: false },
    summoner: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});
