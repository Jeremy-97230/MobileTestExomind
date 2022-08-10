import React from 'react'
import { StyleSheet ,View, Text, Button } from 'react-native'

const Home = ({ navigation }) => {

    const goToNextView = () =>{
        navigation.navigate('Weather')
    }

  return (
    <View style={{flex: 1, backgroundColor: "#e6e6e6"}}>
      <Text style={styles.title}>Weather Exomind</Text>
      <View 
        style={styles.containerBtn}
        onStartShouldSetResponder={goToNextView}
        >
        <Text style={styles.textBtn}>Go Weather</Text>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    title:{
        fontWeight: "bold",
        fontSize: 40,
        textAlign: "center",
        marginVertical: 100
    },
    containerBtn:{
        backgroundColor: "#7ad5ff",
        marginHorizontal: 15,
        borderRadius: 7,
        elevation: 5
    },
    textBtn:{
        color: "#fff",
        textAlign: 'center',
        paddingVertical: 30,
        fontWeight: "bold",
        fontSize: 20
    }
})