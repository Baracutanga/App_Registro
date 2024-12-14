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

const EditarProduct = ({ nome, desc, quant, img, id }) => {
  const [name, setName] = useState("");
  const [descricao, setDesc] = useState("");
  const [quantidade, setQuant] = useState("");

  const navigation = useNavigation();

  function update(id) {
    axios
      .put(`https://backend-products-dsr6.onrender.com/products/update/${id}`, {
        name: name,
        descricao: descricao,
        quantidade: quantidade,
      })
      .then((res) => {
        alert(`Produto ${res.data.name} Atualizado com sucesso!`);
      })
      .catch((err) => console.error(err));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.editerTitle}>Editar</Text>
      <Text>Nome:</Text>
      <TextInput placeholder={nome} onChangeText={setName} />
      <Text>Descrição</Text>
      <TextInput placeholder={desc} onChangeText={setDesc} />
      <Text>Quantidade</Text>
      <TextInput placeholder={quant.toString()} onChangeText={setQuant} keyboardType="numeric" />
      <TouchableOpacity 
        onPress={() => {
            update(id);
            navigation.navigate('Home');
        }}>
        <Text>Atualizar</Text>
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
    elevation: 2,
    zIndex: 1,
  },
});
