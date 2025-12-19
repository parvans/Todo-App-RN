import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/home.styles';
import { LinearGradient } from 'expo-linear-gradient';

const LoadingSpinner = () => {
    const {colors} = useTheme();
    const homeStyle = createHomeStyles(colors);
  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyle.container}>
        <View style={homeStyle.loadingContainer}>
            <ActivityIndicator size={"large"} color={colors.primary}/>
            <Text style={homeStyle.loadingText}>Loading your todos...</Text>
        </View>
    </LinearGradient>
  )
}

export default LoadingSpinner