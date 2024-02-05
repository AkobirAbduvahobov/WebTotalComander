import { Injectable } from '@angular/core';
import { FolderApiService } from '../api/folder.api-.service';
import { Observable } from 'rxjs';
import { Folder } from './models/folder';
import { FolderGet } from './models/folderGet';

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

  public getAll(folderPath: string): Observable<FolderGet> {
   
    return this.folderApiService.getFilesAndFolders(folderPath);

  }

  public getAllPagination( offset : number, limit : number,  folderPath: string): Observable<any> {
    offset--;
    offset = offset * limit;
    return this.folderApiService.getFilesAndFoldersPagination( offset, limit, folderPath);

  }

  public dowloadZip( folderPath : string ) : Observable<any>
  {
    return this.folderApiService.downloadFolderAsZip(folderPath);
  }

}
