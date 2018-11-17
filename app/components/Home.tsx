import * as React from 'react';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { IProps } from '../containers/HomePage';

// const styles = require('./Home.scss');

export function Home({ settings, onSave }: IProps) {
  return (
    <Container fluid={true}>
      <Row>
        <Col>
          <h3 className="mt-4">Settings</h3>
          <Form>
            <FormGroup>
              <Input type="text" readOnly={true} value={settings.homePath} />
            </FormGroup>
            <FormGroup>
              <Label for="REACT_APP_VK_APP_ID">VK app id</Label>
              <Input
                type="text"
                name="REACT_APP_VK_APP_ID"
                id="REACT_APP_VK_APP_ID"
                placeholder="123456789"
              />
            </FormGroup>
            <Button
              type="submit"
              onClick={onSave}
              color="primary">
              Save
            </Button>
          </Form>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A commodi culpa dolor, doloremque, earum excepturi fugit harum inventore itaque magnam maiores maxime, numquam odio omnis optio placeat quasi ullam unde?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A commodi culpa dolor, doloremque, earum excepturi fugit harum inventore itaque magnam maiores maxime, numquam odio omnis optio placeat quasi ullam unde?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A commodi culpa dolor, doloremque, earum excepturi fugit harum inventore itaque magnam maiores maxime, numquam odio omnis optio placeat quasi ullam unde?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A commodi culpa dolor, doloremque, earum excepturi fugit harum inventore itaque magnam maiores maxime, numquam odio omnis optio placeat quasi ullam unde?</p>
        </Col>
      </Row>
    </Container>
  );
}
