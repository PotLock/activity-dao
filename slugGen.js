import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateSlugIdString() {
    const interestsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'interests.json'), 'utf8'));
    const slugIds = interestsData.map(interest => interest.id_slug);
    return slugIds.join(',');
}

console.log(generateSlugIdString());
