using System.ComponentModel.DataAnnotations;
using WebTotalComander.Repository.Services;
using WebTotalComander.Service.ViewModels;

namespace WebTotalComander.Service.Services;

public class FolderService : IFolderService
{
    private readonly IFolderRepository _folderRepository;

    public FolderService(IFolderRepository folderRepository)
    {
        _folderRepository = folderRepository;
    }

    public async Task<bool> CreateFolderAsync(FolderViewModel folderViewModel)
    {
        if(folderViewModel.FolderPath != string.Empty)
        {
            folderViewModel.FolderName = "\\" + folderViewModel.FolderName;
        }
        return await _folderRepository.CreateFolderAsync(folderViewModel.FolderName, folderViewModel.FolderPath);
    }

    public async Task<bool> DeleteFolderAsync(string folderPath = "")
    {
        
        return await _folderRepository.DeleteFolderAsync(folderPath);
    }

    public async Task<FolderViewModelResponse> GetAllFilesAsync(string folderPath = "")
    {
        var resPathes = await _folderRepository.GetAllFilesAsync(folderPath);

        var extensions = GetFileExtensions(resPathes.ToList());
        var names = GetFileNamesWithoutExtensions(resPathes.ToList());



        var folderViewModelResponse = new FolderViewModelResponse()
        {
            Extensions = extensions,
            Names = names,
            FilesWithNamesAndExtensions = new List<FileObject>()
            
        };

        for (int i = 0; i < names.Count; i++)
        {
            folderViewModelResponse.FilesWithNamesAndExtensions.Add( new FileObject() 
            { FileExtension = extensions[i], FileName = names[i] });
        }

        if ( resPathes.Length != 0 )
        {
            var a = resPathes[0].LastIndexOf("\\");
            if (a != -1)
                folderViewModelResponse.FolderPath = resPathes[0].Substring(0,a);
            else
                folderViewModelResponse.FolderPath = null;
        }
        else
        {
            folderViewModelResponse.FolderPath = folderPath;
        }

       

        return folderViewModelResponse;
    }


    public async Task<byte[]> DownloadZipAsync(string folderPath, string zipFileName)
    {
        return await _folderRepository.DownloadZipAsync(folderPath, zipFileName);
    }

    public async Task<FilesWithPagination> GetAllFilesWithPaginationAsync( int offset, int limit,  string folderPath = "")
    {
        var resPathes = await _folderRepository.GetAllFilesWithPaginationAsync(offset, limit, folderPath);  

        var extensions = GetFileExtensions(resPathes.ToList());
        var names = GetFileNamesWithoutExtensions(resPathes.ToList());



        var filesWithPagination = new FilesWithPagination()
        {
            FilesWithNamesAndExtensions = new List<FileObject>()     
        };

        for (int i = 0; i < names.Count; i++)
        {
            filesWithPagination.FilesWithNamesAndExtensions.Add(new FileObject()
            { FileExtension = extensions[i], FileName = names[i] });
        }

        if (resPathes.Length != 0)
        {
            var a = resPathes[0].LastIndexOf("\\");
            if (a != -1)
                filesWithPagination.FolderPath = resPathes[0].Substring(0,a);
            else
                filesWithPagination.FolderPath = null;
        }
        else
        {
            filesWithPagination.FolderPath = folderPath;
        }

        filesWithPagination.TotalCountFolders = await _folderRepository.GetTotalCount(folderPath);

        return filesWithPagination;
    }



    private static List<string> GetFileExtensions(List<string> filePaths)
    {
        List<string> extensions = new List<string>();

        foreach (string filePath in filePaths)
        {
            string[] parts = filePath.Split('.');

            // Check if the file path has an extension
            if (parts.Length > 1)
            {
                extensions.Add("." + parts[parts.Length - 1]);
            }
            else
            {
                extensions.Add("folder"); // No extension found
            }
        }

        return extensions;
    }

    private static List<string> GetFileNamesWithoutExtensions(List<string> filePaths)
    {
        List<string> fileNamesWithoutExtensions = new List<string>();

        foreach (string filePath in filePaths)
        {
            string[] parts = filePath.Split('\\'); // Split based on the backslash
            string fileNameWithExtension = parts[parts.Length - 1];

            // Check if the file path has an extension
            if (fileNameWithExtension.Contains('.'))
            {
                string fileNameWithoutExtension = fileNameWithExtension.Split('.')[0];
                fileNamesWithoutExtensions.Add(fileNameWithoutExtension);
            }
            else
            {
                fileNamesWithoutExtensions.Add(fileNameWithExtension); // No extension found
            }
        }

        return fileNamesWithoutExtensions;
    }
}
