import React, { Component } from 'react';
import {
  Segment, Container, Grid, Header, Button, List, Image, Icon
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import myImage from '../../../style/site/assets/images/white-image.png';
import './home.less';

class Home extends Component {
  render () {
    return (
      <div className="home">
        <Segment
          inverted
          textAlign="center"
          style={{ minHeight: '85vh', padding: '1em 0em' }}
          vertical
          className="home-seg1"
        >
          <Header
            as="h1"
            content="Vehicles Manager"
            inverted
            style={{
              fontSize: '4em',
              fontWeight: 'normal',
              marginBottom: 0,
              marginTop: '3em'
            }}
          />
          <Header
            as="h2"
            content="Manage your vehicles price list"
            inverted
            style={{
              fontSize: '1.7em',
              fontWeight: 'normal',
              marginTop: '1.5em'
            }}
          />

          <Button as={Link} to="/vehicles" primary>
            Get Started <Icon name="right arrow" />
          </Button>

        </Segment>
        <Segment style={{ padding: '8em 0em' }} vertical className="home-seg2">
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3" style={{ fontSize: '2em' }}>
                  Vehicles manager site
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  This site enables you to view, edit and delete the vehicles data in your database.
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                <Image bordered rounded size="large" src={myImage}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Button size="huge" as={Link} to="/vehicles">Check Them Out</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment inverted vertical style={{ padding: '5em 0em' }} className="home-seg4">
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="About" />
                  <List link inverted>
                    <List.Item as="a">Sitemap</List.Item>
                    <List.Item as="a">Contact Us</List.Item>
                    <List.Item as="a">Religious Ceremonies</List.Item>
                    <List.Item as="a">Gazebo Plans</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Services" />
                  <List link inverted>
                    <List.Item as="a">Banana Pre-Order</List.Item>
                    <List.Item as="a">DNA FAQ</List.Item>
                    <List.Item as="a">How To Access</List.Item>
                    <List.Item as="a">Favorite X-Men</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as="h4" inverted>
                    Footer Header
                  </Header>
                  <p>
                    Extra space for a call to action inside the footer that could help re-engage users.
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default Home;
