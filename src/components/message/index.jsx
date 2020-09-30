import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader, Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './message.less';

export default function Message (props) {
  const { status, message, isUpdate } = props;
  if (status === 'loading') {
    return (<Dimmer active>
      <Loader size="large">Loading</Loader>
    </Dimmer>);
  } else {
    return (<Card>
      <Card.Content>
        <Card.Header>
            Vehicle {isUpdate ? 'operation' : 'creation'} {status}
        </Card.Header>
        <Card.Description>
          {message}
        </Card.Description>
        <Card.Content extra>
          <div className="card-buttons">
            <Button as={Link} to="/vehicles">
              View all vehicles
            </Button>
          </div>
        </Card.Content>
      </Card.Content>
    </Card>);
  }
}

Message.propTypes = {
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  isUpdate: PropTypes.bool
};
