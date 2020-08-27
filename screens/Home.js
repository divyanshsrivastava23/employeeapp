import React, {useEffect,useState} from 'react';
import {Text, StyleSheet,View,Image,FlatList, Alert} from 'react-native';
import {Card,FAB} from 'react-native-paper';

const Home= ({navigation}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const fetchData= () =>{
        fetch("http://64d481120c8b.ngrok.io/")
        .then(res=>res.json())
        .then(results=>{
            setData(results)
            setLoading(false)
        }).catch(err=>{
            Alert.alert("Something went wrong")
        })
    }



    useEffect(()=>{
        fetchData()
    },[]) 
    const renderList =((item)=>{
        return(
            <Card style={styles.myCard} key={item._id}
            onPress={()=>navigation.navigate("Profile",{item})}
            >
                <View style={styles.view}>
                    <Image
                    style={{width:50,height:50,borderRadius:50/2}}
                    source={{uri:item.picture}}
                    />
                    <View style={{marginLeft:10}}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>{item.position}</Text>
                    </View>
                </View>
            </Card>
        )
    })
    return (
        <View style={{flex:1}}>
            <FlatList 
            data={data}
            renderItem={({item})=>{
            return renderList(item)
            }}
            keyExtractor={item=>item._id}
            onRefresh={()=>fetchData()}
            refreshing={loading}
            />
            <FAB onPress={()=>navigation.navigate("Create")}
            style={styles.fab}
            small={false}
            icon="plus"
            theme={{colors:{accent:"#006aff"}}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    myCard:{
        margin:20,
    },
    view:{
        flexDirection:"row",
        padding:6, 
    },
    text:{
        fontSize: 20,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})

export default Home