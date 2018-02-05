using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.RunnerConsole
{
    public static class DriverExtensions
    {
        public static IJavaScriptExecutor Scripts(this IWebDriver driver)
        {
            return (IJavaScriptExecutor)driver;
        }

        public static T ExecuteScript<T>(this IWebDriver driver, string script)
        {
            return (T)driver.Scripts().ExecuteScript(script);
        }
    }
}
