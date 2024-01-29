import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileModel } from './models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileApiService {
  

  constructor(private http: HttpClient) { }

  private serverUrl = "https://localhost:7142/api/File/";

  public res : any;
  public f: FileModel | undefined;

  // public getFilesAndFolders(folderPath: string): Observable<string[]> {
  //   return this.http.get<string[]>(`https://localhost:7142/api/Folder/getAll?folderPath=${folderPath}` );
  // }

  public uploadFile(file: FileModel): Observable<any> {
    this.f = file;
    file.filePath = '41';
    this.res = this.http.post(this.serverUrl + "upload" , file);
    return this.res;
  }

  public deleteFile(folderPath: string): Observable<any> {
    return this.http.delete(this.serverUrl);
  }
}
