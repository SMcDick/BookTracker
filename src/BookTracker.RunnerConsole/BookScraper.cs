using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookTracker.RunnerConsole
{
    public class BookScraper
    {
        static string PRODUCT_BOX_ID = "productInfoBox";

        private string _title;
        private string _thumbnail;
        private string _amazonPrice;
        private string _newPrice;
        private string _usedPrice;
        private string _edition;

        private readonly IWebDriver _driver;

        public BookScraper()
            : this(Helpers.CreateWebDriver())
        {

        }

        public BookScraper(IWebDriver driver)
        {
            _driver = driver;
        }

        public void RunScrapy(string isbn)
        {
            string linkTitle = RunDriveInSafeMode(ExecuteScrapyList, isbn);
            Log.TraceVerbose($"Link title {linkTitle}");

            RunDriveInSafeMode(ExecuteScrapyDetail, "https://keepa.com/#!product/1-1433805618");

            Console.WriteLine("Press enter to continue");
            Console.ReadKey();

            _driver.Quit();
            _driver.Dispose();
        }

        private string ExecuteScrapyList(IWebDriver driver, string isbn)
        {
            driver.Navigate().GoToUrl(new Uri($"https://keepa.com/#!search/1-{isbn}"));

            Console.WriteLine("Press enter to continue");
            Console.ReadKey();

            string linkTitleUri = string.Empty;

            var bookElement = driver.FindElement(By.CssSelector("div.ag-body-viewport-wrapper > div.ag-body-viewport > div.ag-body-container > div[row-index='0']"));
            if (bookElement != null)
            {
                var img = bookElement.FindElement(By.CssSelector("div[col-id=\"imagesCSV\"] > span > img"));
                _thumbnail = img.GetAttribute("src");

                var linkTitle = bookElement.FindElement(By.CssSelector("div[col-id=\"title\"] > span > a"));
                linkTitleUri = linkTitle.GetAttribute("href");

                var spanTitle = linkTitle.FindElement(By.TagName("span"));
                _title = spanTitle.GetAttribute("title");

                var amazonElem = bookElement.FindElement(By.CssSelector("div[col-id=\"AMAZON_current\"] > span > span"));
                _amazonPrice = amazonElem.Text;

                var currentPriceElem = bookElement.FindElement(By.CssSelector("div[col-id=\"NEW_current\"] > span > span"));
                _newPrice = currentPriceElem.Text;

                var usedPriceElem = bookElement.FindElement(By.CssSelector("div[col-id=\"USED_current\"] > span > span"));
                _usedPrice = usedPriceElem.Text;

                var editionElem = bookElement.FindElement(By.CssSelector("div[col-id=\"edition\"] > span > span"));
                _edition = editionElem.Text;
            }
            return linkTitleUri;
        }

        private void ExecuteScrapyDetail(IWebDriver driver, string bookUri = "https://keepa.com/#!product/1-1433805618")
        {
            //Navigate to google page
            driver.Navigate().GoToUrl(new Uri(bookUri));

            Console.WriteLine("Presse enter to continue");
            Console.ReadKey();

            var baseElement = driver.FindElement(By.Id(PRODUCT_BOX_ID));
            var titleElement = baseElement.FindElement(By.ClassName("productTableDescriptionTitle"));
            Console.WriteLine(titleElement.Text);


            var figBaseElement = driver.FindElement(By.Id("productTableImageBoxThumbs"));
            var figs = figBaseElement.FindElements(By.ClassName("productThumb"));

            List<string> _imageLst = new List<string>();

            if (figs != null && figs.Count > 0)
            {
                foreach (var fig in figs)
                {
                    _imageLst.Add(fig.GetAttribute("styles"));
                }
            }

            string title = (string)driver.Scripts().ExecuteScript("return document.title");
            Console.WriteLine($"Document title {title}");

            string data = "{path:\"user/settings\",type:\"getSettings\",version:3,id:21688}";
            dynamic r = driver.Scripts().ExecuteScript($"return pako.deflate(JSON.stringify({data}))");

            Console.WriteLine(r);
        }

        private void RunDriveInSafeMode(ref IWebDriver driver, Action<IWebDriver> action)
        {
            try
            {
                action(_driver);
            }
            catch (Exception ex)
            {
                Log.TraceError("Error executing generic action");
                Log.TraceError(ex);

                _driver.Quit();
                _driver.Dispose();
            }
        }

        private TOut RunDriveInSafeMode<TIn, TOut>(Func<IWebDriver, TIn, TOut> function, TIn functionArgument)
            where TOut : class
        {
            try
            {
                return function(_driver, functionArgument);
            }
            catch (Exception ex)
            {
                Log.TraceError("Error executing generic action");
                Log.TraceError(ex);

                _driver.Quit();
                _driver.Dispose();
            }
            return null;
        }

        private void RunDriveInSafeMode<TIn>(Action<IWebDriver, TIn> action, TIn functionArgument)
        {
            try
            {
                action(_driver, functionArgument);
            }
            catch (Exception ex)
            {
                Log.TraceError("Error executing generic action");
                Log.TraceError(ex);

                _driver.Quit();
                _driver.Dispose();
            }
        }
    }
}
