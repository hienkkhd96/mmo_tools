import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';
import { openOtherApp } from '../../utils/openAnotherApp';
import OverlayModule from '../../modules/Overlay';

type Props = {}

const Login = (props: Props) => {
    const handlePress = () => {
        OverlayModule.startOverlay();
        openOtherApp('tiktok://user/6837751091241681925');
        return;
    };
    console.log(props);
    return (
        <View style={styles.container}>
            <View></View>
            <Text style={styles.text}>Login here</Text>
            <Button
                title="Go to Home"
                onPress={() => handlePress()} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        color: '#333',
    },
});
export default Login;
