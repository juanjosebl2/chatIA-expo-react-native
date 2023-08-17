import { View, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import ChatFaceData from '../Services/ChatFaceData'

export default function HomeScreen() {

    const [chatFaceData, setChatFaceData] = useState();
    const [selectedChatFace, setSelectedChatFace] = useState();

    useEffect(() => {
        setChatFaceData(ChatFaceData)
        setSelectedChatFace(ChatFaceData[0])
    }, [])

    const onChatFacePress = async (id) => {
        setSelectedChatFace(ChatFaceData[id - 1]);
        await AsyncStorage.setItem('chatFaceId', (id - 1).toString());
    }

    return (
        <View style={{ alignItems: 'center', paddingTop: 90 }}>

            <Text style={[{ color: selectedChatFace?.primary }, { fontSize: 30, }]}>Hola</Text>
            <Text style={[{ color: selectedChatFace?.primary }, { fontSize: 30, fontWeight: 'bold' }]}>Yo soy {selectedChatFace?.name}</Text>
            <Image source={{ uri: selectedChatFace?.image }} style={{ height: 150, width: 150, marginTop: 20 }} />
            <Text style={{ marginTop: 30, fontSize: 25 }}>¿En que puedo ayudarte?</Text>

            <View
                style={{
                    marginTop: 20, backgroundColor: '#F5F5F5',
                    alignItems: 'center',
                    height: 110, padding: 10
                    , borderRadius: 10
                }}>

                <FlatList
                    data={chatFaceData}
                    horizontal={true}
                    renderItem={({ item }) => item.id != selectedChatFace.id && (
                        <TouchableOpacity style={{ margin: 15 }} onPress={() =>
                            onChatFacePress(item.id)
                        }>
                            <Image source={{ uri: item.image }} style={{ width: 40, height: 40 }} />
                        </TouchableOpacity>
                    )}
                />
                <Text style={{ marginTop: 5, fontSize: 17, color: '#B0B0B0' }}>Elige el chatbot</Text>
            </View>

            <TouchableOpacity style={[{ backgroundColor: selectedChatFace?.primary }
                , {
                    marginTop: 40, padding: 17, width: Dimensions.get('screen').width * 0.6,
                    borderRadius: 100, alignItems: 'center',
                }
                ]}>
                <Text style={{ fontSize: 16, color: '#fff' }}>Let's Chat</Text>
            </TouchableOpacity>

        </View>
    )
}