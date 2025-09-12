import React, {useEffect, useState} from "react";
import {api, CaseLawResponseDto, GetShrinkwrapDocumentParamsCourtEnum} from "../api";
import { getReadTimeInMinutesFromWordcount } from "../utils/string-utils";
import {EUIcon} from "./BootstrapIcons";
import {getOnChangedListener, getSetting} from "../service/storage";

interface ShrinkwrapRowProps {
    court: string;
    docNumber: string;
    children: number;
}

export const ShrinkwrapRow: React.FC<ShrinkwrapRowProps> = ({ court, docNumber, children}) => {
    const [showSummary, setShowSummary] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
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
        })
    },[docNumber,court])

    const fetchData = async () => {
        try {
            let response = await api
                .getShrinkwrapDocument({
                    docNumber: docNumber!,
                    court: court! as GetShrinkwrapDocumentParamsCourtEnum,
                });
            setCaseData(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        isFetching && (<td colSpan={8} className={'shrinkwrapLoading'}><div className={'indeterminate-progress-bar'}>
            <div className="indeterminate-progress-bar__progress"></div></div></td>) ||
        caseData && (
            <td colSpan={children} className={`shrinkwrapRow bocListDataCell ${showSummary ? ' showSummary' : ''}`}
                onClick={() => setShowSummary(s => !s)}>
                {caseData.wordCount && (<span style={{color: 'grey'}} title={caseData.wordCount + " Wörter"}>({Math.ceil(getReadTimeInMinutesFromWordcount(caseData.wordCount))} min.)&ensp;</span>)}
                <span className="shrinkwrapTitle">
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