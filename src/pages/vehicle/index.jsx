import React, { Component } from 'react';
import { Button, Dropdown, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Message from '../../components/message/index.jsx';
import { vehicle as vehicleService } from '../../services';
import { regexps, camalize } from '../../utils/common';
import './vehicle.less';
import { Link } from 'react-router-dom';

const vehicleRequiredFields = [
  { name: 'make', validatePattern: 'specialChars' },
  { name: 'model', validatePattern: 'specialChars' },
  { name: 'edition', validatePattern: 'specialChars' },
  { name: 'price', validatePattern: 'price' }
];

class Vehicle extends Component {
  async componentDidMount () {
    let vehicle = {};
    if (this.props.match.params.vehicleId) {
      vehicle = await vehicleService.getVehiclesById(this.props.match.params.vehicleId);
      vehicle.optionIds = vehicle.options.map(option => option.id);
    }
    const vehicleOptions = await vehicleService.getVehicleOptions();
    this.setState({ vehicle, vehicleOptions });
  }

  state = { vehicle: {}, vehicleOptions: null, _status: 'loaded', _message: '', _errors: {} };

  validateInput = (name, value, validatePattern) => {
    if (validatePattern) {
      const { _errors } = this.state;
      _errors[name] = value.match(regexps[validatePattern].pattern) ?
        null : `${name} ${regexps[validatePattern].message}`;
      this.setState({ _errors });
    }
  };

  isValidForm = () => {
    const { _errors, vehicle } = this.state;
    ['make', 'model', 'edition', 'price']
      .forEach(key => {
        if (!vehicle[key]) {
          _errors[key] = `${camalize(key)} is Required`;
        } else {
          _errors[key] = null;
        }
        this.setState(_errors);
      });
    return Object.keys(_errors).filter(errorKey => !!_errors[errorKey]).length === 0;
  };

  async handleSubmit () {
    if (this.isValidForm()) {
      try {
        this.setState({ _status: 'loading' });
        await vehicleService.upsertVehicle(this.state.vehicle);
        this.setState({
          _status: 'successful',
          _message: `You have successfully 
            ${this.props.match.params.vehicleId ? 'updated' : 'added'} ${this.state.vehicle.model}`
        });
      } catch (e) {
        this.setState({
          _status: 'error',
          _message: `Could not save vehicle. Please contact support including error code ${e.guid}.`
        });
      }
    }
  }

  handleFieldChange = (name, value, validatePattern) => {
    this.validateInput(name, value, validatePattern);
    const { vehicle } = this.state;
    vehicle[name] = value;
    this.setState({ vehicle });
  };

  renderMessage () {
    const { _status, _message } = this.state;
    return (<div className="vehicle-message">
      <Message
        status={_status}
        message={_message}
        isUpdate={!!this.props.match.params.vehicleId}/>
    </div>);
  }

  renderForm () {
    const { vehicle, _errors, vehicleOptions } = this.state;

    const options = vehicleOptions ?
      vehicleOptions.map(v => ({ key: v.id, text: `${v.name} (${v.price} $)`, value: v.id })) :
      [];

    return (<Form size="large">
      {vehicleRequiredFields.map(field => (
        <Form.Input key={field.name} width={6}
          label={camalize(field.name)}
          name={vehicle[field.name]}
          value={vehicle[field.name]}
          onChange={e => this.handleFieldChange(field.name, e.target.value, field.validatePattern)}
          error={_errors[field.name] ? { content: _errors[field.name] } : false}
        />
      ))}
      <Form.Field width={6}>
        <label>Options</label>
        <Dropdown placeholder="Options" fluid multiple selection
          value={vehicle.optionIds || []}
          options={options}
          onChange={(e, data) => this.handleFieldChange('optionIds', data.value)}/>
      </Form.Field>
      <Button
        as={Link}
        to={'/vehicles'}
        content="Back"
        icon="arrow left"
      />
      <Button
        content="Clear"
        icon="trash"
        onClick={() => window.location.reload(true)}
      />
      <Button type="submit"
        disabled = {Object.keys(_errors).filter(errorKey => !!_errors[errorKey]).length > 0}
        onClick={() => this.handleSubmit()} content="Submit"
      />
    </Form>);
  }

  render () {
    const { _status } = this.state;
    const content = _status === 'loaded' ? this.renderForm() : this.renderMessage();
    return (<div className="vehicle">{content}</div>);
  }
}

Vehicle.propTypes = {
  match: PropTypes.object
};

export default Vehicle;
