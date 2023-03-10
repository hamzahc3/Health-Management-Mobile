import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import Fa5Icon from 'react-native-vector-icons/FontAwesome5'
import IosIcon from 'react-native-vector-icons/Ionicons'

export function Account({route,navigation}) {
  const [user, setUser] = useState("null")

  useEffect(() => {
    async function getUser(){
      const value = await AsyncStorage.getItem('user')
      const val = JSON.parse(value)
      if(value !== null) {
          console.log(value);
          setUser(val)
      }
    }
    getUser();
  }, []) 

  const profile = [
    {
      "label":"Goal",
      "value": user.goal,
    },
    {
      "label":"Current Weight",
      "value": user.weight,
    },
    {
      "label":"Goal Weight",
      "value": user.Gweight,
    },
    {
      "label":"Active Diet",
      "value":"Standard",
    },
  ]

  const customization = [
    {
      "icon": <Fa5Icon style={styles.icon1} name="user-alt" size={20} color="#3FC495" />,
      "title":"Personal details",
      "path":"personal",
    },
    {
      "icon": <Fa5Icon style={styles.icon1} name="concierge-bell" size={20} color="#3FC495" />,
      "title":"Dietary needs & preferences",
      "path":"dietary",
    },
    {
      "icon":<IosIcon style={styles.icon1} name="water" size={20} color="#3FC495" />,
      "title":"Set habits",
      "path":"",
    },
  ]

  const Logout = async () => {
        try {
          await AsyncStorage.removeItem("user");
          route.params.setLogged(false)
          console.log("user logged out");
          navigation.navigate('first')
        }
        catch(exception) {
          console.log("user didn't log out");
        }
    }

  const LogoutAlert = () => {
    Alert.alert('Log out', 'Are you sure you want to log out ?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'LOG OUT', onPress: () => Logout()},
    ],{
      cancelable: true
    }
    );
    
  }

  const profileNbr = user?.profile ? user?.profile : 0

  const profiles = [
    {
      image: require("../../../assets/profiles/1.png"),
      width: 100,
      height: 100,
    },
    {
      image: require("../../../assets/profiles/2.png"),
      width: 98,
      height: 70,
    },
    {
      image: require("../../../assets/profiles/3.png"),
      width: 86,
      height: 90,
    },
    {
      image: require("../../../assets/profiles/4.png"),
      width: 100,
      height: 90,
    },
    {
      image: require("../../../assets/profiles/5.png"),
      width: 100,
      height: 90,
    },
    {
      image: require("../../../assets/profiles/6.png"),
      width: 90,
      height: 80,
    },
  ]
  

  return (
    <ScrollView vertical style={styles.container}>
      <View style={styles.box}>
        <TouchableOpacity onPress={()=> navigation.navigate("profile")} style={styles.profile}>
          <ImageBackground source={profiles[profileNbr].image}  style={[styles.icon ,{ width: profiles[profileNbr].width, height: profiles[profileNbr].height}]}>
          </ImageBackground>
          <Text style={styles.name}> {user.fname} {user.lname} </Text>
        </TouchableOpacity>

        <View style={styles.hr}></View>

        <View style={styles.body}>
          {profile.map((item,key)=>(
            <View key={key} style={styles.row}>
              <Text style={styles.label}> {item.label} </Text>
              <Text style={styles.content}> {item.value} </Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.text}> CUSTOMIZATION </Text>

      <View style={styles.box}>
          {customization.map((item,key)=>(
            <View key={key}>
            <TouchableOpacity onPress={()=> navigation.navigate(item.path)} style={styles.row1}>
              <View style={styles.row1key}>
                {item.icon}
                <Text> {item.title} </Text>
              </View>
              <FaIcon name="angle-right" size={26} color="#adb5bd" />
            </TouchableOpacity>
            {key+1 !== customization.length && <View style={styles.hr1}></View>}
            </View>
          ))}
      </View>

      <View style={styles.logout}>
        <Image 
          style={styles.logo}
          source={require('../../../assets/logo.jpg')}
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={()=> LogoutAlert()}
        >
          <Text style={styles.Btntext}> LOG OUT </Text>
        </TouchableOpacity> 
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    borderRadius: 100,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
  },

  hr: {
    backgroundColor: "#ced4da",
    height: 1,
    marginVertical: 20, 
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  label: {
    fontSize: 16,
  },
  content: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  text: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    color: "#6c757d",
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  row1key: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon1: {
    width: 40,
    textAlign: 'center',
  },
  hr1: {
    backgroundColor: "#e9ecef",
    height: 1,
    marginVertical: 10, 
  },


  logout: {
    backgroundColor: "white",
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: "red",
  },
  button: {
    borderRadius: 16,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff0f3",
    margin: 10,
    borderWidth: 1,
    borderColor: "#e5383b",
    width: "100%",
  
  },
  Btntext: {
    color: '#e5383b',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancel: {
    color: "red"
  }
})