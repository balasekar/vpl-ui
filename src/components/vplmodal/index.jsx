import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import './modal.less';

export default function VPLModal (props) {
  const { header, content, vehicleId, action } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button icon="trash" content="Delete"/>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="trash" content={header} />
      <Modal.Content>
        <p className="modal-content">
          {content}
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" onClick={() => {
          setOpen(false);
          action(vehicleId);
        }}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

VPLModal.propTypes = {
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  vehicleId: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
};
