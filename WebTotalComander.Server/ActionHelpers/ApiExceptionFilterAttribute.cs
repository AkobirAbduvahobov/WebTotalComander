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
                code = 409; // Already Exist
            }

            if (actionExecutedContext.Exception is NoFileException)
            {
                code = 404; // Not found
            }

            if (actionExecutedContext.Exception is RequestParametrsInvalidExeption)
            {
                code = 422; // Unprocessable entry
            }

            if (actionExecutedContext.Exception is DirectoryNotFoundException)
            {
                code = 404; // Not found
            }

            actionExecutedContext.HttpContext.Response.StatusCode = code;
            actionExecutedContext.Result = new JsonResult(new
            {
                error = actionExecutedContext.Exception.Message
            });
        }
    }
}
