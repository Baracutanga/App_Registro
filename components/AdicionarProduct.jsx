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

  // Abrir galeria para escolher imagem
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
      setProductImg(result.assets[0].uri);
    }
  };

  // Adicionar produto
  function sendProd() {
    if (!productName || !productDesc || !productQuant) {
      alert("nome, descrição e quantidade obrigatórios.");
    } else {
      const formData = new FormData();

      formData.append("name", productName);
      formData.append("descricao", productDesc);
      formData.append("quantidade", productQuant);

      if (productImg) {
        const localUri = productImg;
        const filename = localUri.split("/").pop();
        const type = `image/${filename.split(".").pop()}`;
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
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(`Produto enviado com sucesso! ${res}`);
        })
        .catch((err) => {
          console.error(err);
        });
        close()
    }
  }

  // Corpo AdicionarProduct
  return (
    <View style={styles.popUpAdd}>
      <View style={styles.nomeInput}>
        <Text>Nome</Text>
        <TextInput
          placeholder="Nome"
          style={styles.textInput}
          onChangeText={setProductName}
          value={productName}
        />
      </View>
      <View style={styles.inputDesc}>
        <Text>Descrição</Text>
        <TextInput
          placeholder="Descrição"
          style={styles.textInput}
          onChangeText={setProductDesc}
          value={productDesc}
        />
      </View>
      <View style={styles.inputQuant}>
        <Text>Quantidade</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.textInput}
          onChangeText={(text) => setProductQuant(Number(text))}
          value={productQuant ? productQuant.toString() : ""}
          placeholder="1"
        />
      </View>
      <TouchableOpacity style={styles.selectImage} onPress={selectImage}>
        <Text>Selecionar Imagem</Text>
      </TouchableOpacity>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={close} style={styles.btnCancelar}>
          <Text style={styles.cancelar}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnEnviar}
          onPress={() => {
            sendProd();
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
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: .35,
    elevation: 2,
    zIndex: 1,
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
  selectImage: {
    backgroundColor: "#F2C139",
    marginVertical: 30,
    padding: 20,
    width: "70%",
    paddingHorizontal: 40,
    marginHorizontal: "auto",
    borderRadius: 10,
  },
  btnEnviar: {
    backgroundColor: "#C7E24E",
    width: 70,
    padding: 10,
    borderRadius: 5,
  },
  textBtnEnviar: {
    textAlign: "center",
  },
  btnCancelar: {
    backgroundColor: "#FD4F4F",
    width: 90,
    padding: 10,
    borderRadius: 5,
  },
  cancelar: {
    textAlign: "center"
  },
  buttons: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
});
