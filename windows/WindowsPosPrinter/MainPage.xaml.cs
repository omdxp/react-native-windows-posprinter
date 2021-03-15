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
        private const string pLine = "------------------------------------------------";
        private const string pCollectedAmount = "Collected amount : ";
        private const string pDiscount = "Discount : ";
        private const string pCharge = "Charge : ";
        private const string pCaissier = "Caissier : ";
        private const string pTotal = "Total : ";
        private const string pTicketNumber = "Ticket number : #";
        [ReactMethod("printReceipt")]
        public bool printReceipt(
            List<string> ticketDetails,
            List<string> products)
        {
            string storeName = ticketDetails[0];
            string addrs = ticketDetails[1];
            string phoneNumber = ticketDetails[2];
            string numberOfCopies = ticketDetails[3];
            string ticketNumber = ticketDetails[4];
            string collectedAmount = ticketDetails[5];
            string discount = ticketDetails[6];
            string charge = ticketDetails[7];
            string caissier = ticketDetails[8];
            string total = ticketDetails[9];

            bool printed = false;
            try
            {
                for (int i = 0; i < int.Parse(numberOfCopies); i++)
                {
                    SelectCharSizeHeight(CharSizeHeight.Double).Add(InitializePrinter).Print(address);
                    SelectCharSizeHeight(CharSizeHeight.Triple).Add("").Print(address);
                    SelectCharSizeWidth(CharSizeWidth.Triple).Add("").Print(address);
                    SelectJustification(Justification.Center).Add(storeName, LF).Print(address);
                    SelectCharSizeHeight(CharSizeHeight.Normal).Add("").Print(address);
                    SelectJustification(Justification.Center).Add(addrs, LF).Print(address);
                    SelectJustification(Justification.Center).Add(phoneNumber, LF).Print(address);
                    SelectJustification(Justification.Center).Add(pLine, LF).Print(address);
                    products.ForEach(delegate (String product)
                    {
                        SelectJustification(Justification.Left).Add("* " + product, LF).Print(address);
                    });
                    SelectJustification(Justification.Center).Add(pLine, LF).Print(address);
                    SelectJustification(Justification.Left).Add(pCollectedAmount + collectedAmount, LF).Print(address);
                    SelectJustification(Justification.Left).Add(pDiscount + discount, LF).Print(address);
                    SelectJustification(Justification.Left).Add(pCharge + charge, LF).Print(address);
                    SelectJustification(Justification.Left).Add(pCaissier + caissier, LF).Print(address);
                    SelectCharSizeHeight(CharSizeHeight.Triple).Add(LF).Print(address);
                    SelectCharSizeWidth(CharSizeWidth.Double).Add("").Print(address);
                    SelectJustification(Justification.Center).Add(pTotal + total, LF).Print(address);
                    SelectCharSizeHeight(CharSizeHeight.Normal).Add(LF).Print(address);
                    SelectJustification(Justification.Center).Add(pLine, LF).Print(address);
                    SelectCharSizeHeight(CharSizeHeight.Normal).Add("").Print(address);
                    SelectJustification(Justification.Left).Add(pTicketNumber + ticketNumber, LF).Print(address);
                    SelectJustification(Justification.Left).Add(DateTime.Now.ToString(), LF).Print(address);
                    SelectCharSizeHeight(CharSizeHeight.Double).Add("").Print(address);
                    SelectJustification(Justification.Center).Add(LF).Print(address);
                    PrintQRCode(ticketNumber).Print(address);
                    SelectCharSizeHeight(CharSizeHeight.Triple).Add("").Print(address);
                    SelectCharSizeWidth(CharSizeWidth.Double).Add(LF).Print(address);
                    SelectJustification(Justification.Center).Add("Merci pour votre visite", LF, LF, LF, LF, LF, PaperCut).Print(address);
                }

                SelectJustification(Justification.Center).Add(PrintAndReturnToStandardMode, OpenDrawer).Print(address);
                printed = true;
            }
            catch (Exception)
            {

            }
            return printed;
        }
    }
}
