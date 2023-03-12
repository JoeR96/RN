import React from 'react'
import { Text, View, StyleSheet , Pressable } from 'react-native';

export default function SubmitButton() {
  return (
      <Pressable
          onPress={submit}
          style={styles.button}
      >
          <Text style={styles.text}>Set Failed</Text>
      </Pressable>
  )
}

const submit = () => {

}

const styles = StyleSheet.create({
    text: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 24,
        paddingVertical: 5,},
    button:{}
});
