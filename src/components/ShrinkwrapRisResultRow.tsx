import React, {useEffect, useState} from "react";
import {api, CaseLawResponseDto, GetShrinkwrapDocumentParamsCourtEnum} from "../api";
import { getReadTimeInMinutesFromWordcount } from "../utils/string-utils";

interface ShrinkwrapRowProps {
    court: string;
    docNumber: string;
}

export const ShrinkwrapRow: React.FC<ShrinkwrapRowProps> = ({ court, docNumber}) => {
    const [showSummary, setShowSummary] = useState(false);
    const [isFetching, setIsFetching] = useState(false)
    const [caseData, setCaseData] = useState<CaseLawResponseDto | null>(null)

    useEffect(() => {
        setIsFetching(true);
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
            <td colSpan={8} className={`shrinkwrapRow bocListDataCell ${showSummary ? ' showSummary' : ''}`}
                onClick={() => setShowSummary(s => !s)}>
                {caseData.wordCount && (<span style={{color: 'grey'}} title={caseData.wordCount + " Wörter"}>({Math.ceil(getReadTimeInMinutesFromWordcount(caseData.wordCount))} min.)&ensp;</span>)}
                <span className="shrinkwrapTitle">{caseData.summary?.zeitungstitel_boulevard}</span>
                {showSummary && (
                    <div className="shrinkwrapSummary">{caseData.summary?.zusammenfassung_3_saetze}</div>
                )}
            </td>)
    );
};