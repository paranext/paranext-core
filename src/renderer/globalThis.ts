/**
 * Module to set up globalThis and polyfills in the renderer
 */

import { ProcessType } from '@shared/globalThis';

globalThis.processType = ProcessType.Renderer;
