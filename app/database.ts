import postgres from "postgres";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const sql = postgres(process.env.POSTGRES_URL as string);

export async function seed() {
    try {
        console.log("Running seed...");

        const seedPath = path.join(dirname(fileURLToPath(import.meta.url)), "seed.sql");

        await sql.file(seedPath).simple();
    } catch (err) {
        console.error("Error running seed: ", err);
    }
}

export default sql;
