import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FolderModel } from './models/folder.model';

@Injectable({
  providedIn: 'root'
})
export class FolderApiService {

  constructor(private http: HttpClient) { }

  private serverUrl = "https://localhost:7142/api/Folder";

  

  public getFilesAndFolders(folderPath: string): Observable<string[]> {
    return this.http.get<string[]>(`https://localhost:7142/api/Folder/getAll?folderPath=${folderPath}` );
  }

  public createFolder(folder: FolderModel): Observable<any> {
    return this.http.post(this.serverUrl, folder, { headers: { 'Content-Type': 'application/json' } });
  }

  public deleteFolder(folderPath: string): Observable<any> {
    return this.http.delete(this.serverUrl);
  }
}
