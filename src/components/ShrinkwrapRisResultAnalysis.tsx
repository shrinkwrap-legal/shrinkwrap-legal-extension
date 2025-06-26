import React, {useEffect, useState} from "react";
import {api, CaseLawResponseDto, GetShrinkwrapDocumentParamsCourtEnum} from "../api";
import {RobotIcon} from "../components/BootstrapIcons"

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
            setIsFetching(false);
            setCaseData(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>{(isFetching || caseData) && (
            <div className={'shrinkwrapAnalysisBlock'}>
                {isFetching && (<div className={'shrinkwrapLoading'}><div className={'indeterminate-progress-bar'}>
                    <div className="indeterminate-progress-bar__progress"></div></div></div>)}

                {caseData && (
                    <div className={`shrinkwrapAnalysis `}>
                        <div>
                            {caseData.wordCount && (<span style={{color: 'grey'}}>({caseData.wordCount.toLocaleString('de')} Wörter)&ensp;</span>)}
                            <span className="shrinkwrapTitle">{caseData.summary?.zeitungstitel_oeffentlich}</span>
                            <div className={"ai-logo-container"}><RobotIcon></RobotIcon></div>
                        </div>
                        <div className="mt-3">
                            <dl className="row">
                                <dt className="col-sm-3">Sachverhalt</dt>
                                <dd className="col-sm-9">
                                    {caseData.summary?.sachverhalt}
                                </dd>
                            </dl>
                            <dl className="row mt-2">
                                <dt className="col-sm-3">Kläger(in)</dt>
                                <dd className="col-sm-9">
                                    {caseData.summary?.begehren}
                                </dd>
                            </dl>
                            <dl className="row mt-2">
                                <dt className="col-sm-3">Beklagte(r)</dt>
                                <dd className="col-sm-9">
                                    {caseData.summary?.gegenvorbringen}
                                </dd>
                            </dl>
                            <dl className="row mt-2">
                                <dt className="col-sm-3">Schlussfolgerungen</dt>
                                <dd className="col-sm-9">
                                    {caseData.summary?.schlussfolgerungen?.map((absatz) => (
                                        <div className={"mt-1"}>{absatz}</div>
                                    ))}
                                </dd>

                            </dl>
                        </div>

                    </div>)}
            </div>
            )}
        </div>
    );
};