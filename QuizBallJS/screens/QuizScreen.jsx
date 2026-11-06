
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import theme from '../styles/theme';

const questions = [
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
    answer: 'Mars',
  },
  {
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
    answer: 'Pacific Ocean',
  },
  {
    question: 'Who wrote the play Romeo and Juliet?',
    options: [
      'Charles Dickens',
      'William Shakespeare',
      'Jane Austen',
      'Mark Twain',
    ],
    answer: 'William Shakespeare',
  },
  {
    question: 'What is the chemical symbol for gold?',
    options: ['Ag', 'Fe', 'Au', 'Go'],
    answer: 'Au',
  },
  {
    question: 'How many continents are there?',
    options: ['Five', 'Six', 'Seven', 'Eight'],
    answer: 'Seven',
  },
];

export default function QuizScreen({ navigation, route }) {
  const category = route?.params?.category || 'General Knowledge';

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (option) => {
  if (answered) return;

  setSelectedAnswer(option);
  setAnswered(true);

  setSelectedAnswers((previousAnswers) => {
    const updatedAnswers = [...previousAnswers];
    updatedAnswers[currentQuestion] = option;
    return updatedAnswers;
  });

  if (option === question.answer) {
    setScore((previousScore) => previousScore + 1);
  }
};

 const handleNext = () => {
  if (currentQuestion < questions.length - 1) {
    setCurrentQuestion((previous) => previous + 1);
    setSelectedAnswer(null);
    setAnswered(false);
  } else {
    const reviewQuestions = questions.map((item, index) => ({
      question: item.question,
      options: item.options,
      correctAnswer: item.answer,
      selectedAnswer: selectedAnswers[index],
    }));

    navigation.replace('Result', {
      score: score,
      correctAnswers: score,
      incorrectAnswers: questions.length - score,
      totalQuestions: questions.length,
      category: category,
      questions: reviewQuestions,
    });
}
 };

  const handleExit = () => {
    Alert.alert(
      'Exit Quiz',
      'Are you sure you want to leave this quiz?',
      [
        { text: 'Continue Quiz', style: 'cancel' },
        {
          text: 'Exit',
          style: 'destructive',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };

  const getOptionStyle = (option) => {
    if (!answered) return styles.option;

    if (option === question.answer) {
      return [styles.option, styles.correctOption];
    }

    if (option === selectedAnswer) {
      return [styles.option, styles.wrongOption];
    }

    return styles.option;
  };

  const getOptionTextStyle = (option) => {
    if (
      answered &&
      (option === question.answer || option === selectedAnswer)
    ) {
      return [styles.optionText, styles.selectedOptionText];
    }

    return styles.optionText;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <TouchableOpacity onPress={handleExit}>
            <Text style={styles.exitText}>← Exit Quiz</Text>
          </TouchableOpacity>

          <Text style={styles.brand}>QUIZBALLJS</Text>
        </View>

        <View style={styles.quizInfo}>
          <Text style={styles.category}>{category.toUpperCase()}</Text>
          <Text style={styles.questionCount}>
            QUESTION {currentQuestion + 1} OF {questions.length}
          </Text>
        </View>

        <View style={styles.progressBackground}>
          <View
            style={[styles.progressFill, { width: `${progress}%` }]}
          />
        </View>

        <View style={styles.scoreCard}>
          <View>
            <Text style={styles.scoreLabel}>CURRENT SCORE</Text>
            <Text style={styles.scoreValue}>
              {score} / {questions.length}
            </Text>
          </View>

          <Text style={styles.scoreIcon}>🏆</Text>
        </View>

        <View style={styles.questionSection}>
          <Text style={styles.questionLabel}>YOUR QUESTION</Text>
          <Text style={styles.questionText}>{question.question}</Text>
          <Text style={styles.instruction}>
            Select the correct answer below.
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === question.answer;

            return (
              <TouchableOpacity
                key={option}
                style={getOptionStyle(option)}
                activeOpacity={0.8}
                onPress={() => handleAnswer(option)}
                disabled={answered}
              >
                <View style={styles.optionLeft}>
                  <View
                    style={[
                      styles.optionLetter,
                      answered && isCorrect && styles.correctLetter,
                      answered && isSelected && !isCorrect && styles.wrongLetter,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionLetterText,
                        answered &&
                          (isCorrect || isSelected) &&
                          styles.selectedOptionText,
                      ]}
                    >
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>

                  <Text style={getOptionTextStyle(option)}>
                    {option}
                  </Text>
                </View>

                {answered && isCorrect && (
                  <Text style={styles.feedbackIcon}>✓</Text>
                )}

                {answered && isSelected && !isCorrect && (
                  <Text style={styles.feedbackIcon}>✕</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {answered && (
          <View
            style={[
              styles.feedbackBox,
              selectedAnswer === question.answer
                ? styles.correctFeedback
                : styles.wrongFeedback,
            ]}
          >
            <Text style={styles.feedbackTitle}>
              {selectedAnswer === question.answer
                ? 'Correct Answer!'
                : 'Not Quite!'}
            </Text>

            <Text style={styles.feedbackDescription}>
              {selectedAnswer === question.answer
                ? 'Well done! You got this question right.'
                : `The correct answer is ${question.answer}.`}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.nextButton,
            !answered && styles.disabledButton,
          ]}
          disabled={!answered}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestion === questions.length - 1
              ? 'View Results'
              : 'Next Question  →'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Take your time and choose wisely.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    padding: 20,
    paddingBottom: 35,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  exitText: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  brand: {
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
  quizInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  category: {
    color: theme.colors.accent,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  questionCount: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    fontWeight: '800',
  },
  progressBackground: {
    height: 7,
    backgroundColor: theme.colors.border,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.accent,
    borderRadius: 10,
  },
  scoreCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 32,
  },
  scoreLabel: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  scoreValue: {
    color: theme.colors.primary,
    fontSize: 23,
    fontWeight: '900',
    marginTop: 5,
  },
  scoreIcon: {
    fontSize: 30,
  },
  questionSection: {
    marginBottom: 22,
  },
  questionLabel: {
    color: theme.colors.accent,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  questionText: {
    color: theme.colors.primary,
    fontSize: 25,
    fontWeight: '900',
    lineHeight: 34,
  },
  instruction: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginTop: 10,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    minHeight: 62,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionLetter: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },
  optionLetterText: {
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  optionText: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  selectedOptionText: {
    color: theme.colors.white,
  },
  correctOption: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  },
  wrongOption: {
    backgroundColor: theme.colors.error,
    borderColor: theme.colors.error,
  },
  correctLetter: {
    backgroundColor: '#15803D',
  },
  wrongLetter: {
    backgroundColor: '#B91C1C',
  },
  feedbackIcon: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: '900',
    marginLeft: 8,
  },
  feedbackBox: {
    borderRadius: theme.radius.md,
    padding: 16,
    marginTop: 20,
  },
  correctFeedback: {
    backgroundColor: '#DCFCE7',
  },
  wrongFeedback: {
    backgroundColor: '#FEE2E2',
  },
  feedbackTitle: {
    color: theme.colors.primary,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 5,
  },
  feedbackDescription: {
    color: theme.colors.text,
    fontSize: 12,
    lineHeight: 18,
  },
  nextButton: {
    backgroundColor: theme.colors.primary,
    padding: 17,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    marginTop: 25,
  },
  disabledButton: {
    backgroundColor: '#94A3B8',
  },
  nextButtonText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
  footerText: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 20,
  },
});
