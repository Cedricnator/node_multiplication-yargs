import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    fileName: string;
    fileDestination: string;
}


export class ServerApp {

    static run({ base, limit, showTable, fileName, fileDestination }: RunOptions){
        console.log('Server run...');

        const table = new CreateTable().execute({ base, limit});

        const wasCreated = new SaveFile()
            .execute({
                fileContent: table,
                fileName: fileName,
                fileDestination: fileDestination 
            });

        showTable ? console.log(table) : undefined;

        wasCreated ? console.log('File created!') : console.log('File not created!');
    }
}