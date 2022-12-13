import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const API = `https://localhost:3000/api`;

export default function App() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(21);
  const [priceMin, setPriceMin] = useState(25);
  const [priceMax, setPriceMax] = useState(1000);
  const [hobbies, setHobbies] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setResult("");
    try {
      const response = await fetch(`${API}/generate-gifts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceMin, priceMax, gender, age, hobbies }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (e) {
      Alert.alert("fail, try again", e.message);
    } finally {
      setLoading(false);
    }
  };

  const onTryAgain = () => {
    setResult("");
  };

  if (result) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Christmas gifts for your idea are :
        </Text>
        <Text style={styles.result}>{result}</Text>
        <Pressable onPress={onTryAgain} style={styles.button}>
          <Text style={styles.buttontext}>Try again</Text>
        </Pressable>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 50,
          }}
        >
          Christmas Gift Generator 🎄
        </Text>

        <Text style={styles.text}>Gender of the person</Text>
        <View style={styles.gendercontainer}>
          <Text
            onPress={() => setGender("man")}
            style={[
              styles.gender,
              gender == "man" && { backgroundColor: "black", color: "white" },
            ]}
          >
            Man
          </Text>
          <Text
            onPress={() => setGender("woman")}
            style={[
              styles.gender,
              gender == "woman" && { backgroundColor: "black", color: "white" },
            ]}
          >
            Woman
          </Text>
        </View>
        <Text style={styles.text}>Age</Text>
        <TextInput
          placeholder="Age"
          keyboardType="numeric"
          style={styles.input}
          value={age.toString()}
          onChangeText={(s) => setAge(Number.parseInt(s || "0"))}
        />

        <Text style={styles.text}>Minimum Price</Text>
        <TextInput
          placeholder="Price from"
          keyboardType="numeric"
          style={styles.input}
          value={priceMin.toString()}
          onChangeText={(s) => setPriceMin(Number.parseInt(s || "o"))}
        />

        <Text style={styles.text}>Maximum Price</Text>
        <TextInput
          placeholder="Price to"
          keyboardType="numeric"
          style={styles.input}
          value={priceMax.toString()}
          onChangeText={(s) => setPriceMax(Number.parseInt(s))}
        />

        <Text style={styles.text}>Hobbies</Text>
        <TextInput
          placeholder="Hobbies"
          style={styles.input}
          value={hobbies}
          onChangeText={setHobbies}
        />

        <Pressable style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttontext}>GENERATE GIFTS</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "bisque",
    padding: 10,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  input: {
    fontSize: 16,
    borderColor: "#353740",
    borderWidth: 1,
    padding: 15,
    marginBottom: 12,
    marginTop: 5,
  },
  gendercontainer: {
    flexDirection: "row",
  },
  gender: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "white",
    margin: 5,
    padding: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  button: {
    marginTop: "auto",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 6,
    backgroundColor: "black",
  },
  buttontext: {
    color: "white",
    fontWeight: "bold",
  },
});
