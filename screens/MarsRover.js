import React, { useEffect, useState} from 'react';
import { ActivityIndicator,KeyboardAvoidingView,TextInput,Keyboard,TouchableOpacity, FlatList, Text,ScrollView, View,Image,StyleSheet,SafeAreaView } from 'react-native';

import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


const MarsRover = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [sol,setSol] = useState('1000');
  const [temp,setTemp]=useState();

  const getPhotos = async () => {
     try {
      const response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol='+sol+'&api_key=LkAWeBXJQyQwTxITMnnMENadbS4qdRgrgXwDasEn');
      
      const json = await response.json();
      console.log(json)
      setData(json.photos);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
    setSol(null)
  }

  



  const Tile = (props)=>
  {
    return (
      <View style={styles.tile}>        
      <View style={styles.ImageContainer}>
        <Image source={{uri:props.img_src}} style={styles.roverImage}/>
      </View> 
      <View style={{paddingBottom:20,}}>
        <Text style={styles.tileText}>Sol: {props.sol}</Text>
        <Text style={styles.tileText}>Earth Date: {props.earth_date}</Text>
        <Text style={styles.tileText}>Camera Name: {props.camera.full_name} ({props.camera.name})</Text>
        <Text style={styles.tileText}>Rover Name: {props.rover.name}</Text>
        <Text style={styles.tileText}>Rover Launch Date: {props.rover.launch_date}</Text>
        <Text style={styles.tileText}>Rover Landing Date: {props.rover.landing_date}</Text>
        <Text style={styles.tileText}>Rover Status: {props.rover.status}</Text>      
      </View>
      <View
  style={{
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  }}
/>
      </View>
      
    )
    
  }

  return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
        behavior={Platform.OS==="ios"?'padding':'height'}
        style={styles.writeTaskWrapper}>
          <TextInput keyboardType='number-pad' placeholder={'Sol: 1000 '} style={styles.input} value={sol} onChangeText={text=>setSol(text)} />
          <TouchableOpacity onPress={()=>customCall()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>
              go
            </Text>
          </View>
        </TouchableOpacity>
        </KeyboardAvoidingView> 
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
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
    padding:10,
    flex: 1,
    backgroundColor: '#000C15',

  },
  tile:{
    flex:1,
    width:'100%',
    height:680,
    padding:10,
  },
  ImageContainer:{
    flex:1,
    width:'100%',
    height:400,
  },
  tileText:{
    paddingBottom: 5,
    fontSize:18,
    color:'#fff',
    justifyContent:'space-between'
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
  margin:15,
  position:'absolute',
  top:0,
  width:'100%',
  flexDirection:'row',
  justifyContent:'space-around',
  alignItems:'center',

},
input:{
  padding:15,
  width:300,
  backgroundColor:'#FFF',
  borderColor:'#C0C0C0',
  borderWidth:1,
  borderRadius:60,
},
addWrapper:{
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