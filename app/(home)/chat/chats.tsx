import Button from "@/components/Button"
import { supabase } from "@/lib/supabase"
import { fetchMessages, Message, Messages } from "@/lib/usuarios/api_usuarios"
import { useUserInfo } from "@/provider/UserProvider"
import { router, useLocalSearchParams } from "expo-router"
import { useCallback, useEffect, useState } from "react"
import { Alert, StyleSheet } from "react-native"
import { GiftedChat } from "react-native-gifted-chat"

export default function ChatScreen() {
    const { contactId, username }=useLocalSearchParams()

    const [messages, setMessages]=useState<Messages>([])
    const { profile: user }=useUserInfo()

    useEffect(() => {
        if (!user) return
        const contacto=contactId as string
        const usuario=user.id
        fetchMessages(usuario, contacto).then(setMessages)
        //console.log('USEEFECT', messages, user.id, contactId)
        const channel=supabase
            .channel("messages")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "messages",
                    filter: `sender_id=eq.${contacto}`,
                },
                (payload) => {
                    const newMessage=payload.new as Message
                    if (newMessage.receiver_id===user.id) {
                        setMessages((prevMessages) => [newMessage, ...prevMessages])
                    }
                }
            )
            .subscribe()

        console.log(messages)
        return () => {
            supabase.removeChannel(channel)
        }
    }, [user, contactId])

    const onSend=useCallback(async (messages=[]) => {
        const [message]=messages
        const { text }=message
        const contacto=contactId as string
        const envia=user?.id! as string
        const { error, data }=await supabase
            .from("messages")
            .insert({
                sender_id: envia,
                receiver_id: contacto,
                content: text,
            })
            .select("*")
        if (error) {
            Alert.alert("Server Error", error.message)
        } else {
            setMessages((prevMessages) => [data[0], ...prevMessages])
        }
    }, [])

    return (
        <>
            <Button onPress={() => router.replace('/(home)/chat')} title="regresar" />
            <GiftedChat
                messages={messages.map((message) => ({
                    _id: message.id,
                    text: message.content,
                    createdAt: new Date(message.created_at),
                    user: { _id: message.sender_id },
                }))}
                onSend={(messages: any) => onSend(messages)}
                user={{
                    _id: user?.id||"",
                }}
            />
        </>
    )
}
const styles=StyleSheet.create({})
