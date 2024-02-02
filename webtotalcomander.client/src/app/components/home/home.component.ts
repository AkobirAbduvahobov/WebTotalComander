import { Component, OnInit } from '@angular/core';
import { FolderService } from '../../services/folder.service';
import { Observable, of } from 'rxjs';
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
import { saveAs } from '@progress/kendo-drawing/dist/npm/pdf';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public path: string = "my files";
  public folderName : string = '';
  public file! : File;
  public pathes : string[] = [];
  public maxPathes : string[] = [];
  public pathesForward : string[] = [];
  public isInputFolderVisible : boolean = false;
  public isInputFileVisible : boolean = false;
  
  public flashok : number = 0;

  public shouldWork : number = 1;
  public fileNameWhileDownload : string = "";
 
  public folderGet! : FolderGet;

  public fileExFo : FileExFo[] = [];

  public currentPage = 1;
  public pageSize = 3; // Or another default value
  public totalCount: number = 0;


  constructor(private folderService: FolderService, private fileService : FileService) { }

  

  ngOnInit(): void {
    //this.getAll(this.path);
    this.getAllPagination( this.currentPage, this.pageSize, this.path )
  }

  public getAllPagination( offset:number, limit:number, folderPath : string): void {
    this.folderService.getAllPagination( offset, limit, folderPath).subscribe(
      (response) => {
        
        this.folderGet = response;
        this.fileExFo = response.filesWithNamesAndExtensions;
        this.path = this.folderGet.folderPath;
        this.totalCount = response.totalCountFolders;
        
        this.pathes = this.path.split('/').flatMap(item => (item ? [item, '/'] : ['/']));

        if (this.pathes.length > 0 && this.pathes[this.pathes.length - 1] === '/') 
        {
          this.pathes.pop();
        }

        if( this.maxPathes.length < this.pathes.length )
        {
          this.maxPathes = this.pathes;
        }

        console.log( this.pathes.length );

        

      },
      (error) =>{
        console.log( "Componenta Error " + error);
      }
    )
  }

  public getAll(folderPath: string): void {
    this.folderService.getAll(folderPath).subscribe(
      (response) => {
        
        this.folderGet = response;
        this.fileExFo = response.filesWithNamesAndExtensions;
        this.path = this.folderGet.folderPath;
        
        this.pathes = this.path.split('/').flatMap(item => (item ? [item, '/'] : ['/']));

        if (this.pathes.length > 0 && this.pathes[this.pathes.length - 1] === '/') 
        {
          this.pathes.pop();
        }

        if( this.maxPathes.length < this.pathes.length )
        {
          this.maxPathes = this.pathes;
        }

        console.log( this.pathes.length );


        // console.log( "1 " + this.folderGet.extensions );
        // console.log( "2 " + this.folderGet.names );
        // console.log( "3 " + this.folderGet.folderPath );
        // console.log( "4 " + this.folderGet.filesWithNamesAndExtensions );
        // console.log( "5 " + this.fileExFo[0].fileName );
       
        
        
        

      },
      (error) =>{
        console.log( "Componenta Error " + error);
      }
    )
  }

  public goToBack() : void
  {
    if( this.pathes.length > 1 )
    {
      this.shouldWork = 0;
      const resString = this.pathes[this.pathes.length - 2] + this.pathes[this.pathes.length - 1];
      this.pathesForward.push(resString);
      console.log( this.pathesForward )
      this.getIndex( this.pathes.length - 2 - 1 );
    }
    
  }

  public goToForward() : void
  {
    if( this.shouldWork == 0 && this.pathesForward.length > 0)
    {
      this.path = this.path + this.pathesForward[this.pathesForward.length - 1];
      console.log( "Forward : " + this.path )
      this.pathesForward.pop();
      console.log( "Forward : " + this.path )
      console.log( "Forward : " + this.pathesForward )
      this.getAll(this.path);
    }

  }

  public getIndex(index: number): void 
  {
    
    const amount = this.pathes.length - index - 1;

    this.path = '';

    for( let i = 0 ; i < amount; i++ )
    {
      this.pathes.pop();
    }

    for( let i = 0 ; i < this.pathes.length ; i++ )
    {
      this.path += this.pathes[i];
    }

    this.getAll(this.path);

  }

  // onCellClick(event: any): void {
  //   if( event.dataItem?.fileExtension == "folder" )
  //   {
  //     this.path = this.path + '/' +  event.dataItem?.fileName;
  //   }
    
  //   this.getAll(this.path);
  // }

  

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

  public downloadFile( filePath : string ) : void
  {
    this.fileService.downloadFile(filePath).subscribe(
      (response: Blob) => {
        console.log( "Download response + " + response );
        // saveAs(response as any, 'downloaded_file');
        const fileExtension = filePath.split('.').pop() || 'unknown';

        // Create a Blob from the file data
        const blob = new Blob([response], { type: `application/${fileExtension}` });

        // Create a link element
        const link = document.createElement('a');

        // Set the download attribute and create a URL for the blob
        link.download = `${this.fileNameWhileDownload}.${fileExtension}`;
        link.href = window.URL.createObjectURL(blob);

        // Append the link to the body and trigger the click event
        document.body.appendChild(link);
        link.click();

        // Clean up: remove the link and revoke the URL
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);

      },
      (error) => {
        console.log( "Download error + " + error );
      }
    )
  }

  public cellClickHandler(args: CellClickEvent): void {
    
    if( args.dataItem.fileExtension === "folder" && this.flashok === 0  )
    {
      this.pathesForward.length = 0;
      this.shouldWork++;
      this.path = this.path + "/" + args.dataItem.fileName;
      this.getAll(this.path);
    }
    else if( args.dataItem.fileExtension !== "folder" && this.flashok === 0)
    {
      this.fileNameWhileDownload = args.dataItem.fileName;
      const path = this.path + "/"+ args.dataItem.fileName + args.dataItem.fileExtension;
      this.downloadFile( path );
    }
    
    this.flashok = 0;
  }

  public delete({ dataItem }: RemoveEvent): void {
    this.flashok++;
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

 

  changePage(page: number): void {
    if (page < 1 || page > this.getTotalPages()) {
      return;
    }
    this.currentPage = page;
    this.getAllPagination(  this.currentPage, this.pageSize, this.path);
  }

  getTotalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
  }

}
