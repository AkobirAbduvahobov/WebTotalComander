namespace WebTotalComander.Service.ViewModels;

public class FilesWithPagination
{
    public int TotalCountFolders { get; set; }
    public string? FolderPath { get; set; } = string.Empty;
    public List<FileObject>? FilesWithNamesAndExtensions { get; set; }
}
