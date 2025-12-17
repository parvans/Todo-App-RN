import useTheme from "@/hooks/useTheme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const {toggleDark}=useTheme()
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.content}>This is my first ever react native app</Text>
      <TouchableOpacity onPress={toggleDark}>
        <Text>Click</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1, // gonna be col direction automatically
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:"green",
  },
  content:{
    fontSize:22,
    fontWeight:'bold',
    color:'white'
  }
})
