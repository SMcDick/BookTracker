using BookTracker.RunnerConsole.Models;
using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.RunnerConsole
{
    public class BookScouterScrapy
    {
        private readonly string _baseUri = @"https://api.bookscouter.com/v3/";
        private readonly IWebDriver _driver;

        public BookScouterScrapy()
            : this(Helpers.CreateWebDriver())
        {

        }

        public BookScouterScrapy(IWebDriver driver)
        {
            _driver = driver;
        }

        public BookScouter GetBook(string isbn)
        {
            _driver.Navigate().GoToUrl(new Uri($"{_baseUri}search?term={isbn}"));

            Console.WriteLine("Press enter to continue");
            Console.ReadKey();

            var priceElement = _driver.FindElement(By.CssSelector("div.featured__price"));
            return new BookScouter(priceElement.Text);
        }
    }
}
