declare module 'hello-world' {
  import type { DataProviderDataType, MandatoryProjectDataTypes } from '@papi/core';
  import type { IBaseProjectDataProvider } from 'papi-shared-types';

  export type HelloWorldProjectDataTypes = MandatoryProjectDataTypes & {
    /**
     * A random number (or set to a specific number) generated with the selector being the max
     * possible value for the number
     */
    RandomNumber: DataProviderDataType<number, number, number>;
    /** One list of names for the project. No meaningful selector information. */
    Names: DataProviderDataType<undefined, string[], never>;
  };

  export type HelloWorldProjectDataProviderMethods = {
    /**
     * Get one of the random numbers that has been generated up to this point. If there have not
     * been any random numbers generated yet, returns a random number between 0 and 1
     */
    getAnyRandomNumber(): Promise<number>;
    /** Add a name to the list of names for this project */
    addName(name: string): Promise<boolean>;
    /** Remove a name from the list of names for this project */
    removeName(name: string): Promise<boolean>;
  };

  export type IHelloWorldProjectDataProvider =
    IBaseProjectDataProvider<HelloWorldProjectDataTypes> & HelloWorldProjectDataProviderMethods;

  /** Event containing information about `helloWorld` */
  type HelloWorldEvent = {
    /**
     * How many times the `helloWorld` function has been run (called by `helloWorld.helloWorld`
     * command)
     */
    times: number;
  };

  /** All html color names according to https://htmlcolorcodes.com/color-names/ */
  type HTMLColorNames =
    | 'IndianRed'
    | 'LightCoral'
    | 'Salmon'
    | 'DarkSalmon'
    | 'LightSalmon'
    | 'Crimson'
    | 'Red'
    | 'FireBrick'
    | 'DarkRed'
    | 'Pink'
    | 'LightPink'
    | 'HotPink'
    | 'DeepPink'
    | 'MediumVioletRed'
    | 'PaleVioletRed'
    | 'Coral'
    | 'Tomato'
    | 'OrangeRed'
    | 'DarkOrange'
    | 'Orange'
    | 'Gold'
    | 'Yellow'
    | 'LightYellow'
    | 'LemonChiffon'
    | 'LightGoldenrodYellow'
    | 'PapayaWhip'
    | 'Moccasin'
    | 'PeachPuff'
    | 'PaleGoldenrod'
    | 'Khaki'
    | 'DarkKhaki'
    | 'Lavender'
    | 'Thistle'
    | 'Plum'
    | 'Violet'
    | 'Orchid'
    | 'Fuchsia'
    | 'Magenta'
    | 'MediumOrchid'
    | 'MediumPurple'
    | 'RebeccaPurple'
    | 'BlueViolet'
    | 'DarkViolet'
    | 'DarkOrchid'
    | 'DarkMagenta'
    | 'Purple'
    | 'Indigo'
    | 'SlateBlue'
    | 'DarkSlateBlue'
    | 'MediumSlateBlue'
    | 'GreenYellow'
    | 'Chartreuse'
    | 'LawnGreen'
    | 'Lime'
    | 'LimeGreen'
    | 'PaleGreen'
    | 'LightGreen'
    | 'MediumSpringGreen'
    | 'SpringGreen'
    | 'MediumSeaGreen'
    | 'SeaGreen'
    | 'ForestGreen'
    | 'Green'
    | 'DarkGreen'
    | 'YellowGreen'
    | 'OliveDrab'
    | 'Olive'
    | 'DarkOliveGreen'
    | 'MediumAquamarine'
    | 'DarkSeaGreen'
    | 'LightSeaGreen'
    | 'DarkCyan'
    | 'Teal'
    | 'Aqua'
    | 'Cyan'
    | 'LightCyan'
    | 'PaleTurquoise'
    | 'Aquamarine'
    | 'Turquoise'
    | 'MediumTurquoise'
    | 'DarkTurquoise'
    | 'CadetBlue'
    | 'SteelBlue'
    | 'LightSteelBlue'
    | 'PowderBlue'
    | 'LightBlue'
    | 'SkyBlue'
    | 'LightSkyBlue'
    | 'DeepSkyBlue'
    | 'DodgerBlue'
    | 'CornflowerBlue'
    | 'RoyalBlue'
    | 'Blue'
    | 'MediumBlue'
    | 'DarkBlue'
    | 'Navy'
    | 'MidnightBlue'
    | 'Cornsilk'
    | 'BlanchedAlmond'
    | 'Bisque'
    | 'NavajoWhite'
    | 'Wheat'
    | 'BurlyWood'
    | 'Tan'
    | 'RosyBrown'
    | 'SandyBrown'
    | 'Goldenrod'
    | 'DarkGoldenrod'
    | 'Peru'
    | 'Chocolate'
    | 'SaddleBrown'
    | 'Sienna'
    | 'Brown'
    | 'Maroon'
    | 'White'
    | 'Snow'
    | 'HoneyDew'
    | 'MintCream'
    | 'Azure'
    | 'AliceBlue'
    | 'GhostWhite'
    | 'WhiteSmoke'
    | 'SeaShell'
    | 'Beige'
    | 'OldLace'
    | 'FloralWhite'
    | 'Ivory'
    | 'AntiqueWhite'
    | 'Linen'
    | 'LavenderBlush'
    | 'MistyRose'
    | 'Gainsboro'
    | 'LightGray'
    | 'Silver'
    | 'DarkGray'
    | 'Gray'
    | 'DimGray'
    | 'LightSlateGray'
    | 'SlateGray'
    | 'DarkSlateGray'
    | 'Black';
}

declare module 'papi-shared-types' {
  import type { IHelloWorldProjectDataProvider, HTMLColorNames } from 'hello-world';

  export interface CommandHandlers {
    'helloWorld.helloWorld': () => string;
    'helloWorld.helloException': (message: string) => void;
    /**
     * Opens a new Hello World Project WebView and returns the WebView id
     *
     * @param projectId Optional project ID of the project to open. Prompts the user to select a
     *   project if not provided
     * @returns WebView id for new Hello World Project WebView or `undefined` if the user canceled
     *   the dialog
     */
    'helloWorld.openProject': (projectId?: string) => Promise<string | undefined>;
    /**
     * Creates a new Hello World project with a random name
     *
     * @param openWebView Whether to open a web view for the new project. Defaults to true
     * @returns Project id of the new hello world project
     */
    'helloWorld.createNewProject': (openWebView?: boolean) => Promise<string>;
    /**
     * Deletes a Hello World project
     *
     * @param projectId Optional project ID of the project to delete. Prompts the user to select a
     *   project if not provided
     * @returns `true` if successfully deleted
     */
    'helloWorld.deleteProject': (projectId?: string) => Promise<boolean>;
    /**
     * Deletes a Hello World project
     *
     * Note: this command is intended to work from the web view menu
     *
     * @param webViewId Optional web view ID of a hello world project web view associated with the
     *   project to delete. Prompts the user to select a project if not provided
     * @returns `true` if successfully deleted
     */
    'helloWorld.deleteProjectByWebViewId': (webViewId?: string) => Promise<boolean>;
    /**
     * Opens the viewer for a Hello World project
     *
     * Note: this command is intended to work from the web view menu
     *
     * @param webViewId Optional web view ID of a hello world project web view associated with the
     *   project to open the viewer for. Prompts the user to select a project if not provided
     * @returns WebView id for new viewer or `undefined` if the user canceled the dialog
     */
    'helloWorld.openViewerByWebViewId': (webViewId?: string) => Promise<string | undefined>;
  }

  export interface ProjectDataProviderInterfaces {
    helloWorld: IHelloWorldProjectDataProvider;
  }

  export interface SettingTypes {
    /** Selected Person's Name on Hello World Web View */
    'helloWorld.personName': string;
  }

  export interface ProjectSettingTypes {
    /** Size of the header font in `em`. Must be an integer */
    'helloWorld.headerSize': number;
    /**
     * Color of the headers (must be a valid [HTML color
     * name](https://htmlcolorcodes.com/color-names/))
     */
    'helloWorld.headerColor': HTMLColorNames;
  }
}
