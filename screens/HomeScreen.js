import React from 'react';
import { StyleSheet, Dimensions, ScrollView, View , Text,Button,Image} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

const { width } = Dimensions.get('screen');

import { Header,Icon,Badge,Avatar } from 'react-native-elements';
export default class HomeScreen extends React.Component {
  render() {
    return (


      <View style={{flex:1,backgroundColor:"#8fab33"}}>
    <Header
         
          centerComponent={{ text: "LovingCare", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
          rightComponent={<Icon name='bars' type='font-awesome' color='#696969'  onPress={() => {this.props.navigation.navigate('NotificationScreen')}}/>}
      
          backgroundColor = "#b3d424"
        />


        <ScrollView>
     <Card style={{padding: 10,marginTop:30,backgroundColor:"#428af5",color:"#82152b"}}
     isDark>
          <CardImage style={{fontSize:20,color:"red",marginTop:50}}
           
           title ={"Donate..."}
            source={require('../assets/Donationposters.jpg')}
      
          


          />
            <CardButton
            onPress={() => {this.props.navigation.navigate('DonateRequest')}}  
            title="click here"
            color="#FEB557"
          />
 
   </Card>
</ScrollView>
          
</View>
     
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2
    },
    
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
   
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    
  },
 
  imageContainer: {
    elevation: 1,
  },
});
