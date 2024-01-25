using WebTotalComander.Service.ViewModels;

namespace WebTotalComander.Service.Services;

public interface IFolderService
{
    public Task<bool> CreateFolderAsync(FolderViewModel folderViewModel);
    public Task<bool> DeleteFolderAsync(FolderViewModel folderViewModel);
}
