using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace WebTotalComander.Core.Errors
{
    [Serializable]
    public class FolderAlreadyExistException : Exception
    {
        public FolderAlreadyExistException() { }
        public FolderAlreadyExistException(string message) : base(message) { }
        public FolderAlreadyExistException(string message, Exception inner) : base(message, inner) { }
        protected FolderAlreadyExistException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}
