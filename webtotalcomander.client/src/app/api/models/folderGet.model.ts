import {  FileExFoModel } from "./fileExFo.model";

export interface FolderGetModel {

    
   folderPath: string;
   extensions : string[];
   names : string[];
   filesWithNamesAndExtensions : FileExFoModel[];

}