using Microsoft.AspNetCore.Http;
using WebTotalComander.Repository.Services;
using WebTotalComander.Service.ViewModels;

namespace WebTotalComander.Service.Services;

public class FileService : IFileService
{
    private readonly IFileRepository _fileRepository;

    public FileService(IFileRepository fileRepository)
    {
        _fileRepository = fileRepository;
    }

    public async Task<bool> SaveFileAsync(FileViewModel fileViewModel)
    {
        if (fileViewModel.FilePath != string.Empty)
        {
            fileViewModel.FilePath += "\\";
        }
        return await _fileRepository.SaveFileAsync(fileViewModel.File, fileViewModel.FilePath);
    }

    public async Task<bool> DeleteFileAsync(string fileName, string path = "")
    {
        return await _fileRepository.DeleteFileAsync(fileName, path);
    }

}
