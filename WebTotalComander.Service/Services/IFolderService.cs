using WebTotalComander.Service.ViewModels;

namespace WebTotalComander.Service.Services;

public interface IFolderService
{
    public Task<bool> CreateFolderAsync(FolderViewModel folderViewModel);
    public Task<bool> DeleteFolderAsync(string folderPath = "");
    public Task<FolderViewModelResponse> GetAllFilesAsync(string folderPath = "");
    public Task<FilesWithPagination> GetAllFilesWithPaginationAsync(int offset, int limit, string folderPath = "");
    public Task<byte[]> DownloadZipAsync(string folderPath, string zipFileName);
    public Task<FilesWithPagination> GetAllFilterByExtensionAsync(int offset, int limit, string extension, string fileName, string folderPath);
}
