import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const EditarProduct = ({ nome, desc, quant, id, fechar }) => {
  const [nameUp, setNameUp] = useState("");
  const [descricaoUp, setDescUp] = useState("");
  const [quantidadeUp, setQuantUp] = useState("");

  const navigation = useNavigation();

  function update(id) {
    if (!nameUp || !descricaoUp || !quantidadeUp) {
      alert("Por favor, preencha todo os campos.");
    } else {
      axios
        .put(
          `https://backend-products-dsr6.onrender.com/products/update/${id}`,
          {
            name: nameUp,
            descricao: descricaoUp,
            quantidade: quantidadeUp,
          }
        )
        .then((res) => {
          alert(`Produto ${res.data.name} Atualizado com sucesso!`);
        })
        .catch((err) => console.error(err));

      navigation.navigate("Home");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.editTitle}>Editar</Text>
      <Text>Nome</Text>
      <TextInput
        placeholder={nome}
        onChangeText={setNameUp}
        style={styles.textInput}
      />
      <Text>Descrição</Text>
      <TextInput
        placeholder={desc}
        onChangeText={setDescUp}
        style={styles.textInput}
      />
      <Text>Quantidade</Text>
      <TextInput
        placeholder={quant.toString()}
        onChangeText={setQuantUp}
        keyboardType="numeric"
        style={styles.textInput}
      />
      <Text style={styles.notPossible}>
        Não é possível atualizar a imagem :(
      </Text>
      <TouchableOpacity
        onPress={() => {
          update(id);
        }}
        style={styles.btnAtualizar}
      >
        <Text style={styles.textBtn}>Atualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelar} onPress={fechar}>
        <Text style={styles.textBtn}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditarProduct;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "90%",
    backgroundColor: "#FFFDCF",
    padding: 20,
    marginHorizontal: "5%",
    marginTop: 70,
    borderRadius: 5,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: .35,
    elevation: 2,
    zIndex: 1,
  },
  editTitle: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  notPossible: {
    opacity: 0.4,
    textAlign: "center",
    marginVertical: 5,
  },
  textInput: {
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    borderColor: "#A6A587",
    marginBottom: 10,
    marginTop: 5,
    backgroundColor: "#fff",
  },
  btnAtualizar: {
    backgroundColor: "#4B54F6",
    width: "90%",
    marginHorizontal: "auto",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  textBtn: {
    color: "#EDF5FF",
    textAlign: "center",
    textAlignVertical: "center",
  },
  cancelar: {
    backgroundColor: "#FD4F4F",
    width: "90%",
    marginHorizontal: "auto",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
});
