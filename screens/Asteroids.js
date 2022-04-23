import React, { useEffect, useState} from 'react';
import { ActivityIndicator,KeyboardAvoidingView,ImageBackground,TextInput,Keyboard,TouchableOpacity, FlatList, Text,ScrollView, View,Image,StyleSheet,SafeAreaView } from 'react-native';
import background from '../assets/images/asteroidBackground.jpg'
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { useNavigation } from '@react-navigation/core'

const Asteroids = () => {
  const backButton='<'
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [date,setDate] = useState('2022-04-08');
  const [temp,setTemp]=useState();
  const navigation = useNavigation()
  const getAsteroids = async () => {
     try {
      const response = await fetch('https://api.nasa.gov/neo/rest/v1/feed?start_date='+date+'&end_date='+date+'&api_key=LkAWeBXJQyQwTxITMnnMENadbS4qdRgrgXwDasEn');
      
      const json = await response.json();
      setData(json.near_earth_objects[date]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  const goToHome = () => {
    navigation.replace("Home")
    
  }

  useEffect(() => {
    getAsteroids();
  }, []);

  const customCall =  async ()=> {
    Keyboard.dismiss()
    if(date!=null)
    {
      await getAsteroids()
    }
  }

  



  const Tile = (props)=>
  {
    return (
      <View style={styles.tile}> 
      <View style={{paddingBottom:10,}}>
        <Text style={styles.tileText}>Id: {props.id}</Text>
        <Text style={styles.tileText}>Name: {props.name}</Text>
        <Text style={styles.tileText}>Estimated Diameter:</Text>
        <Text style={styles.tileText}>    Min: {props.estimated_diameter.meters.estimated_diameter_min.toFixed(2)} m</Text>
        <Text style={styles.tileText}>    Max: {props.estimated_diameter.meters.estimated_diameter_max.toFixed(2)} m</Text>
        <Text style={styles.tileText}>Is potentially hazardeous ?  {props.is_potentially_hazardous_asteroid ? 'True' : 'False'}</Text>
        <Text style={styles.tileText}>Close Approach (Date & Time): {props.close_approach_data[0].close_approach_date_full}</Text>
        <Text style={styles.tileText}>Relative Velocity: {props.close_approach_data[0].relative_velocity.kilometers_per_second.substring(0,6)} km/sec</Text>
        <Text style={styles.tileText}>Miss Distance: {props.close_approach_data[0].miss_distance.kilometers.substring(0,12)} km</Text>
        <Text style={styles.tileText}>Is a sentry object?  {props.is_sentry_object ? 'True' : 'False'}</Text>
        {/* <Text style={styles.tileText}>Camera Name: {props.camera.full_name} ({props.camera.name})</Text>
        <Text style={styles.tileText}>Rover Name: {props.rover.name}</Text>
        <Text style={styles.tileText}>Rover Launch Date: {props.rover.launch_date}</Text>
        <Text style={styles.tileText}>Rover Landing Date: {props.rover.landing_date}</Text>
        <Text style={styles.tileText}>Rover Status: {props.rover.status}</Text>       */}
      </View>
 
      </View>
      
    )
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={background} style={styles.image}></Image>
        <KeyboardAvoidingView 
        behavior={Platform.OS==="ios"?'padding':'height'}
        style={styles.writeTaskWrapper}>
          <TouchableOpacity onPress={()=>goToHome()}>
          <View style={styles.backWrapper}>
            <Text style={styles.addText}>
              {backButton}
            </Text>
          </View>
        </TouchableOpacity>
          <TextInput keyboardType='number-pad' placeholder={'Date: 2022-04-08'} style={styles.input} value={date} onChangeText={text=>setDate(text)} />
          <TouchableOpacity onPress={()=>customCall()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>
              go
            </Text>
          </View>
        </TouchableOpacity>
        </KeyboardAvoidingView> 
      {isLoading ? <ActivityIndicator size="large" color="#ffffff"/> : (
        <FlatList
        style={{paddingTop:70, margin:10}}
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            Tile(item)
          )}
        />
      )}

    </SafeAreaView>
  );
};

export default Asteroids

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    backgroundColor: '#000C15',
    paddingBottom:0,
  },
  image: {
    height: '100%', 
    width: '100%', 
    position:'absolute'
  },
  tile:{
    backgroundColor: 'rgba(255, 255, 255, 0.4)',

    borderWidth:2,
    marginTop:10,
    borderColor:'white',
    borderRadius:20,
    flex:1,
    width:'100%',
    height:'100%',
    paddingHorizontal:10,
    paddingTop:10,
  },
  ImageContainer:{
    flex:1,
    width:'100%',
    height:400,
  },
  tileText:{
    fontWeight:'bold',
    paddingBottom: 5,
    fontSize:18,
    color:'white',
  },
  roverImage:{
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
},
taskWrapper:{
  paddingTop:80,
  paddingHorizontal:20,
},
sectionTitle:{
  fontSize:24,
  fontWeight:'bold',
},
items:{
  marginTop:15,
  paddingHorizontal:20,
},
writeTaskWrapper:{
  zIndex:1,
  margin:16,
  position:'absolute',
  top:0,
  width:'100%',
  flexDirection:'row',
  justifyContent:'space-evenly',
  alignItems:'center',

},
input:{
  padding:15,
  width:270,
  backgroundColor:'#FFF',
  borderColor:'#C0C0C0',
  borderWidth:1,
  borderRadius:60,
},
addWrapper:{
  marginLeft:5,
  marginRight:30,
  padding:5,
  width:55,
  height:55,
  borderRadius:55,
  backgroundColor:'#FFF',
  alignItems:'center',
  justifyContent:'center',
  borderColor:'#C0C0C0',
  borderWidth:1,

},
backWrapper:{
  marginRight:5,
  padding:5,
  width:55,
  height:55,
  borderRadius:55,
  backgroundColor:'#FFF',
  alignItems:'center',
  justifyContent:'center',
  borderColor:'#C0C0C0',
  borderWidth:1,
},
addText:{
  fontSize:20,
},

});