import { Injectable } from '@angular/core';
import { FileApiService } from '../api/file.api-.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private fileApiService : FileApiService) { }

  public uploadFolder(file: File, filePath: string): Observable<any>{
    return this.fileApiService.uploadFile(
      {
        file : file,
        filePath: filePath
      }
    )
  }

  public deleteFolder(filePath: string): Observable<any> {

    return this.fileApiService.deleteFile(filePath);

  }
}
