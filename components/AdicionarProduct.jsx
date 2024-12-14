import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useState } from "react";

const AdicionarProduct = ({ close, enviar }) => {
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productQuant, setProductQuant] = useState(null);
  const [productImg, setProductImg] = useState("");

  const selectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("É necessário permitir o acesso à galeria!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProductImg(result.assets[0].uri); // Obtém a URI da imagem
    }
  };

  function sendProd() {
    const formData = new FormData();

    formData.append("name", productName);
    formData.append("descricao", productDesc);
    formData.append("quantidade", productQuant);

    if (productImg) {
      // Adicionando a imagem ao FormData
      const localUri = productImg;
      const filename = localUri.split("/").pop();
      const type = `image/${filename.split(".").pop()}`; // Detectando o tipo da imagem (png, jpg, jpeg, etc.)
      formData.append("picture", {
        uri: localUri,
        name: filename,
        type: type,
      });
    }

    axios
      .post(
        "https://backend-products-dsr6.onrender.com/products/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Importante para enviar arquivos
          },
        }
      )
      .then((res) => {
        console.log(`Produto enviado com sucesso! ${res}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <View style={styles.popUpAdd}>
      <View style={styles.nomeInput}>
        <Text>Nome</Text>
        <TextInput
          placeholder="Nome"
          style={styles.input}
          onChangeText={setProductName}
          value={productName}
        />
      </View>
      <View style={styles.inputDesc}>
        <Text>Descrição</Text>
        <TextInput
          placeholder="Descrição"
          style={styles.input}
          onChangeText={setProductDesc}
          value={productDesc}
        />
      </View>
      <View style={styles.inputQuant}>
        <Text>Quantidade</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          onChangeText={(text) => setProductQuant(Number(text))}
          value={productQuant ? productQuant.toString() : ""}
        />
      </View>
      <TouchableOpacity style={styles.selectImage} onPress={selectImage}>
        <Text>Selecionar Imagem</Text>
      </TouchableOpacity>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={close}>
          <Text>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnEnviar}
          onPress={() => {
            sendProd();
            close
          }}
        >
          <Text style={styles.textBtnEnviar}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdicionarProduct;

const styles = StyleSheet.create({
  popUpAdd: {
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
  input: {
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  selectImage: {
    backgroundColor: "#F2C139",
    marginVertical: 30,
    padding: 20,
    width: "70%",
    paddingHorizontal: 40,
    marginHorizontal: "auto",
    borderRadius: 30,
  },
  btnEnviar: {
    backgroundColor: "#C7E24E",
    width: 70,
    padding: 10,
    marginLeft: 260,
    borderRadius: 30,
  },
  textBtnEnviar: {
    textAlign: "center",
  },
});
