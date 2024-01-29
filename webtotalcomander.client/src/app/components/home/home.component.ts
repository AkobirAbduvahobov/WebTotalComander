import { Component, OnInit } from '@angular/core';
import { FolderService } from '../../services/folder.service';
import { Observable } from 'rxjs';
import { AnimationBuilder } from '@angular/animations';
import { FileService } from '../../services/file.service';
import { Folder } from '../../services/models/folder';

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




  constructor(private folderService: FolderService, private fileService : FileService) { }

  

  ngOnInit(): void {
    this.getAll(this.path);
  }

  public getAll(folderPath: string): void {
    this.pathes = this.folderService.getAll(folderPath);
    // console.log(this.pathes);
    console.log( "Component" )
    console.log(this.pathes.length)
    console.log(this.pathes[1])
    console.log(this.pathes[2])
    for( let i = 0 ; i < this.pathes.length; i++ )
    {
      console.log(i);
      console.log( i + "  " + this.pathes[i].fileName + "  ext : " + this.pathes[i].fileType  )
    }
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

  public showInputFile(): void {
    this.isInputFileVisible = true;

  }
  public hideInputFile(): void {
    this.isInputFileVisible = false;
  }

 

 

  
   





}
