import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';

const { b:base, l: limit, s:showTable, n:nameFile, d:destination   } =  yarg
let outputMessage = '';

const headerMessage: string = 
`
=============================
       Tabla del ${base}
=============================\n
`;


for (let i = 0; i <= limit; i++) {
    outputMessage += ( `${base} x ${i} = ${base * i}\n`)
}

outputMessage = headerMessage + outputMessage;
if(showTable) {
    console.table(outputMessage)
}


const outputPath = destination;
const filename = nameFile;

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${ outputPath }/${filename}${base}.txt`, outputMessage);
console.log('File Created!')

