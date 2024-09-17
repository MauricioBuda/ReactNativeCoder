import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'

const SubmitButton = ({title,onPress}) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

export default SubmitButton

const styles = StyleSheet.create({
    button:{
        width:"80%",
        backgroundColor:colors.color1,
        padding:10,
        alignItems:"center",
        borderRadius:10,
        justifyContent:"center",
        marginHorizontal:"auto",
        marginVertical:10
    },
    text:{
        textAlign:"center",
        color:"white",
        fontSize:18
    }
})