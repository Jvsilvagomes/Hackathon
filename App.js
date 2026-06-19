import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Button,
} from "react-native";

export default function App() {
  const [selecoes, setSelecoes] = useState([]);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Jvsilvagomes/hackathon/refs/heads/main/hackton/db.json")
      .then((response) => response.json())
      .then((data) => setSelecoes(data))
      .catch((error) => console.log(error));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.bandeira }}
        style={styles.bandeira}
      />

      <Text style={styles.grupo}>
        Grupo {item.grupo}
      </Text>

      <Text style={styles.nome}>
        {item.selecao}
      </Text>

      <View style={styles.botao}>
        <Button
          title="Apostar"
          onPress={() =>
            alert(`Aposta registrada!\nVocê apostou no ${item.selecao}!`)
          }
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Dashboard da Copa 2026
      </Text>

      <FlatList
        data={selecoes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingTop: 50,
    paddingHorizontal: 10,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#006847",
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },

  bandeira: {
    width: 80,
    height: 50,
    resizeMode: "contain",
    marginBottom: 10,
  },

  grupo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },

  nome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  botao: {
    width: "100%",
  },
});