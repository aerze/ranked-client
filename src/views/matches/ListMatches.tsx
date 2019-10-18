import React, { useState, useEffect } from "react";
import { Container, Row, Col, UncontrolledTooltip } from "reactstrap";
import DataTable from "../../components/Table";
import { getMatches } from "../../libs/net";
import { Match } from "../../entities/Match";

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus("Loading");
    getMatches()
      .then(res => {
        console.log(res.data);
        setMatches(res.data);
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
          <Col>Match History {status}</Col>
        </Row>
        <Row>
          <Col>
            <DataTable<Match>
              items={matches}
              columns={[
                {
                  title: "Date",
                  render: (item, index) => (
                    <th scope="row">{new Date(item.date).toLocaleString()}</th>
                  )
                },
                {
                  title: "Winner",
                  render: item => <td>{item.winner}</td>
                },
                {
                  title: "Loser",
                  render: item => <td>{item.loser}</td>
                }
              ]}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
