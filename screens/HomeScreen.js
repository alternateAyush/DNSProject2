import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { image,ImageBackground,StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'
import background from '../assets/images/background.png'
const HomeScreen = () => {
  const navigation = useNavigation()
  const image={uri:'https://www.google.com/search?q=space+beautiful+hd&sxsrf=APq-WBuNVl5g5wazXWgHRfV2x-L9VVkUrw:1648384029450&tbm=isch&source=iu&ictx=1&vet=1&fir=jyR7zcHOfwNLJM%252C5lGJ6a7WGXTZGM%252C_%253BEPsOtY59DoGfsM%252CEqQ_jnOmcTUuuM%252C_%253BvSVBB2viB8mRCM%252CPlTmugZBOyDkjM%252C_%253Baj1s4es2DsPiKM%252C5lGJ6a7WGXTZGM%252C_%253BN_-EfR8c-nVX6M%252C2UG7PFoIlpSv4M%252C_%253BEQgg03lrHn5XzM%252CA-CVVvQOWVc67M%252C_&usg=AI4_-kT5ldNqL4NGKC9ig19e1epU1q-Yow&sa=X&ved=2ahUKEwiGiZ2Epeb2AhXr-GEKHQ8yC38Q9QF6BAgKEAE#imgrc=vSVBB2viB8mRCM'}
  const handleSignOut = () => {

        auth
        .signOut()
        .then(() => {
            navigation.replace("Login")
        })
        .catch(error => alert(error.message))
  }

  return (

    <View style={styles.container}>
    <ImageBackground source={{uri:'https://www.google.com/search?q=space+beautiful+hd&sxsrf=APq-WBuNVl5g5wazXWgHRfV2x-L9VVkUrw:1648384029450&tbm=isch&source=iu&ictx=1&vet=1&fir=jyR7zcHOfwNLJM%252C5lGJ6a7WGXTZGM%252C_%253BEPsOtY59DoGfsM%252CEqQ_jnOmcTUuuM%252C_%253BvSVBB2viB8mRCM%252CPlTmugZBOyDkjM%252C_%253Baj1s4es2DsPiKM%252C5lGJ6a7WGXTZGM%252C_%253BN_-EfR8c-nVX6M%252C2UG7PFoIlpSv4M%252C_%253BEQgg03lrHn5XzM%252CA-CVVvQOWVc67M%252C_&usg=AI4_-kT5ldNqL4NGKC9ig19e1epU1q-Yow&sa=X&ved=2ahUKEwiGiZ2Epeb2AhXr-GEKHQ8yC38Q9QF6BAgKEAE#imgrc=vSVBB2viB8mRCM'}} style={styles.image}>
    </ImageBackground>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
    
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // position:'relative',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
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
    width:'100%',
    height:'100%',
    justifyContent: 'center',
},
})
