
namespace WebTotalComander.Repository.Services;

public class FolderRepository : IFolderRepository
{
    private static readonly string uploadFolderPath = "D:\\Projects\\WebTotalComander\\WebTotalComander.DataAccess\\DataBase\\";
    public async Task<bool> CreateFolderAsync(string folderName, string folderPath = "")
    {
        string path = uploadFolderPath + folderPath + folderName;
        if (Directory.Exists(path))
            return false;

        Directory.CreateDirectory(path);
        return true;
    }

    public async Task<bool> DeleteFolderAsync(string folderName, string folderPath = "")
    {
        string path = uploadFolderPath + folderPath + folderName;
        if (!Directory.Exists(path))
            return false;
            

        Directory.Delete(path);
        return true;
    }
}
