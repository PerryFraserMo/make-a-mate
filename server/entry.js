const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

const dressUpInput = fs.readFileSync("./server/dressup-input", { encoding: 'utf8', flag: 'r' });
const dressUpLines = dressUpInput.split(/\n/g);

(async () => {
  for (const lineIndex in dressUpLines) {
    const line = dressUpLines[lineIndex];
    const file = fs.createWriteStream(`./server/dressup/${lineIndex}.png`);
  
    const request = await new Promise(resolve => https.get(line, function(response) {
       response.pipe(file);
    
       // after download completed close filestream
       file.on("finish", () => {
           file.close();
           console.log("Download Completed");
  
           resolve();
       });
    }));
  }
})();