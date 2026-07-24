import React, { useEffect, useState } from 'react';
import { getOnChangedListener, getSetting } from '../service/storage';

/**
 * In the judicature tab, RIS renders the checkboxes for Rechtsatz and
 * Entscheidung as AutoPostBack controls, so every click - ours
 * or the user's - triggers a full page reload. We must not re-apply the default
 * when the reload was caused by a manual toggle, otherwise we would fight the
 * user. sessionStorage survives the postback reload (and is scoped to the tab),
 * and we consume the marker on the next load so a later *fresh* navigation to
 * the search page still applies the configured default.
 */
const USER_TOGGLED_KEY = 'shrinkwrapUserToggledDocType';

const readMarker = (): boolean => {
  try {
    return sessionStorage.getItem(USER_TOGGLED_KEY) === 'true';
  } catch {
    return false;
  }
};

const setMarker = (value: boolean) => {
  try {
    if (value) {
      sessionStorage.setItem(USER_TOGGLED_KEY, 'true');
    } else {
      sessionStorage.removeItem(USER_TOGGLED_KEY);
    }
  } catch {
    /* sessionStorage may be unavailable; degrade gracefully */
  }
};

export const StandardSearchSetter: React.FC = () => {
  const [searchStandard, setSearchStandard] = useState<string>('');

  // React to the user changing the default in the extension options.
  useEffect(() => {
    function handleChange(changes: any, area: string) {
      if (area === 'local' && changes && changes.searchStandard !== undefined &&
        changes.searchStandard.newValue != changes.searchStandard.oldValue) {
        // An explicit options change should always win over a previous manual toggle.
        setMarker(false);
        setSearchStandard(changes.searchStandard.newValue);
      }
    }

    getOnChangedListener().addListener(handleChange);

    return () => {
      getOnChangedListener().removeListener(handleChange);
    };
  }, []);

  useEffect(() => {
    getSetting('searchStandard', 'TE').then((value) => {
      // Always listen for real user toggles so we can respect them across the
      // AutoPostBack reload they trigger.
      attachUserToggleListeners();

      if (readMarker()) {
        // The previous load was caused by a manual checkbox click: respect it,
        // but consume the marker so the next fresh navigation applies the default.
        setMarker(false);
        return;
      }

      setSearchParams(value);
    });
  }, [searchStandard]);

  /**
   * Record a marker whenever the human toggles a document-type checkbox, so the
   * ensuing AutoPostBack reload does not get overridden. Our own programmatic
   * clicks are `isTrusted === false` and are ignored here.
   */
  const attachUserToggleListeners = () => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      '#MainContent_RsField input[type=checkbox], #MainContent_TeField input[type=checkbox]',
    );
    checkboxes.forEach((checkbox) => {
      if (checkbox.dataset.swToggleListener === 'true') {
        return;
      }
      checkbox.dataset.swToggleListener = 'true';
      checkbox.addEventListener('click', (event) => {
        if (event.isTrusted) {
          setMarker(true);
        }
      });
    });
  };

  /**
   * Set fields in RIS form based on the settings
   * @param searchStandard
   */
  const setSearchParams = (searchStandard: string) => {
    let rsCheckbox: HTMLInputElement | null = document.querySelector(
      '#MainContent_RsField input[type=checkbox]',
    );
    let teCheckbox: HTMLInputElement | null = document.querySelector(
      '#MainContent_TeField input[type=checkbox]',
    );

    if (searchStandard === 'RS' || searchStandard === 'TERS') {
      if (rsCheckbox?.checked === false) {
        rsCheckbox.click();
      }
    } else if (rsCheckbox?.checked === true) {
      rsCheckbox.click();
    }
    if (searchStandard === 'TE' || searchStandard === 'TERS') {
      if (teCheckbox?.checked === false) {
        teCheckbox.click();
      }
    } else if (teCheckbox?.checked === true) {
      teCheckbox.click();
    }
  };

  return <div className={"shrinkwrapStandardSearchSetter"}></div>;
};
