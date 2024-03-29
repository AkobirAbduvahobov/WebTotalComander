﻿using Microsoft.AspNetCore.Mvc;
using System.IO;
using WebTotalComander.Core.Errors;
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
    [DisableRequestSizeLimit]
    public async Task<ActionResult<bool>> UploadFile([FromForm] FileViewModel fileViewModel)
    {
        if (fileViewModel.File == null || fileViewModel.File.Length == 0)
            throw new RequestParametrsInvalidExeption("Invalid parametrs");

        var stream = fileViewModel.File.OpenReadStream();
        
        var res = await _fileService.SaveFileAsync(stream , fileViewModel.File.FileName, fileViewModel.FilePath);
     
        if (res)
            return Ok(res);

        return NotFound(false);
    }

    [HttpPost("replace")]
    public async Task<ActionResult<bool>> ReplaceFile([FromForm] FileViewModel fileViewModel)
    {
        if (fileViewModel.File == null || fileViewModel.File.Length == 0)
            throw new RequestParametrsInvalidExeption("Invalid parametrs");

        var res = await _fileService.ReplaceFileAsync(fileViewModel);
      
        if (res)
            return Ok(res);

        return NotFound(false);
    }

    [HttpDelete("delete")]
    public async Task<ActionResult<bool>> DeleteFile(string fileName, string filePath = "")
    {
        if (fileName == null || fileName.Length == 0)
             throw new RequestParametrsInvalidExeption("Invalid parametrs");

        var res = await _fileService.DeleteFileAsync(fileName, filePath);
      
        if (res)
            return Ok(res);

        return NotFound(false);
    }

    [HttpGet("download-file")]
    [DisableRequestSizeLimit]
    public async Task<IActionResult> DownloadFile(string filePath)
    {
        var type = filePath.Substring(filePath.LastIndexOf('.') + 1);

        var memoryStream = await _fileService.DownloadFileAsync(filePath);

        var res = File(memoryStream, $"application/{type}");
        
        return res;
    }
}
