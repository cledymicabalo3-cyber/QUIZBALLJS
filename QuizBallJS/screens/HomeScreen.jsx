
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import theme from '../styles/theme';

const categories = [
  { id: '1', title: 'Science', subtitle: 'Discover how the world works', icon: '🔬' },
  { id: '2', title: 'History', subtitle: 'Explore the past', icon: '🏛️' },
  { id: '3', title: 'Geography', subtitle: 'Explore places and cultures', icon: '🌍' },
  { id: '4', title: 'Technology', subtitle: 'Test your digital knowledge', icon: '💻' },
  { id: '5', title: 'Literature', subtitle: 'Books, authors, and stories', icon: '📚' },
  { id: '6', title: 'General Knowledge', subtitle: 'A little bit of everything', icon: '🧠' },
];

export default function HomeScreen({ navigation }) {
  const startQuiz = (category) => {
    navigation.navigate('Quiz', { category });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <View>
            <Text style={styles.brand}>QUIZBALLJS</Text>
            <Text style={styles.brandSubtitle}>GENERAL KNOWLEDGE QUIZ</Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.profileInitial}>S</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Welcome back!</Text>
          <Text style={styles.heading}>Ready to challenge{'\n'}your knowledge?</Text>
          <Text style={styles.description}>
            Choose a category and see how much you know.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.featuredCard}
          activeOpacity={0.85}
          onPress={() => startQuiz('General Knowledge')}
        >
          <View style={styles.featuredText}>
            <Text style={styles.featuredLabel}>FEATURED QUIZ</Text>
            <Text style={styles.featuredTitle}>General Knowledge</Text>
            <Text style={styles.featuredDescription}>
              Test your knowledge across different subjects.
            </Text>
            <View style={styles.startButton}>
              <Text style={styles.startButtonText}>Start Quiz  →</Text>
            </View>
          </View>
          <Text style={styles.featuredIcon}>🧠</Text>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Explore Categories</Text>
            <Text style={styles.sectionSubtitle}>
              Pick a subject to get started
            </Text>
          </View>
          <Text style={styles.categoryCount}>06 CATEGORIES</Text>
        </View>

        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              activeOpacity={0.8}
              onPress={() => startQuiz(category.title)}
            >
              <View style={styles.categoryIconContainer}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
              </View>

              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categorySubtitle}>
                {category.subtitle}
              </Text>

              <Text style={styles.categoryArrow}>Explore  →</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Learn something new with every question.
          </Text>
          <Text style={styles.footerBrand}>QUIZBALLJS © 2026</Text>
        </View>
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
    marginBottom: 35,
  },
  brand: {
    color: theme.colors.primary,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  brandSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginTop: 4,
  },
  profileButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: theme.colors.white,
    fontSize: 17,
    fontWeight: '800',
  },
  welcomeSection: {
    marginBottom: 24,
  },
  greeting: {
    color: theme.colors.accent,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 9,
  },
  heading: {
    color: theme.colors.primary,
    fontSize: 29,
    fontWeight: '900',
    lineHeight: 36,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginTop: 10,
    lineHeight: 21,
  },
  featuredCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  featuredText: {
    flex: 1,
    paddingRight: 8,
  },
  featuredLabel: {
    color: '#5EEAD4',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  featuredTitle: {
    color: theme.colors.white,
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 8,
  },
  featuredDescription: {
    color: '#CBD5E1',
    fontSize: 12,
    lineHeight: 18,
    maxWidth: 230,
  },
  startButton: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.accent,
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: theme.radius.sm,
    marginTop: 17,
  },
  startButtonText: {
    color: theme.colors.white,
    fontSize: 13,
    fontWeight: '800',
  },
  featuredIcon: {
    fontSize: 48,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17,
  },
  sectionTitle: {
    color: theme.colors.primary,
    fontSize: 19,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 5,
  },
  categoryCount: {
    color: theme.colors.accent,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    padding: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    minHeight: 175,
  },
  categoryIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 13,
  },
  categoryIcon: {
    fontSize: 22,
  },
  categoryTitle: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },
  categorySubtitle: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    lineHeight: 16,
    minHeight: 32,
  },
  categoryArrow: {
    color: theme.colors.accent,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 12,
  },
  footer: {
    alignItems: 'center',
    marginTop: 22,
  },
  footerText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  footerBrand: {
    color: theme.colors.textSecondary,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 8,
  },
});
