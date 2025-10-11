import React, { useEffect, useState } from 'react';
import {
  api,
  CaseLawResponseDto,
  GetShrinkwrapDocumentParamsCourtEnum,
} from '../api';
import { RobotIcon, CodeSlashIcon, CopyIcon } from './BootstrapIcons';

interface ShrinkwrapAnalysisProps {
    court: string;
    docNumber: string;
}

export const ShrinkwrapAnalysis: React.FC<ShrinkwrapAnalysisProps> = ({ court, docNumber}) => {
    const [showSummary, setShowSummary] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [isFetchingLonger, setIsFetchingLonger] = useState(false);
    const [caseData, setCaseData] = useState<CaseLawResponseDto | null>(null)
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        setIsFetching(true);
        fetchData().then(() => {
            setIsFetching(false)
        })
    },[docNumber,court])

    const fetchData = async () => {
        //race the response - if itst too long, show a loading indicator
        const timeout = setTimeout(() => {
            setIsFetchingLonger(true);
        }, 4000)
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
        } finally {
            clearTimeout(timeout);
        }
    }

    const copyToClipboard = async() => {
        if (!caseData?.summary) return;

        const sections = [
            { heading: 'Sachverhalt', content: caseData.summary.sachverhalt },
            { heading: 'Begehren', content: caseData.summary.begehren },
            { heading: 'Gegenvorbringen', content: caseData.summary.gegenvorbringen },
            { heading: 'Entscheidung', content: caseData.summary.entscheidung_gericht },
            { heading: 'Schlussfolgerungen\n',
                content: caseData.summary.schlussfolgerungen?.join('\n') || null
            }
        ];



        const formattedText = sections
            .map(({ heading, content }) => `${heading}: ${content}`)
            .join('\n\n') +
        '\n' + caseData.metadata?.url;

        const fullText = `${caseData.summary.zeitungstitel_oeffentlich}\n\n${formattedText}\n\n`;

        try {
            // Create a ClipboardItem with both plain text and rich text (HTML)
            const htmlContent = sections
                .map(({ heading, content }) => {
                    const headingText = heading.replace(/\*\*/g, '');
                    return `<h3>${headingText}</h3><p>${content?.replace(/\n/g, '<br>')}</p>`;
                })
                .join('');

            const fullHtml = `<h2>${caseData.summary.zeitungstitel_oeffentlich}</h2>${htmlContent}<br><p><a href="${caseData.metadata?.url}">Entscheidungstext zu ${caseData.metadata?.case_number} vom ${caseData.metadata?.decision_date} im RIS</a></p>`;

            const blob = new Blob([fullHtml], { type: 'text/html' });
            const textBlob = new Blob([fullText], { type: 'text/plain' });

            await navigator.clipboard.write([
                new ClipboardItem({
                    'text/html': blob,
                    'text/plain': textBlob
                })
            ]);
        } catch (err) {
            // Fallback to plain text if rich formatting fails
            await navigator.clipboard.writeText(fullText);
        }
    }

    return (
        <div>{(isFetching || caseData) && (
            <div className={'shrinkwrapAnalysisBlock'}>
                {isFetching && (<div className={'shrinkwrapLoading'}><div className={'indeterminate-progress-bar' + (isFetchingLonger ? ' indeterminate-progress-bar-almost-done' : '')}>
                    {isFetchingLonger && (<div className="info-text-container">Entscheidungszusammenfassung wird generiert...</div>)}
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
                          <div>
                          <a onClick={copyToClipboard}><span className={"icon"}><CopyIcon></CopyIcon></span> Kopieren</a> &middot;
                            <a onClick={() => setShowDetails(s => !s)}><span className="icon"><CodeSlashIcon></CodeSlashIcon></span> Entwicklerdetails anzeigen</a>

                          </div>
                        )}

                    </div>)}
            </div>
            )}
        </div>
    );
};
