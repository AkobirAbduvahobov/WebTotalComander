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
    public async Task<ActionResult<bool>> UploadFile(FileViewModel fileViewModel)
    {
        if (fileViewModel.File == null || fileViewModel.File.Length == 0)
            return BadRequest(false);

        var res = await _fileService.SaveFileAsync(fileViewModel);

        if (res)
            return Ok(res);

        return NotFound(false);

        
    }
}
