using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using BookTracker.Models.Options;
using BookTracker.Models.System;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace BookTracker.Services
{
    public class SysAppService : ISysAppService
    {
        private readonly SystemOptions _systemOptions;
        private readonly KeepaOptions _options;
        private readonly EnvorimentOptions _envOptions;
        private readonly Formulas _formulas;

        public SysAppService(IOptionsSnapshot<SystemOptions> systemOptions, IOptions<KeepaOptions> options, IOptionsSnapshot<Formulas> formulaOptions, IOptions<EnvorimentOptions> envOption)
        {
            _systemOptions = systemOptions.Value;
            _options = options.Value;
            _envOptions = envOption.Value;
            _formulas = formulaOptions.Value;
        }

        public SystemOptions GetConfig()
        {
            return _systemOptions;
        }

        public KeepaOptions GetKeepaOptions()
        {
            return _options;
        }

        public Task Reset()
        {
            return Reset(CancellationToken.None);
        }

        public async Task Reset(CancellationToken token)
        {
            var opt = new SystemOptions();
            opt.Box1 = new Box
            {
                Color = "Green",
                Enabled = true,
                Name = "Box 1",
                Rules = new Rule[]
                {
                    new Rule
                    {
                        MaximumSalesRank = 1000,
                        MinimumSalesRank = 10,
                        MinimumNetPayout = 22
                    }
                },
                SoundPath = ""
            };
            opt.Box2 = new MinBox
            {
                Color = "Red",
                Enabled = true,
                OfferGreaterThan = 1000,
                SoundPath = ""
            };
            opt.Box3 = new Box
            {
                Color = "Blue",
                Enabled = true,
                Name = "Box 3",
                Rules = new Rule[]
                {
                    new Rule
                    {
                        MaximumSalesRank = 1000,
                        MinimumSalesRank = 10,
                        MinimumNetPayout = 22
                    }
                },
                SoundPath = ""
            };
            opt.Box4 = new Box
            {
                Color = "Yellow",
                Enabled = true,
                Name = "Box 4",
                Rules = new Rule[]
                {
                    new Rule
                    {
                        MaximumSalesRank = 1000,
                        MinimumSalesRank = 10,
                        MinimumNetPayout = 22
                    }
                },
                SoundPath = ""
            };
            opt.Box5 = new Box
            {
                Color = "Grey",
                Enabled = true,
                Name = "Box 5",
                Rules = new Rule[]
                {
                    new Rule
                    {
                        MaximumSalesRank = 1000,
                        MinimumSalesRank = 10,
                        MinimumNetPayout = 22
                    }
                },
                SoundPath = ""
            };
            await Update(opt, token);
        }

        public Task Update(SystemOptions config)
        {
            return Update(config, CancellationToken.None);
        }

        public Task Update(SystemOptions config, CancellationToken token)
        {
            if (config == null)
                throw new ArgumentNullException(nameof(config));
            if (token == null)
                throw new ArgumentNullException(nameof(token));

            string data = GetSerializedData(config);
            File.WriteAllText(Path.Combine(_envOptions.RootDir, "appdata.json"), data);
            return Task.FromResult(0);
        }

        public Task UpdateKeepaOptions(KeepaOptions data, CancellationToken token)
        {
            if (data == null)
                throw new ArgumentNullException(nameof(data));
            if (token == null)
                throw new ArgumentNullException(nameof(token));

            string content = GetSerializedData(data, "KeepaSettings");
            File.WriteAllText(Path.Combine(_envOptions.RootDir, "keepa.json"), content);
            return Task.FromResult(0);
        }

        internal static string GetSerializedData<T>(T options, string rootProp = "SysConfig")
        {
            ExpandoObject data = new ExpandoObject();
            ICollection<KeyValuePair<string, object>> d = data;
            //data[rootProp] = options;
            d.Add(new KeyValuePair<string, object>(rootProp, options));
            return JsonConvert.SerializeObject(data);
        }

        public Formulas GetFormulas()
        {
            return _formulas;
        }

        public Task UpdateFormulas(Formulas data, CancellationToken token)
        {
            if (data == null)
                throw new ArgumentNullException(nameof(data));
            if (token == null)
                throw new ArgumentNullException(nameof(token));

            string content = GetSerializedData(data, "Formulas");
            File.WriteAllText(Path.Combine(_envOptions.RootDir, "formulas.json"), content);
            return Task.FromResult(0);
        }
    }
}
