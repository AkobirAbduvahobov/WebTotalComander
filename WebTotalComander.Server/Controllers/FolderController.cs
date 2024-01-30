using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
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
            if (folderViewModel.FolderName == null || folderViewModel.FolderName == string.Empty )
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

            if(res)
                return Ok(true);

            return NotFound(false);
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<FolderViewModelResponse>> GetAllFiles(string folderPath = "")
        {
             
            var res = await _folderService.GetAllFilesAsync(folderPath);

            if( res.FolderPath == null )
                res.FolderPath = string.Empty;

            return Ok(res);

        }

        [HttpGet("getAllWithPagination")]
        public async Task<ActionResult<FilesWithPagination>> GetFilesWithPagination(int offset, int limit, string folderPath = "")
        {

            if (offset < 0 || limit < 0)
                return BadRequest("Error");

            var res = await _folderService.GetAllFilesWithPaginationAsync(offset, limit, folderPath);

            return Ok(res);
        }
    }
}
