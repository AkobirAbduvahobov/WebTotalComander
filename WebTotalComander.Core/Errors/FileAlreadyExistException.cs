using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace WebTotalComander.Core.Errors
{
    [Serializable]
    public class FileAlreadyExistException : Exception
    {
      
        public FileAlreadyExistException() { }
        public FileAlreadyExistException(string message) : base(message) { }
        public FileAlreadyExistException(string message, Exception inner) : base(message, inner) { }
        protected FileAlreadyExistException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}
