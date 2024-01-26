import { Injectable } from '@angular/core';
import { FolderApiService } from '../api/folder.api-.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

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

  public getAll(folderPath: string): Observable<any> {
    return this.folderApiService.getFilesAndFolders(folderPath);
  }

}
