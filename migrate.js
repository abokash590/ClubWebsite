const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('club.db');

const requestColsInfo = db.prepare(`PRAGMA table_info(requests)`).all();
const existingCols = requestColsInfo.map(c => c.name);
const requiredCols = [
  'student_id', 'registration_number', 'batch',
  'linkedin', 'github', 'facebook', 'discord',
  'codeforces', 'codechef', 'photo_base64'
];

for (const col of requiredCols) {
  if (!existingCols.includes(col)) {
    db.prepare(`ALTER TABLE requests ADD COLUMN ${col} TEXT`).run();
    console.log(`Migrated requests table: added column ${col}`);
  }
}
console.log('Migration complete.');
