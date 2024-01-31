import { Component, OnInit } from '@angular/core';
import { FolderService } from '../../services/folder.service';
import { Observable } from 'rxjs';
import { AnimationBuilder } from '@angular/animations';
import { FileService } from '../../services/file.service';
import { Folder } from '../../services/models/folder';
import { FolderGet } from '../../services/models/folderGet';
import { FileExFo } from '../../services/models/fileExFo';

import {
  AddEvent,
  CancelEvent,
  EditEvent,
  RemoveEvent,
  SaveEvent,
  GridComponent,
  GridItem,
  CellClickEvent,
} from "@progress/kendo-angular-grid";
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public path: string = "my files";
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
        this.path = this.folderGet.folderPath;

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

  onCellClick(event: any): void {
    if( event.dataItem?.fileExtension == "folder" )
    {
      this.path = this.path + '/' +  event.dataItem?.fileName;
    }
    
    this.getAll(this.path);
  }

  // onFolderNameClick(event: any, folderName: string): void {
  //   // You can use the folderName as needed
  //   this.path = folderName;
  //   this.getAll(this.path);
  // }

  public getNameType( name : string, type : string = '' ) : void
  {

  }

  public addFolder(): void {
    
    console.log(this.folderName);
    this.folderService.createFolder(this.folderName, this.path).subscribe(
      (response) => {
        console.log(response);
        console.log("Response")
        this.getAll(this.path);
      },
      (error) => {
        console.log(error);
        console.log("Error")
        this.getAll(this.path);
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
        this.getAll(this.path);
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
    this.folderService.deleteFolder( this.path + "/" + path ).subscribe(
      (response) => {
        console.log("response + " + response );
        this.getAll(this.path);
      },
      (error) => {
        console.log("error + " + error );
        this.getAll(this.path);
      }

    )
  }

  public cellClickHandler(args: CellClickEvent): void {
    if( args.dataItem.fileExtension === "folder" )
    {
      this.path = this.path + "/" + args.dataItem.fileName;
      this.getAll(this.path);
    }
    
  }

  public delete({ dataItem }: RemoveEvent): void {
    if( dataItem.fileExtension === "folder" )
    {
      this.deleteItem(dataItem.fileName);
    }
    else
    {
      this.fileService.deleteFile( this.path , dataItem.fileName + dataItem.fileExtension ).subscribe(
        (response) =>
        {
          console.log("Response of deleteFile " + response);
          this.getAll(this.path);
        },
        (error) => {
          console.log("Error of deleteFile " + error);
          this.getAll(this.path);
        }
      )
    }
   
  }

  public editItem( path : string ) : void
  {

  }
 

 

  
   





}
