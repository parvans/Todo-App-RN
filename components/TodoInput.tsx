import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/home.styles'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const TodoInput = () => {
    const {colors} = useTheme()
    const homeStyle = createHomeStyles(colors)

    const [newTodo, setNewTodo] = useState("");
    const addTodo = useMutation(api.todos.addTodo);

    const handleAddTodo =async()=>{
        if(!newTodo.trim()) return
        try {
            await addTodo({text:newTodo.trim()})
            setNewTodo("")
        } catch (error) {
            console.log("Error adding a tod ",error);
            Alert.alert("Error","Failed to add todo.")
        }
        
    }

  return (
    <View style={homeStyle.inputSection}>
      <View style={homeStyle.inputWrapper}>
        <TextInput
        style={homeStyle.input}
        placeholder='What need to be done ?'
        value={newTodo}
        onChangeText={setNewTodo}
        onSubmitEditing={handleAddTodo}
        multiline
        placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity onPress={handleAddTodo} activeOpacity={0.7} disabled={!newTodo.trim()} >
            <LinearGradient 
            colors={newTodo.trim() ? colors.gradients.primary : colors.gradients.muted}
            style={[homeStyle.addButton, !newTodo.trim() &&  homeStyle.addButtonDisabled]}
            >
                <Ionicons name='add' size={24} color={"#ffffff"}/>
            </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TodoInput