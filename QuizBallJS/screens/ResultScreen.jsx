
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import theme from '../styles/theme';

export default function ResultScreen({ navigation, route }) {
  const [showReview, setShowReview] = useState(false);

  const params = route?.params || {};

  const questions = params.questions || [];

  const totalQuestions =
    params.totalQuestions || questions.length || 10;

  const correctAnswers =
    params.correctAnswers ?? params.score ?? 0;

  const incorrectAnswers =
    params.incorrectAnswers ??
    Math.max(0, totalQuestions - correctAnswers);

  const percentage = totalQuestions > 0
    ? Math.round((correctAnswers / totalQuestions) * 100)
    : 0;

  const getPerformance = () => {
    if (percentage >= 90) {
      return {
        title: 'Excellent Work!',
        message: 'Outstanding performance! You really know your stuff.',
        emoji: '🏆',
      };
    }

    if (percentage >= 75) {
      return {
        title: 'Great Job!',
        message: 'You did very well. Keep improving your knowledge!',
        emoji: '🌟',
      };
    }

    if (percentage >= 50) {
      return {
        title: 'Good Effort!',
        message: 'You are making progress. Keep practicing!',
        emoji: '👏',
      };
    }

    return {
      title: 'Keep Learning!',
      message: 'Every attempt makes you better. Try again!',
      emoji: '📚',
    };
  };

  const performance = getPerformance();

  const goHome = () => {
    navigation.navigate('Home');
  };

  const retakeQuiz = () => {
    navigation.replace('Quiz');
  };

  const getAnswerText = (value) => {
    if (value === undefined || value === null) {
      return 'Not answered';
    }

    return String(value);
  };

  return (
    <View style={styles.screen}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brand}>QuizBallJS</Text>
          <Text style={styles.headerSubtitle}>
            GENERAL KNOWLEDGE EDITION
          </Text>
        </View>

        {/* Result Card */}
        <View style={styles.resultCard}>
          <Text style={styles.trophy}>
            {performance.emoji}
          </Text>

          <Text style={styles.resultTitle}>
            {performance.title}
          </Text>

          <Text style={styles.resultMessage}>
            {performance.message}
          </Text>

          <View style={styles.scoreCircle}>
            <Text style={styles.scorePercentage}>
              {percentage}%
            </Text>

            <Text style={styles.scoreLabel}>
              YOUR SCORE
            </Text>
          </View>

          <Text style={styles.scoreDescription}>
            You answered {correctAnswers} out of {totalQuestions} questions correctly.
          </Text>
        </View>

        {/* Statistics */}
        <Text style={styles.sectionTitle}>
          Performance Summary
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, styles.correctIcon]}>
              <Text style={styles.iconText}>✓</Text>
            </View>

            <Text style={styles.statNumber}>
              {correctAnswers}
            </Text>

            <Text style={styles.statLabel}>
              Correct
            </Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, styles.incorrectIcon]}>
              <Text style={styles.iconText}>✕</Text>
            </View>

            <Text style={styles.statNumber}>
              {incorrectAnswers}
            </Text>

            <Text style={styles.statLabel}>
              Incorrect
            </Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, styles.totalIcon]}>
              <Text style={styles.iconText}>#</Text>
            </View>

            <Text style={styles.statNumber}>
              {totalQuestions}
            </Text>

            <Text style={styles.statLabel}>
              Total
            </Text>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>
              Overall Performance
            </Text>

            <Text style={styles.progressValue}>
              {percentage}%
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(100, Math.max(0, percentage))}%` },
              ]}
            />
          </View>

          <Text style={styles.progressDescription}>
            {percentage >= 75
              ? 'Excellent progress! Keep it up.'
              : 'Practice regularly to improve your score.'}
          </Text>
        </View>

        {/* Answer Review */}
        {questions.length > 0 && (
          <View style={styles.reviewContainer}>
            <TouchableOpacity
              style={styles.reviewButton}
              onPress={() => setShowReview(!showReview)}
            >
              <Text style={styles.reviewButtonText}>
                {showReview ? 'Hide Answer Review' : 'Review Your Answers'}
              </Text>

              <Text style={styles.reviewArrow}>
                {showReview ? '−' : '+'}
              </Text>
            </TouchableOpacity>

            {showReview && questions.map((item, index) => {
              const correctAnswer = item.correctAnswer;
              const selectedAnswer = item.selectedAnswer;

              const isCorrect =
                selectedAnswer === correctAnswer;

              return (
                <View
                  key={item.id ?? index}
                  style={styles.questionReview}
                >
                  <Text style={styles.questionNumber}>
                    Question {index + 1}
                  </Text>

                  <Text style={styles.questionText}>
                    {item.question}
                  </Text>

                  <Text style={styles.answerText}>
                    Your answer: {getAnswerText(selectedAnswer)}
                  </Text>

                  <Text style={styles.correctAnswerText}>
                    Correct answer: {getAnswerText(correctAnswer)}
                  </Text>

                  <Text
                    style={[
                      styles.answerStatus,
                      {
                        color: isCorrect
                          ? theme.colors.success
                          : theme.colors.error,
                      },
                    ]}
                  >
                    {isCorrect ? '✓ Correct' : '✕ Incorrect'}
                  </Text>
                </View>
              );
            })}
          </View>
        )}

        {/* Action Buttons */}
        <TouchableOpacity
          style={styles.retakeButton}
          onPress={retakeQuiz}
          activeOpacity={0.8}
        >
          <Text style={styles.retakeButtonText}>
            ↻  Retake Quiz
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={goHome}
          activeOpacity={0.8}
        >
          <Text style={styles.homeButtonText}>
            Return to Home
          </Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Keep learning. Keep growing. Keep winning!
        </Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 35,
    paddingBottom: 35,
  },

  header: {
    alignItems: 'center',
    marginBottom: 25,
  },

  brand: {
    fontSize: 27,
    fontWeight: '800',
    color: theme.colors.primary,
  },

  headerSubtitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    color: theme.colors.accent,
    marginTop: 5,
  },

  resultCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 22,
    padding: 25,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 28,
  },

  trophy: {
    fontSize: 55,
    marginBottom: 12,
  },

  resultTitle: {
    fontSize: 25,
    fontWeight: '800',
    color: theme.colors.primary,
    textAlign: 'center',
  },

  resultMessage: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },

  scoreCircle: {
    width: 155,
    height: 155,
    borderRadius: 80,
    borderWidth: 9,
    borderColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
    backgroundColor: '#F0FDFA',
  },

  scorePercentage: {
    fontSize: 38,
    fontWeight: '900',
    color: theme.colors.primary,
  },

  scoreLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    letterSpacing: 1,
  },

  scoreDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: 15,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },

  statCard: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingVertical: 18,
    marginHorizontal: 4,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 2,
  },

  statIcon: {
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },

  correctIcon: {
    backgroundColor: '#DCFCE7',
  },

  incorrectIcon: {
    backgroundColor: '#FEE2E2',
  },

  totalIcon: {
    backgroundColor: '#DBEAFE',
  },

  iconText: {
    fontSize: 19,
    fontWeight: '800',
    color: theme.colors.primary,
  },

  statNumber: {
    fontSize: 23,
    fontWeight: '800',
    color: theme.colors.primary,
  },

  statLabel: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },

  progressCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 22,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 13,
  },

  progressTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary,
  },

  progressValue: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.accent,
  },

  progressBackground: {
    height: 10,
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.accent,
    borderRadius: 10,
  },

  progressDescription: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 12,
  },

  reviewContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 22,
  },

  reviewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  reviewButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.primary,
  },

  reviewArrow: {
    fontSize: 24,
    color: theme.colors.accent,
  },

  questionReview: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingVertical: 15,
    marginTop: 12,
  },

  questionNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.accent,
    marginBottom: 7,
  },

  questionText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 10,
  },

  answerText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginBottom: 5,
  },

  correctAnswerText: {
    fontSize: 13,
    color: theme.colors.success,
    marginBottom: 7,
  },

  answerStatus: {
    fontSize: 12,
    fontWeight: '800',
  },

  retakeButton: {
    backgroundColor: theme.colors.primary,
    height: 55,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 13,
  },

  retakeButtonText: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: '800',
  },

  homeButton: {
    backgroundColor: theme.colors.white,
    height: 55,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  homeButtonText: {
    color: theme.colors.primary,
    fontSize: 15,
    fontWeight: '800',
  },

  footer: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 25,
  },
});
