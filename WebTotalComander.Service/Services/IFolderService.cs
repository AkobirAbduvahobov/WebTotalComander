using WebTotalComander.Service.ViewModels;

namespace WebTotalComander.Service.Services;

public interface IFolderService
{
    public Task<bool> CreateFolderAsync(FolderViewModel folderViewModel);
    public Task<bool> DeleteFolderAsync(string folderPath = "");
    public Task<string[]> GetAllFilesAsync(string folderPath = "");
}
