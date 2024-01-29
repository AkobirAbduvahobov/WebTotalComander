import { Injectable } from '@angular/core';
import { FolderApiService } from '../api/folder.api-.service';
import { Observable } from 'rxjs';
import { Folder } from './models/folder';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  public pathes: Folder[] = [];
  public folder!: Folder ;

  constructor(private folderApiService: FolderApiService) { }


  public createFolder(folderName: string, folderPath: string): Observable<any>{
    return this.folderApiService.createFolder(
      {
        folderName: folderName,
        folderPath: folderPath
      }
    )
  }

  public deleteFolder(folderPath: string): Observable<any> {

    return this.folderApiService.deleteFolder(folderPath);

  }

  public getAll(folderPath: string): Folder[] {
      this.folderApiService.getFilesAndFolders(folderPath).subscribe(
      (response) =>
      {
        console.log( "Service " +  response)
        const ext = this.getFileExtensions(response);
        const names = this.getFileNamesWithoutExtensions(response);
        console.log( "Service " +  ext[1])
        console.log( "Service " +  names[1])

        this.folder = { fileName: '', fileType: '' };

        console.log( "Service + " + response.length )

        for( let i = 0 ; i < ext.length; i++ )
        {
          //console.log("loop ga kirdi");

          this.folder.fileName = names[i];
          this.folder.fileType = ext[i];

          this.pathes.push( this.folder ); 
          // console.log(names[i] + "  exp : " + ext[i]);
          // console.log(this.pathes[i].fileName + "  exp : " + this.pathes[i].fileType );

        }
        
      },
      (error) =>
      {
        console.log("Service " +  error);
      }

    )

    setTimeout(() => {
      console.log(1);
    }, 1000);

    return this.pathes;
  }

  public getFileExtensions(filePaths: string[]): string[] {
    return filePaths.map(filePath => {
      const parts = filePath.split('.');
      // Check if the file path has an extension
      if (parts.length > 1) {
        return `.${parts[parts.length - 1]}`;
      } else {
        return 'folder'; // No extension found
      }
    });
  }

  public getFileNamesWithoutExtensions(filePaths: string[]): string[] {
    return filePaths.map(filePath => {
      const parts = filePath.split('\\'); // Split based on the backslash
      const fileNameWithExtension = parts[parts.length - 1];
  
      // Check if the file path has an extension
      if (fileNameWithExtension.includes('.')) {
        const fileNameWithoutExtension = fileNameWithExtension.split('.')[0];
        return fileNameWithoutExtension;
      } else {
        return fileNameWithExtension; // No extension found
      }
    });
  }

}
