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



  public uploadFile(file: FileModel): Observable<any> {
    const formData : FormData = new FormData();
 
    formData.append("File", file.file);
    formData.append("FilePath", file.filePath);
    this.res = this.http.post(this.serverUrl + "upload" , formData);
    return this.res;
  }

  public replaceFile(file: FileModel): Observable<any> {
    const formData : FormData = new FormData();
 
    formData.append("File", file.file);
    formData.append("FilePath", file.filePath);
    this.res = this.http.post(this.serverUrl + "replace" , formData);
    return this.res;
  }

  
  public downloadFile( filePath : string  ) : Observable<any>{
    return this.http.get(`https://localhost:7142/api/File/download-file?filePath=${filePath}`,  { responseType: 'blob' });
  }

  
  
  public downloadFileForEdit( filePath : string  ) : Observable<any>{
    return this.http.get(`https://localhost:7142/api/File/download-file?filePath=${filePath}`);
  }

  public deleteFile(folderPath: string , fileName : string): Observable<any> {
    return this.http.delete(`https://localhost:7142/api/File/delete?fileName=${fileName}&filePath=${folderPath}`);
  }
}
