import React, { Component } from 'react';
import { View, StyleSheet, Image, Text,Button, FlatList,TouchableOpacity } from 'react-native';
import { ListItem,Card } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class ShoppingScreen extends Component{
  constructor(){
    super()
    this.state = {
      productList : [],
      image:"#",
      userId:firebase.auth().currentUser.email
    }
  this.requestRef= null
  }

  getproductList =()=>{
    this.requestRef = db.collection("donations")
    .onSnapshot((snapshot)=>{
      var productList = snapshot.docs.map(document => document.data());
      this.setState({
        productList : productList
      });
    })
  }
  
  fetchImage = (imageName) => {
    //image loaded from the firebase storage
    // for our convenience we kept the nname of image as userid
    var storageRef = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: "#" });
      });
  };

  componentDidMount(){
       this.fetchImage(this.state.userId)
    this.getproductList()
 
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
  
      <Card  image={{uri: this.state.image}}>

      <Text style={{marginBottom: 10, marginTop: 20 }} h2>

          {item.item_name}

      </Text>

      <Text style={styles.price} h4>

          {item.usage_years}

      </Text>
      <Text style={styles.price} h4>

          {item.actual_price}

      </Text>

      <Text style={styles.price} h4>

          {item.selling_price}

      </Text>

      <Text h6 style={styles.description}>

          added 1d ago

      </Text>

    

      <Button

      type="clear"

      title='Buy now'

    // onPress={() => this.props.navigation.navigate('Details')} 
      />

  </Card>






      
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="ITEMS" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.productList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>NO DONATIONS YET</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.productList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  },
  name: {

    color: '#5a647d',

    fontWeight: 'bold',

    fontSize: 30

},

price: {
    fontWeight: 'bold',
    marginBottom: 10
},

description: {
    fontSize: 10,
    color: '#c1c4cd'
}
})