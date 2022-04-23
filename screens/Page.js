import React ,{useState,useEffect}from 'react';
import { StyleSheet, Text,Image,ScrollView,ActivityIndicator,TextInput,KeyboardAvoidingView,TouchableOpacity,SafeAreaView,View,Linking } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import background from '../assets/images/planetBack.jpg'
import { FlatList } from 'react-native-web';
const Page = () => {
    const backButton='<'
  const navigation = useNavigation()
  const [body,setBody] = useState('earth');
  const [mass, setMass] = useState([]);
  const [vol, setVol] = useState([]);
  const [density, setDensity] = useState(-1.0000);
  const [gravity,setGravity] = useState(-1.0000);
  const [radius,setRadius] = useState(-1.0000);
  const [temp,setTemp] = useState(-1.0000)
  const [isLoading, setLoading] = useState(true);
  const [title,setTitle]=useState('')
  const [velocity,setVelocity]=useState(-1.0000)
  const [tilt,setTilt] = useState(-1.0000)
  const [moons,setMoons]=useState([])
  const [type,setType] = useState('');


  const fetchBody = async () => {
    try {
      const response = await fetch(
        'https://api.le-systeme-solaire.net/rest/bodies/{'+body+'}'
      );
      const json = await response.json();
      setTitle(json.englishName);
      setMass(json.mass)
      setVol(json.vol)
      setDensity(json.density)
      setGravity(json.gravity)
      setRadius(json.radius)
      setTemp(json.avgTemp)
      setVelocity(json.escape)
      setTilt(json.axialTilt)
      setMoons(json.moons)
      setType(json.bodyType)
    //   setPic(json.hdurl);
    //   setVid(json.url);
    //   setExplain(json.explanation);
    //   setMedia(json.media_type);
    //   setDate(json.date.toLocaleString());
    } catch (error) {
    }
    finally {
      setLoading(false);
    }
  };
  const customCall =  async ()=> {
    Keyboard.dismiss()
    if(sol!=null){
        await fetchBody()
    }
  }
  const goToHome = () => {
    navigation.replace("Home")
    
  }

  useEffect(() => {
    fetchBody();
  },);

  const Tile = (props)=>
  {
    return (
      <View style={styles.tile}>   
      <View style={{paddingBottom:30}}>
         <ScrollView>
        <Text style={styles.titleStyle}>{title}</Text>
        <Text style={styles.textStyle}>Is a {type}</Text>
        <Text style={styles.textStyle}>Mass: {mass.massValue.toFixed(3)} x 10^({mass.massExponent}) Kg</Text>
        <Text style={styles.textStyle}>Volume: {vol.volValue.toFixed(3)} x 10^({vol.volExponent}) cubic Km</Text>
        <Text style={styles.textStyle}>Mean Radius: {radius} Km</Text>
        <Text style={styles.textStyle}>Density: {density.toFixed(3)} gm/cubic cm</Text>
        <Text style={styles.textStyle}>Gravity: {gravity} m/sq sec</Text>
        <Text style={styles.textStyle}>Avg Temperatur: {temp} K</Text>
        <Text style={styles.textStyle}>Axial Tilt: {tilt} degree</Text>
        <Text style={styles.textStyle}>Escape Velocity: {velocity} m/s</Text>
        <Text style={styles.textStyle}>Number of moons:{moons.length}</Text>
        <Text style={styles.textStyle}>One of the Moon/s: {moons[0].moon}</Text>

        <Text style={styles.textStyle}></Text>
        <Text style={styles.textStyle}></Text>
        </ScrollView>

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
              <TextInput placeholder={'Sol: 1000 '} style={styles.input} value={body} onChangeText={text=>setBody(text)} />
              <TouchableOpacity onPress={()=>customCall()}>
              <View style={styles.addWrapper}>
                <Text style={styles.addText}>
                  go
                </Text>
              </View>
            </TouchableOpacity>
            
            </KeyboardAvoidingView>
            
          {isLoading ? <ActivityIndicator size="large" color="#ffffff"/> : (
                // <View style={{paddingTop:70, margin:10,zIndex:0}}>Tile()</View>
                Tile()
          )}
        </SafeAreaView>
      );
    };
export default Page
const styles = StyleSheet.create({
    container: {
      justifyContent:"center",
      flex: 1,
      backgroundColor: '#000C15',
  
    },
    textStyle:{
        color:'#fff',
        fontSize:20,
        padding:2,
        textAlign: 'justify',
        fontWeight:'bold',
      },
    image: {
      height: '100%', 
      width: '100%', 
      position:'absolute'
    },
    titleStyle:{
        color:'white',
        fontSize: 30,
        fontWeight:'bold',
        textAlign:'center'
    },
    tile:{
      justifyContent:'flex-start',
      flex:1,
      width:'100%',
      height:680,
      padding:10,
      borderWidth:3,
      borderColor:'white',
      marginVertical:7,
      marginTop:90,
      borderRadius:20,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
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