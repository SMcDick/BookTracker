using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.RunnerConsole
{
    public static class Log
    {
        internal static void TraceVerbose(string message, params object[] args)
        {
            Trace.TraceInformation(message, args);
        }

        internal static void TraceError(string msg, params object[] args)
        {
            Trace.TraceError(msg, args);
        }

        internal static void TraceError(Exception exception)
        {
            Exception _ex = exception;
            while (_ex != null)
            {
                TraceError("Exception --> " + _ex.Message);
                _ex = _ex.InnerException;
            }
        }
    }
}
