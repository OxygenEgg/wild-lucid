import React from 'react';
import Main from '@/components/Main';
import { showError } from '@/components/error/ErrorBoundary';
import { checkForCustomControls } from '@/utils/windowControls';
import { logToConsole } from './utils/logUtils';

async function main() {
  try {
    while (
      !Spicetify?.showNotification ||
      !Spicetify?.Player ||
      !Spicetify?.React ||
      !Spicetify?.Platform
    ) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const rootElement = document.createElement('div');
    rootElement.id = 'lucid-main';
    const mainElement = document.getElementById('main');
    mainElement?.prepend(rootElement);

    if (rootElement)
      Spicetify.ReactDOM.createRoot(rootElement).render(<Main />);

    // initialize global variables
    window.rootStyle = document.documentElement.style;
    window.isCustomControls = false;
    window.isLightMode = Spicetify?.Config.color_scheme === 'light' || false;
    window.isWindows =
      Spicetify.Platform?.operatingSystem === 'Windows' ||
      Spicetify.Platform.PlatformData.includes('win', 'Win');

    window.isGlobalNav = !!(
      document.querySelector('.globalNav') ||
      document.querySelector('.Root__globalNav')
    );

    // check for custom controls
    checkForCustomControls();

    logToConsole('Lucid ignited! 🚀', {
      styles:
        'font-weight: bold; font-size: 1.25rem; color: #2196F3; padding: 0.5rem 0;',
    });
  } catch (error) {
    if (error) showError(error);
  }
}

export default main;
