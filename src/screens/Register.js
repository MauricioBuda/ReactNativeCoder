import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { colors } from '../global/colors'
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'
import { useRegisterMutation } from '../services/auth'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/auth/authSlice'
import { registerSchema } from '../validations/registerSchema'
import { deleteSession, insertSession } from '../db'
import AntDesign from '@expo/vector-icons/AntDesign';


const Register = ({navigation}) => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [errorEmail,setErrorEmail] = useState("")
    const [errorPassword,setErrorPassword] = useState("")
    const [errorConfirmPassword,setErrorConfirmPassword] = useState("")
    const [triggerRegister,{data,isSuccess,isError,error}] = useRegisterMutation()
    const dispatch = useDispatch()
    const [viewPass, setViewPass] = useState(true)
    const [viewConfirmPass, setViewConfirmPass] = useState(true)



    useEffect(()=>{
      if(isError) {
        setErrorEmail("email existente")
      }
    },[isError])



    const onSubmit = async () => {
      try {
        registerSchema.validateSync({email,password,confirmPassword})
        const {data} = await triggerRegister({email,password})
        deleteSession()
        insertSession(data)
        dispatch(setUser({email:data.email,
         idToken:data.idToken,
         localId:data.localId
       }))
      } catch (error) {
        switch(error.path){
          case "email":
            setErrorEmail(error.message)
            setErrorPassword("")
            setErrorConfirmPassword("")
            break
          case "password":
            setErrorEmail("")
            setErrorPassword(error.message)
            setErrorConfirmPassword("")
            break
          case "confirmPassword":
            setErrorEmail("")
            setErrorPassword("")
            setErrorConfirmPassword(error.message)
            break
            
        }
      }
    }


    const handleChangeViewPass = () => {
      setViewPass(!viewPass)
    }

    const handleChangeViewConfirmPass = () => {
      setViewConfirmPass(!viewConfirmPass)
    }

  return (
    <View style={styles.main}>
        <View style={styles.container}>
            <InputForm
                label="Email"
                value={email}
                onChangeText={(t) => setEmail(t)}
                isSecure={false}
                error={errorEmail}
            />

            <View style={styles.inputContainer}>
                <InputForm
                    label="Password"
                    value={password}
                    onChangeText={(t) => setPassword(t)}
                    isSecure={viewPass}
                    error = {errorPassword}
                />
                <AntDesign onPress={handleChangeViewPass} style={styles.eye} name="eye" size={24} color="black" />
            </View>
            <View style={styles.inputContainer}>
                <InputForm
                    label="Confirmar Password"
                    value={confirmPassword}
                    onChangeText={(t) => setConfirmPassword(t)}
                    isSecure={viewConfirmPass}
                    error={errorConfirmPassword}
                />
                <AntDesign onPress={handleChangeViewConfirmPass} style={styles.eye} name="eye" size={24} color="black" />
            </View>

            <SubmitButton onPress={onSubmit} title="Registrarme"/>
            <Text style={styles.sub}>¿Ya tenés una cuenta?</Text>
            <Pressable onPress={()=> navigation.navigate("Login")} >
                <Text style={styles.subLink}>Incio de sesion</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
      },
      container:{
        width:"90%",
        backgroundColor:colors.color1,
        gap:15,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:20
      },
      title:{
        fontSize:22,
        fontFamily:"Lobster"
      },
      sub:{
        fontSize:14,
        fontFamily:"Josefin"
      },
      subLink:{
        fontSize:14,
        fontFamily:"Josefin",
        color:"blue"
      },
      inputContainer:{
        flexDirection:"row",
        alignItems:"center",
      },
      eye:{
        position:"absolute",
        right:25,
        top:30
      }
})