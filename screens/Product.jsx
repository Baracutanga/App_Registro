import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import EditarProduct from "../components/EditarProduct";

const Product = () => {
  const route = useRoute();
  const { nome, desc, quant, img, id } = route.params;

  const [editar, setEditar] = useState(false);

  const navigation = useNavigation();

  function deleteProduct(id) {
    axios
      .delete(
        `https://backend-products-dsr6.onrender.com/products/delete/${id}`
      )
      .then((res) => {
        alert("Produto deletado com sucesso!");
      })
      .catch((err) => console.error(err));
  }

  function openEdit() {
    setEditar(true);
  }

  function closeEdit() {
    setEditar(false);
  }

  return (
    <View style={styles.container}>
      {editar ? (
        <EditarProduct
          nome={nome}
          desc={desc}
          id={id}
          quant={quant}
          img={img}
        />
      ) : (
        <></>
      )}
      <View style={styles.containerProduct}>
        <Image source={{ uri: img }} />
        <View style={styles.nomeQuant}>
          <Text style={styles.textName}>{nome}</Text>
          <Text style={styles.quantText}>Quantidade: {quant}</Text>
        </View>
        <View style={styles.line}></View>
        <Text style={styles.descText}>Descrição</Text>
        <View style={styles.containerDesc}>
          <Text style={styles.descricao}>{desc}</Text>
        </View>
        <View style={styles.containerBtns}>
          <TouchableOpacity
            style={styles.btnDelete}
            onPress={() => {
              deleteProduct(id);
              navigation.goBack();
            }}
          >
            <Text style={styles.deleteText}>Excluir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnEdit} onPress={openEdit}>
            <Text style={styles.editText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFDCF",
    flex: 1,
  },
  line: {
    width: "95%",
    height: 1,
    marginHorizontal: "auto",
    backgroundColor: "#000",
  },
  btnDelete: {
    backgroundColor: "#D02424",
    padding: 10,
    width: 80,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  btnEdit: {
    backgroundColor: "#242DD0",
    padding: 10,
    width: 80,
    borderRadius: 5,
  },
  containerBtns: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    paddingRight: "3%",
  },
  editText: {
    color: "#D0CDFF",
    textAlign: "center",
  },
  deleteText: {
    color: "#FFCDCD",
    textAlign: "center",
  },
  containerDesc: {
    backgroundColor: "#FFFDCF",
    padding: 10,
    width: "95%",
    marginHorizontal: "auto",
    marginBottom: 10,
  },
  containerProduct: {
    backgroundColor: "#E3E2AC",
    width: "95%",
    marginHorizontal: "auto",
    marginTop: 40,
    padding: 10,
  },
  textName: {
    fontSize: 19,
    fontWeight: "bold",
    width: "70%",
  },
  nomeQuant: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "auto",
  },
  descText: {
    marginLeft: "3%",
    marginTop: 10,
    marginBottom: 5,
  },
});
