using Microsoft.AspNetCore.Mvc;
using WebTotalComander.Core.Errors;
using WebTotalComander.Service.Services;
using WebTotalComander.Service.ViewModels;

namespace WebTotalComander.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FolderController : ControllerBase
    {
        private readonly IFolderService _folderService;

        public FolderController(IFolderService folderService)
        {
            _folderService = folderService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateFolder(FolderViewModel folderViewModel)
        {
            if (folderViewModel.FolderName == null || folderViewModel.FolderName == string.Empty)
                return BadRequest("No folder created");

            await _folderService.CreateFolderAsync(folderViewModel);

            return Ok("Folder created successfully");
        }

        [HttpDelete("delete")]
        public async Task<ActionResult<bool>> DeleteFolder(string folderPath)
        {
            if (folderPath == null || folderPath.StartsWith(" "))
                return BadRequest(false);


            var res = await _folderService.DeleteFolderAsync(folderPath);

            if (res)
                return Ok(true);

            return NotFound(false);
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<FolderViewModelResponse>> GetAllFiles(string folderPath = "")
        {
            var res = await _folderService.GetAllFilesAsync(folderPath);
            return Ok(res);
        }

        [HttpGet("getAllWithPagination")]
        public async Task<ActionResult<FilesWithPagination>> GetFilesWithPagination(int offset, int limit, string folderPath = "")
        {
            if (offset < 0 || limit < 0)
                throw new RequestParametrsInvalidExeption("Invalid parametrs");

            var res = await _folderService.GetAllFilesWithPaginationAsync(offset, limit, folderPath);

            Thread.Sleep(800);
            if (res.FilesWithNamesAndExtensions.Count != 0)
            {
                foreach (var file in res.FilesWithNamesAndExtensions)
                {
                    if (file.FileExtension != "folder")
                        file.FileName += file.FileExtension;
                }
            }

            return Ok(res);
        }

        [HttpGet("getAllFilterByExtension")]
        public async Task<ActionResult<FilesWithPagination>> GetAllFilterByExtension(int offset, int limit, string extension = "", string fileName = "", string folderPath = "")
        {
            if (fileName == null) fileName = "";
            if (extension == null) extension = "";
            if (folderPath == null) folderPath = "";
            if (offset < 0) offset = 0;
            if (limit < 0) limit = 0;
            if (limit > 100) limit = 30;
            //jkfdd
            var res = await _folderService.GetAllFilterByExtensionAsync(offset, limit, extension, fileName, folderPath);

            Thread.Sleep(800);
            if (res.FilesWithNamesAndExtensions.Count != 0)
            {
                foreach (var file in res.FilesWithNamesAndExtensions)
                {
                    if (file.FileExtension != "folder")
                        file.FileName += file.FileExtension;
                }
            }

            return Ok(res);
        }


        [HttpGet("downloadZip")]
        public async Task<IActionResult> DownloadFolder(string folderPath)
        {

            string zipFileName;
            int index = folderPath.LastIndexOf('/');

            if (index >= 0)
            {
                zipFileName = folderPath.Substring(index + 1);
            }
            else
                zipFileName = folderPath;

            var zipFileBytes = await _folderService.DownloadZipAsync(folderPath, zipFileName);
            var res = File(zipFileBytes, "application/zip", zipFileName);
            return res;

        }
    }
}
