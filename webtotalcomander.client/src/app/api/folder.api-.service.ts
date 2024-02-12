import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FolderModel } from './models/folder.model';
import { Folder } from '../services/models/folder';
import { FolderGetModel } from './models/folderGet.model';

@Injectable({
  providedIn: 'root'
})
export class FolderApiService {

  constructor(private http: HttpClient) { }

  private serverUrl = "https://localhost:7142/api/Folder/";

  public res : any;

  public getFilesAndFolders(folderPath: string): Observable<FolderGetModel> {
    return this.http.get<FolderGetModel>(`https://localhost:7142/api/Folder/getAll?folderPath=${folderPath}` );
  }

  public createFolder(folder: FolderModel): Observable<any> {
    this.res = this.http.post(this.serverUrl + "create" , folder, { headers: { 'Content-Type': 'application/json' } });
    return this.res;
  }

  public deleteFolder(folderPath: string): Observable<any> {
    return this.http.delete(`https://localhost:7142/api/Folder/delete?folderPath=${folderPath}`);
  }

  public getFilesAndFoldersPagination(offset : number, limit : number,  folderPath: string): Observable<any> {
    return this.http.get(`https://localhost:7142/api/Folder/getAllWithPagination?offset=${offset}&limit=${limit}&folderPath=${folderPath}` );
  }

  public getFilesFilter(offset : number, limit : number, extension : string, fileName : string, folderPath: string): Observable<any> {
    return this.http.get(`https://localhost:7142/api/Folder/getAllFilterByExtension?offset=${offset}&limit=${limit}&extension=${extension}&fileName=${fileName}&folderPath=${folderPath}` );
  }

  public downloadFolderAsZip(folderPath: string): Observable<any> {
    
    return this.http.get<Blob>(`https://localhost:7142/api/Folder/downloadZip?folderPath=${folderPath}`, { observe: 'response', responseType: 'blob' as 'json' });
  }

}
