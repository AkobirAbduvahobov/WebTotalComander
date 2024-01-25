using Microsoft.AspNetCore.Http;
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
            if (folderViewModel.FolderName == null || folderViewModel.FolderName.StartsWith(" "))
                return BadRequest("No folder created");

            await _folderService.CreateFolderAsync(folderViewModel);

            return Ok("Folder created successfully");
        }

        [HttpDelete("delete")]
        public async Task<ActionResult<bool>> DeleteFolder(FolderViewModel folderViewModel)
        {
            if (folderViewModel.FolderName == null || folderViewModel.FolderName.StartsWith(" "))
                return BadRequest(false);

            var res = await _folderService.DeleteFolderAsync(folderViewModel);

            if(res)
                return Ok(true);

            return NotFound(false);
        }
    }
}
