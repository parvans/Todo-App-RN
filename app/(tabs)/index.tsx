import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheme, { ColorScheme } from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { Alert, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import EmptyState from "@/components/EmptyState";
import { useState } from "react";
import { updateTodo } from "@/convex/todos";

type Todo = Doc<"todos">
export default function Index() {
  const { toggleDark, colors }=useTheme();
  const [editingId,setEditingId] = useState<Id<"todos"> | null>(null);
  const [editingText,setEditingText] = useState("");
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  const addTodo = useMutation(api.todos.addTodo);
  const clearAllTodos = useMutation(api.todos.clearAllTodos);
  const isLoading = todos === undefined;
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const editTodo = useMutation(api.todos.updateTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  if(isLoading) return <LoadingSpinner />

  const handleToggleTodo = async(id:Id<"todos">) => {
    try {
      await toggleTodo({id})
    } catch (error) {
      console.log("Error toggling todo", error);
      Alert.alert("Error", "Failed to toggle todo")
      
    }
  }

  const handleDeleteTodo = async(id:Id<"todos">) => {
    if(!id) return;
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo ?",[
      {text:"Cancel", style:"cancel"},
      {text:"Delete", style:"destructive", onPress:()=> deleteTodo({id})},
    ]);

  }

  const handleEditTodo = (todo:Todo) => {
    setEditingText(todo.text);
    setEditingId(todo._id);
  }
  const handleSaveTodo = async() => {
    if(editingId){
      try {
        await editTodo({id:editingId,text:editingText.trim()})
        setEditingId(null);
        setEditingText("");
      } catch (error) {
        console.log("Error update todo", error);
        Alert.alert("Error", "Failed to update todo")
      }
    }
  }
  const handleCancelEditTodo = () => {
    setEditingId(null);
    setEditingText("");
  }

  const renderTodoItem = ({item}:{item:Todo})=>{
    const isEditing = editingId === item._id;

    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient 
        colors={colors.gradients.surface} 
        style={homeStyles.todoItem}
        start={{x:0,y:0}}
        end={{x:1,y:1}}
        >
          <TouchableOpacity 
            style={homeStyles.checkbox} 
            activeOpacity={0.7}
            onPress={()=>handleToggleTodo(item._id)}
            >
              <LinearGradient
                colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
                style={[homeStyles.checkboxInner,
                  {borderColor: item.isCompleted ? "transparant" : colors.border}
                ]}
              >
                {item.isCompleted && <Ionicons name="checkmark" size={18} color={"#fff"}/>}
              </LinearGradient>
          </TouchableOpacity>
          {isEditing ? (
            <View style={homeStyles.editContainer}>
              <TextInput
                style={homeStyles.editInput}
                value={editingText}
                onChangeText={setEditingText}
                autoFocus
                multiline
                placeholder="Edit your todo..."
                placeholderTextColor={colors.textMuted}
              />
              <View style={homeStyles.editButtons}>
                <TouchableOpacity activeOpacity={0.8} onPress={handleSaveTodo}>
                  <LinearGradient colors={colors.gradients.success} style={homeStyles.editButton}>
                    <Ionicons name="checkmark" size={16} color={"#fff"}/>
                    <Text style={homeStyles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={handleCancelEditTodo}>
                  <LinearGradient colors={colors.gradients.muted} style={homeStyles.editButton}>
                    {/* <Ionicons name="checkmark" size={16} color={"#fff"}/> */}
                    <Text style={homeStyles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ):(
            
            <View style={homeStyles.todoTextContainer}>
              <Text
              style={[
                homeStyles.todoText,
                item.isCompleted &&{
                  textDecorationLine:"line-through",
                  color:colors.textMuted,
                  opacity:0.6
                }
              ]}
              >
                {item.text}
              </Text>
  
              <View style={homeStyles.todoActions}>
                <TouchableOpacity onPress={()=>handleEditTodo(item)} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
                    <Ionicons name="pencil" size={18} color={"#fff"}/>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleDeleteTodo(item._id)} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
                    <Ionicons name="trash" size={18} color={"#fff"}/>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}
          
        </LinearGradient>
      </View> 
    )
  }
  
  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle}/>
      <SafeAreaView style={homeStyles.safeArea}>
        <Header/>
        <TodoInput/>
       {/* {todos?.map((todo)=>(
        <Text key={todo._id}>{todo.text}</Text>
        ))} */}
        <FlatList
        data={todos || []}
        renderItem={renderTodoItem}
        keyExtractor={(item)=>item._id}
        style={homeStyles.todoList}
        contentContainerStyle={homeStyles.todoListContent}
        ListEmptyComponent={<EmptyState/>}
        showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity onPress={toggleDark}>
          <Text>Click</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}