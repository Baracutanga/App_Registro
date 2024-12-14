import { StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AdicionarProduct from "../components/AdicionarProduct";

const Home = () => {
    const [productName, setProductName] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [productQuant, setProductQuant] = useState(null);
    const [productImg, setProductImg] = useState('');
    const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000//products")
    .then(res => {
        const data = res.data;
        setProductName(data.name);
        setProductImg(data.picture);
    })
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <TouchableOpacity style={styles.buttonAdd}>
          <Text>Adicionar Produto</Text>
        </TouchableOpacity>
        {popUp ? <AdicionarProduct /> : <></>}
      </SafeAreaProvider>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  buttonAdd: {
    width: "90vh",
    backgroundColor: "#C2BA59",
    borderColor: "#C2BA59",
    borderWidth: 1,
    height: 20,
    marginVertical: 8,
  },
});
