import { SaveFile } from './save-file.use-case';
import fs from 'fs';

describe( 'SaveFileUseCase ', () => {

    afterEach( () => {
        fs.rmSync('outputs', { recursive: true });
    })
    
    
    test('SaveFileUseCase', () => {
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'text content',
        }
    
        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath); //ojo
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
        
        expect( result ).toBe( true );
        expect( fileExists ).toBe( true );
        expect( fileContent ).toBe( options.fileContent );
    })


})