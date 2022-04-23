import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { image,ImageBackground,StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'
import background from '../assets/images/homeBack.gif'
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'
const HomeScreen = () => {
  const navigation = useNavigation()
  const handleSignOut = () => {

        auth
        .signOut()
        .then(() => {
            navigation.replace("Login")
        })
        .catch(error => alert(error.message))
  }
  const goToApod = () => {
    navigation.replace("Apod")
  }
  const goToMarsRover = () => {
    navigation.replace("MarsRover")
  }
  const goToAsteroids = () => {
    navigation.replace("Asteroids")
  }
  const goToPage = () => {
    navigation.replace("Page")
  }

  return (

    <View style={styles.container}>
    <ImageBackground source={background} resizeMode="cover" style={styles.image}>
    <View>
      <TouchableOpacity
        onPress={goToApod}
        style={styles.Apodbutton}
      >
        <Text style={styles.buttonText}>Apod</Text>
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity
        onPress={goToMarsRover}
        style={styles.MarsRoverbutton}
      >
        <Text style={styles.buttonText}>Mars Rover</Text>
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity
        onPress={goToAsteroids}
        style={styles.Asteroidsbutton}
      >
        <Text style={styles.buttonText}>Asteroids</Text>
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity
        onPress={goToPage}
        style={styles.Pagebutton}
      >
        <Text style={styles.buttonText}>Planets</Text>
      </TouchableOpacity>
    </View>
      
    <View>
      <Text style={styles.emailStyle}>Email: {auth.currentUser?.email}</Text>
    </View>

    <View>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      
    </View>
    </ImageBackground>
      
    </View>
    
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //position:'relative',
    alignItems: 'center'
  },
  emailStyle:{
    color: '#fff',
  },
  Apodbutton: {
    backgroundColor: '#000C15',
    width: '100%',
    paddingVertical:15,
    paddingHorizontal: 150,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  MarsRoverbutton: {
    backgroundColor: '#000C15',
    width: '100%',
    paddingVertical:15,
    paddingHorizontal: 125,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  Asteroidsbutton: {
    backgroundColor: '#000C15',
    width: '100%',
    paddingVertical:15,
    paddingHorizontal: 130,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  Pagebutton: {
    backgroundColor: '#000C15',
    width: '100%',
    paddingVertical:15,
    paddingHorizontal: 140,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 250,
  },
   button: {
    backgroundColor: '#000C15',
    width: '40%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  image: {
    flex: 1,
    alignItems: 'center',
    width:'100%',
    height:'100%',
    justifyContent: "flex-end",
  },
})
