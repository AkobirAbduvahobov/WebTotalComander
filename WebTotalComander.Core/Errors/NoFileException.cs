using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace WebTotalComander.Core.Errors
{
    [Serializable]
    internal class NoFileException : Exception
    {
        public NoFileException() { }
        public NoFileException(string message) : base(message) { }
        public NoFileException(string message, Exception inner) : base(message, inner) { }
        protected NoFileException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}
