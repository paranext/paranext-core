import {
  COMMAND_LINE_ARGS,
  getCommandLineArgument,
  getCommandLineArgumentsGroup,
} from './command-line.util';

describe('getCommandLineArgumentsGroup', () => {
  test('should pass all args through for a group including the arg name', () => {
    const commandLineStuff = ['--extensionDirs', 'thing', 'thing2', '--otherThing'];
    process.argv = commandLineStuff;

    const group = getCommandLineArgumentsGroup(COMMAND_LINE_ARGS.ExtensionsDir, true);

    expect(group).toEqual(commandLineStuff.slice(0, 3));
  });
});

describe('getCommandLineArgument', () => {
  test('should return value for --window-size alias', () => {
    process.argv = ['node', 'app.js', '--window-size', '1920x1080'];

    expect(getCommandLineArgument(COMMAND_LINE_ARGS.WindowSize)).toBe('1920x1080');
  });

  test('should return value for --windowSize alias', () => {
    process.argv = ['node', 'app.js', '--windowSize', '1920x1080'];

    expect(getCommandLineArgument(COMMAND_LINE_ARGS.WindowSize)).toBe('1920x1080');
  });

  test('should return undefined when --window-size is not present', () => {
    process.argv = ['node', 'app.js'];

    expect(getCommandLineArgument(COMMAND_LINE_ARGS.WindowSize)).toBeUndefined();
  });
});
