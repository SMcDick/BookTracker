using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.Diagnostics;

namespace BookTracker.RunnerConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            string _isbn = "9781433805615";
            for (int i = 0; i < args.Length; i++)
            {
                if (string.Compare(args[i], "-isbn", true) == 0)
                {
                    _isbn = args[i + 1];
                    break;
                }
            }

            IWebDriver driver = Helpers.CreateWebDriver();

            var bookScrapy = new BookScraper(driver);
            var bookScouterScrapy = new BookScouterScrapy(driver);

            Console.WriteLine("Press enter to continue");
            Console.ReadKey();

            driver.Quit();
            driver.Dispose();
        }
    }
}
