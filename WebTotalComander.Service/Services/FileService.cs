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

    public async Task<bool> SaveFileAsync(Stream stream , string fileName, string filePath)
    {
        if (filePath != string.Empty)
        {
            filePath += "\\";
        }
        return await _fileRepository.SaveFileAsync(stream, fileName, filePath);
    }

    public async Task<bool> ReplaceFileAsync(FileViewModel fileViewModel)
    {
     
        return await _fileRepository.ChangeFileAsync(fileViewModel.File, fileViewModel.FilePath);
    }

    public async Task<bool> DeleteFileAsync(string fileName, string filePath = "")
    {
        if (filePath != string.Empty)
        {
            filePath += "\\";
        }
        return await _fileRepository.DeleteFileAsync(fileName, filePath);
    }

    public async Task<MemoryStream> DownloadFileAsync(string filePath="")
    {
        return await _fileRepository.DownloadFileAsync(filePath);
    }

}
