using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using WebSocketSharp;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace BookTracker.Websocket
{
    public partial class Form1 : Form
    {
        private WebSocket ws;

        public Form1()
        {
            InitializeComponent();
            
        }

        private void button1_Click(object sender, EventArgs e)
        {
            ws = new WebSocketSharp.WebSocket(textBoxUri.Text);
            
            ws.OnMessage += Ws_OnMessage;
            ws.OnError += Ws_OnError;
            ws.Connect();
           // ws.Send("BALUS");
        }

        private void Ws_OnError(object sender, ErrorEventArgs e)
        {
            Console.WriteLine(e.Message);
        }

        private void Ws_OnMessage(object sender, MessageEventArgs e)
        {
            Console.WriteLine(e.Data);
        }

        private void button2_Click(object sender, EventArgs e)
        {
            if(ws.IsAlive)
            {
                ws.Close();
                ws = null;
            }
        }

        private void buttonSendMessage_Click(object sender, EventArgs e)
        {
            ws.Send(textBoxMessage.Text);
        }

        private void SetLogText(string text)
        {
            textBoxLog.Text = $"{textBoxLog.Text}{Environment.NewLine}{text}";
        }
    }
}
