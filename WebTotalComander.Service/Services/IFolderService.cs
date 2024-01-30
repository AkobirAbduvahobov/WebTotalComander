using WebTotalComander.Service.ViewModels;

namespace WebTotalComander.Service.Services;

public interface IFolderService
{
    public Task<bool> CreateFolderAsync(FolderViewModel folderViewModel);
    public Task<bool> DeleteFolderAsync(string folderPath = "");
    public Task<FolderViewModelResponse> GetAllFilesAsync(string folderPath = "");
    public Task<FilesWithPagination> GetAllFilesWithPaginationAsync(int offset, int limit, string folderPath = "");
}
