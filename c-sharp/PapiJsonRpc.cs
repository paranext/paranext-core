using StreamJsonRpc;
using StreamJsonRpc.Protocol;

namespace Paranext.DataProvider;

/// <summary>
/// The <see cref="JsonRpc"/> connection the data provider talks to the PAPI over. A request
/// handler's exception that carries a <see cref="PlatformErrorCodes"/> code reaches the caller with
/// that code in <c>error.data.data.platformErrorCode</c>, which the TypeScript network service
/// turns into a <c>PlatformError</c> whose <c>code</c> callers can branch on in any interface
/// language.
/// </summary>
internal class PapiJsonRpc(IJsonRpcMessageHandler messageHandler) : JsonRpc(messageHandler)
{
    protected override JsonRpcError.ErrorDetail CreateErrorDetails(
        JsonRpcRequest request,
        Exception exception
    )
    {
        var details = base.CreateErrorDetails(request, exception);
        // Only the CommonErrorData shape is extended: a LocalRpcException chose its own data, and
        // any other exception strategy serializes the exception itself.
        if (
            details.Data is CommonErrorData commonErrorData
            && PlatformErrorCodes.TryFindCode(exception, out var code)
        )
            details.Data = new PlatformCodedErrorData(commonErrorData, code);
        return details;
    }
}
