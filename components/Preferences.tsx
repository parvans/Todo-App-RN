import { View, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme';
import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Preferences = () => {
  const [isAutoSync, setIsAutoSync] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const {colors, isDark, toggleDark} = useTheme();
  const styles = createSettingsStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.surface} style={styles.section}>
      <Text style={styles.sectionTitle}>Preferences</Text>
      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
            <LinearGradient colors={colors.gradients.primary} style={styles.settingIcon}>
                <Ionicons name='moon' size={18} color="#fff"/>
            </LinearGradient>
            <Text style={styles.settingText}>Dark Mode</Text>
        </View>
        <Switch
        value={isDark}
        onValueChange={toggleDark}
        thumbColor="#aeaeaeff"
        trackColor={{ false: colors.border, true: colors.primary }}

        />
      </View>
      
    </LinearGradient>
  )
}

export default Preferences