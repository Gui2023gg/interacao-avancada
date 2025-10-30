import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";

export default function App() {
  const [imagens, setImagens] = useState([
    { id: "1", uri: "https://img.freepik.com/fotos-gratis/close-vertical-de-um-lindo-gato-europeu-de-pelo-curto_181624-34587.jpg?semt=ais_hybrid&w=740&q=80" },
    { id: "2", uri: "https://super.abril.com.br/wp-content/uploads/2024/12/0311-gatos-layout_site2.jpg?quality=70&strip=info&w=720&crop=1" },
    { id: "3", uri: "https://www.petsupport.com.br/wp-content/uploads/2022/02/pelo-do-gato-1024x640.jpg" },
    { id: "4", uri: "https://institutoamparanimal.org.br/wp-content/uploads/2023/10/gato_preto_ampara_petlove.png" },
    { id: "5", uri: "https://img.freepik.com/fotos-gratis/kitty-com-parede-monocromatica-atras-dela_23-2148955134.jpg?semt=ais_hybrid&w=740&q=80" },
    { id: "6", uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzghTSoSKWs_YduGvjxWg-WzR8T3OYT1PhufDFDGPYPqxdk-sAI87Rtutnda1kUa7TbN4&usqp=CAU" },
    { id: "7", uri: "https://i.pinimg.com/originals/80/9d/07/809d079c4f79514ee24913d40fe6ce91.jpg" },
    { id: "8", uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTciTBuzuCKtDSWxarc0ASXsUbpvugwqkvm5NDUhobWz8Z78BOvTztJzqzCgaRB6Tk2vIk&usqp=CAU" },

  ]);

  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  // Toque simples → abrir imagem em tela cheia
  const abrirImagem = (uri) => {
    setImagemSelecionada(uri);
  };

  // Toque longo → exibir alerta para excluir imagem
  const excluirImagem = (id) => {
    Alert.alert(
      "Excluir imagem",
      "Deseja realmente excluir esta imagem?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            setImagens(imagens.filter((img) => img.id !== id));
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Galeria de Imagens 🖼️</Text>

      <FlatList
        data={imagens}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => abrirImagem(item.uri)}
            onLongPress={() => excluirImagem(item.id)}
          >
            <Image source={{ uri: item.uri }} style={styles.imagem} />
          </TouchableOpacity>
        )}
      />

      {/* Modal - exibe imagem em tela cheia */}
      <Modal visible={!!imagemSelecionada} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalFechar}
            onPress={() => setImagemSelecionada(null)}
          >
            <Text style={styles.modalTextoFechar}>Fechar</Text>
          </TouchableOpacity>
          <Image source={{ uri: imagemSelecionada }} style={styles.imagemFull} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  titulo: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 10,
  },
  imagem: {
    width: 160,
    height: 200,
    margin: 8,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  imagemFull: {
    width: "90%",
    height: "70%",
    borderRadius: 15,
  },
  modalFechar: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    borderRadius: 10,
  },
  modalTextoFechar: {
    color: "#fff",
    fontSize: 18,
  },
});
