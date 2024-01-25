using Microsoft.AspNetCore.Http;

namespace WebTotalComander.Repository.Services;

public class FileRepository : IFileRepository
{
    private static readonly string uploadFolderPath = "D:\\Projects\\WebTotalComander\\WebTotalComander.DataAccess\\DataBase\\";

    public async Task<bool> SaveFileAsync(IFormFile file, string path = "")
    {
        var filePath = Path.Combine(uploadFolderPath + path, file.FileName);

        string path1 = "";
        if(path != string.Empty)
        {
            path1 = path.Remove(path.Length - 1);
        }

        if (!Directory.Exists(uploadFolderPath + path1))
            return false;

        if (File.Exists(filePath))
            return false ;



        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return true;
    }

    public async Task<bool> DeleteFileAsync(string fileName, string path = "")
    {
        var filePath = Path.Combine(uploadFolderPath + path, fileName);
        if (File.Exists(filePath))
        {
            File.Delete(filePath);
            return true;
        }
        else
        {
            return false;
        }
    }
}

