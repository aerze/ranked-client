import React from "react";
import { Field, FieldProps } from "react-final-form";
import { FormGroup, Label, Input } from "reactstrap";
import { InputType } from "reactstrap/lib/Input";

export interface TextFieldProps<FieldValue> extends FieldProps<FieldValue, HTMLInputElement> {
  id: string;
  label?: string;
  placeholder?: string;
}

export class TextField<FieldValue extends string> extends React.PureComponent<
  TextFieldProps<FieldValue>
> {
  render() {
    const { label, placeholder, id, ...fieldProps } = this.props;

    return (
      <Field {...fieldProps}>
        {({ input: { type, value, ...input }, meta }) => {
          return (
            <FormGroup>
              {label && <Label for={id}>{label}</Label>}
              <Input
                {...input}
                id={id}
                type={type as InputType}
                value={value as FieldValue}
                placeholder={placeholder}
                invalid={meta.invalid}
              />
            </FormGroup>
          );
        }}
      </Field>
    );
  }
}
