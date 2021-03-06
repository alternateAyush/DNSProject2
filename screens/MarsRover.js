import React, { useEffect, useState} from 'react';
import { ActivityIndicator,KeyboardAvoidingView,Card,TextInput,Keyboard,TouchableOpacity, FlatList, Text,ScrollView, View,Image,StyleSheet,SafeAreaView } from 'react-native';
import background from '../assets/images/marsBackground.jpg'
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { useNavigation } from '@react-navigation/core'

const MarsRover = () => {
  const navigation = useNavigation()
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [sol,setSol] = useState('1000');
  const [temp,setTemp]=useState();
  const backButton = '<'

  const getPhotos = async () => {
     try {
      const response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol='+sol+'&api_key=LkAWeBXJQyQwTxITMnnMENadbS4qdRgrgXwDasEn');
      
      const json = await response.json();
      setData(json.photos);
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
    getPhotos();
  }, []);

  const customCall =  async ()=> {
    Keyboard.dismiss()
    if(sol!=null)
    {
      await getPhotos()
    }

  }

  



  const Tile = (props)=>
  {
    return (
      <View style={styles.tile}>  
            
      <View style={styles.ImageContainer}>
        <Image source={{uri:props.img_src}} style={styles.roverImage}/>
      </View> 
           <View
  style={{
    borderBottomColor: 'white',
    borderBottomWidth: 4,
    marginHorizontal:50,
    marginBottom:10,
  }}
/> 
      <View style={{paddingBottom:20,zIndex:-1}}>
        <Text style={styles.tileText}>Sol: {props.sol}</Text>
        <Text style={styles.tileText}>Earth Date: {props.earth_date}</Text>
        <Text style={styles.tileText}>Camera Name: {props.camera.full_name} ({props.camera.name})</Text>
        <Text style={styles.tileText}>Rover Name: {props.rover.name}</Text>
        <Text style={styles.tileText}>Rover Launch Date: {props.rover.launch_date}</Text>
        <Text style={styles.tileText}>Rover Landing Date: {props.rover.landing_date}</Text>
        <Text style={styles.tileText}>Rover Status: {props.rover.status}</Text>      
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
          <TextInput keyboardType='number-pad' placeholder={'Sol: 1000 '} style={styles.input} value={sol} onChangeText={text=>setSol(text)} />
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
        style={{paddingTop:70, margin:10,zIndex:0}}
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

export default MarsRover

const styles = StyleSheet.create({
  container: {
    justifyContent:"center",
    flex: 1,
    backgroundColor: '#000C15',

  },
  image: {
    height: '100%', 
    width: '100%', 
    position:'absolute'
  },
  tile:{
    zIndex:-1,
    flex:1,
    width:'100%',
    height:680,
    padding:5,
    borderWidth:3,
    borderColor:'white',
    marginVertical:7,
    borderRadius:20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  ImageContainer:{
    zIndex:-2,
    flex:1,
    width:'100%',
    height:400,
  },
  tileText:{
    zIndex:-1,
    paddingBottom: 5,
    fontSize:18,
    fontWeight:'bold',
    color:'white',
    justifyContent:'space-between'
  },
  roverImage:{
    zIndex:-2,
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius:20,
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
backText:{
  fontSize:30,
  fontWeight:'bold',
},
});