import {
  CommandLineArgs,
  getCommandLineArgument,
  getCommandLineArgumentsGroup,
  stripWrappingQuotes,
} from './command-line.util';

describe('getCommandLineArgumentsGroup', () => {
  test('should pass all args through for a group including the arg name', () => {
    const commandLineStuff = ['--extensionDirs', 'thing', 'thing2', '--otherThing'];
    process.argv = commandLineStuff;

    const group = getCommandLineArgumentsGroup(CommandLineArgs.ExtensionsDir, true);

    expect(group).toEqual(commandLineStuff.slice(0, 3));
  });
});

describe('getCommandLineArgument', () => {
  test('should return value for --window-size alias', () => {
    process.argv = ['node', 'app.js', '--window-size', '1920x1080'];

    expect(getCommandLineArgument(CommandLineArgs.WindowSize)).toBe('1920x1080');
  });

  test('should return value for --windowSize alias', () => {
    process.argv = ['node', 'app.js', '--windowSize', '1920x1080'];

    expect(getCommandLineArgument(CommandLineArgs.WindowSize)).toBe('1920x1080');
  });

  test('should return undefined when --window-size is not present', () => {
    process.argv = ['node', 'app.js'];

    expect(getCommandLineArgument(CommandLineArgs.WindowSize)).toBeUndefined();
  });
});

describe('stripWrappingQuotes', () => {
  test('should strip a matching pair of double quotes', () => {
    expect(stripWrappingQuotes('"C:\\foo"')).toBe('C:\\foo');
  });

  test('should strip a matching pair of single quotes', () => {
    expect(stripWrappingQuotes("'C:\\foo'")).toBe('C:\\foo');
  });

  test('should return the value unchanged when it has no wrapping quotes', () => {
    expect(stripWrappingQuotes('C:\\foo')).toBe('C:\\foo');
  });

  test('should return the value unchanged when the quote characters do not match', () => {
    expect(stripWrappingQuotes('\'C:\\foo"')).toBe('\'C:\\foo"');
  });

  test('should return the value unchanged when only the left side is quoted', () => {
    expect(stripWrappingQuotes('"C:\\foo')).toBe('"C:\\foo');
  });

  test('should return the value unchanged when only the right side is quoted', () => {
    expect(stripWrappingQuotes("C:\\foo'")).toBe("C:\\foo'");
  });

  test('should return an empty string when the value is an empty matching quote pair', () => {
    expect(stripWrappingQuotes('""')).toBe('');
  });

  test('should only strip the outermost pair when quotes are nested', () => {
    expect(stripWrappingQuotes('"\'C:\\foo\'"')).toBe("'C:\\foo'");
  });

  test('should return the value unchanged when shorter than two characters', () => {
    expect(stripWrappingQuotes('"')).toBe('"');
    expect(stripWrappingQuotes('')).toBe('');
  });
});
