import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  Alert, 
  SafeAreaView,
  ActivityIndicator 
} from 'react';

export default function App() {
  const [selecoes, setSelecoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const URL_API = "https://raw.githubusercontent.com/Jvsilvagomes/SEU_REPOSITORIO/main/db.json";

  useEffect(() => {
    fetch(URL_API)
      .then((resposta) => resposta.json())
      .then((dados) => {
        setSelecoes(dados);
        setCarregando(false);
      })
      .catch((erro) => {
        console.error("Erro ao buscar dados:", erro);
        setCarregando(false);
      });
  }, []);

  const lidarComAposta = (nomeSelecao) => {
    Alert.alert("Aposta Confirmada! ⚽", `Você apostou no ${nomeSelecao}!`);
  };

  const renderizarCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => lidarComAposta(item.selecao)}
    >
      <Image source={{ uri: item.bandeira }} style={styles.bandeira} />
      
      <View style={styles.infoContainer}>
        <Text style={styles.nomePais}>{item.selecao}</Text>
        <Text style={styles.grupoText}>Grupo {item.grupo}</Text>
      </View>
    </TouchableOpacity>
  );

  if (carregando) {
    return (
      <View style={styles.containerCentralizado}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Carregando Seleções...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>🏆 Dashboard da Copa 2026</Text>
      </View>

      <FlatList
        data={selecoes}
        keyExtractor={(item) => item.id}
        renderItem={renderizarCard}
        numColumns={2} 
        contentContainerStyle={styles.listaConteudo}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },
  containerCentralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f9',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  header: {
    backgroundColor: '#0e1e38',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#f1c40f',
  },
  titulo: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  listaConteudo: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden', 
    elevation: 3,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  bandeira: {
    width: '100%',
    height: 90,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 12,
    alignItems: 'center',
  },
  nomePais: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  grupoText: {
    fontSize: 13,
    color: '#777',
    fontWeight: '600',
  },
});