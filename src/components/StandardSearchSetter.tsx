import React, { useEffect, useState } from 'react';
import {
  getOnChangedListener,
  getSetting,
  storeSetting,
} from '../service/storage';

export const StandardSearchSetter: React.FC = () => {
  const [searchStandard, setSearchStandard] = useState<string>('');

  useEffect(() => {
    function handleChange(changes: any, area: string) {
      if (area === 'local' && changes && changes.searchStandard !== undefined &&
        changes.searchStandard.newValue != changes.searchStandard.oldValue) {
        storeSetting("manualSearchStandardSet", false);
        setSearchStandard(changes.searchStandard.newValue);
      }
    }

    getOnChangedListener().addListener(handleChange);

    return () => {
      getOnChangedListener().removeListener(handleChange);
    };
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      storeSetting('manualSearchStandardSet', true);
    },200);
    return () => {
      clearTimeout(timeout);
    }
  }, [])

  useEffect(() => {
    getSetting('searchStandard', 'TE').then((value) => {
      const url = new URL(window.location.href);
      const urlParams = new URLSearchParams(url.searchParams);

      //only change if not user-initated
      //which is the case, if the page is initially
      //loaded OR the initial page was opened
      //for more than 200ms
      getSetting("manualSearchStandardSet","").then((manualOverride) => {
        if (!manualOverride || urlParams.get('WxeReturnToSelf') == null) {
          storeSetting("manualSearchStandardSet", false);
          setSearchParams(value);
        }
      });
    });
  }, [searchStandard]);

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
