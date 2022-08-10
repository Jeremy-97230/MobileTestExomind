import React, {useEffect, useState, useRef} from 'react'
import { StyleSheet, View, Animated, Text, Button, ActivityIndicator} from 'react-native'
import {UrlRequest, launchApi} from '../components/ApiRequest'
import {inseeListe, listMessage} from '../components/datas'

const Weather = () => {

    //variable timer init
    let timerProgressBar = null
    let timerMessage = null

    //initRef
    const tabVilleMeteo = useRef([])
    const [current, setCurrent] = useState(new Animated.Value(0));

    //init state 
    const [valuePercent, setvaluePercent] = useState(0)
    const [valueMessage, setvalueMessage] = useState(0)

    //function waiting time
    const waitingProgress = () => {
        
        timerProgressBar = setTimeout(()=>{
            setvaluePercent(valuePercent + 10)
        },10000)
    }

    const intervalMessageDisplay = () => {
        
        timerMessage = setTimeout(()=>{
            setvalueMessage(valueMessage + 1)
        },6000)
    }

    //function add dataApi in table 
    const pushDataApi = async() =>{

        if(tabVilleMeteo.current.length < 5){
            const issee = inseeListe[tabVilleMeteo.current.length].insee
            const dataApi = await launchApi(UrlRequest(issee))
            if (dataApi !== "error") {

                tabVilleMeteo.current = [
                    ...tabVilleMeteo.current, 
                    {
                        ville: dataApi.city.name, 
                        temperatureMin: dataApi.forecast[0].tmin,
                        temperatureMax: dataApi.forecast[0].tmax,
                        vent: dataApi.forecast[0].wind10m,
                        rainePercent: dataApi.forecast[0].probarain,
                    }
                ]
            }
        }
    }

    //function reset data new requests
    const resetAction = () => {
        tabVilleMeteo.current = []
        setvaluePercent(0)
        setvalueMessage(0)
        current.setValue(0)
        progressBarAnimated()
    }

    //init effect
    useEffect(() => {
        if(valuePercent < 60){
            waitingProgress()
        }
        pushDataApi()
    }, [valuePercent])

    useEffect(() => {
      if (valueMessage < 9){
        intervalMessageDisplay()
      }
    }, [valueMessage])

    useEffect(() => {
        progressBarAnimated()
    }, [])

    //function animated 
    const progressBarAnimated = () => {
        Animated.timing(current, {
            toValue:100,
            duration:60000,
            useNativeDriver:false,
        }).start()
    }
    
    //display progress bar
    const DisplayProgressBar = ({percentage}) => {
        return (
            valuePercent < 60 
            ?
            <View style={styles.containerProgress}>
                <View style={styles.bodyProgress}>
                    <Animated.View style={[styles.progress, {width: current.interpolate({
                        inputRange:[0, 100],
                        outputRange:["0%", "100%"],
                    })}]}/>
                    <Text style={styles.textProgress}>{Math.round(percentage/0.6)}%</Text>
                </View>
            </View>
            :
            <View style={styles.containerProgress} onStartShouldSetResponderCapture={()=> resetAction()}>
                <View style={styles.bodyProgress}>
                    <Text style={styles.btnProgressReste}>Recommencer</Text>
                </View>
            </View>
            
        )
    }

    // display tab city meteo
    const DisplayCityTable = () => {

        return(
            valuePercent === 60 && tabVilleMeteo.current.length > 0
            ?
            <View style={styles.tableContainer}>
                <View style={styles.tableDataContainer}>
                    <Text style={styles.textTitleTab}>Ville</Text>
                    <Text style={styles.textTitleTab}>Temperatures</Text>
                    <Text style={styles.textTitleTab}>Pluie</Text>
                    <Text style={styles.textTitleTab}>Vent</Text>
                </View>
                {
                    tabVilleMeteo.current.map((city, key) => 
                    <View style={styles.tableDataContainer} key={key}>
                        <Text style={styles.tabTextItem}>{city.ville}</Text>
                        <Text style={styles.tabTextItem}>{city.temperatureMin}°C - {city.temperatureMax}°C</Text>
                        <Text style={styles.tabTextItem}>{city.rainePercent}%</Text>
                        <Text style={styles.tabTextItem}>{city.vent}km/h</Text>
                    </View>
                    )
                }
            </View>
            : valuePercent === 60 && tabVilleMeteo.current.length < 1 &&
            <>
                <Text>impossible d'afficher les données Météo</Text>
                <Text>Réessayer</Text>
            </> 
        )
    }

    // display message waiting
    const DisplayMessageWaiting = () => {
        return(
            valuePercent < 60 
            ?
            <Text> {listMessage[valueMessage]} <ActivityIndicator /> </Text>
            :
            <></>
        )
    }
    
    //Render  
    return (
        <View style={styles.globalConterner}>
            <Text style={styles.titleTitle}>Weather App Exomind Test</Text>
            <DisplayCityTable />
            <DisplayMessageWaiting />
            <DisplayProgressBar  percentage={valuePercent}/>
        </View>
    )
}

export default Weather

const styles = StyleSheet.create({
    globalConterner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerProgress:{
        width: "100%",
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 20,
    },
    bodyProgress: { 
        width: "100%",
        height: 50,
        borderRadius: 50,
        backgroundColor: "#fff",
        overflow: 'hidden',
        position: 'relative'
    },
    progress:{
        height: "100%",
        backgroundColor: "#4db5ff",
        position: 'absolute',
        top: 0,
        left: 0
    },
    textProgress:{
        color: "#0080db",
        position: 'absolute',
        right: 10,
        fontSize: 36
    },
    btnProgressReste:{
        color: "#ffffff",
        width: "100%",
        height: "100%",
        textAlign: 'center',
        paddingTop: 12,
        fontSize: 18,
        backgroundColor: "#88cbfb",
        fontWeight: 'bold',
    },
    tableContainer:{
        width: "100%",
        backgroundColor: "#fff",
    },
    tableDataContainer: {
        width: "100%",
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: "#eee",
        borderBottomWidth: 1,
        paddingHorizontal: 15,
    },
    textTitleTab:{
        fontSize:17,
        fontWeight: "bold",
    },
    tabTextItem:{
        textAlign: "center"
    },
    titleTitle:{
        fontSize: 20,
        marginBottom: 35,
        fontWeight: 'bold',
        color: "#000000"
    }
})