import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Overview = () => {
  // Create Animated values for opacity, translation, and scale
  const fadeAnim = useRef(new Animated.Value(0)).current; // For fade-in effect
  const translateX = useRef(new Animated.Value(-300)).current; // For sliding from left
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // For scaling

  useEffect(() => {
    // Run both the fade-in and slide-in with scaling animation at the same time
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // End opacity to 1
        duration: 1500, // Duration for fade-in
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0, // Slide element to its original position
        duration: 1500, // Duration for sliding
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Scale to original size
        duration: 1500, // Duration for scaling
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateX, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [
              { translateX: translateX }, // Apply sliding effect
              { scale: scaleAnim }, // Apply scaling effect
            ],
          },
        ]}
      >
        <Text style={styles.header}>Overview Page</Text>
        <Text style={styles.text}>
          Welcome to the overview page. Here, developers can find details on how to customize and implement this page for CRM purposes. Keep this clean and professional while ensuring interactivity.
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a', // Dark background for a techie feel
    padding: 20,
  },
  card: {
    backgroundColor: '#333', // Dark card for contrast
    borderRadius: 8,
    padding: 30,
    width: '90%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#00ffcc', // Neon green for a tech vibe
  },
  text: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
  },
});

export default Overview;
