import React from "react";
import { Pane, Image, Text, Strong } from "evergreen-ui";
import { formatDate } from "../../../../../config/constants";

export default function Fixtures(props) {
  const { fixtures } = props;
  let upcoming = [];
  let live = [];
  let finished = [];

  fixtures.forEach((fix) => {
    if (fix.status === "Upcoming") upcoming.push(fix);
    if (fix.status === "Live") live.push(fix);
    if (fix.status === "Finished") finished.push(fix);
  });

  function renderContent(array) {
    if (array.length < 1) return null;
    else
      return (
        <>
          <h4>{array[0].status} fixtures</h4>
          {array.map((fix) => {
            return (
              <Pane
                border
                key={fix.id}
                display="flex"
                flexDirection="row"
                justifyContent="left"
              >
                <Pane
                  display="flex"
                  flexDirection="column"
                  width="20%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Pane>
                    <Image height="6rem" src={fix.homeTeam.logo} />
                  </Pane>
                  <Strong>{fix.homeTeam.name}</Strong>
                </Pane>
                <Pane
                  display="flex"
                  flexDirection="column"
                  width="20%"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text>{formatDate(fix.date)}</Text>

                  <Pane display="flex" flexDirection="column">
                    <Strong>
                      {fix.FTScoreTeam1 === null ? 0 : fix.FTScoreTeam1} -{" "}
                      {fix.FTScoreTeam1 === null ? 0 : fix.FTScoreTeam1}
                    </Strong>
                  </Pane>
                </Pane>
                <Pane
                  display="flex"
                  flexDirection="column"
                  width="20%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Pane>
                    <Image height="6rem" src={fix.awayTeam.logo} />
                  </Pane>
                  <Strong>{fix.awayTeam.name}</Strong>
                </Pane>
              </Pane>
            );
          })}
        </>
      );
  }
  const renderUpcoming = renderContent(upcoming);
  const renderLive = renderContent(live);
  const renderFinished = renderContent(finished);

  return (
    <Pane border padding={20}>
      <Pane display="flex" flexDirection="column">
        {renderUpcoming}
      </Pane>
      <Pane display="flex" flexDirection="column">
        {renderLive}
      </Pane>
      <Pane display="flex" flexDirection="column">
        {renderFinished}
      </Pane>
    </Pane>
  );
}
