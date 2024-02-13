using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace WebTotalComander.Core.Errors
{
    [Serializable]
    public class NoFolderException : Exception
    {
        public NoFolderException() { }
        public NoFolderException(string message) : base(message) { }
        public NoFolderException(string message, Exception inner) : base(message, inner) { }
        protected NoFolderException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}
