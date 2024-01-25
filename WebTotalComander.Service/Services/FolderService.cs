using WebTotalComander.Repository.Services;
using WebTotalComander.Service.ViewModels;

namespace WebTotalComander.Service.Services;

public class FolderService : IFolderService
{
    private readonly IFolderRepository _folderRepository;

    public FolderService(IFolderRepository folderRepository)
    {
        _folderRepository = folderRepository;
    }

    public async Task<bool> CreateFolderAsync(FolderViewModel folderViewModel)
    {
        if(folderViewModel.FolderPath != string.Empty)
        {
            folderViewModel.FolderName = "\\" + folderViewModel.FolderName;
        }
        return await _folderRepository.CreateFolderAsync(folderViewModel.FolderName, folderViewModel.FolderPath);
    }

    public async Task<bool> DeleteFolderAsync(FolderViewModel folderViewModel)
    {
        return await _folderRepository.DeleteFolderAsync(folderViewModel.FolderName, folderViewModel.FolderPath);
    }
}
