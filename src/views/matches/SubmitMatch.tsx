import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";

import { Form as FinalForm, Field } from "react-final-form";
import { getPlayers, submitMatch, ResultResponse } from "../../libs/net";

export default function SubmitMatch() {
  const [players, setPlayers] = useState([]);
  const [result, setResult] = useState(null as ResultResponse);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus("Loading");
    getPlayers()
      .then(res => {
        setPlayers(res.data);
        setStatus("");
      })
      .catch(err => {
        setStatus("fetch failed");
      });
  }, []);

  async function handleFinalSubmit(values) {
    setStatus("Submitting");
    try {
      const res = await submitMatch(values);
      setResult(res.data);
      setStatus("");
    } catch {
      setStatus("submit failed");
    }
  }

  return (
    <div className="view">
      <Container>
        <Row>
          <Col>
            <h3>Submit Match Results</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Submit only FINAL results. Skill updates can NOT be reverted.</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <FinalForm onSubmit={handleFinalSubmit}>
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="exampleSelect">Winner</Label>
                    <Field name="winner" id="winner" type="select">
                      {({ input: { type, ...input }, meta }) => (
                        <Input type="select" {...input}>
                          <option disabled value="">
                            Select
                          </option>
                          {players.map(p => (
                            <option key={p._id} value={p._id}>
                              {p.name}
                            </option>
                          ))}
                        </Input>
                      )}
                    </Field>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleSelect">Loser</Label>
                    <Field name="loser" id="loser" type="select">
                      {({ input: { type, ...input }, meta }) => (
                        <Input type="select" {...input}>
                          <option disabled value="">
                            Select
                          </option>
                          {players.map(p => (
                            <option key={p._id} value={p._id}>
                              {p.name}
                            </option>
                          ))}
                        </Input>
                      )}
                    </Field>
                  </FormGroup>
                  <Button outline color="primary">
                    Submit
                  </Button>
                </Form>
              )}
            </FinalForm>
          </Col>
        </Row>

        {!!result && (
          <Row style={{ marginTop: "1em" }}>
            <Col>
              <h1>Result: {new Date(result.match.date).toLocaleString()}</h1>
              <h4>Winner: {result.winner.name}</h4>
              <h4>Loser: {result.loser.name}</h4>
            </Col>
          </Row>
        )}

        {!!status && (
          <Row style={{ marginTop: "1em" }}>
            <Col>
              <h1>{status}</h1>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}
