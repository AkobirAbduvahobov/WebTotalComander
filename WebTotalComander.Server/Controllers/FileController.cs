using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebTotalComander.Service.Services;
using WebTotalComander.Service.ViewModels;

namespace WebTotalComander.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FileController : ControllerBase
{

    private readonly IFileService _fileService;

    public FileController(IFileService fileService)
    {
        _fileService = fileService;
    }

    [HttpPost("upload")]
    public async Task<ActionResult<bool>> UploadFile( [FromForm] FileViewModel fileViewModel)
    {
        if (fileViewModel.File == null || fileViewModel.File.Length == 0)
            return BadRequest(false);

        var res = await _fileService.SaveFileAsync(fileViewModel);

        if (res)
            return Ok(res);

        return NotFound(false);  
    }

    [HttpDelete("delete")]
    public async Task<ActionResult<bool>> DeleteFile(string fileName, string filePath="")
    {
        if (fileName == null || fileName.Length == 0)
            return BadRequest(false);

        var res = await _fileService.DeleteFileAsync(fileName, filePath);

        if (res)
            return Ok(res);

        return NotFound(false);
    }

    [HttpGet("download-file")]
    public async Task<IActionResult> DownloadFile(string filePath)
    {
        var type = filePath.Substring(filePath.LastIndexOf('.') + 1 );   
        
        var memoryStream = await _fileService.DownloadFileAsync(filePath);

        var res = File(memoryStream, $"application/{type}");

        return res;
    }
}
