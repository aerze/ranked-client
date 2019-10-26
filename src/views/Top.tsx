import React, { useState, useEffect } from "react";
import { Container, Row, Col, UncontrolledTooltip } from "reactstrap";
import DataTable from "../components/Table";
import { getTopPlayers } from "../libs/net";
import { Player, formatSkill, formatCertainty } from "../entities/Player";

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus("Loading");
    getTopPlayers()
      .then(res => {
        console.log(res.data);
        setPlayers(res.data);
        setStatus("");
      })
      .catch(err => {
        console.dir(err);
        setStatus("fetch failed");
      });
  }, []);

  return (
    <div className="view">
      <Container fluid>
        <Row>
          <Col>Top Players {status}</Col>
        </Row>
        <Row>
          <Col>
            <DataTable<Player>
              items={players}
              columns={[
                {
                  title: "Rank",
                  render: (item, index) => <th scope="row">{index + 1}</th>
                },
                {
                  title: "Name",
                  render: item => <td>{item.name}</td>
                },
                {
                  title: "Skill",
                  renderTitle: column => (
                    <React.Fragment>
                      <span id="skill">{column.title}</span>
                      <UncontrolledTooltip placement="top" target="skill">
                        Higher is better
                      </UncontrolledTooltip>
                    </React.Fragment>
                  ),
                  render: item => <td>{formatSkill(item)}</td>
                },
                {
                  title: "Uncertainty",
                  renderTitle: column => (
                    <React.Fragment>
                      <span id="certainty">{column.title}</span>
                      <UncontrolledTooltip placement="top" target="certainty">
                        Lower is better
                      </UncontrolledTooltip>
                    </React.Fragment>
                  ),
                  render: item => <td>{formatCertainty(item)}</td>
                }
              ]}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
