namespace WebTotalComander.Service.ViewModels;

public class FolderViewModelResponse
{
    public string? FolderPath { get; set; } = string.Empty;
    public List<string>? Extensions { get; set; }
    public List<string>? Names { get; set; }
    public List<FileObject>? FilesWithNamesAndExtensions { get; set; }
}
