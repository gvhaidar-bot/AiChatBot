import sql from './configs/db.js';
import dotenv from 'dotenv';
dotenv.config();

async function migrate() {
    try {
        console.log("Adding session_id column...");
        await sql`ALTER TABLE messages ADD COLUMN IF NOT EXISTS session_id VARCHAR(255)`;
        console.log("Column added.");
        process.exit(0);
    } catch(e) {
        console.error("Migration failed", e);
        process.exit(1);
    }
}
migrate();
