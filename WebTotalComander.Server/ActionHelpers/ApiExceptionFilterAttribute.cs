using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WebTotalComander.Core.Errors;


namespace NTierApplication.Web.ActionHelpers
{
    public class ApiExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext actionExecutedContext)
        {
            var code = 500;
            if (actionExecutedContext.Exception is FileAlreadyExistException)
            {
                code = 409; // HTTP for Not Found
            }

            if (actionExecutedContext.Exception is FolderAlreadyExistException)
            {
                code = 409; // Bad request
            }

            if (actionExecutedContext.Exception is NoFileException)
            {
                code = 404; // Bad request
            }

            if (actionExecutedContext.Exception is NoFolderException)
            {
                code = 404; // Bad request
            }

            if (actionExecutedContext.Exception is RequestParametrsInvalidExeption)
            {
                code = 422; // Bad request
            }

            if (actionExecutedContext.Exception is DirectoryNotFoundException)
            {
                code = 404; // Bad request
            }

            actionExecutedContext.HttpContext.Response.StatusCode = code;
            actionExecutedContext.Result = new JsonResult(new
            {
                error = actionExecutedContext.Exception.Message
            });
        }
    }
}
