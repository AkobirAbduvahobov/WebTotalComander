using Microsoft.AspNetCore.Mvc;
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
          /*  if (folderPath == "my files")
            {
                folderPath = "";
            }
            if( folderPath.StartsWith("my files"))
            {
                folderPath = folderPath.Remove(0, 9);
            }
*/
            var res = await _folderService.GetAllFilesAsync(folderPath);

            /*if (res.FolderPath == null)
            {
                res.FolderPath = "my files";
                
            }

            else
                res.FolderPath = "my files/" + res.FolderPath;*/

            return Ok(res);

        }

        [HttpGet("getAllWithPagination")]
        public async Task<ActionResult<FilesWithPagination>> GetFilesWithPagination(int offset, int limit, string folderPath = "")
        {

            if (offset < 0 || limit < 0)
                return BadRequest("Error");

            var res = await _folderService.GetAllFilesWithPaginationAsync(offset, limit, folderPath);

            Thread.Sleep(800);
            if(res.FilesWithNamesAndExtensions.Count != 0 )
            {
                foreach (var file in res.FilesWithNamesAndExtensions)
                {
                    if( file.FileExtension != "folder" )
                        file.FileName += file.FileExtension;
                }
            }
           
            

            return Ok(res);
        }


        [HttpGet("downloadZip")]
        public async Task<IActionResult> DownloadFolder(string folderPath)
        {

            string zipFileName = "";
            int index = folderPath.LastIndexOf('/');

            if (index >= 0 )
            {
                zipFileName = folderPath.Substring(index+1);
            }
            else
                zipFileName = folderPath;
          
            try
            {
                var zipFileBytes = await _folderService.DownloadZipAsync(folderPath, zipFileName);
                var res = File(zipFileBytes, "application/zip", zipFileName);
                return res;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
