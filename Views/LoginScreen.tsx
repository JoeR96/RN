import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../Components/Background';
import Logo from '../Components/Logo';
import Header from '../Components/Header';
import Button from '../Components/Button';
import TextInput from '../Components/TextInput';
import BackButton from '../Components/BackButton';
import { theme } from '../theme';
import { emailValidator, passwordValidator } from '../utils';
import {  useDispatch } from 'react-redux'
import { setUserId, setDay, setWeek, setJwt, setUsername, setWorkoutsInWeek } from '../Components/Utilities/userSlice'
import axios from 'axios'
import { url } from '../Components/Utilities/UseAxios';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const dispatch = useDispatch();
  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

      axios.post(url + 'auth/login', 
      JSON.stringify({
          username : "bigdavetv",
          password : "bigdavetv",
          emailAddress : "bigdavetv"
      }), {
          headers: {
              'Content-Type': 'application/json',
          }
      }
      ).then(data => {
          dispatch(setDay(data.data.data.currentDay))
          dispatch(setWeek(data.data.data.currentWeek))
          dispatch(setUserId(data.data.data.userId))
          dispatch(setUsername(data.data.data.username))
          dispatch(setJwt(data.data.data.token))
          dispatch(setWorkoutsInWeek(data.data.data.workoutsInWeek))
      }).then(() => navigation.push('Dashboard')).catch(error => console.log(error))

      navigation.push('Dashboard')
      

  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Logo />

      <Header>Welcome back.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
