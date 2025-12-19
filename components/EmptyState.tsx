import { View, Text } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/home.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const EmptyState = () => {
    const {colors} = useTheme();
    const homeStyle = createHomeStyles(colors);
  return (
    <View style={homeStyle.emptyContainer}>
      <LinearGradient colors={colors.gradients.empty} style={homeStyle.emptyIconContainer}>
        <Ionicons name='clipboard-outline' size={60} color={colors.textMuted}/>
      </LinearGradient>
      <Text style={homeStyle.emptyText}>No todos yet!</Text>
      <Text style={homeStyle.emptySubtext}>Add your first todo above to get started</Text>

    </View>
  )
}

export default EmptyState