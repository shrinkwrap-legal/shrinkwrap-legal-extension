import React, { useEffect, useState } from 'react';
import { getOnChangedListener, getSetting } from '../service/storage';

export const StandardSearchSetter: React.FC = () => {
  const [searchStandard, setSearchStandard] = useState<string>('');

  useEffect(() => {
    function handleChange(changes: any, area: string) {
      if (area === 'local' && changes) {
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
      setSearchParams(value);
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
