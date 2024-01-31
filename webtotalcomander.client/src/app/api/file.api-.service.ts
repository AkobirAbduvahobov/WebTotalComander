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
    const formData : FormData = new FormData();
    // file.filePath = "folder";
    // if( file.filePath.length == 0 )
    // {
    //   file.filePath = "11";
    // }
    formData.append("File", file.file);
    formData.append("FilePath", file.filePath);
    this.res = this.http.post(this.serverUrl + "upload" , formData);
    return this.res;
  }

  /*
  public addFile(file:FileCreateModel):Observable<any>{
        const formData: FormData = new FormData();
        formData.append("FilePath",file.filePath);
        formData.append("File",file.file!);
        return this.client.post(this.url,formData);
    }
  */

  public deleteFile(folderPath: string , fileName : string): Observable<any> {
    return this.http.delete(`https://localhost:7142/api/File/delete?fileName=${fileName}&filePath=${folderPath}`);
  }
}
