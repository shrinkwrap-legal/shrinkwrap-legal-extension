import React, { useEffect, useState } from 'react';
import {
  api,
  CaseLawResponseDto,
  GetShrinkwrapDocumentByCourtAndDocNumberParamsEnum,
  GetShrinkwrapDocumentParamsCourtEnum,
} from '../api';
import { RobotIcon, CodeSlashIcon, CopyIcon, CopiedIcon } from './BootstrapIcons';

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
    const [copied, setCopied] = useState(false);
    const [copiedUserPrompt, setCopiedUserPrompt] = useState(false);
    const [copiedSystemPrompt, setCopiedSystemPrompt] = useState(false);

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
              .getShrinkwrapDocumentByCourtAndDocNumber(court as GetShrinkwrapDocumentByCourtAndDocNumberParamsEnum, docNumber, {
                includePrompts: true,
              })
            setIsFetching(false);
            setCaseData(response.data)
        } catch (e) {
            console.log(e)
        } finally {
            clearTimeout(timeout);
        }
    }

    const copyTextToClipboard = async(fullText :string, type:'system'|'user') => {
      const textBlob = new Blob([fullText], { type: 'text/plain' });
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/plain': textBlob
        })
      ]);
      if (type === 'system') {
        setCopiedSystemPrompt(true);
        setTimeout(() => {
          setCopiedSystemPrompt(false);
        }, 5000);
      }
      else if (type === 'user') {
          setCopiedUserPrompt(true);
          setTimeout(() => {
            setCopiedUserPrompt(false);
          }, 5000);
      }
    }

    const copyToClipboard = async() => {
        if (!caseData?.summary) return;

        const sections = [
            { heading: 'Sachverhalt', content: caseData.summary.sachverhalt },
            { heading: 'Begehren', content: caseData.summary.begehren },
            { heading: 'Gegenvorbringen', content: caseData.summary.gegenvorbringen },
            { heading: 'Entscheidung', content: caseData.summary.entscheidung_gericht },
            { heading: 'Schlussfolgerungen',
                content: caseData.summary.schlussfolgerungen?.join('\n') || null
            }
        ];


        const formattedDate = ((new Date(caseData.metadata?.decision_date || '')).toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        }));

        const formattedText = sections
            .map(({ heading, content }) => `${heading}: ${content}`)
            .join('\n\n');

        const fullText = `(KI-generierte Zusammenfassung) ${caseData.summary.zeitungstitel_oeffentlich}\n\n${formattedText}\n\nEntscheidungstext: ${caseData.metadata?.court} zu ${caseData.metadata?.case_number} vom ${formattedDate} im RIS: ${caseData.metadata?.url}`;

        try {
            // Create a ClipboardItem with both plain text and rich text (HTML)
            const htmlContent = sections
                .map(({ heading, content }) => {
                    const headingText = heading.replace(/\*\*/g, '');
                    return `<h3>${headingText}</h3><p>${content?.replace(/\n/g, '<br>')}</p>`;
                })
                .join('');

            const fullHtml = `(KI-generierte Zusammenfassung) <h2>${caseData.summary.zeitungstitel_oeffentlich}</h2>${htmlContent}<h3>Quelle</h3><p><a href="${caseData.metadata?.url}">Entscheidungstext: ${caseData.metadata?.court} zu ${caseData.metadata?.case_number} vom ${formattedDate} im RIS</a></p>`;

            const blob = new Blob([fullHtml], { type: 'text/html' });
            const textBlob = new Blob([fullText], { type: 'text/plain' });

            await navigator.clipboard.write([
                new ClipboardItem({
                    'text/html': blob,
                    'text/plain': textBlob
                })
            ]);

            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 5000);
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
                            <div className={"mt-1"}>
                              {copied ? (
                                <a onClick={copyToClipboard}><span className={"icon"}><CopiedIcon></CopiedIcon></span> Kopiert</a>
                              ) : (
                                <a onClick={copyToClipboard}><span className={"icon"}><CopyIcon></CopyIcon></span> Kopieren</a>
                              )}
                              &ensp;&middot;&ensp;
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
                              {caseData.prompts?.system_prompt !== undefined && (
                                <dl className="row mt-2">
                                    <dt className="col-sm-3">Verwendeter System Prompt</dt>
                                    <dd className="col-sm-9 prompt">
                                        {caseData.prompts.system_prompt}
                                      <div className={"my-2"}>{copiedSystemPrompt ? (
                                        <a onClick={() => copyTextToClipboard(caseData.prompts?.system_prompt ?? '', 'system')}><span className={"icon"}><CopiedIcon></CopiedIcon></span> Kopiert</a>
                                      ) : (
                                        <a onClick={() => copyTextToClipboard(caseData.prompts?.system_prompt ?? '', 'system')}><span className={"icon"}><CopyIcon></CopyIcon></span> Kopieren</a>
                                      )}
                                      </div>
                                    </dd>
                                </dl>
                              )}
                              {caseData.prompts?.user_prompt && (
                                <dl className="row mt-2">
                                  <dt className="col-sm-3">Verwendeter User Prompt</dt>
                                  <dd className="col-sm-9 prompt">
                                    {caseData.prompts?.user_prompt}
                                    <div className={"my-2"}>{copiedUserPrompt ? (
                                      <a onClick={() => copyTextToClipboard(caseData.prompts?.user_prompt ?? '', 'user')}><span className={"icon"}><CopiedIcon></CopiedIcon></span> Kopiert</a>
                                    ) : (
                                      <a onClick={() => copyTextToClipboard(caseData.prompts?.user_prompt ?? '', 'user')}><span className={"icon"}><CopyIcon></CopyIcon></span> Kopieren</a>
                                    )}
                                    </div>
                                  </dd>
                                </dl>
                              )}
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
                          <div className={"mt-1"}>
                            {copied ? (
                              <a onClick={copyToClipboard}><span className={"icon"}><CopiedIcon></CopiedIcon></span> Kopiert</a>
                            ) : (
                              <a onClick={copyToClipboard}><span className={"icon"}><CopyIcon></CopyIcon></span> Kopieren</a>
                            )}
                            &ensp;&middot;&ensp;
                            <a onClick={() => setShowDetails(s => !s)}><span className="icon"><CodeSlashIcon></CodeSlashIcon></span> Entwicklerdetails</a>

                          </div>
                        )}

                    </div>)}
            </div>
            )}
        </div>
    );
};
