import Button from "@/components/Button"
import Loading from "@/components/Loading"
import ProfileForm from "@/components/usuarios/ProfileForm"
import { Profile } from "@/lib/usuarios/api_usuarios"
import { useUserInfo } from "@/provider/UserProvider"
import { router, useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { View } from "react-native"


export default function ProfileScreen() {
	const { id }=useLocalSearchParams()
	//const [loading, setLoading]=useState(false)
	const [user, setUser]=useState<Profile>()

	//const { data, error, isLoading }=useProfilesById(id as string)

	const { profile, loading }=useUserInfo()


	// const saveProfileExt=async (
	// 	updatedProfile: Profile,
	// 	avatarUpdated: boolean
	// ) => {
	// 	console.log("SAVE PROFILE EXT")
	// 	setLoading(true)

	// 	try {
	// 		if (updatedProfile.avatar_url&&avatarUpdated) {
	// 			const { avatar_url }=updatedProfile

	// 			const fileExt=avatar_url.split(".").pop()
	// 			const fileName=avatar_url.replace(/^.*[\\\/]/, "")
	// 			const filePath=`${Date.now()}.${fileExt}`

	// 			const formData=new FormData()
	// 			const photo={
	// 				uri: avatar_url,
	// 				name: fileName,
	// 				type: `image/${fileExt}`
	// 			} as unknown as Blob
	// 			formData.append("file", photo)

	// 			const { error }=await supabase.storage
	// 				.from("avatars")
	// 				.upload(filePath, formData)
	// 			if (error) throw error
	// 			updatedProfile.avatar_url=filePath
	// 		}
	// 		const { error }=await supabase
	// 			.from("profiles")
	// 			.update(updatedProfile)
	// 			.eq("id", id as string)
	// 		if (error) {
	// 			throw error
	// 		} else {
	// 			console.log("PROFILE SAVED")
	// 			getProfile()
	// 			router.back()
	// 		}
	// 	} catch (error: any) {
	// 		Alert.alert("Server Error", error.message)
	// 	}

	// 	setLoading(false)
	// }

	if (loading||!profile) {
		<Loading />
	}


	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>

			{profile&&<ProfileForm
				profile={profile}
				loading={loading!}
				setLoading={() => { }}

			//onSave={saveProfileExt!}

			/>}
			<View style={{ marginBottom: 30, marginHorizontal: 10, paddingHorizontal: 10 }}>

				<Button
					onPress={() => router.replace('/(home)/ajustes')}
					disabled={loading}
					title='Cancelar'
					style={{ backgroundColor: "red" }}
				/>
			</View>

		</View>
	)
}
