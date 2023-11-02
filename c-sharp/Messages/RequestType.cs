using PtxUtils;

namespace Paranext.DataProvider.Messages;

public sealed partial class RequestType : EnumType
{
    public static readonly Enum<RequestType> RegisterRequest = new("server:registerRequest");

    private RequestType() { } // Can't create an instance
}
