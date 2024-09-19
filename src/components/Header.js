import { Pressable, StyleSheet, Text, View,StatusBar,Platform } from 'react-native'
import { colors } from '../global/colors'
import AntDesign from '@expo/vector-icons/AntDesign'
import { deleteSession } from '../db'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../features/auth/authSlice'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native'


const Header = ({title}) => {

  const dispatch = useDispatch()
  const idToken = useSelector(state => state.auth.idToken)
  const navigation = useNavigation()
  const route = useRoute()

  const onLogout = () =>{
    deleteSession()
    dispatch(clearUser())
  }
  return (
    <View style={styles.container}>
      {route.name !== "Home" && route.name !== "Login" && route.name !== "Register"? 
      <Pressable style={styles.icon} onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-undo-circle-outline" size={35} color="white" />
      </Pressable>
      :
      null
      } 
      <Text style={styles.text}>{title}</Text>
      {idToken && 
      <Pressable onPress={onLogout} style={styles.logout}>
        <Ionicons name="exit-outline" size={35} color="white" />
      </Pressable>}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container:{
    marginTop:Platform.OS === "android" ? StatusBar.currentHeight:0,
    backgroundColor:colors.color2,
    width:"100%",
    height:80,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    position:"relative"
  },
  text:{
    fontSize:25,
    fontFamily:'Josefin',
    color:"white"
  },
  icon:{
    position:"absolute",
    left:20
  },
  logout:{
    position:"absolute",
    right:10,
  }

})