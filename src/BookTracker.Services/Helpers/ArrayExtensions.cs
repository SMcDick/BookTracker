using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.Services.Helpers
{
    public static class ArrayExtensions
    {
        public static T GetLast<T>(this T[] data)
            where T : struct
        {
            return data[data.Length - 1];
        }
    }
}
