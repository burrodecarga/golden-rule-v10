import ContactItem from "@/components/usuarios/ContactItem"
import { Contact, Contacts, fetchContacts } from "@/lib/usuarios/api_usuarios"
import { useAuthInfo } from "@/provider/AuthProvider"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { FlatList, StyleSheet } from "react-native"

export const IndexScreen=() => {
    const [contacts, setContacts]=useState<Contacts>([])
    const { profile }=useAuthInfo()

    useEffect(() => {
        if (profile) fetchContacts(profile.id).then(setContacts)
    }, [profile])

    const handleContactPress=(contact: Contact) => {
        //console.log('CONTACTO', contact, contact.id, contact.username)
        router.push({
            pathname: '/(home)/chat/chats', params: {
                contactId: contact.id,
                username: contact.username||"",
            }
        })
        // navigation.navigate("Chat", {
        //   contactId: contact.id,
        //   username: contact.username||"",
        // })
    }

    return (
        <FlatList
            data={contacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <ContactItem
                    contact={item}
                    onPressItem={() => handleContactPress(item)}
                />
            )}
        />
    )
}
const styles=StyleSheet.create({})
export default IndexScreen