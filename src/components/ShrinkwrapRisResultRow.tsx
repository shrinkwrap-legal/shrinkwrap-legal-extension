import React, {useEffect, useState} from "react";
import {
  api,
  CaseLawResponseDto,
  GetShrinkwrapDocumentByCourtAndDocNumberParamsEnum
} from '../api';
import { getReadTimeInMinutesFromWordcount } from "../utils/string-utils";
import { EUIcon } from './BootstrapIcons';
import {getOnChangedListener, getSetting} from "../service/storage";
import { CaretDown, CaretRight } from 'react-bootstrap-icons';

interface ShrinkwrapRowProps {
    court: string;
    docNumber: string;
    children: number;
}

export const ShrinkwrapRow: React.FC<ShrinkwrapRowProps> = ({ court, docNumber, children}) => {
    const [showSummary, setShowSummary] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [isFetchingLonger, setIsFetchingLonger] = useState(false);
    const [caseData, setCaseData] = useState<CaseLawResponseDto | null>(null);
    const [headline, setHeadline] = useState<string>('boulevard');

    useEffect(() => {
        function handleChange(changes: any, area: string) {
            if (area === "local" && changes) {
                setHeadline(changes.headline.newValue);
            }
        }

        getOnChangedListener().addListener(handleChange);

        return () => {
            getOnChangedListener().removeListener(handleChange);
        };
    }, []);

    useEffect(() => {
        setIsFetching(true);
        getSetting("headline").then(headline => {
            setHeadline(headline);
        });
        fetchData().then(() => {
            setIsFetching(false)
            setIsFetchingLonger(false)
        })
    },[docNumber,court])

    const fetchData = async () => {
        //race the response - if itst too long, show a loading indicator
        const timeout = setTimeout(() => {
            setIsFetchingLonger(true);
        }, 4000)
        try {
            let response = await api
              .getShrinkwrapDocumentByCourtAndDocNumber(court as GetShrinkwrapDocumentByCourtAndDocNumberParamsEnum, docNumber)
            setCaseData(response.data)
        } catch (e) {
            console.log(e)
        } finally {
            clearTimeout(timeout);
        }
    }

    return (
        isFetching && (<td colSpan={8} className={'shrinkwrapLoading'}><div className={'indeterminate-progress-bar' + (isFetchingLonger ? ' indeterminate-progress-bar-almost-done' : '')}>
            <div className="indeterminate-progress-bar__progress"></div></div></td>) ||
        caseData && (
            <td colSpan={children} className={`shrinkwrapRow bocListDataCell ${showSummary ? ' showSummary' : ''}`}
                onClick={() => setShowSummary(s => !s)}>
                {caseData.wordCount && (<span style={{color: 'grey'}} title={caseData.wordCount + " Wörter"}>({Math.ceil(getReadTimeInMinutesFromWordcount(caseData.wordCount))} min.)&ensp;</span>)}
              <span className="shrinkwrapTitle">
                {caseData.summary && (
                  <span className="caretIcon">{ showSummary ? (<CaretDown />) : (<CaretRight  />) }</span>
                )}
                    {caseData.summary?.eugh && (<EUIcon></EUIcon>)}
                    {shortSummary(caseData, headline)}</span>
                {showSummary && (
                    <div className="shrinkwrapSummary">{caseData.summary?.zusammenfassung_3_saetze}</div>
                )}
            </td>)
    );
};

function shortSummary(caseData: CaseLawResponseDto, headline: string) {
    if(headline === 'boulevard') {
        return caseData.summary?.zeitungstitel_boulevard;
    }
    if(headline === 'newspaper') {
        return caseData.summary?.zeitungstitel_oeffentlich;
    }
    if(headline === 'journal') {
        return caseData.summary?.zeitungstitel_rechtszeitschrift;
    }

    return caseData?.summary?.zeitungstitel_boulevard;
}
