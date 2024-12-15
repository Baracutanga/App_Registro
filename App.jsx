import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Product from "./screens/Product";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AdicionarProduct from "./components/AdicionarProduct";

const Stack = createNativeStackNavigator();

const Home = () => {
  const [productName, setProductName] = useState("");
  const [productImg, setProductImg] = useState("");
  const [productId, setProductId] = useState("");
  const [productQuant, setProductQuant] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [products, setProducts] = useState([]);
  const [popUp, setPopUp] = useState(false);

  const navigation = useNavigation();

  function openAdd() {
    setPopUp(true);
  }

  function closeAdd() {
    setPopUp(false);
  }

  useEffect(() => {
    axios
      .get("https://backend-products-dsr6.onrender.com/products")
      .then((res) => {
        const data = res.data;
        const imageUrl = `https://backend-products-dsr6.onrender.com${data.picture}`; // Concatenar o domínio

        setProductName(data.name);
        setProductImg(imageUrl);
        setProductId(data._id);
        setProductQuant(data.quantidade);
        setProductDesc(data.descricao);
        setProducts(data);
      });
  }, [products]);

  // Item que é renderizado na FlatList
  const Item = ({
    productName,
    productImg,
    productDesc,
    productQuant,
    productId,
  }) => (
    <View style={styles.containerList}>
      {products.picture === null ? <Image source={{ uri: productImg }} style={styles.imagem} /> : null}
      <View style={styles.nomeButton}>
        <Text style={styles.textName}>{productName}</Text>
        <TouchableOpacity
          style={styles.btnVerMais}
          onPress={() =>
            navigation.navigate("Produto", {
              nome: productName,
              desc: productDesc,
              quant: productQuant,
              img: productImg,
              id: productId,
            })
          }
        >
          <Text style={styles.verMais}>Ver mais</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Corpo Home
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFDCF" }}>
      <TouchableOpacity style={styles.buttonAdd} onPress={openAdd}>
        <Text style={styles.adiconar}>Adicionar Produto</Text>
      </TouchableOpacity>
      {popUp ? <AdicionarProduct close={closeAdd} enviar={closeAdd} /> : <></>}
      {products.length === 0 ? (
        <Text style={styles.textVazio}>Comece adicionando um produto🙂</Text>
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={products}
          renderItem={({ item }) => (
            <Item
              productName={item.name}
              productImg={`https://backend-products-dsr6.onrender.com${item.picture}`}
              productDesc={item.descricao}
              productQuant={item.quantidade}
              productId={item._id}
            />
          )}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitleAlign: "center",
            title: "Produtos",
            headerStyle: { backgroundColor: "#99602F" },
            headerTitleStyle: { color: "#FFFDCF" },
          }}
        />
        <Stack.Screen
          name="Produto"
          component={Product}
          options={{
            headerStyle: { backgroundColor: "#99602F" },
            headerTitleStyle: { color: "#FFFDCF" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDCF",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonAdd: {
    backgroundColor: "#EBFF90",
    width: "80%",
    marginHorizontal: "auto",
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    borderColor: "#C2BA59",
    borderWidth: 1,
  },
  adiconar: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    opacity: 0.7,
  },
  containerList: {
    backgroundColor: "#E3E2AC",
    marginVertical: 10,
    width: "95%",
    marginHorizontal: "auto",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: .25,
    elevation: 1,
  },
  nomeButton: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  textName: {
    width: "75%",
    fontSize: 28,
    fontWeight: "bold",
    color: "#826634",
  },
  btnVerMais: {
    backgroundColor: "#8968EA",
    width: 90,
    padding: 10,
    borderRadius: 5,
  },
  verMais: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 14,
    color: "#fff",
  },
  imagem: {
    width: "100%",
    height: 255,
    borderRadius: 5,
  },
  textVazio: {
    textAlign: "center",
    textAlignVertical: "center",
    marginVertical: 90,
    fontSize: 32,
    fontWeight: "bold",
    opacity: .3,
    width: "95%",
  },
});
