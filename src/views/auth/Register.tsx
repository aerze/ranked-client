import React from "react";
import { connect } from "react-redux";
import { Form as FinalForm, Field } from "react-final-form";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { RootState } from "store/reducers";
import { register } from "store/reducers/authentication";
import { TextField } from "components/Form/TextField/TextField";

export interface RegisterProps extends StateProps, DispatchProps {}

export const Register: React.FC<RegisterProps> = props => {
  interface formValues {
    username: string;
    email: string;
    password: string;
  }

  const handleFinalSubmit = async ({ username, email, password }: formValues) => {
    try {
      const result = await props.register(username, email, password);
      console.log(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="view">
      <FinalForm<formValues> onSubmit={handleFinalSubmit}>
        {({ handleSubmit, form }) => (
          <Form onSubmit={handleSubmit}>
            <Container>
              <Row>
                <Col>
                  <h3>Register Account</h3>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={{ size: 6, offset: 3 }}>
                  <TextField<formValues["username"]>
                    id="username"
                    name="username"
                    label="Username"
                    placeholder="username"
                  />
                  <TextField
                    id="email"
                    name="email"
                    label="email"
                    placeholder="person@example.com"
                  />
                  <TextField
                    id="password"
                    name="password"
                    label="password"
                    placeholder="password"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={{ size: 6, offset: 3 }}>
                  <Button outline color="secondary" onClick={() => form.reset()}>
                    Clear
                  </Button>{" "}
                  <Button outline color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        )}
      </FinalForm>
    </div>
  );
};

type StateProps = ReturnType<typeof mapStateToProps>;
const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated
});

type DispatchProps = typeof mapDispatchToProps;
const mapDispatchToProps = {
  register
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
