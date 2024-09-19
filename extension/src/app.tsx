import React from 'react';
import Main from '@/components/Main';
import { logWithLevel } from '@/utils/logUtils';
import { showError } from '@/components/error/ErrorBoundary';

async function main() {
  try {
    // Wait for necessary Spicetify objects to be available
    while (
      !Spicetify?.showNotification ||
      !Spicetify?.Player ||
      !Spicetify?.React ||
      !Spicetify?.Platform
    ) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    let rootElement = document.getElementById('lucid-main');
    if (!rootElement) {
      rootElement = document.createElement('div');
      rootElement.id = 'lucid-main';
      const mainElement = document.getElementById('main');
      mainElement?.prepend(rootElement);
    }

    if (rootElement && !rootElement.hasChildNodes()) {
      Spicetify.ReactDOM.createRoot(rootElement).render(<Main />);
    }

    logWithLevel('info', 'Lucid ignited! 🚀', {
      styles:
        'font-weight: bold; font-size: 1.25rem; color: #2196F3; padding: 0.5rem 0;',
    });
  } catch (error) {
    showError(error);
  }
}

export default main;
