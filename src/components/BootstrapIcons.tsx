import React from "react";

export function RobotIcon() {
    return (
        <span title={"KI-generierte Inhalte von shrinkwrap.legal"}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-robot"
             viewBox="0 0 16 16">
            <path
                d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
            <path
                d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
        </svg>
        </span>
    )
}

export function CopyIcon() {
  return (
    <span title={'In Zwischenablage kopieren'}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-copy"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
        />
      </svg>
    </span>
  );
}

export function CopiedIcon() {
  return (
    <span title={'In Zwischenablage kopiert'}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-check2-circle"
        viewBox="0 0 16 16"
      >
        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
      </svg>
    </span>
  );
}

export function EUIcon() {
  return (
    <span title={'EuGH-Vorlage'} className={'eu-icon'}>
      <svg
        width="15"
        height="15"
        id="European flag"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <polygon
            id="star"
            fill="#ffcc33"
            transform="scale(1.5)"
            points="0,-1
    0.224513988289792686220972575898763393789606,-0.309016994374947424102293417182819058860155
    0.951056516295153572116439333379382143405699,-0.309016994374947424102293417182819058860155
    0.363271264002680442947733378740309374808046,0.118033988749894848204586834365638117720309
    0.587785252292473129168705954639072768597652,0.809016994374947424102293417182819058860155
    0,0.381966011250105151795413165634361882279691
    -0.587785252292473129168705954639072768597652,0.809016994374947424102293417182819058860155
    -0.363271264002680442947733378740309374808046,0.118033988749894848204586834365638117720309
    -0.951056516295153572116439333379382143405699,-0.309016994374947424102293417182819058860155
    -0.224513988289792686220972575898763393789606,-0.309016994374947424102293417182819058860155"
          />
        </defs>
        <rect width="15" height="15" fill="#003399" />
        <g transform="translate(7.5,7.5)">
          <use xlinkHref="#star" transform="translate(0,-5)" />
          <use
            xlinkHref="#star"
            transform="rotate(30) translate(0,-5) rotate(-30)"
          />
          <use
            xlinkHref="#star"
            transform="rotate(60) translate(0,-5) rotate(-60)"
          />
          <use
            xlinkHref="#star"
            transform="rotate(90) translate(0,-5) rotate(-90)"
          />
          <use
            xlinkHref="#star"
            transform="rotate(120) translate(0,-5) rotate(-120)"
          />
          <use
            xlinkHref="#star"
            transform="rotate(150) translate(0,-5) rotate(-150)"
          />
          <use
            xlinkHref="#star"
            transform="rotate(180) translate(0,-5) rotate(-180)"
          />
          <use
            xlinkHref="#star"
            transform="rotate(210) translate(0,-5) rotate(-210)"
          />
          <use
            xlinkHref="#star"
            transform="rotate(240) translate(0,-5) rotate(-240)"
          />
          <use
            xlinkHref="#star"
            transform="rotate(270) translate(0,-5) rotate(-270)"
          />
          <use
            xlinkHref="#star"
            transform="rotate(300) translate(0,-5) rotate(-300)"
          />
          <use
            xlinkHref="#star"
            transform="rotate(330) translate(0,-5) rotate(-330)"
          />
        </g>
      </svg>
    </span>
  );
}

export function CodeSlashIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-code-slash"
             viewBox="0 0 16 16">
            <path
                d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0"/>
        </svg>
    )
}
