using System.Text.Json;
using NetLoc;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.Messages;
using Paranext.DataProvider.MessageTransports;
using Paranext.DataProvider.NetworkObjects;
using Paratext.Data;
using PtxUtils;

namespace Paranext.DataProvider;

public static class Program
{
    public static async Task Main()
    {
        Console.WriteLine("Paranext data provider starting up");

        InitializeParatextData("assets");

        using PapiClient papi = new();
        try
        {
            if (!await papi.ConnectAsync())
            {
                Console.WriteLine("Paranext data provider could not connect");
                return;
            }

            if (!papi.RegisterRequestHandler(RequestType.AddOne, RequestAddOne))
            {
                Console.WriteLine("Paranext data provider could not register request handler");
                return;
            }

            var tdp = new TimeDataProvider(papi);
            tdp.RegisterDataProvider();

            Console.WriteLine("Paranext data provider ready!");
            papi.BlockUntilMessageHandlingComplete();
        }
        finally
        {
            await papi.DisconnectAsync();
        }

        Console.WriteLine("Paranext data provider shutting down");
    }

    internal static void InitializeParatextData(string paratextDataFolder)
    {
        // ParatextData doesn't support macOS at the moment
        if (OperatingSystem.IsMacOS())
            return;

        RegistryU.Implementation = new DummyRegistry();
        ICUDllLocator.Initialize(false, false);
        ParatextData.Initialize(paratextDataFolder, false);
    }

    #region Request handlers

    private static ResponseToRequest RequestAddOne(dynamic val)
    {
        if (val is not JsonElement element || element.GetArrayLength() != 1)
            return ResponseToRequest.Failed("Unexpected data in request: " + val);

        int intVal = ErrorUtils.IgnoreErrors(
            "Trying to parse data from server",
            () => element[0].GetInt32()
        );

        return ResponseToRequest.Succeeded(intVal + 1);
    }

    #endregion

    #region DummyRegistry class
    private sealed class DummyRegistry : RegistryU
    {
        protected override string? GetStringInternal(string registryPath)
        {
            return null;
        }

        protected override string? GetStringInternal(string basekey, string path, string key)
        {
            return null;
        }

        protected override object? GetValInternal(string registryPath)
        {
            return null;
        }

        protected override object? GetValInternal(string baseKey, string subKey, string key)
        {
            return null;
        }

        protected override object? GetValIfExistsInternal(string registryPath)
        {
            return null;
        }

        protected override bool HasWritePermissionInternal(string registryPath)
        {
            return false;
        }

        protected override bool KeyExistsInternal(string registryPath)
        {
            return false;
        }

        // TODO: If this is needed, it might cause problems since it references RegistryKey. >.<
        //protected override bool KeyExistsInternal(RegistryKey key, string subKey)
        //{
        //    return false;
        //}

        protected override bool ValueExistsInternal(string registryPath)
        {
            return false;
        }

        protected override void SetValInternal(string registryPath, object theValue) { }

        protected override void SetValInternal(
            string baseKey,
            string subKey,
            string key,
            object theValue
        ) { }

        protected override void DelKeyInternal(string registryPath) { }

        protected override void DelKeyInternal(string baseKey, string subKey) { }
    }
    #endregion
}
