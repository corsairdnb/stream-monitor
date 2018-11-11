import * as React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { IProps } from '../containers/HomePage';

const styles = require('./Home.scss');

export function Home({ settings, onSave }: IProps) {
  return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3 className={styles.pageTitle}>Settings</h3>
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
          </div>
        </div>
        </div>
  );
}
