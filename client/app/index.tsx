import { Text, View,  StyleSheet } from 'react-native';
import {Link} from  'expo-router';
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Link href="/auth/login">
      Login
      </Link>
      <Text style={styles.text}>Home screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
});
