using Microsoft.AspNetCore.Http;

namespace WebTotalComander.Repository.Services;

public interface IFileRepository
{
    public Task<bool> SaveFileAsync(IFormFile file, string path = "");
    public Task<bool> DeleteFileAsync(string fileName, string path = "");
    public Task<MemoryStream> DownloadFileAsync(string filePath);
}
