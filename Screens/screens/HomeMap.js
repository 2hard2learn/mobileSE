import react, {useState, useRef, useEffect} from "react";
import { View, Text, StyleSheet, Linking, Dimensions, TouchableOpacity, Image, Alert } from "react-native";
import {getDistance} from 'geolib';
import MapView, { Marker,AnimatedRegion,PROVIDER_GOOGLE} from 'react-native-maps';
import { GOOGLE_MAPS_APIKEY } from "./constants/googleMapKey";
import MapViewDirections from "react-native-maps-directions";
import { icCurLoc,icGreenMarker } from "./constants/imagePath";
import { Ionicons } from '@expo/vector-icons';
import * as WorkModel from '../../firebase/workModel'
import Constants from 'expo-constants';

export const HomeMap = ({navigation,route}) => {
    const screen = Dimensions.get('window');
    const ASPECT_RATIO = screen.width / screen.height;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    // const Info = useSelector((state) => state.auths)
    const [show, setShow] = useState(false);
    const [double, setDouble] = useState(false);
    const [namePlace, setNamePlace] = useState([]);
    const [descriptionPlace, setDescriptionPlace] = useState([]);
    const [locateLatitude, setLocateLatitude] = useState([]);
    const [locateLongitude, setLocateLongitude] = useState([]);
    const [locateImage, setLocateImage] = useState([]);

    const [tmpDouble, setTmpDouble] = useState('');
    const [distance, setDistance] = useState(0);

    const [state, setState] = useState({
        startingCords: {},
        destinationCords: {},
    })

    const get_name_success = (name) => {
        setNamePlace(name)
        // console.log(namePlace)
    }

    const get_des_success = (des) => {
        setDescriptionPlace(des);
        // console.log(descriptionPlace)
    }

    const get_lat_success = (lat) => {
        let intstr = []
        lat.forEach((data) => {
            intstr.push(parseFloat(data))
        });
        setLocateLatitude(intstr)
        // console.log(locateLatitude)
    }

    const get_lng_success = (lng) => {
        let intstr = []
        lng.forEach((data) => {
            intstr.push(parseFloat(data))
        });
        setLocateLongitude(intstr)
        // console.log(locateLongitude)
    }

    const get_pic_success = (pic) => {
        setLocateImage(pic)
        // console.log(locateImage)
    }

    const get_unsuccess = () => {
        console.log('no')
    }

    useEffect(() => {
        WorkModel.getMap('getName',get_name_success,get_unsuccess)
        WorkModel.getMap('getDes',get_des_success,get_unsuccess)
        WorkModel.getMap('getLat',get_lat_success,get_unsuccess)
        WorkModel.getMap('getLng',get_lng_success,get_unsuccess)
        WorkModel.getMap('getPic',get_pic_success,get_unsuccess)
    }, []);

    const mapRef = useRef()
    const {startingCords, destinationCords} = state

    const onShow = () => {
        setShow(false)
    }

    const doubleClick = (index) => {
        let name = namePlace[index];
        let lat = locateLatitude[index];
        let lng = locateLongitude[index];
        if (name == tmpDouble) {
            Alert.alert("Confirmation","Wanna go?",
            [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Let Go",
                onPress: () => {
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                    Linking.openURL(url);
                },
            },
            ],
            { cancelable: false}
            );
            setDouble(false);
            // console.log("go get double click")
        } else {
            // console.log("keep new one")
            setTmpDouble(name)
        }
    };

    const onPressLocation = () => {
        navigation.navigate('ChooseLocation',{getCordinates: fetchValues})
        setShow(false);
    }

    const onGoogle = () => {
        let lat = destinationCords.latitude
        let lng = destinationCords.longitude
        Alert.alert("Exit app","This will exit app to another app.",
            [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Yes",
                onPress: () => {
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                    Linking.openURL(url);
                },
            },
            ],
            { cancelable: false}
            );
    }

    const fetchValues = (data) => {
        setState({
            startingCords: {
                latitude: data.pickupCords.latitude,
                longitude: data.pickupCords.longitude,
            },
            destinationCords: {
                latitude: data.destinationCords.latitude,
                longitude: data.destinationCords.longitude,
            },
        })
        console.log("data===>", data)
        setShow(true)
    }

    return (
        <View style = {styles.container}>
            <View style={styles.topCard}>
                <TouchableOpacity style={styles.topCardbtn}
                onPress={()=>{
                    navigation.navigate({name:'Home'})
                }}
                >
                <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.topHeader}>แผนที่</Text>
            </View>

            <View style={{flex:1}}>
                {show ? (
                    <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style = {StyleSheet.absoluteFill}
                    initialRegion={{...startingCords,}}
                    >
                        <Marker 
                            coordinate = {startingCords}
                            title="Starting Point"
                        >
                            {icCurLoc}
                        </Marker>
                        <Marker 
                            coordinate = {destinationCords}
                            title="Destination Point"
                        >
                            {icGreenMarker}
                        </Marker>   
                        <MapViewDirections
                            origin={startingCords}
                            destination={destinationCords}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="orange"
                            optimizeWaypoints={true}
                            onReady={result => {
                                mapRef.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: 30,
                                        bottom: 150,
                                        left: 30,
                                        top: 100,
                                    }
                                });
                                const distance = getDistance(
                                    { latitude: startingCords.latitude, longitude: startingCords.longitude},
                                    { latitude: destinationCords.latitude, longitude: destinationCords.longitude}
                                );
                                // console.log('Distance:' ,distance / 1000, 'km');
                                const distanceInKm = distance / 1000;
                                setDistance(distanceInKm.toFixed(2));
                            }}
                        />
                    </MapView>
                    
                ) : <MapView
                        ref={mapRef}
                        style={StyleSheet.absoluteFill}
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        initialRegion={{
                            latitude: startingCords.latitude || 13.121535126979689,
                            longitude: startingCords.longitude || 100.91912181391285,
                            latitudeDelta: 0.08,
                            longitudeDelta: 0.08,
                        }}
                    >
                        {locateLatitude.map((latitude, index) => (
                            <Marker 
                                key={index}
                                coordinate={{
                                    latitude: latitude,
                                    longitude: locateLongitude[index],
                                }}
                                title={namePlace[index]}
                                description={descriptionPlace[index]}
                                pinColor={"green"}
                                onPress={() => {
                                    doubleClick(index)
                                }}
                            />
                        ))}
                    </MapView>}
                
            </View>
            <View style= {styles.bottomCard}>
                <View style = {{flexDirection:'row',justifyContent:'space-around',borderWidth:0}}>
                    {show ? (
                        <Text style={styles.textStyle3}> {distance} km</Text>
                    ) : <Text style={{height:30, marginTop:16,color:'white',fontSize:16,fontFamily:'Sound-Rounded'}}
                    >
                        "Double Click" On Marker Or Navigate
                    </Text>
                    }
                    {show ? (
                        <TouchableOpacity
                        style={styles.onMinimap}
                        onPress={onShow}
                    >
                        <Text style={styles.textStyle2}>Show all</Text>
                    </TouchableOpacity>
                    ) : null}
                </View>
                { show ? (
                    <TouchableOpacity 
                        style={styles.inputStyle}
                        onPress={onGoogle}
                    >
                        <Text style={styles.textStyle}>Get this location to google map</Text>
                    </TouchableOpacity>
                ): <TouchableOpacity 
                        style={styles.inputStyle}
                        onPress={onPressLocation}
                    >
                        <Text style={styles.textStyle}>Choose your location</Text>
                    </TouchableOpacity>
                }
                    
                    
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'space-between',
        paddingTop: Constants.statusBarHeight,
    },
    topCard: {
        height:80,
        backgroundColor:'#05C3FF',
        alignItems:'center',
        flexDirection:'row'
    },
    topCardbtn: {
        width:50,
        height:50,
        backgroundColor:'#FFA133',
        marginLeft:10,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
    },
    topHeader: {
        borderWidth:0,
        fontSize:25,
        color:'white',
        marginLeft:20,
        fontFamily:'Sound-Rounded',
    },
    bottomCard: {
        backgroundColor: '#05C3FF',
        width: '100%',
        padding: 20,
        borderTopEndRadius: 24,
        borderTopStartRadius: 24,
        borderWidth:0,
    },
    inputStyle: {
        backgroundColor: '#00D662',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'cyan',
        alignItems: 'center',
        height: 48,
        justifyContent: 'center',
        marginTop: 0,
    },
    onMinimap: {
        backgroundColor: '#FC3B3B',
        borderRadius: 2,
        borderWidth: 1,
        alignItems: 'center',
        height: 30,
        width: 70,
        marginLeft: 70,
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    btnStyle: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00D662',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 24,
    },
    btnStyle2: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFB156',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 24,
    },
    textStyle: {
        fontFamily:'Sound-Rounded',
        fontSize: 20,
        color:'white',
    },
    textStyle2: {
        fontFamily:'Sound-Rounded',
        fontSize: 14,
        color:'white',
    },
    textStyle3: {
        fontFamily:'Sound-Rounded',
        fontSize: 24,
        color:'yellow',
        borderWidth: 1,
        borderColor: 'transparent'
    },
});