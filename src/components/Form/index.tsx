import { useState } from "react";
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Vibration,
    Pressable,
    Keyboard,
    FlatList,
} from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";



export default function Form() {

    const [height, setHeight] = useState<number | string | undefined>(undefined);
    const [weight, setWeight] = useState<number | string | undefined>(undefined);
    const [messageImc, setMessageImc] = useState("preencha o peso e altura");
    const [imc, setImc] = useState<string | undefined>(undefined);
    const [textButton, setTextButton] = useState("Calcular");
    const [errorMessage, setErrorMessage] = useState<undefined | string>(undefined);
    const [imcList, setImcList] = useState<{}[]>([]);

    function imcCalculator() {
        let imcWeight = Number(weight);
        let heightFormat = Number(height?.toString().replace(',', '.'));
        let totalImc = (imcWeight / (heightFormat * heightFormat)).toFixed(2);
        setImcList((arr) => [...arr, {id: new Date().getTime(), imc: totalImc }]);
        setImc(totalImc);
    }

    function verificationImc() {
        if (imc == undefined) {
            Vibration.vibrate();
            setErrorMessage("campo obrigatório*");
        }
    }

    function validationImc() {
        if (weight != undefined && height != undefined) {
            imcCalculator();
            setHeight(undefined);
            setWeight(undefined);
            setMessageImc("Seu imc é igual:");
            setTextButton("Calcular Novamente");
            setErrorMessage(undefined);
        } else {
            verificationImc();
            setImc(undefined);
            setTextButton("Calcular");
            setMessageImc("preencha o peso e altura");
        }
    }

    return (
        <View style={styles.formContext}>
            {imc == null ? 
            <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.input} placeholder="Ex. 1.75" keyboardType="numeric" onChangeText={setHeight} value={height ? height.toString() : undefined} />

                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.input} placeholder="Ex. 75.365" keyboardType="numeric" onChangeText={setWeight} value={weight ? weight.toString() : undefined} />

                <TouchableOpacity style={styles.buttonCalculator} onPress={() => validationImc()}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </Pressable>
            : 
            <View style={styles.exhibitionResultImc}>
                <ResultImc messageResultImc={messageImc} resultImc={imc} />
                <TouchableOpacity style={styles.buttonCalculator} onPress={() => validationImc()}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            }
            <FlatList 
            showsVerticalScrollIndicator={false}
            style={styles.listImcs} 
            data={[...imcList].reverse()}
            renderItem={({item}) =>{
                return(
                    <Text style={styles.resultImcItem}>
                        <Text style={styles.textResultItemList}>Resultado IMC = </Text>
                        {item.imc}
                    </Text>
                    
                )
            }}
            keyExtractor={(item) => item.id}/>
        </View>
    );
}