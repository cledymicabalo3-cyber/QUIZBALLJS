
import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import theme from '../styles/theme';

export default function QuizHeader({
  title,
  subtitle,
  onBack,
}) {
  return (
    <View style={styles.container}>

      <View style={styles.topRow}>

        {onBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}

        <Text style={styles.brand}>
          QUIZBALLJS
        </Text>

        <View style={styles.placeholder} />

      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {title}
        </Text>

        {subtitle ? (
          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        ) : null}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 12,
    paddingBottom: 20,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  backText: {
    fontSize: 32,
    color: theme.colors.primary,
    marginTop: -4,
  },

  brand: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
    color: theme.colors.primary,
  },

  placeholder: {
    width: 42,
  },

  titleContainer: {
    marginTop: 5,
  },

  title: {
    fontSize: 27,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: 7,
  },

  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 21,
  },
});
