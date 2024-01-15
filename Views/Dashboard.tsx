import React, { memo } from 'react';
import Background from '../Components/Background';
import Logo from '../Components/Logo';
import Header from '../Components/Header';
import Button from '../Components/Button';
import Paragraph from '../Components/Paragraph';
import { Col, Row, Grid } from "react-native-paper-grid";


const Dashboard = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Let’s start</Header>
    <Paragraph>
      Your amazing app starts here. Open you favourite code editor and start
      editing this project.
    </Paragraph>
    <Grid>
       <Row>
      <Col><Button mode="outlined" onPress={() => navigation.push('HomeScreen')}>{Button}</Button></Col>
      <Col><Button mode="outlined" onPress={() => navigation.push('HomeScreen')}>{Button}</Button></Col>
      <Col><Button mode="outlined" onPress={() => navigation.push('HomeScreen')}>{Button}</Button></Col>
    </Row>
    <Row>
      <Col><Button mode="outlined" onPress={() => navigation.push('HomeScreen')}>{Button}</Button></Col>
      <Col><Button mode="outlined" onPress={() => navigation.push('HomeScreen')}>{Button}</Button></Col>
      <Col><Button mode="outlined" onPress={() => navigation.push('HomeScreen')}>{Button}</Button></Col>
    </Row>
    <Row>
      <Col><Button mode="outlined" onPress={() => navigation.push('HomeScreen')}>{{Button}}</Button></Col>
      <Col><Button mode="outlined" onPress={() => navigation.push('HomeScreen')}>{{Button}}</Button></Col>
      <Col><Button mode="outlined" onPress={() => navigation.push('HomeScreen')}>{{Button}}</Button></Col>
    </Row>
    </Grid>
    <Button mode="outlined" onPress={() => navigation.push('HomeScreen')}>
      Logout
    </Button>
  </Background>
);

export default memo(Dashboard);
