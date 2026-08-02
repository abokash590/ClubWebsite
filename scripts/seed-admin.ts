import { getDb } from "../src/lib/db";
import { hashPassword } from "../src/lib/auth";

async function main() {
  const db = getDb();
  
  const adminEmail = "admin@mec.edu.bd";
  const adminPassword = "password123"; // EDIT THIS BEFORE RUNNING in production
  const adminName = "Club Admin";

  try {
    // Check if admin already exists
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail);
    if (existing) {
      console.log(`Admin user ${adminEmail} already exists.`);
      return;
    }

    console.log(`Hashing password for ${adminEmail}...`);
    const hashedPassword = await hashPassword(adminPassword);

    console.log("Inserting admin into database...");
    const insert = db.prepare(`
      INSERT INTO users (name, email, password_hash, role)
      VALUES (?, ?, ?, 'admin')
    `);
    
    insert.run(adminName, adminEmail, hashedPassword);
    
    console.log(`✅ Admin user created successfully!`);
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
  } catch (error) {
    console.error("❌ Failed to seed admin:", error);
  }
}

// Run the main function
main();
