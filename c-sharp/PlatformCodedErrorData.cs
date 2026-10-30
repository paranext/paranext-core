using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using StreamJsonRpc.Protocol;

namespace Paranext.DataProvider;

/// <summary>
/// The JSON-RPC <c>error.data</c> of a request whose handler threw an exception carrying a
/// <see cref="PlatformErrorCodes"/> code: the usual <see cref="CommonErrorData"/> fields plus
/// <c>data: { platformErrorCode: "&lt;CODE&gt;" }</c>, the place the TypeScript network service
/// reads the code from.
/// </summary>
[DataContract]
internal class PlatformCodedErrorData : CommonErrorData
{
    public PlatformCodedErrorData(CommonErrorData copyFrom, string platformErrorCode)
    {
        TypeName = copyFrom.TypeName;
        Message = copyFrom.Message;
        StackTrace = copyFrom.StackTrace;
        HResult = copyFrom.HResult;
        Inner = copyFrom.Inner;
        Data = new Dictionary<string, string>
        {
            [PlatformErrorCodes.PlatformErrorCodeDataKey] = platformErrorCode,
        };
    }

    [DataMember(Name = "data")]
    [JsonPropertyName("data")]
    public IReadOnlyDictionary<string, string> Data { get; }
}
