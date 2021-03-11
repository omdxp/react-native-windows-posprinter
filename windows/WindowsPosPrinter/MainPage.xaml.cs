using Microsoft.ReactNative;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;
using Microsoft.ReactNative.Managed;
using static ESCPOS.Commands;
using ESCPOS;
using ESCPOS.Utils;

// The Blank Page item template is documented at https://go.microsoft.com/fwlink/?LinkId=234238

namespace WindowsPosPrinter
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
            var app = Application.Current as App;
            reactRootView.ReactNativeHost = app.Host;
        }
    }

    /// <summary>
    /// A native implementation for pos printer
    /// </summary>
    [ReactModule]
    class PosPrinter
    {
        private const string address = "10.10.100.254:9100";
        private const string pTitle = "KIO Store";
        private const string pAddress = "Mesra, Mostaganem";
        private const string pNumber = "0540869390";
        private const string pProductExamplePrice = "5000.00 DA * (1)";
        private const string pProductExampleTitle = "Aspirine Upsa";
        private const string pLine = "-----------------------------------";
        private const string pCollectedAmount = "Collected amount : 5600 DA";
        private const string pDiscount = "Discount : 0 DA";
        private const string pCharge = "0.00 DA";
        private const string pTotal = "Total : 5600 DA";
        private const string pTicketNumber = "Ticket number : #1125";
        private string pDate = DateTime.Now.ToString();
        private const string pCombienDeCopie = "Combien de copie?";
        private const string pNombreCopie = "1";
        [ReactMethod("printReceipt")]
        public void printReceipt(string storeName, string addrs, string phoneNumber, string numberOfCopies)
        {
            for (int i = 0; i < int.Parse(numberOfCopies); i++)
            {
                SelectCharSizeHeight(CharSizeHeight.Double).Add(InitializePrinter, LF).Print(address);
                SelectJustification(Justification.Center).Add(storeName, LF).Print(address);
                SelectCharSizeHeight(CharSizeHeight.Normal).Add(LF).Print(address);
                SelectJustification(Justification.Center).Add("Address", LF).Print(address);
                SelectJustification(Justification.Center).Add(addrs, LF).Print(address);
                SelectJustification(Justification.Center).Add("Number", LF).Print(address);
                SelectJustification(Justification.Center).Add(phoneNumber, LF).Print(address);
                SelectJustification(Justification.Center).Add(pLine, LF).Print(address);
                SelectJustification(Justification.Left).Add("* Product example", LF).Print(address);
                SelectJustification(Justification.Left).Add(pProductExamplePrice, LF).Print(address);
                SelectJustification(Justification.Left).Add(pProductExampleTitle, LF).Print(address);
                SelectJustification(Justification.Center).Add(pLine, LF).Print(address);
                SelectJustification(Justification.Left).Add(pCollectedAmount, LF).Print(address);
                SelectJustification(Justification.Left).Add(pDiscount, LF).Print(address);
                SelectJustification(Justification.Left).Add(pCharge, LF).Print(address);
                SelectCharSizeHeight(CharSizeHeight.Double).Add(LF).Print(address);
                SelectJustification(Justification.Center).Add(pTotal, LF).Print(address);
                SelectCharSizeHeight(CharSizeHeight.Normal).Add(LF).Print(address);
                SelectJustification(Justification.Center).Add(pLine, LF).Print(address);
                SelectCharSizeHeight(CharSizeHeight.Normal).Add(LF).Print(address);
                SelectJustification(Justification.Left).Add(pTicketNumber, LF).Print(address);
                SelectJustification(Justification.Left).Add(pDate, LF).Print(address);
                SelectJustification(Justification.Center).Add(pCombienDeCopie, LF).Print(address);
                SelectJustification(Justification.Center).Add(numberOfCopies, LF).Print(address);
                SelectCharSizeHeight(CharSizeHeight.Double).Add(LF).Print(address);
                SelectJustification(Justification.Center).Add("Merci pour votre visite", LF, LF, LF, LF, LF, PaperCut).Print(address);
            }

            SelectJustification(Justification.Center).Add(PrintAndReturnToStandardMode, OpenDrawer).Print(address);
        }
    }
}
