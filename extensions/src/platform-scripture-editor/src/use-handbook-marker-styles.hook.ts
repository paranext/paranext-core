import { useProjectSetting } from '@papi/frontend/react';
import { useStylesheet } from 'platform-bible-react';
import { isPlatformError } from 'platform-bible-utils';
import hbkengStyles from './marker-styles/hbkeng.scss?inline';
import tnnStyles from './marker-styles/tnn.scss?inline';
import tndStyles from './marker-styles/tnd.scss?inline';

const HANDBOOK_STYLES: Record<string, string> = {
  hbkeng: hbkengStyles,
  tnn: tnnStyles,
  tnd: tndStyles,
};

/**
 * Loads the marker stylesheet for a Translator's Handbook (HBKENG, TNN, TND) when the project being
 * displayed in this WebView is one of those handbooks. No-op for any other project.
 *
 * The stylesheet is injected into the WebView's iframe via a `<style>` element, so the rules only
 * affect the current iframe and do not leak into other open WebViews (project editor, other
 * resource panels, etc.). Switching handbooks tears down the previous stylesheet before installing
 * the new one.
 *
 * Stylesheets are imported statically so they ship in the webview bundle — webpack's runtime chunk
 * loader cannot resolve `publicPath` inside an injected-string iframe, so dynamic `import()` of the
 * stylesheets does not work in this environment.
 *
 * @param projectId The project whose `platform.name` should be checked against the handbook
 *   allowlist. For a resource panel, pass the _resource's_ project id (the one whose content is
 *   actually being rendered), not the user's project id.
 */
export function useHandbookMarkerStyles(projectId: string | undefined): void {
  const [projectNamePossiblyError] = useProjectSetting(projectId, 'platform.name', '');

  const projectName = isPlatformError(projectNamePossiblyError) ? '' : projectNamePossiblyError;

  const normalized = projectName.trim().toLowerCase();
  const css = HANDBOOK_STYLES[normalized];

  useStylesheet(css);
}
