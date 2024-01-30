import { Component, OnInit } from '@angular/core';
import { FolderService } from '../../services/folder.service';
import { Observable } from 'rxjs';
import { AnimationBuilder } from '@angular/animations';
import { FileService } from '../../services/file.service';
import { Folder } from '../../services/models/folder';
import { FolderGet } from '../../services/models/folderGet';
import { FileExFo } from '../../services/models/fileExFo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public path: string = '';
  public folderName : string = '';
  public file! : File;
  public pathes : Folder[] = [];
  public isInputFolderVisible : boolean = false;
  public isInputFileVisible : boolean = false;

  

  public folderGet! : FolderGet;

  public fileExFo : FileExFo[] = [];




  constructor(private folderService: FolderService, private fileService : FileService) { }

  

  ngOnInit(): void {
    this.getAll(this.path);
  }

  public getAll(folderPath: string): void {
    this.folderService.getAll(folderPath).subscribe(
      (response) => {
        
        this.folderGet = response;
        this.fileExFo = response.filesWithNamesAndExtensions;

        console.log( "1 " + this.folderGet.extensions );
        console.log( "2 " + this.folderGet.names );
        console.log( "3 " + this.folderGet.folderPath );
        console.log( "4 " + this.folderGet.filesWithNamesAndExtensions );
        console.log( "5 " + this.fileExFo[0].fileName );
        
        
        

      },
      (error) =>{
        console.log( "Componenta Error " + error);
      }
    )
  }

 

  public addFolder(): void {
    
    console.log(this.folderName);
    this.folderService.createFolder(this.folderName, this.path).subscribe(
      (response) => {
        console.log(response);
        console.log("Response")
      },
      (error) => {
        console.log(error);
        console.log("Error")
      }
    )

    this.hideInputFolder();
  }

  public showInputFolder(): void {
    this.isInputFolderVisible = true;

  }
  public hideInputFolder(): void {
    this.isInputFolderVisible = false;
  }

  public uploadFile(): void {

    this.fileService.uploadFolder(this.file, this.path).subscribe(
      (response) => {
        console.log(response);
        console.log("Response")
      },
      (error) => {
        console.log(error);
        console.log("Error")
      }
    )

    this.hideInputFile();
  }

  onChange(event: any) {
    
    if (event.target.files.length > 0) {
        const file:File = event.target.files[0];
        this.file=file;
    }
  }

  public showInputFile(): void {
    this.isInputFileVisible = true;

  }
  public hideInputFile(): void {
    this.isInputFileVisible = false;
  }


  public deleteItem( path : string ) : void
  {

  }

  public editItem( path : string ) : void
  {

  }
 

 

  
   





}
