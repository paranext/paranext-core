using System.Text.Json;
using System.Text.Json.Serialization;
using Paratext.Data;

namespace Paranext.DataProvider.JsonUtils;

public class InternetSettingsMementoConverter
    : JsonConverter<InternetAccess.InternetSettingsMemento>
{
    private const string SELECTED_SERVER = "selectedServer";
    private const string PERMITTED_INTERNET_USE = "permittedInternetUse";
    private const string PROXY_PORT = "proxyPort";
    private const string PROXY_HOST = "proxyHost";
    private const string PROXY_USERNAME = "proxyUsername";
    private const string PROXY_PASSWORD = "proxyPassword";
    private const string PROXY_MODE = "proxyMode";
    private const string OVERRIDE_DBL_SERVER = "overrideDBLServer";
    private const string OVERRIDE_DBL_API_SERVER = "overrideDBLApiServer";
    private const string OVERRIDE_GBC_SERVER = "overrideGbcServer";
    private const string DBL_EMAIL = "dblEmail";
    private const string DBL_PASSWORD = "dblPassword";

    public override InternetAccess.InternetSettingsMemento Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options
    )
    {
        ServerType selectedServer = ServerType.Production;
        InternetUse permittedInternetUse = InternetUse.VpnRequired;
        int proxyPort = 0;
        string? proxyHost = null;
        string? proxyUsername = null;
        string? proxyPassword = null;
        string? proxyMode = null;
        string? overrideDBLServer = null;
        string? overrideDBLApiServer = null;
        string? overrideGbcServer = null;
        string? dblEmail = null;
        string? dblPassword = null;

        string? lastPropertyName = null;
        // The starting token is consumed before we get the reader
        int onObjectLevel = 1;
        while (onObjectLevel > 0 && reader.Read())
        {
            switch (reader.TokenType)
            {
                case JsonTokenType.StartObject:
                case JsonTokenType.StartArray:
                    onObjectLevel++;
                    break;
                case JsonTokenType.EndObject:
                case JsonTokenType.EndArray:
                    onObjectLevel--;
                    break;
                case JsonTokenType.PropertyName:
                    lastPropertyName = reader.GetString();
                    break;
                case JsonTokenType.True:
                case JsonTokenType.False:
                    lastPropertyName = null;
                    break;
                case JsonTokenType.Number:
                    switch (lastPropertyName)
                    {
                        case PROXY_PORT:
                            proxyPort = reader.GetInt32();
                            break;
                    }
                    lastPropertyName = null;
                    break;
                case JsonTokenType.String:
                    switch (lastPropertyName)
                    {
                        case SELECTED_SERVER:
                            var selectedServerString = reader.GetString();
                            if (!string.IsNullOrEmpty(selectedServerString))
                            {
                                selectedServer = selectedServerString switch
                                {
                                    "Production" => ServerType.Production,
                                    "QualityAssurance" => ServerType.QualityAssurance,
                                    "Development" => ServerType.Development,
                                    "Test" => ServerType.Test,
                                    _ => throw new JsonException(
                                        $"Invalid selectedServer value {selectedServerString}! Must provide a ServerType value"
                                    ),
                                };
                            }
                            break;
                        case PERMITTED_INTERNET_USE:
                            var permittedInternetUseString = reader.GetString();
                            if (!string.IsNullOrEmpty(permittedInternetUseString))
                            {
                                permittedInternetUse = permittedInternetUseString switch
                                {
                                    "Enabled" => InternetUse.Enabled,
                                    "VpnRequired" => InternetUse.VpnRequired,
                                    "Disabled" => InternetUse.Disabled,
                                    "ProxyOnly" => InternetUse.ProxyOnly,
                                    _ => throw new JsonException(
                                        $"Invalid permittedInternetUse value {permittedInternetUseString}! Must provide an InternetUse value"
                                    ),
                                };
                            }
                            break;
                        case PROXY_HOST:
                            proxyHost = reader.GetString() ?? "";
                            break;
                        case PROXY_USERNAME:
                            proxyUsername = reader.GetString() ?? "";
                            break;
                        case PROXY_PASSWORD:
                            proxyPassword = reader.GetString() ?? "";
                            break;
                        case PROXY_MODE:
                            proxyMode = reader.GetString() ?? "";
                            break;
                        case OVERRIDE_DBL_SERVER:
                            overrideDBLServer = reader.GetString() ?? "";
                            break;
                        case OVERRIDE_DBL_API_SERVER:
                            overrideDBLApiServer = reader.GetString() ?? "";
                            break;
                        case OVERRIDE_GBC_SERVER:
                            overrideGbcServer = reader.GetString() ?? "";
                            break;
                        case DBL_EMAIL:
                            dblEmail = reader.GetString() ?? "";
                            break;
                        case DBL_PASSWORD:
                            dblPassword = reader.GetString() ?? "";
                            break;
                    }
                    lastPropertyName = null;
                    break;
            }
        }

        return new InternetAccess.InternetSettingsMemento
        {
            SelectedServer = selectedServer,
            PermittedInternetUse = permittedInternetUse,
            ProxyPort = proxyPort,
            ProxyHost = proxyHost,
            ProxyUsername = proxyUsername,
            ProxyPassword = proxyPassword,
            ProxyMode = proxyMode,
            OverrideDBLServer = overrideDBLServer,
            OverrideDBLApiServer = overrideDBLApiServer,
            OverrideGbcServer = overrideGbcServer,
            DBLEmail = dblEmail,
            DBLPassword = dblPassword,
        };
    }

    public override void Write(
        Utf8JsonWriter writer,
        InternetAccess.InternetSettingsMemento value,
        JsonSerializerOptions options
    )
    {
        writer.WriteStartObject();
        var selectedServer = value.SelectedServer switch
        {
            ServerType.QualityAssurance => "QualityAssurance",
            ServerType.Development => "Development",
            ServerType.Test => "Test",
            _ => "Production",
        };
        writer.WriteString(SELECTED_SERVER, selectedServer);
        var permittedInternetUse = value.PermittedInternetUse switch
        {
            InternetUse.Enabled => "Enabled",
            InternetUse.Disabled => "Disabled",
            InternetUse.ProxyOnly => "ProxyOnly",
            _ => "VpnRequired",
        };
        writer.WriteString(PERMITTED_INTERNET_USE, permittedInternetUse);
        writer.WriteNumber(PROXY_PORT, value.ProxyPort);
        writer.WriteString(PROXY_HOST, value.ProxyHost);
        writer.WriteString(PROXY_USERNAME, value.ProxyUsername);
        writer.WriteString(PROXY_PASSWORD, value.ProxyPassword);
        writer.WriteString(PROXY_MODE, value.ProxyMode);
        writer.WriteString(OVERRIDE_DBL_SERVER, value.OverrideDBLServer);
        writer.WriteString(OVERRIDE_DBL_API_SERVER, value.OverrideDBLApiServer);
        writer.WriteString(OVERRIDE_GBC_SERVER, value.OverrideGbcServer);
        writer.WriteString(DBL_EMAIL, value.DBLEmail);
        writer.WriteString(DBL_PASSWORD, value.DBLPassword);
        writer.WriteEndObject();
    }
}
