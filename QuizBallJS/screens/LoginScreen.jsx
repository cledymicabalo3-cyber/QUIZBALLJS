
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';

import CustomInput from '../components/CustomInput';
import theme from '../styles/theme';

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {

    if (!email.trim() || !password.trim()) {
      Alert.alert(
        'Missing Information',
        'Please enter your email and password.'
      );
      return;
    }

    navigation.replace('Home');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>Q</Text>
          </View>

          <Text style={styles.appName}>
            QUIZBALLJS
          </Text>

          <Text style={styles.tagline}>
            LEARN. THINK. CHALLENGE YOURSELF.
          </Text>
        </View>

        <View style={styles.formContainer}>

          <Text style={styles.welcome}>
            Welcome Back!
          </Text>

          <Text style={styles.description}>
            Sign in to continue your learning journey.
          </Text>

          <CustomInput
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <CustomInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() =>
              Alert.alert(
                'Forgot Password',
                'Password recovery will be added later.'
              )
            }
          >
            <Text style={styles.forgotText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>
              Sign In
            </Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Don't have an account?
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.registerLink}>
                {' '}Create Account
              </Text>
            </TouchableOpacity>
          </View>

        </View>

        <Text style={styles.footer}>
          QUIZBALLJS © 2026
        </Text>

      </ScrollView>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 35,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },

  logo: {
    width: 75,
    height: 75,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  logoText: {
    fontSize: 38,
    fontWeight: '900',
    color: theme.colors.white,
  },

  appName: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 3,
    color: theme.colors.primary,
  },

  tagline: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: theme.colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },

  formContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    padding: 23,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  welcome: {
    fontSize: 26,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 28,
    lineHeight: 21,
  },

  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 22,
    marginTop: -8,
  },

  forgotText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.secondary,
  },

  loginButton: {
    height: 54,
    backgroundColor: theme.colors.primary,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.white,
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    flexWrap: 'wrap',
  },

  registerText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },

  registerLink: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.secondary,
  },

  footer: {
    textAlign: 'center',
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginTop: 35,
    letterSpacing: 1,
  },

});
