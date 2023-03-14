import mongoose, { connect } from "mongoose";

run().catch((err) => console.log(err));

async function run() {
    await connect(
        "mongodb+srv://moodzRoot:JEpvBlB9bNFH3548@latamvortex.o9tcdhp.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(mongoose.connection.readyState);
}
