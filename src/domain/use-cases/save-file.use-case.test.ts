import { SaveFile } from './save-file.use-case';
import fs, { writeFileSync } from 'fs';

describe( 'SaveFileUseCase ', () => {
    const options = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name',
    }

    const saveFile = new SaveFile();

    afterEach( () => {
        const outputFolderExists = fs.existsSync('outputs');
        if( outputFolderExists ) fs.rmSync('outputs', { recursive: true });

        const customOutputFolderExists = fs.existsSync(`custom-outputs`);
        if( customOutputFolderExists ) fs.rmSync(`custom-outputs`, { recursive: true });
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

    test('should save file with custom values', () => { 
      

        const filePath = `${options.fileDestination}/${options.fileName}.txt`;
        const result = saveFile.execute( options );

        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
        
        expect( result ).toBe( true );
        expect( fileExists ).toBe( true );
        expect( fileContent ).toBe( options.fileContent );
    })

    test('should return false if directory could not be created', () => {
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('this is a custom error message from testing'); }
        );

        const result = saveFile.execute(options);

        expect( result ).toBe( false );
        mkdirSpy.mockRestore(); // restaura la funcion original
    })
     
    

    test('should return false if file could not be created', () => {
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('this is a custom error message from testing'); }
        );

        const result = saveFile.execute({ fileContent: 'Hola' });

        expect( result ).toBe( false );
        writeFileSpy.mockRestore();
    })
     


})