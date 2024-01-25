using Microsoft.AspNetCore.Http;

namespace WebTotalComander.Service.ViewModels;

public class FileViewModel
{
    public IFormFile File { get; set; }
    public string FilePath { get; set; } = string.Empty;
}
