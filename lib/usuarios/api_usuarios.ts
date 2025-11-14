import { Database } from "@/db_types"
import { supabase } from "@/lib/supabase"

export const fetchUsers=async (userId: string) => {
  const { data, error }=await supabase
    .from("profiles")
    .select("username, avatar_url, id")
    .neq("id", userId)
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}



export type Users=Awaited<ReturnType<typeof fetchUsers>>
export type User=Users[number]

export const fetchContacts=async (userId: string) => {
  const { data, error }=await supabase
    .from("profiles")
    .select("username, avatar_url, id")
    .neq("id", userId)
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}

export const getProfile=async (userId: string) => {
  const { data, error }=await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}

export type Contacts=Awaited<ReturnType<typeof fetchContacts>>
export type Contact=Contacts[number]

export const fetchMessages=async (userId: string, contactId: string) => {

  const { data, error }=await supabase
    .from("messages")
    .select("*")
    .or(`sender_id.eq.${userId},sender_id.eq.${contactId}`)
    .or(`receiver_id.eq.${contactId},receiver_id.eq.${userId}`)
    .order("created_at", { ascending: false })

  //console.log('DATA DE API', data)
  if (error) {
    console.log("error", error.message)
    return []
  } else {
    return data
  }
}

export type Messages=Awaited<ReturnType<typeof fetchMessages>>
export type Message=Messages[number]

export const downloadAvatar=async (path: string): Promise<string> => {
  try {
    const { data, error }=await supabase.storage
      .from("avatars")
      .download(path)
    if (error) throw error
    const fr=new FileReader()
    fr.readAsDataURL(data)
    return new Promise((resolve) => {
      fr.onload=() => {
        resolve(fr.result as string)
      }
    })
  } catch (err) {
    console.log("error", err)
    return ""
  }
}

export type Profile=Database["public"]["Tables"]["profiles"]["Row"]

export const fetchAllUsers=async () => {
  const { data, error }=await supabase
    .from("profiles")
    .select("*")
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}

export type AllUsers=Awaited<ReturnType<typeof fetchAllUsers>>
export type AllUser=AllUsers[number]


export const fetchAllChofer=async () => {
  const { data, error }=await supabase
    .from("profiles")
    .select("*")
    .eq('role', 'chofer')
  if (error) {
    console.log("error", error)
    return []
  } else {
    return data
  }
}







