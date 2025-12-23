import { View, Text } from 'react-native'
import React from 'react'
import { createSettingsStyles } from '@/assets/styles/settings.styles';
import useTheme from '@/hooks/useTheme';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ProgressStats = () => {
    const {colors, isDark, toggleDark} = useTheme();
    const styles = createSettingsStyles(colors);
    const todos = useQuery(api.todos.getTodos);
    const totalTodos = todos ? todos.length : 0;
    const completedTodos = todos ? todos.filter(todo => todo.isCompleted).length : 0;
    const pendingTodos = totalTodos - completedTodos;

  return (
    <LinearGradient colors={colors.gradients.surface} style={styles.section}>
        <Text style={styles.sectionTitle}>Progress Stats</Text>
        <View style={styles.statsContainer}>

            <LinearGradient colors={colors.gradients.background} style={[styles.statCard, {borderLeftColor: colors.primary}]}>
                <View style={styles.statIconContainer}>
                    <LinearGradient colors={colors.gradients.primary} style={styles.statIcon}>
                        <Ionicons name='list' size={24} color="#fff"/>
                    </LinearGradient>
                </View>
                <View>
                    <Text style={styles.statNumber}>{totalTodos}</Text>
                    <Text style={styles.statLabel}>Total Todos</Text>
                </View>
            </LinearGradient>

            <LinearGradient colors={colors.gradients.background} style={[styles.statCard, {borderLeftColor: colors.success}]}>
                <View style={styles.statIconContainer}>
                    <LinearGradient colors={colors.gradients.success} style={styles.statIcon}>
                        <Ionicons name='checkmark-circle' size={24} color="#fff"/>
                    </LinearGradient>
                </View>
                <View>
                    <Text style={styles.statNumber}>{completedTodos}</Text>
                    <Text style={styles.statLabel}>Completed Todos</Text>
                </View>
            </LinearGradient>
            <LinearGradient colors={colors.gradients.background} style={[styles.statCard, {borderLeftColor: colors.warning}]}>
                <View style={styles.statIconContainer}>
                    <LinearGradient colors={colors.gradients.warning} style={styles.statIcon}>
                        <Ionicons name='time' size={24} color="#fff"/>
                    </LinearGradient>
                </View>
                <View>
                    <Text style={styles.statNumber}>{pendingTodos}</Text>
                    <Text style={styles.statLabel}>Pending Todos</Text>
                </View>
            </LinearGradient>
        </View>
        
    </LinearGradient>
  )
}

export default ProgressStats