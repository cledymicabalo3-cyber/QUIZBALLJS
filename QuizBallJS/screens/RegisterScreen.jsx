
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import CustomInput from '../components/CustomInput';
import theme from '../styles/theme';

export default function RegisterScreen({ navigation }) {

  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {

    if (
      !fullName.trim() ||
      !studentId.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert(
        'Incomplete Form',
        'Please complete all registration fields.'
      );
      return;
    }

    if (!email.includes('@')) {
      Alert.alert(
        'Invalid Email',
        'Please enter a valid email address.'
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Weak Password',
        'Password must contain at least 6 characters.'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        'Password Mismatch',
        'Your passwords do not match.'
      );
      return;
    }

    Alert.alert(
      'Registration Successful',
      'Welcome to QuizBallJS!',
      [
        {
          text: 'Continue',
          onPress: () => navigation.replace('Home'),
        },
      ]
    );
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

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>
            Create Account
          </Text>

          <Text style={styles.subtitle}>
            Join QuizBallJS and challenge your knowledge.
          </Text>
        </View>

        <View style={styles.form}>

          <CustomInput
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          <CustomInput
            label="Student ID"
            placeholder="Enter your student ID"
            value={studentId}
            onChangeText={setStudentId}
          />

          <CustomInput
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <CustomInput
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <CustomInput
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>
              Create Account
            </Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>

            <Text style={styles.loginText}>
              Already have an account?
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginLink}>
                {' '}Sign In
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
    paddingHorizontal: 25,
    paddingTop: 45,
    paddingBottom: 30,
  },

  backButton: {
    marginBottom: 25,
  },

  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
  },

  header: {
    marginBottom: 28,
  },

  title: {
    fontSize: 29,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },

  form: {
    backgroundColor: theme.colors.white,
    padding: 22,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  registerButton: {
    height: 54,
    backgroundColor: theme.colors.primary,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  registerButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '700',
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    flexWrap: 'wrap',
  },

  loginText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },

  loginLink: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.secondary,
  },

  footer: {
    textAlign: 'center',
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginTop: 30,
    letterSpacing: 1,
  },

});
