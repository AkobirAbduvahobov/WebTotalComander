
using WebTotalComander.Core.Errors;

namespace WebTotalComander.Repository.Services;

public class FolderRepository : IFolderRepository
{
    private static readonly string uploadFolderPath = "D:\\Projects\\WebTotalComander\\WebTotalComander.DataAccess\\DataBase\\";
    public async Task<bool> CreateFolderAsync(string folderName, string folderPath = "")
    {
        string path = uploadFolderPath + folderPath + folderName;
        if (Directory.Exists(path))
            throw new FolderAlreadyExistException("Folder already exist");

        Directory.CreateDirectory(path);
        return true;
    }

    public async Task<bool> DeleteFolderAsync(string folderPath)
    {
        string path = uploadFolderPath + folderPath;
        if (!Directory.Exists(path))
            throw new DirectoryNotFoundException("Directory was not found");

        //Directory.Delete(folderPath, recursive: true);
        Directory.Delete(path, recursive:true);
        return true;
    }

    public async Task<string[]> GetAllFilesAsync( string folderPath = "" )
    {
        if(folderPath == string.Empty) 
            uploadFolderPath.Remove(uploadFolderPath.Length-1);

        string path = uploadFolderPath + folderPath;

        if (!Directory.Exists(path))
            throw new DirectoryNotFoundException("Directory was not found");

        var res = Directory.GetFileSystemEntries(path).Select(x => x.Remove(0, uploadFolderPath.Length)).ToArray();

        return res;
    }
}
