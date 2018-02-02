using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BookTracker.RunnerConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            IWebDriver webDriver = new ChromeDriver();

            SafeContext(driver =>
            {
                driver.Navigate().GoToUrl("https://www.google.com.br");

                var element = driver.FindElement(By.Name("q"));

                element.SendKeys("execute automation");
                element.SendKeys(Keys.Enter);

                Thread.Sleep(6000);
            }, webDriver);

            
        }

        static void SafeContext(Action<IWebDriver> action, IWebDriver webDriver)
        {
            try
            {
                action(webDriver);
            }
            catch (Exception ex)
            {
                Trace.TraceError(ex.Message);
                throw;
            }
            finally
            {
                webDriver.Quit();
            }
        }
    }
}
