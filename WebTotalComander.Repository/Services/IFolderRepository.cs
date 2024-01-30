using Microsoft.AspNetCore.Http;

namespace WebTotalComander.Repository.Services;

public interface IFolderRepository
{
    public Task<bool> CreateFolderAsync(string folderName, string folderPath = "");
    public Task<bool> DeleteFolderAsync(string folderPath);
    public Task<string[]> GetAllFilesAsync(string folderPath = "");

    public Task<string[]> GetAllFilesWithPaginationAsync(int offset, int limit, string folderPath = "");

    public Task<int> GetTotalCount(string folderPath = "");
}
