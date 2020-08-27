import React, {useState} from 'react';
import {StyleSheet, Text,View,Modal,Alert,KeyboardAvoidingView} from 'react-native';
import {TextInput,Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const CreateEmployee = ({navigation,route})=>{
    const getDetails = (type)=>{
        if(route.params){
            switch(type){
                case "name":
                    return route.params.name
                case "phone":
                    return route.params.name
                case "email":
                    return route.params.email
                case "salary":
                    return route.params.salary
                case "position":
                    return route.params.position
            }
        }
        return ""
    }

   const [name, setName] = useState(getDetails("name"))   
   const [phone, setPhone] = useState(getDetails("phone"))
   const [email, setEmail] = useState(getDetails("email"))   
   const [salary, setSalary] = useState(getDetails("salary"))   
   const [picture, setPicture] = useState(getDetails("picture"))  
   const [position,setPosition] = useState(getDetails("position"))
   const [modal, setModal] = useState(false)
   const [enableshift,setenableShift] = useState(false)

//postin data to backend
const submitData = ()=>{
    fetch("http://64d481120c8b.ngrok.io/send-data",{
        method:"post",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
           name,
           email,
           phone,
           salary,
           picture,
           position
        })
    }).then(res=>res.json())
    .then(data=>{
        Alert.alert(`${data.name} is saved successfully`)
        navigation.navigate("Home")
    }).catch(err=>{
        Alert.alert("Something went wrong")
    })
}

const updateDetails = ()=>{
    fetch("http://64d481120c8b.ngrok.io/update",{
        method:"post",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            id:route.params._id,
           name,
           email,
           phone,
           salary,
           picture,
           position
        })
    }).then(res=>res.json())
    .then(data=>{
        Alert.alert(`${data.name} is updated successfully`)
        navigation.navigate("Home")
    }).catch(err=>{
        Alert.alert("Something went wrong")
    })
}
//upload images from gallery

   const pickFromGallery = async()=>{
      const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if(granted){
         let data =  await ImagePicker.launchImageLibraryAsync({
              mediaTypes:ImagePicker.MediaTypeOptions.Images,
              allowsEditing:true,
              aspect:[1,1],
              quality:0.5
          })
         if(!data.cancelled){
             let newfile = { 
                 uri:data.uri,
                 type:`test/${data.uri.split(".")[1]}`,
                 name:`test.${data.uri.split(".")[1]}`
             }
             handleUpload(newfile)
         }
      }else{
          Alert.alert("You need to give Permission!")
      }
   }
//upload from camera
   const pickFromCamera = async () => {
       const{granted} = await Permissions.askAsync(Permissions.CAMERA)
       if(granted){
           let data = await ImagePicker.launchCameraAsync({
               mediaTypes:ImagePicker.MediaTypeOptions.Images,
               allowsEditing:true,
               aspect:[1,1],
               quality:0.5
           })
           if(!data.cancelled){
                let newfile = {
                    uri:data.uri, 
                    type:`test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}`
                }
                handleUpload(newfile)
           }
       }else{
           Alert.alert("You need to give Permission!")
       }
   }

   const handleUpload = (image)=>{
       const data = new FormData()
       data.append("file",image)
       data.append("upload_preset","EmployeeApp")
       data.append("cloud_name","devsrijs0012")

       fetch("https://api.cloudinary.com/v1_1/devsrijs0012/image/upload",{
           method:"post",
           body:data
       }).then(res=>res.json()).
       then(data=>{
           setPicture(data.url)
           setModal(false)
       }).catch(err=>{
        Alert.alert("Error while Uploading")
    })
   }
    return(
        <KeyboardAvoidingView behavior="position"style={styles.root} enabled={enableshift}>
            <View >
                    <TextInput
                    style={styles.inputStyle}
                    label="Name"
                    mode="outlined"
                    value={name}
                    theme={theme}
                    onFocus={()=>setenableShift(false)}
                    onChangeText={text => setName(text)}
                    />
                    <TextInput
                    style={styles.inputStyle}
                    label="E-mail"
                    mode="outlined"
                    value={email}
                    theme={theme}
                    onFocus={()=>setenableShift(false)}
                    onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                    style={styles.inputStyle}
                    label="Phone"
                    mode="outlined"
                    keyboardType="number-pad"
                    value={phone}
                    theme={theme}
                    onFocus={()=>setenableShift(false)}
                    onChangeText={text => setPhone(text)}
                    />
                    <TextInput
                    style={styles.inputStyle}
                    label="Salary"
                    mode="outlined"
                    value={salary}
                    theme={theme}
                    onFocus={()=>setenableShift(true)}
                    onChangeText={text => setSalary(text)}
                    />
                    <TextInput
                    style={styles.inputStyle}
                    label="Position"
                    mode="outlined"
                    value={position}
                    theme={theme}
                    onFocus={()=>setenableShift(true)}
                    onChangeText={text => setPosition(text)}
                    />
                    <Button 
                    style={styles.inputStyle} 
                    icon={picture==""?"upload":"check"}
                    theme={theme} 
                    mode="contained" 
                    onPress={()=>setModal(true)}>
                        Upload
                    </Button>
                    {
                        route.params ?
                        <Button 
                        style={styles.inputStyle}
                        icon="content-save"
                        mode="contained"
                        theme={theme}
                        onPress={()=>updateDetails()}
                        >
                        Update Details
                        </Button>
                        :
                        <Button 
                        style={styles.inputStyle}
                        icon="content-save"
                        mode="contained"
                        theme={theme}
                        onPress={()=>submitData()}
                        >
                        Save
                        </Button>
                    }
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={()=>{
                        setModal(false)
                    }}
                    >
                    <View style={styles.modalView}>
                        <View style={styles.modalButtonView}>
                            <Button icon="camera" mode="contained" theme={theme} onPress={()=>pickFromCamera()}>Camera</Button>
                            <Button icon="image-area" mode="contained" theme={theme} onPress={()=>pickFromGallery()}>Gallery</Button>
                        </View>
                        <Button theme={theme} onPress={()=>setModal(false)}>
                            Cancel
                        </Button> 
                    </View>                
                    </Modal>
            </View>
        </KeyboardAvoidingView>
    )
}

const theme = {
    colors:{
        primary:"#006aff"
    }
}
const styles = StyleSheet.create({
    root:{
        flex:1,   
    },
    inputStyle: {
        margin: 5,
    },
    modalView:{
        position:"absolute",
        bottom:2,
        width:"100%",
        backgroundColor:"white",
    },
    modalButtonView:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10
    }
})
export default CreateEmployee