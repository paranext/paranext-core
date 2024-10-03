import { COMMAND_LINE_ARGS, getCommandLineArgumentsGroup } from './command-line.util';

describe('getCommandLineArgumentsGroup', () => {
  test('should pass all args through for a group including the arg name', () => {
    const commandLineStuff = ['--extensionDirs', 'thing', 'thing2', '--otherThing'];
    process.argv = commandLineStuff;

    const group = getCommandLineArgumentsGroup(COMMAND_LINE_ARGS.ExtensionsDir, true);

    expect(group).toEqual(commandLineStuff.slice(0, 3));
  });
});
