using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.RunnerConsole
{
    public static class Helpers
    {
        public static IWebDriver CreateWebDriver()
        {
            //ChromeDriverService service = ChromeDriverService.CreateDefaultService();
            //service.SuppressInitialDiagnosticInformation = true;

            ChromeOptions optsChrome = new ChromeOptions();
            //optsChrome.AddArgument("--headless");

            //Create the reference for our browser
            IWebDriver driver = new ChromeDriver(optsChrome);
            return driver;
        }
    }
}
