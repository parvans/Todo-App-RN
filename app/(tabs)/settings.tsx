import { View, Text, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme';
import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ProgressStats from '@/components/ProgressStats';
import Preferences from '@/components/Preferences';

const Settings = () => {
  const { colors } = useTheme();
  const styles = createSettingsStyles(colors);
  
  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <StatusBar barStyle={colors.statusBarStyle}/>
      <SafeAreaView style={styles.safeArea}>
        {/* header  */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <LinearGradient colors={colors.gradients.primary} style={styles.iconContainer}>
              <Ionicons name='settings-outline' size={28} color="#ffffff"/>
            </LinearGradient>
            <Text style={styles.title}>Settings</Text>
          </View>
        </View>
        {/* content  */}
        <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.content} 
        showsVerticalScrollIndicator={false}
        >
          <ProgressStats />
          {/* preferences section */}
          <Preferences/>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default Settings