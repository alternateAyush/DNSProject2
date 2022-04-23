import React ,{useState,useEffect}from 'react';
import { StyleSheet, Text,Image,ScrollView,ActivityIndicator,TouchableOpacity,SafeAreaView,View,Linking } from 'react-native';
import { useNavigation } from '@react-navigation/core'
const ApodScreen = () => {
  const backButton='<'
  const navigation = useNavigation()
  
  const [isLoading, setLoading] = useState(true);
  const [pic,setPic]=useState('../assests/nasaLogo.png');
  const [vid,setVid]=useState('https://www.youtube.com/embed/m8qvOpcDt1o?rel=0');
  const [date,setDate]=useState('');
  const [explain,setExplain]=useState('Loading...');
  const [title,setTitle]=useState('')
  const [media,setMedia]=useState('image')


  const apodPic = async () => {
    try {
      const response = await fetch(
        'https://api.nasa.gov/planetary/apod?api_key=LkAWeBXJQyQwTxITMnnMENadbS4qdRgrgXwDasEn'
      );
      const json = await response.json();
      setTitle(json.title);
      setPic(json.hdurl);
      setVid(json.url);
      setExplain(json.explanation);
      setMedia(json.media_type);
      setDate(json.date.toLocaleString());
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };
  const goToHome = () => {
    navigation.replace("Home")
    
  }

  useEffect(() => {
    apodPic();
  },);

  const response=()=>{
    if(media==='image'){
      return (
        isLoading ? <ActivityIndicator size="large" color="#ffffff"/> : (<Image source={{uri:pic}} style={{width:'100%',height:'60%',borderRadius:20}} /> )
        
      )
    }
  return (
    <View style={{width:'100%',height:'50%', alignItems:'center'}}>
    <Image source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/2449px-NASA_logo.svg.png'}} style={{width:'100%',height:'90%', borderRadius:20}} />
    <Text style={{color: 'blue', textDecorationLine: 'underline', fontSize:17}}
      onPress={() => Linking.openURL(vid)}>
  Click the link for today's video
</Text>
    </View>
  )
  }

return (
    <SafeAreaView style={styles.container}>      
        {response()}       
        
        <Text style={styles.titleStyle}>{title}</Text>
          
        <Text style={styles.textStyle}>{date}</Text>
        <ScrollView>
        <Text style={styles.textStyle}>{explain}</Text>
        <TouchableOpacity style={{zIndex:1}} onPress={()=>goToHome() }>
          <View style={styles.backWrapper}>
            <Text style={styles.addText}>
              Back
            </Text>
          </View>
        </TouchableOpacity>
        </ScrollView>
      

      
    </SafeAreaView>
  )
}
export default ApodScreen
const styles = StyleSheet.create({
  container: {
    padding:10,
    flex: 1,
    backgroundColor: '#000C15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle:{
    color:'#fff',
    fontSize:20,
    padding:2,
    textAlign: 'justify',
  },
  titleStyle:{
    fontWeight:'bold',
    color:'#fff',
    fontSize:25,
    padding:5,
    textAlign: 'justify',
  },
  backWrapper:{
    //position:'absolute',
    marginRight:5,
    padding:5,
    right:0,
    width:'100%',
    height:55,
    borderRadius:55,
    backgroundColor:'#001529',
    alignItems:'center',
    justifyContent:'center',
    borderColor:'#C0C0C0',
    borderWidth:1,
  },
  addText:{
    fontSize:20,
    color:'white',
  },
});
