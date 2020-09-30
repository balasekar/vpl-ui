import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Segment, Grid, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import VPLModal from '../../components/vplmodal/index.jsx';
import Message from '../../components/message/index.jsx';
import { vehicle as vehicleService } from '../../services';
import './vehicles.less';


class Vehicles extends Component {
  constructor (props) {
    super(props);
    this.state = ({ _status: 'loaded', vehicles: null, _message: '' });
  }

  async componentDidMount () {
    await this.fetchData();
  }

  async fetchData () {
    try {
      this.setState({ _status: 'loading' });
      let vehicles = await vehicleService.getVehicles();
      this.setState({ _status: 'loaded', vehicles });
    } catch (e) {
      this.setState({
        _status: 'error',
        _message: `Could not fetch vehicles. Please contact support team including error code ${e.guid}.`
      });
    }
  }

  async deletedVehicle (vehicleId) {
    try {
      this.setState({ _status: 'loading' });
      await vehicleService.deleteVehiclesById(vehicleId);
      let vehicles = await vehicleService.getVehicles();
      this.setState({ _status: 'loaded', vehicles });
    } catch (e) {
      this.setState({
        _status: 'error',
        _message: `Could not delete vehicle. Please contact support team including error code ${e.guid}.`
      });
    }
  }

  renderVehicleOptions (options) {
    if (options.length === 0) {
      return null;
    } else {
      return (
        <Table celled structured inverted>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell> Name </Table.HeaderCell>
              <Table.HeaderCell> Price </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {options.map(val => (
              <Table.Row verticalAlign="top" key={val.id}>
                <Table.Cell>{val.name}</Table.Cell>
                <Table.Cell>{val.price}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      );
    }
  }

  renderTableContents (vehicles) {
    return vehicles.map(vehicleData => (
      <Table.Row key={vehicleData.id}>
        <Table.Cell>{vehicleData.make}</Table.Cell>
        <Table.Cell>{vehicleData.model}</Table.Cell>
        <Table.Cell>{vehicleData.edition}</Table.Cell>
        <Table.Cell>{vehicleData.price}</Table.Cell>
        <Table.Cell textAlign="center">
          {this.renderVehicleOptions(vehicleData.options)}
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Button as={Link} to={`/vehicle/${vehicleData.id}`} icon="edit" content="Edit"/>
          <VPLModal
            header="Delete the vehicle"
            content="Would you like to delete this vehicle permanently from the DB ?"
            action={this.deletedVehicle.bind(this)}
            vehicleId={vehicleData.id}
          />
        </Table.Cell>
      </Table.Row>));
  }

  renderVehiclesList () {
    const { vehicles } = this.state;
    if (!vehicles) return null;
    return (
      <Table celled structured inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell rowSpan="2">Make</Table.HeaderCell>
            <Table.HeaderCell rowSpan="2">Model</Table.HeaderCell>
            <Table.HeaderCell rowSpan="2">Edition</Table.HeaderCell>
            <Table.HeaderCell rowSpan="2">Price</Table.HeaderCell>
            <Table.HeaderCell rowSpan="4">Options</Table.HeaderCell>
            <Table.HeaderCell rowSpan="2">Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.renderTableContents(vehicles)}
        </Table.Body>
      </Table>
    );
  }

  renderMessage () {
    const { _status, _message } = this.state;
    return (<div className="vehicle-message">
      <Message
        status={_status}
        message={_message}
        isUpdate/>
    </div>);
  }

  renderVehicles () {
    return (
      <React.Fragment>
        <Segment inverted padded className="vehicles-content">
          <Grid>
            <Grid.Row>
              <Grid.Column width={2}>
              </Grid.Column>
              <Grid.Column width={10}>
                <Header inverted as="h3">
                  vehicles
                </Header>
              </Grid.Column>
              <Grid.Column width={4}>
                <Button as={Link} to={'/vehicle'} primary>
                  Add vehicle
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment inverted padded className="servers-content">
          <Grid>
            <Grid.Row>
              <Grid.Column width={2}>
              </Grid.Column>
              <Grid.Column width={12}>
                {this.renderVehiclesList()}
              </Grid.Column>
              <Grid.Column width={2}>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
  render () {
    const { _status } = this.state;
    const content = _status === 'loaded' ? this.renderVehicles() : this.renderMessage();
    return (<div className="vehicles">{content}</div>);
  }
}

Vehicles.propTypes = {
  match: PropTypes.object
};

export default Vehicles;
