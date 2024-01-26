import { Component, OnInit } from '@angular/core';
import { FolderService } from '../../services/folder.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  folderPath: string = '';
  constructor(private folderService: FolderService) { }

  

  ngOnInit(): void {
    this.getAll(this.folderPath);
  }

  public getAll(folderPath: string): void {
    this.folderService.getAll(folderPath).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    )
  }







}
