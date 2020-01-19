import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'; 
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'; //IMPORTANDO ICON, DO EXPO

import api from '../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../services/socket';

function Main({ navigation }){
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');

    useEffect(() =>{
        //Vai carregar a posição inicial
        async function loadInitialPosition(){
            //Pedindo a permissão do usuário para localização atual
            const { granted } = await requestPermissionsAsync(); //se ele permitir = granted

            if (granted){
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords; //pegando somente lat e long

                setCurrentRegion ({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })

            }
        } 
        loadInitialPosition();
    }, [])

    useEffect(() => {
        subscribeToNewDevs(dev => setDevs([...devs, dev]));
    }, [devs]) //monitorando a variavel devs

    function setupWebSocket(){
        disconnect();

        const { latitude, longitude } = currentRegion;

        connect(
            latitude,
            longitude,
            techs,
        );
    };

    async function loadDevs(){
        const { latitude, longitude } = currentRegion;
        
        const response = await api.get('/search',{
            params:{
                latitude,
                longitude,
                techs,
            }
        });
        setDevs(response.data.devs);
        setupWebSocket();
    }

    function handleRegionChanged(region){
        setCurrentRegion(region);
    }

    if(!currentRegion){
        return null; //caso não existir, não renderiza nada
    }

    return(
        <>
            <MapView 
                onRegionChangeComplete={handleRegionChanged}  //Toda vez que o usuário mecher no mapa vai guardar no handleRegionChanged 
                initialRegion={currentRegion} 
                style={styles.map}
            >
                {devs.map(dev => (
                    <Marker 
                        key={dev._id}
                        coordinate={{ 
                            longitude:dev.location.coordinates[0], 
                            latitude: dev.location.coordinates[1],
                        }}
                    >
                    <Image style={styles.avatar} 
                       source={{ uri: dev.avatar_url }} 
                    />
                        
                    <Callout onPress={() => {
                        //Navegação ao clicar
                        navigation.navigate('Profile', { github_username: dev.github_username })

                    }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}> {dev.name} </Text> 
                        <Text style={styles.devBio}> {dev.bio} </Text> 
                        <Text style={styles.devTechs}> {dev.techs.join(', ')} </Text> 
                    </View>
                    </Callout>
                </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput 
                    style={styles.searchInput} 
                    placeholder="Buscar desenvolvedores por techs:"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />
            </View>
            
            <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                <MaterialIcons name="my-location" size={20} color="#FFF"/>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    map:{
        flex:1,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 5,
        borderWidth: 4,
        borderColor: "#FFF",
    },  
    callout:{
        width:260,
    },
    devName:{
        fontWeight: "bold",
        fontSize: 16,
    },
    devBio:{
        color: '#666',
        marginTop: 5,
    },
    devTechs:{
        marginTop:5,
    },
    searchForm:{
        position: 'absolute',
        top: 8,
        left: 3,
        right: 60,
        zIndex: 5,
        flexDirection: 'row',
    },
    searchInput:{
        flex: 1,
        height: 50,
        backgroundColor: "#FFF",
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset:{
            width: 4,
            height: 4,
        },
        elevation: 5, //boxshadow
    },
    loadButton:{
        position: 'absolute',
        top: 8,
        right: 5,
        width: 50,
        height: 50,
        backgroundColor: "#8D4EFF",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 300,
        elevation: 5, //boxshadow
    },
}); 

export default Main;