import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import { Form as FinalForm, Field } from "react-final-form";

import { getPlayers, predictMatch } from "../../libs/net";

export default function PredictMatch() {
  const [players, setPlayers] = useState([]);
  const [result, setResult] = useState(0);
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
    setStatus("Predicting");
    try {
      const res = await predictMatch(values);
      setResult(res.data);
      setStatus("");
    } catch {
      setStatus("prediction failed");
    }
  }

  return (
    <div className="view">
      <Container>
        <Row>
          <Col>
            <h3>Predict Match Quality</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              Use this tool to compare players given their current skill. This
              number is always between 0 and 1 where 0 indicates the worst
              possible match and 1 the best possible match.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <FinalForm onSubmit={handleFinalSubmit}>
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="exampleSelect">Player 1</Label>
                    <Field name="id1" id="id1" type="select">
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
                    <Label for="exampleSelect">Player 2</Label>
                    <Field name="id2" id="id2" type="select">
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
              <h1>Quality: {result}</h1>
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
