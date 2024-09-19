import { StyleSheet, Text, View,Image,FlatList } from 'react-native'
import React, { useEffect } from 'react'
import SubmitButton from '../components/SubmitButton'
import { useGetUserQuery } from '../services/users'
import { useSelector } from 'react-redux'
import LoadingSpinner from '../components/LoadingSpinner'
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from '../global/colors'


const MyProfile = ({navigation}) => {
  const localId = useSelector(state => state.auth.localId)
  const {data:user,isSuccess,isLoading,isError,error} = useGetUserQuery({localId})
  const {data:mail} = useGetUserQuery({mail})


  if(isLoading) return <LoadingSpinner/>


  return (
    <View style={styles.container}>
      <Image
        source={user.image ? 
                {uri:user.image}
                :
                require("../../assets/profile_default.png")}
        resizeMode='cover'
        style={styles.image}
      />

    <Text style={styles.text}>
        {user.locations && user.locations.length > 0 
            ? user.locations[user.locations.length - 1].address 
            : "Aún no hay direcciones"
        }
    </Text>

      <View style={styles.buttonContainer}>
          <AntDesign style={styles.icon} name="camerao" size={30} color="black" />
          <SubmitButton 
                        title=    
                              {user.image !== '' 
                                  ? "Modificar imagen"
                                  : "Agregar imagen"
                              }
                      onPress={()=>navigation.navigate("ImageSelector")}
          />
      </View>

      <View style={styles.buttonContainer}>
          <AntDesign style={styles.icon} name="enviromento" size={24} color="black" />
          <SubmitButton 
                        title=    
                              {user.locations && user.locations.length > 0 
                                  ? "Modificar dirección"
                                  : "Agregar dirección"
                              }
                      onPress={()=>navigation.navigate("LocationSelector")}
          />
      </View>



    </View>
  )
}

export default MyProfile

const styles = StyleSheet.create({
    container:{
        marginTop:70,
        alignItems:"center",
        gap:20
    },
    image:{
        width:150,
        height:150,
        borderRadius:90
    },
    text:{
      fontFamily:"Lobster",
      textAlign:"center",
      color:colors.color2,
      fontSize:18,
      marginHorizontal:8
    },
    buttonContainer:{
      flexDirection:"row",
      alignItems:"center",
    },
    icon:{
      position:"relative",
      left:35,
      zIndex:1
    }
})