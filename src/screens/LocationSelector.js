import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { mapStaticApi } from '../firebase/googleApi';
import SubmitButton from '../components/SubmitButton';
import { useGetUserQuery, usePostUserLocationMutation } from '../services/users';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import AntDesign from '@expo/vector-icons/AntDesign';
import ListLocations from '../components/ListLocations';

const LocationSelector = ({navigation}) => {


    const localId = useSelector(state => state.auth.localId)

    const {data:user} = useGetUserQuery({localId})
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null
    });
    const [address, setAddress] = useState("");
    const [triggerPostUserLocation] = usePostUserLocationMutation()

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                alert("Permiso para acceder a la ubicación denegado");
                return;
              }
            const newLocation = await Location.getCurrentPositionAsync();
            setLocation({
                latitude: newLocation.coords.latitude,
                longitude: newLocation.coords.longitude
            });
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (location.latitude && location.longitude) {
                const urlReverseGeoding = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${mapStaticApi}`;
                const response = await fetch(urlReverseGeoding);
                const data = await response.json();
                setAddress(data.results[0]?.formatted_address || "Dirección no encontrada");
            }
        })();
    }, [location]);

    const handleConfirmLocation = () => {
        const userLocation = {
            ...location,
            address
        };
        triggerPostUserLocation({ localId, userLocation });
        navigation.navigate("MyProfile");
    };

    const handleSelectLocation = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setLocation({ latitude, longitude });
    };



    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>{address}</Text>
            
            {location.latitude && location.longitude ? (
                <MapView 
                    style={styles.map}
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.01, 
                        longitudeDelta: 0.01
                    }}
                    onLongPress={handleSelectLocation}
                >
                    <Marker 
                        coordinate={location} 
                        draggable
                        onDragEnd={handleSelectLocation} 
                    />
                </MapView>
            ) : (
                <LoadingSpinner/>
            )}

            <Text style={styles.coment}>Arrastrar, y mantener presionado para marcar otra dirección</Text>

            <View style={styles.buttonContainer}>
                <AntDesign style={styles.geoIcon} name="enviromento" size={24} color="black" />
                <SubmitButton style={styles.button} title="Confirmar ubicación" onPress={handleConfirmLocation} />
            </View>

            <ListLocations locations={user.locations}/>

        </ScrollView>
    );
};

export default LocationSelector;

const styles = StyleSheet.create({
    container: {
        marginTop:15,
        width: "100%"
    },
    text: {
        textAlign: "center",
        marginBottom: 30,
        fontFamily: "Playfair",
        fontSize: 25,
        marginHorizontal: 22
    },
    map: {
        width: '90%',
        height: 350,
        borderRadius: 10,
        marginHorizontal:"auto",
    },
    coment:{
        textAlign:"center",
        fontStyle:"italic"
    },
    buttonContainer: {
        marginHorizontal: "auto",
        marginTop: 30,
        alignItems:"center",
        flexDirection:"row"
    },
    geoIcon:{
        position:"absolute",
        zIndex:1,
        left:10
    }
});
