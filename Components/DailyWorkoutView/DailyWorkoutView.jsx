import React,{useState,useEffect} from 'react'
import { StyleSheet,View,Text } from 'react-native'
import ExerciseAccordion from '../Accordion/ExerciseAccordion';
export default ({navigation}) => {


   
        return (
    <View style={styles.container}
>
                <ExerciseAccordion></ExerciseAccordion>
    </View>)
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    }
})