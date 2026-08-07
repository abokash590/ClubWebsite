const db = require('better-sqlite3')('club.db');
const row = db.prepare('SELECT * FROM requests WHERE id = 5').get();
console.log('Row:', row);
console.log('Keys:', Object.keys(row || {}));
console.log('JSON:', JSON.stringify(row));
console.log('Spread:', { ...row });
