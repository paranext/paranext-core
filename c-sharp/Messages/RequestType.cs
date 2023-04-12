using PtxUtils;

namespace Paranext.DataProvider.Messages;

public sealed partial class RequestType : EnumType
{
    public static readonly Enum<RequestType> RegisterRequest = new("server:registerRequest");
    public static readonly Enum<RequestType> AddOne = new("command:addOne");

    private RequestType() { } // Can't create an instance
}
