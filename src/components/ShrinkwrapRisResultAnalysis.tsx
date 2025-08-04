import React, {useEffect, useState} from "react";
import {api, CaseLawResponseDto, GetShrinkwrapDocumentParamsCourtEnum} from "../api";
import {RobotIcon, CodeSlashIcon} from "../components/BootstrapIcons"

interface ShrinkwrapAnalysisProps {
    court: string;
    docNumber: string;
}

export const ShrinkwrapAnalysis: React.FC<ShrinkwrapAnalysisProps> = ({ court, docNumber}) => {
    const [showSummary, setShowSummary] = useState(false);
    const [isFetching, setIsFetching] = useState(false)
    const [caseData, setCaseData] = useState<CaseLawResponseDto | null>(null)
    const [showDetails, setShowDetails] = useState(false);

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
                    includePrompts: true
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

                {caseData && caseData.summary && (
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
                                <dt className="col-sm-3">Begehren</dt>
                                <dd className="col-sm-9">
                                    {caseData.summary?.begehren}
                                </dd>
                            </dl>
                            <dl className="row mt-2">
                                <dt className="col-sm-3">Gegenvorbringen</dt>
                                <dd className="col-sm-9">
                                    {caseData.summary?.gegenvorbringen}
                                </dd>
                            </dl>
                            {caseData.summary?.entscheidung_gericht != null && (
                                <dl className="row mt-2">
                                    <dt className="col-sm-3">Entscheidung</dt>
                                    <dd className="col-sm-9">
                                        {caseData.summary?.entscheidung_gericht}
                                    </dd>
                                </dl>
                            )}
                            <dl className="row mt-2">
                                <dt className="col-sm-3">Schlussfolgerungen</dt>
                                <dd className="col-sm-9">
                                    {caseData.summary?.schlussfolgerungen?.map((absatz) => (
                                        <div className={"mt-1"}>{absatz}</div>
                                    ))}
                                </dd>
                            </dl>
                        </div>
                        {showDetails ? (
                            <div>
                                <a onClick={() => setShowDetails(s => !s)}><span className="icon"><CodeSlashIcon></CodeSlashIcon></span> Entwicklerdetails ausblenden</a>
                                <dl className="row mt-2">
                                    <dt className="col-sm-3">Titel (Variante 1)</dt>
                                    <dd className="col-sm-9">
                                        {caseData.summary?.zeitungstitel_rechtszeitschrift}
                                    </dd>
                                </dl>
                                <dl className="row mt-2">
                                    <dt className="col-sm-3">Titel (Variante 2)</dt>
                                    <dd className="col-sm-9">
                                        {caseData.summary?.zeitungstitel_oeffentlich}
                                    </dd>
                                </dl>
                                <dl className="row mt-2">
                                    <dt className="col-sm-3">Titel (Variante 3)</dt>
                                    <dd className="col-sm-9">
                                        {caseData.summary?.zeitungstitel_boulevard}
                                    </dd>
                                </dl>
                                <dl className="row mt-2">
                                    <dt className="col-sm-3">Zusammenfassung</dt>
                                    <dd className="col-sm-9">
                                        {caseData.summary?.zusammenfassung_3_absaetze?.map((absatz) => (
                                            <div className={"mt-1"}>{absatz}</div>
                                        ))}
                                    </dd>
                                </dl>
                                <dl className="row mt-2">
                                    <dt className="col-sm-3">Rechtsgebiete (Allgemein)</dt>
                                    <dd className="col-sm-9">
                                        {caseData.summary?.hauptrechtsgebiete?.join(", ")}
                                    </dd>
                                </dl>
                                <dl className="row mt-2">
                                    <dt className="col-sm-3">Rechtsgebiete (Speziell)</dt>
                                    <dd className="col-sm-9">
                                        {caseData.summary?.unterrechtsgebiete?.join(", ")}
                                    </dd>
                                </dl>
                                <dl className="row mt-2">
                                    <dt className="col-sm-3">Zentrale Normen</dt>
                                    <dd className="col-sm-9">
                                        {caseData.summary?.wichtige_normen?.join(", ")}
                                    </dd>
                                </dl>
                                <dl className="row mt-2">
                                    <dt className="col-sm-3">Verwendetes KI-Modell</dt>
                                    <dd className="col-sm-9">
                                        {caseData.prompts?.model}
                                    </dd>
                                </dl>
                                <dl className="row mt-2">
                                    <dt className="col-sm-3">Verwendeter System Prompt</dt>
                                    <dd className="col-sm-9 prompt">
                                        {caseData.prompts?.system_prompt}
                                    </dd>
                                </dl>
                                <dl className="row mt-2">
                                    <dt className="col-sm-3">Verwendeter User Prompt</dt>
                                    <dd className="col-sm-9 prompt">
                                        {caseData.prompts?.user_prompt}
                                    </dd>
                                </dl>
                                {caseData.prompts?.removed_from_prompt && (
                                    <dl className="row mt-2">
                                        <dt className="col-sm-3">Nicht verwendeter Inhalt</dt>
                                        <dd className="col-sm-9 prompt">
                                            {caseData.prompts?.removed_from_prompt}
                                        </dd>
                                    </dl>
                                )}
                            </div>
                        ): (
                            <a onClick={() => setShowDetails(s => !s)}><span className="icon"><CodeSlashIcon></CodeSlashIcon></span> Entwicklerdetails anzeigen</a>
                            )}

                    </div>)}
            </div>
            )}
        </div>
    );
};