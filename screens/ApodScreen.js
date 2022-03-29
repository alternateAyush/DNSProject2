import React ,{useState,useEffect}from 'react';
import { StyleSheet, Text,Image,ScrollView,SafeAreaView } from 'react-native';

const ApodScreen = () => {


  const [pic,setPic]=useState('../assests/nasaLogo.png');
  const [date,setDate]=useState('');
  const [explain,setExplain]=useState('Loading...');
  const [title,setTitle]=useState('')


  const apodPic = async () => {
    try {
      const response = await fetch(
        'https://api.nasa.gov/planetary/apod?api_key=LkAWeBXJQyQwTxITMnnMENadbS4qdRgrgXwDasEn'
      );
      const json = await response.json();
      setTitle(json.title);
      setPic(json.hdurl);
      setExplain(json.explanation);
      setDate(json.date.toLocaleString());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    apodPic();
  },);

return (
    <SafeAreaView style={styles.container}>
      <Image source={{uri:pic}} style={{width:'100%',height:'60%'}} /> 
      <Text style={styles.titleStyle}>{title}</Text>
        
      <Text style={styles.textStyle}>{date}</Text>
      <ScrollView>
      <Text style={styles.textStyle}>{explain}</Text>
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
  }
});
