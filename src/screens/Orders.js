import { StyleSheet, Text, View, FlatList } from 'react-native'
import OrderItem from '../components/OrderItem'
import {  useDeleteOrderMutation, useGetOrdersByUserQuery } from '../services/orders'
import LoadingSpinner from '../components/LoadingSpinner'
import { useSelector } from 'react-redux'
import EmptyList from '../components/EmptyList'
import SubmitButton from '../components/SubmitButton'
import { useEffect } from 'react'

const Orders = () => {

  const localId = useSelector(state => state.auth.localId)
  const [triggerUseDeleteOrderMutation] = useDeleteOrderMutation()

  const {data:orders,isLoading} = useGetOrdersByUserQuery(localId)


  if(isLoading) return <LoadingSpinner/>

  if(orders.length === 0){
    return <EmptyList title="¡Por el momento no hay órdenes!" button="Ir al carrito" navigateTo="CartStack"/>
  }

  const deleteOrders = () => {
    triggerUseDeleteOrderMutation({localId})
  }

  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={(item)=> item.id}
        renderItem={({item})=> <OrderItem item={item}/>}
      />

      <SubmitButton title="Eliminar todas las órdenes" onPress={deleteOrders}/>
      
    </View>
  )
}

export default Orders

const styles = StyleSheet.create({})