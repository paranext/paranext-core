using System;
using System.Threading;
using System.Threading.Tasks;

namespace EdgeLibrary
{
  public class EdgeMethods
  {
    private static int timesCalledStatic = 0;
    private int timesCalled = 0;

    public EdgeMethods()
    {
      Console.WriteLine("Default constructor run for LocalMethods!");
    }

    private string GetTimesCalled()
    {
      return " Times called static: " + ++timesCalledStatic + " Times called: " + ++timesCalled;
    }

    public async Task<object> GetAppDomainDirectory(dynamic input)
    {
      return AppDomain.CurrentDomain.BaseDirectory + GetTimesCalled();
    }

    public async Task<object> GetCurrentTime(dynamic input)
    {
      return DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + GetTimesCalled();
    }

    public async Task<object> UseDynamicInput(dynamic input)
    {
      return $".NET Core welcomes {input}" + GetTimesCalled();
    }

    public async Task<object> ThrowException(dynamic input)
    {
      throw new Exception("Sample Exception");
    }

    public async Task<object> ShortAsynchronousMethod(dynamic input)
    {
      Console.WriteLine("ShortAsynchronousMethod called!");
      return "ShortAsynchronousMethod finished" + GetTimesCalled();
    }

    public object ShortSynchronousMethod(dynamic input)
    {
      Console.WriteLine("ShortSynchronousMethod called!");
      return "ShortSynchronousMethod finished" + GetTimesCalled();
    }

    public async Task<object> LongAsyncMethod(dynamic input)
    {
      Console.WriteLine("LongAsyncMethod Start!");
      await Task.Delay(2000);
      Console.WriteLine("LongAsyncMethod Done Delaying!");
      return "LongAsyncMethod finished" + GetTimesCalled();
    }

    public async Task<object> LongBlockingMethod(dynamic input)
    {
      Console.WriteLine("LongBlockingMethod Start!");
      Thread.Sleep(2000);
      Console.WriteLine("LongBlockingMethod Done Sleeping!");
      return "LongBlockingMethod finished" + GetTimesCalled();
    }
  }
}
