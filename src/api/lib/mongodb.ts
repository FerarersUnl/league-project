import mongoose, { connect } from "mongoose";

run().catch((err) => console.log(err));

async function run() {
    const db = await connect(process.env.MONGODB_URI!);

    console.log(mongoose.connection.readyState);
}
