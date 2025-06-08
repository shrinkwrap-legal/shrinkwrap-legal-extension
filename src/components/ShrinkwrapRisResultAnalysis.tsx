import React, {useEffect, useState} from "react";
import {api, CaseLawResponseDto, GetShrinkwrapDocumentParamsCourtEnum} from "../api";

interface ShrinkwrapAnalysisProps {
    court: string;
    docNumber: string;
}

export const ShrinkwrapAnalysis: React.FC<ShrinkwrapAnalysisProps> = ({ court, docNumber}) => {
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
        <div className={'shrinkwrapAnalysisBlock'}>
            {isFetching && (<div className={'shrinkwrapLoading'}><div className={'indeterminate-progress-bar'}>
            <div className="indeterminate-progress-bar__progress"></div></div></div>)}

            {caseData && (
            <div className={`shrinkwrapAnalysis ${showSummary ? ' showSummary' : ''}`}
                onClick={() => setShowSummary(s => !s)}>
                <span style={{color: 'grey'}}>({caseData?.wordCount} Wörter)</span>&ensp;
                <span className="shrinkwrapTitle">{caseData?.summary?.zeitungstitel_boulevard}</span>
                {showSummary && (
                    <div className="shrinkwrapSummary">{caseData?.summary?.zusammenfassung_3_saetze}</div>
                )}
            </div>)}
        </div>
    );
};