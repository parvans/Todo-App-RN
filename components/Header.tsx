import { View, Text } from 'react-native'
import React from 'react'
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { createHomeStyles } from '@/assets/styles/home.styles';
import useTheme from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
    const {colors} = useTheme()
    const homeStyle = createHomeStyles(colors)
    const todos = useQuery(api.todos.getTodos);
    const completedCount = todos ? todos.filter((item)=>item.isCompleted).length : 0;
    const totalTodos = todos ? todos.length : 0;
    const progressPercentage = totalTodos > 0 ? (completedCount/totalTodos)*100 : 0;

    
  return (
    <View style={homeStyle.header}>
        <View style={homeStyle.titleContainer}>
            <LinearGradient colors={colors.gradients.primary} style={homeStyle.iconContainer}>
                <Ionicons name='flash-outline' size={28} color="#ffffff"/>
            </LinearGradient>
            <View style={homeStyle.titleTextContainer}>
                <Text style={homeStyle.title}>Today&apos;s Task 👀</Text>
                <Text style={homeStyle.subtitle}>{completedCount} of {totalTodos} completed</Text>
            </View>
        </View>
            <View style={homeStyle.progressContainer}>
                <View style={homeStyle.progressBarContainer}>
                    <View style={homeStyle.progressBar}>
                        <LinearGradient 
                        colors={colors.gradients.success} 
                        style={[homeStyle.progressFill, {width:`${progressPercentage}%`}]}
                        />
                    </View>
                    <Text style={homeStyle.progressText}>{Math.round(progressPercentage)} %</Text>
                </View>
            </View>
    </View>
  )
}

export default Header