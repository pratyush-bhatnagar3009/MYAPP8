import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import * as SMS from 'expo-sms';
import * as ImagePicker from 'expo-image-picker'
export default class DonateScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      itemName : "",
      usageYears : "",
      eventName : "",
      actualPrice : "",
      sellingPrice : "",
      image: "#"
    }
  }

   Selectpicture = async () => {
    let {cancelled, uri} = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if(!cancelled){
     this.uploadImage(uri, this.state.userId)
    }
  }

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    // declaring blob object
    var blob = await response.blob();
    //creating ref to the firebase storage
    var ref = firebase
      .storage()
      .ref()
      .child('user_profiles/' + imageName);
    //stored image is fetched
    return ref.put(blob).then((response) => {
      console.log("picturehassaved")
    });
  };

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }

onPressSMS=async()=>{
  const {result} = await SMS.sendSMSAsync(
    [],
    "your donation request has been recived",
    {}
  )
}

  addDonation =(bookName,reasonToRequest)=>{
    var userId = this.state.userId
    var randomDonateId = this.createUniqueId()
    db.collection('donations').add({
        "user_id": userId,
        "item_name": this.state.itemName,
        "donation_id"  : randomDonateId,
        "usage_years" : this.state.usageYears,
        "event_name" : this.state.eventName,
        "actual_price" : this.state.actualPrice,
        "selling_price" : this.state.sellingPrice
    })

    this.setState({
      usageYears : "",
      eventName : "",
      actualPrice : "",
      sellingPrice : ""
    })

    return Alert.alert("You are request for donation is accepted")
  }


  render(){
    return(
        <View style={{flex:1, backgroundColor:'#8fab33'}}>
          <MyHeader title="Donate your care"/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"Enter item name"}
                onChangeText={(text)=>{
                    this.setState({
                        itemName:text
                    })
                }}
                value={this.state.bookName}
              />

<TextInput
                style ={styles.formTextInput}
                placeholder={"Enter the years of usage"}
                onChangeText={(text)=>{
                    this.setState({
                      usageYears:text
                    })
                }}
                value={this.state.bookName}
              />

<TextInput
                style ={styles.formTextInput}
                placeholder={"Enter the event"}
                onChangeText={(text)=>{
                    this.setState({
                        eventName:text
                    })
                }}
                value={this.state.bookName}
              />

<TextInput
                style ={styles.formTextInput}
                placeholder={"actual price"}
                onChangeText={(text)=>{
                    this.setState({
                      actualPrice:text
                    })
                }}
                value={this.state.bookName}
              />

<TextInput
                style ={styles.formTextInput}
                placeholder={"selling price"}
                onChangeText={(text)=>{
                    this.setState({
                        sellingPrice:text
                    })
                }}
                value={this.state.bookName}
              />

<TouchableOpacity
style={{backgroundColor:"white",width:300,height:50,alignItems:"center",justifyContent:'center',marginTop:10,borderRadius:100,borderColor:"black"}}
onPress={()=>{
this.Selectpicture()
}}
>
<Text style={{fontSize:15,color:"#49e6e6"}}>upload picture</Text>
</TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={()=>{
                  this.addDonation()
                }}
                >
                <Text>Donate</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#8fab33'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#428af5",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
  }
)