import React from 'react'
import { Text, View } from 'react-native'

interface Props {
    title: string,
    value: string|number,
    textTitleSize?: number,
    textTextSize?: number,
    numberOfLines?: number
}
const LabelCol=({ title, value, textTextSize=12, textTitleSize=12, numberOfLines=1 }: Props) => {
    return (
        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 1 }}>
            <Text
                style={{
                    textTransform: "uppercase",
                    fontSize: textTitleSize,
                    fontWeight: "bold"
                }}
            >
                {title}:
            </Text>
            <Text
                numberOfLines={numberOfLines}
                style={{
                    textTransform: "uppercase",
                    fontSize: textTextSize,
                    fontWeight: "300"
                }}
            >
                {value}
            </Text>
        </View>
    )
}

export default LabelCol