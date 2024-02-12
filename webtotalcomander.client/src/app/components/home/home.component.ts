import { Component, OnInit } from '@angular/core';
import { FolderService } from '../../services/folder.service';
import { FileService } from '../../services/file.service';
import { FolderGet } from '../../services/models/folderGet';
import { FileExFo } from '../../services/models/fileExFo';

import {
  LoaderType,
  LoaderThemeColor,
  LoaderSize,
} from '@progress/kendo-angular-indicators';
import {
  CellClickEvent,
  PageChangeEvent,
} from '@progress/kendo-angular-grid';


import {
  SVGIcon,
  arrowRotateCcwIcon,
  exeIcon,
  fileAudioIcon,
  fileExcelIcon,
  fileImageIcon,
  filePdfIcon,
  fileProgrammingIcon,
  fileTxtIcon,
  fileTypescriptIcon,
  fileVideoIcon,
  fileWordIcon,
  fileZipIcon,
  folderIcon,
  homeIcon,
  xIcon,
} from '@progress/kendo-svg-icons';
import { BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { ToastrService } from 'ngx-toastr';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { FilterExpression } from '@progress/kendo-angular-filter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public path: string = 'my files';
  public folderName: string = '';
  public file!: File;
  public pathes: string[] = [];
  public maxPathes: string[] = [];
  public pathesForward: string[] = [];
  public isInputFolderVisible: boolean = false;
  public isInputFileVisible: boolean = false;

  public flashok: number = 0;

  public shouldWork: number = 1;
  public fileNameWhileDownload: string = '';

  public folderGet!: FolderGet;

  public fileExFo: FileExFo[] = [];

  public isLoading: boolean = false;

  public listItems: Number[] = [2, 3, 4, 6, 8];
  public selectedValue = 4;

  public loaders = [
    {
      type: <LoaderType>'converging-spinner',
      themeColor: <LoaderThemeColor>'info',
      size: <LoaderSize>'medium',
    },
  ];

  private defaultItems: BreadCrumbItem[] = [
    {
      text: 'Home',
      title: 'Home',
      svgIcon: homeIcon,
    },
  ];

  public items: BreadCrumbItem[] = [...this.defaultItems];
  public homeIcon: SVGIcon = homeIcon;
  public rotateIcon: SVGIcon = arrowRotateCcwIcon;

  public isPaginationVisible: boolean = true;

  private fileIcons: { [key: string]: SVGIcon } = {
    default: xIcon,
    folder: folderIcon, // You can change 'folder' to any other extension if needed
    '.pdf': filePdfIcon,
    '.jpg': fileImageIcon,
    '.jpeg': fileImageIcon,
    '.png': fileImageIcon,
    '.gif': fileImageIcon,
    '.xlsx': fileExcelIcon,
    '.xls': fileExcelIcon,
    '.docx': fileWordIcon,
    '.doc': fileWordIcon,
    '.txt': fileTxtIcon,
    '.mp4': fileVideoIcon,
    '.exe': exeIcon,
    '.py': fileProgrammingIcon,
    '.js': fileProgrammingIcon,
    '.mp3': fileAudioIcon,
    '.ts': fileTypescriptIcon,
    '.zip': fileZipIcon,
  };

  public types: Array<LoaderType> = ['converging-spinner'];

  public fileContent: string = '';
  public editedFileContent: string = '';

  public nameForEditedFile: string = '';

  public opened: boolean = false;
  public openedFilter: boolean = false;

  public skip = 0;
  public pageSize = 5;
  public totalCount: number = 0;

  public isValidFolderName: boolean = false;
  public isValidFile: boolean = false;

  public extensionResponse: string = 'all';
  public fileNameResponse: string = '';

  public pathesForBack: string[] = [];

  public filters: FilterExpression[] = [
    {
      field: 'country',
      title: 'Country',
      editor: 'string',
      operators: ['neq', 'eq'],
    },
    {
      field: 'budget',
      editor: 'number',
    },
  ];

  public listFilterItems: Array<string> = [
    'folder',
    '.mp3',
    '.mp4',
    '.png',
    '.txt',
    '.doc',
    'all',
  ];

  constructor(
    private toastr: ToastrService,
    private folderService: FolderService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    //this.getAll(this.path);
    ///this.getAllPagination( this.skip, this.pageSize, this.path );

    this.getWithFilter(
      this.skip,
      this.pageSize,
      this.extensionResponse,
      this.fileNameResponse,
      this.path
    );
  }

  onTShirtSizeChange(event: string) {
    console.log('T-shirt size changed:', event);
    this.extensionResponse = event;
    // You can perform any additional logic here if needed
  }

  public closeFilter(status: string): void {
    if (status == 'yes') {
      console.log(this.extensionResponse);
      console.log(this.fileNameResponse);

      if (this.extensionResponse === 'all') {
        this.extensionResponse = '';
      }

      this.getWithFilter(
        this.skip,
        this.pageSize,
        this.extensionResponse,
        this.fileNameResponse,
        this.path
      );
    }
    this.openedFilter = false;
  }

  public openFilter(): void {
    this.openedFilter = true;
  }

  onFilterChange(value: CompositeFilterDescriptor): void {
    console.log(value);
  }

  public onPageChange(e: PageChangeEvent): void {
    this.skip = e.skip;
    this.pageSize = e.take;
    this.getWithFilter(
      this.skip,
      this.pageSize,
      this.extensionResponse,
      this.fileNameResponse,
      this.path
    );
  }

  public getIconForExtension(extension: string): SVGIcon {
    // Check if the extension exists in the fileIcons object, if not, use the default icon
    return this.fileIcons[extension.toLowerCase()] || fileTypescriptIcon;
  }

  onPageSizeChange() {
    this.getWithFilter(
      this.skip,
      this.pageSize,
      this.extensionResponse,
      this.fileNameResponse,
      this.path
    );
  }

  public getWithFilter(
    offset: number,
    limit: number,
    extension: string,
    fileName: string,
    folderPath: string
  ): void {
    this.isLoading = true;

    this.folderService
      .getWithFilter(offset, limit, extension, fileName, folderPath)
      .subscribe(
        (response) => {
          this.folderGet = response;
          this.fileExFo = response.filesWithNamesAndExtensions;
          this.path = this.folderGet.folderPath;
          this.totalCount = response.totalCountFolders;
          console.log('Total count + ' + this.totalCount);

          this.pathes = this.path
            .split('/')
            .flatMap((item) => (item ? [item, '/'] : ['/']));

          if (
            this.pathes.length > 0 &&
            this.pathes[this.pathes.length - 1] === '/'
          ) {
            this.pathes.pop();
          }

          if (this.maxPathes.length < this.pathes.length) {
            this.maxPathes = this.pathes;
          }

          console.log(this.pathes.length);

          this.isLoading = false;
          this.makePaginationVisible(this.totalCount, this.pageSize);
        },
        (error) => {
          console.log('Componenta Error ' + error);
          this.isLoading = false;
          this.makePaginationVisible(this.totalCount, this.pageSize);
        }
      );
  }

  public getAllPagination(
    offset: number,
    limit: number,
    folderPath: string
  ): void {
    this.isLoading = true;

    this.folderService.getAllPagination(offset, limit, folderPath).subscribe(
      (response) => {
        this.folderGet = response;
        this.fileExFo = response.filesWithNamesAndExtensions;
        this.path = this.folderGet.folderPath;
        this.totalCount = response.totalCountFolders;
        console.log('Total count + ' + this.totalCount);

        this.pathes = this.path
          .split('/')
          .flatMap((item) => (item ? [item, '/'] : ['/']));

        if (
          this.pathes.length > 0 &&
          this.pathes[this.pathes.length - 1] === '/'
        ) {
          this.pathes.pop();
        }

        if (this.maxPathes.length < this.pathes.length) {
          this.maxPathes = this.pathes;
        }

        console.log(this.pathes.length);

        this.isLoading = false;
        this.makePaginationVisible(this.totalCount, this.pageSize);
      },
      (error) => {
        console.log('Componenta Error ' + error);
        this.isLoading = false;
        this.makePaginationVisible(this.totalCount, this.pageSize);
      }
    );
  }
  public makePaginationVisible(totalCount1: number, pageSize1: number): void {
    if (Math.ceil(totalCount1 / pageSize1) == 1) {
      this.isPaginationVisible = false;
    } else if (totalCount1 == 0) {
      this.isPaginationVisible = false;
    } else {
      this.isPaginationVisible = true;
    }
  }

  public getAll(folderPath: string): void {
    this.folderService.getAll(folderPath).subscribe(
      (response) => {
        this.folderGet = response;
        this.fileExFo = response.filesWithNamesAndExtensions;
        this.path = this.folderGet.folderPath;

        this.pathes = this.path
          .split('/')
          .flatMap((item) => (item ? [item, '/'] : ['/']));

        if (
          this.pathes.length > 0 &&
          this.pathes[this.pathes.length - 1] === '/'
        ) {
          this.pathes.pop();
        }

        if (this.maxPathes.length < this.pathes.length) {
          this.maxPathes = this.pathes;
        }

        console.log(this.pathes.length);

        // console.log( "1 " + this.folderGet.extensions );
        // console.log( "2 " + this.folderGet.names );
        // console.log( "3 " + this.folderGet.folderPath );
        // console.log( "4 " + this.folderGet.filesWithNamesAndExtensions );
        // console.log( "5 " + this.fileExFo[0].fileName );
      },
      (error) => {
        console.log('Componenta Error ' + error);
      }
    );
  }

  public goToBack(): void {
    if (this.pathes.length > 1) {
      this.shouldWork = 0;
      const resString =
        this.pathes[this.pathes.length - 2] +
        this.pathes[this.pathes.length - 1];
      this.pathesForward.push(resString);
      console.log(this.pathesForward);
      this.getIndex(this.pathes.length - 2 - 1);
    }
  }

  public goToBackOnly(): void {
    if (this.pathes.length > 1) {
      this.shouldWork = 0;
      this.getIndex(this.pathes.length - 2 - 1);
    }
  }

  public goToForward(): void {
    if (this.shouldWork == 0 && this.pathesForward.length > 0) {
      this.path = this.path + this.pathesForward[this.pathesForward.length - 1];
      console.log('Forward : ' + this.path);
      this.pathesForward.pop();
      console.log('Forward : ' + this.path);
      console.log('Forward : ' + this.pathesForward);
      this.getWithFilter(
        this.skip,
        this.pageSize,
        this.extensionResponse,
        this.fileNameResponse,
        this.path
      );
    }
  }

  public getIndex(index: number): void {
    const amount = this.pathes.length - index - 1;

    this.path = '';

    for (let i = 0; i < amount; i++) {
      this.pathes.pop();
    }

    for (let i = 0; i < this.pathes.length; i++) {
      this.path += this.pathes[i];
    }

    this.getWithFilter(
      this.skip,
      this.pageSize,
      this.extensionResponse,
      this.fileNameResponse,
      this.path
    );
  }

  // onCellClick(event: any): void {
  //   if( event.dataItem?.fileExtension == "folder" )
  //   {
  //     this.path = this.path + '/' +  event.dataItem?.fileName;
  //   }

  //   this.getAll(this.path);
  // }

  public addFolder(): void {
    if (this.folderName === null || this.folderName === '') {
      this.isValidFolderName = true;
      return;
    }

    this.isLoading = true;

    this.folderService.createFolder(this.folderName, this.path).subscribe(
      (response) => {
        this.toastr.success('Folder created successfully ');

        this.folderName = '';
        this.getWithFilter(
          this.skip,
          this.pageSize,
          this.extensionResponse,
          this.fileNameResponse,
          this.path
        );
      },
      (error) => {
        this.toastr.success('Folder created successfully ');
        this.folderName = '';
        this.getWithFilter(
          this.skip,
          this.pageSize,
          this.extensionResponse,
          this.fileNameResponse,
          this.path
        );
      }
    );

    this.hideInputFolder();
  }

  public showInputFolder(): void {
    if (this.isInputFileVisible == true) {
      return;
    }

    if (this.isInputFolderVisible == true) {
      this.isInputFolderVisible = false;
    } else this.isInputFolderVisible = true;

    this.isValidFolderName = false;
  }
  public hideInputFolder(): void {
    this.isInputFolderVisible = false;
    this.isValidFolderName = false;
  }

  public uploadFile(): void {
    if (this.file == null) {
      this.isValidFile = true;
      console.log('null');
      return;
    }

    this.isLoading = true;

    this.fileService.uploadFolder(this.file, this.path).subscribe(
      (response) => {
        this.toastr.success('File uploaded successfully ');
        console.log(response);
        console.log('Response');
        this.getAllPagination(this.skip, this.pageSize, this.path);
      },
      (error) => {
        console.log(error);

        console.log('Error');
        this.getAllPagination(this.skip, this.pageSize, this.path);
      }
    );

    this.hideInputFile();
  }

  onChange(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.file = file;
    }
  }

  public showInputFile(): void {
    if (this.isInputFolderVisible == true) {
      return;
    }

    if (this.isInputFileVisible) this.isInputFileVisible = false;
    else this.isInputFileVisible = true;

    this.isValidFile = false;
  }
  public hideInputFile(): void {
    this.isInputFileVisible = false;
    this.isValidFile = false;
  }

  public deleteItem(path: string): void {
    this.isLoading = true;
    this.folderService.deleteFolder(this.path + '/' + path).subscribe(
      (response) => {
        this.toastr.success('Folder deleted successfully ');
        console.log('response + ' + response);
        this.getWithFilter(
          this.skip,
          this.pageSize,
          this.extensionResponse,
          this.fileNameResponse,
          this.path
        );
      },
      (error) => {
        console.log('error + ' + error);
        this.getWithFilter(
          this.skip,
          this.pageSize,
          this.extensionResponse,
          this.fileNameResponse,
          this.path
        );
      }
    );
  }
  private saveFile(response: any): void {
    const blob = new Blob([response], { type: 'application/zip' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = 'download.zip';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  public downloadAsZip(filePath: string): void {
    ++this.flashok;
    console.log('zip ga kirdi');
    console.log(filePath);
    filePath = this.path + '/' + filePath;
    this.folderService.dowloadZip(filePath).subscribe(
      (response) => {
        this.saveFile(response);
      },
      (error) => {
        console.error('Error downloading folder:', error);
      }
    );
  }

  public downloadFile(filePath: string): void {
    this.isLoading = true;
    this.fileService.downloadFile(filePath).subscribe(
      (response: Blob) => {
        console.log('Download response + ' + response);
        this.toastr.success('File downloaded successfully ');
        const fileExtension = filePath.split('.').pop() || 'unknown';

        const blob = new Blob([response], {
          type: `application/${fileExtension}`,
        });

        const link = document.createElement('a');

        link.download = `${this.fileNameWhileDownload}.${fileExtension}`;
        link.href = window.URL.createObjectURL(blob);

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
        this.isLoading = false;
      },
      (error) => {
        console.log('Download error + ' + error);
        this.isLoading = false;
      }
    );
  }

  public cellClickHandler(args: CellClickEvent): void {
    console.log('cell works');
    if (args.dataItem.fileExtension === 'folder' && this.flashok === 0) {
      this.pathesForward.length = 0;
      this.shouldWork++;
      this.path = this.path + '/' + args.dataItem.fileName;
      this.getWithFilter(
        this.skip,
        this.pageSize,
        this.extensionResponse,
        this.fileNameResponse,
        this.path
      );
    } else if (args.dataItem.fileExtension !== 'folder' && this.flashok === 0) {
      this.fileNameWhileDownload = args.dataItem.fileName;
      const path = this.path + '/' + args.dataItem.fileName;
      this.downloadFile(path);
    }

    this.flashok = 0;
  }
  public getTextOfFile(dataItem: FileExFo): void {
    this.flashok++;
    this.nameForEditedFile = dataItem.fileName;
    this.isLoading = true;
    this.fileService
      .downloadFileForEdit(this.path + '/' + dataItem.fileName)
      .subscribe(
        (response) => {
          console.log(response);
          this.handleBlobResponse(response);
          this.opened = true;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
        }
      );
  }

  private handleBlobResponse(blob: Blob): void {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        this.fileContent = event.target.result as string;
      }
    };
    reader.readAsText(blob);
  }

  public close(status: string): void {
    console.log(`Dialog result: ${status}`);
    this.opened = false;
    if (status === 'save') {
      this.generateTextFile();
    }
  }

  generateTextFile(): void {
    const blob = new Blob([this.editedFileContent], {
      type: 'text/plain;charset=utf-8',
    });

    this.file = new File([blob], this.nameForEditedFile, {
      type: 'text/plain',
    });
    console.log('Blob + ' + this.file);
    this.isLoading = true;
    this.fileService
      .replaceFile(this.file, this.path + '/' + this.nameForEditedFile)
      .subscribe(
        (response) => {
          this.isLoading = false;
          console.log('Response + ' + response);
          this.toastr.success('File edited successfully ');
        },
        (error) => {
          this.isLoading = false;
          console.log('Error + ' + error);
        }
      );
  }

  public open(): void {
    this.opened = true;
  }

  public delete(dataItem: FileExFo): void {
    this.flashok++;
    console.log('Delete ga kirdi');
    if (dataItem.fileExtension === 'folder') {
      this.deleteItem(dataItem.fileName);
    } else {
      this.isLoading = true;
      this.fileService.deleteFile(this.path, dataItem.fileName).subscribe(
        (response) => {
          console.log('Response of deleteFile ' + response);
          this.getWithFilter(
            this.skip,
            this.pageSize,
            this.extensionResponse,
            this.fileNameResponse,
            this.path
          );
          this.toastr.success('File deleted successfully ');
        },
        (error) => {
          console.log('Error of deleteFile ' + error);
          this.getWithFilter(
            this.skip,
            this.pageSize,
            this.extensionResponse,
            this.fileNameResponse,
            this.path
          );
        }
      );
    }
  }
}
