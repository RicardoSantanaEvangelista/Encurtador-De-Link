import React, { useState } from 'react';
import { TouchableWithoutFeedback,
         Keyboard,
         KeyboardAvoidingView,
         Platform,
         Modal,
         ActivityIndicator,
        } from 'react-native';
 
import { LinearGradient } from 'expo-linear-gradient';
import StatusBarPage from '../../components/StatusBarPage';
import Menu from '../../components/Menu';
import ModalLink from '../../components/ModalLink';

import {Feather } from '@expo/vector-icons';

import { ContainerLogo,
         Logo,
         ContaierContent,
         Title,
         SubTitle,
         ContainerInput,
         BoxIcon,
         Input,
         ButtonLink,
         ButtonLinkText,
    } from './style';

import api from '../../services/api';
import { saveLink } from '../../utils/storeLinks';

export default function Home(){

    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState({});

   async function handleShortLink(){
        setLoading(true);

       try{
           const response = await api.post('/shorten',
           {
             long_url: input
           })

           setData(response.data);

           setModalVisible(true);

           saveLink('sujeitolinks', response.data);

           Keyboard.dismiss();
           setLoading(false);
           setInput('');

       }catch{
           alert('Ops, parece que algo deu errado !');
           Keyboard.dismiss();
           setInput('');
           setLoading(false);
       }
    }

    return(
    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
        <LinearGradient
            colors={[
                '#1ddbb9',
                '#132742',
            ]}

            style={{
                flex: 1,
                justifyContent: 'center',

            }}
        >

        <StatusBarPage  
            barStyke='light-content'
            backgroundColor='#1ddbb9'
        />
            
            <Menu/>

            <KeyboardAvoidingView
                behavior={ Platform.OS === 'android' ? 'padding' : 'position' }
                anabled

            >

           <ContainerLogo>
               <Logo source={require('../../assets/Logo.png')} resizeMode='contain'/>
           </ContainerLogo>

           <ContaierContent>
               <Title>@Links</Title>
               <SubTitle>Cole seu link para encurtar</SubTitle>

               <ContainerInput>

                    <BoxIcon>
                        <Feather name='link' size={22} color='#FFF'/>
                    </BoxIcon>

                    <Input
                        placeholder='Cole seu link aqui !'
                        placeholderTextColor='white'
                        autoCapitalize='none'
                        autoCorret={false}
                        keyboardType='url'
                        value={input}
                        onChangeText={ (text) => setInput(text)}
                    />
               </ContainerInput> 


               <ButtonLink onPress={ handleShortLink }>
                   {
                       loading ? (
                        <ActivityIndicator color='#12121212' size={24}/>
                       ) : (
                        <ButtonLinkText>
                            Gerar Link
                        </ButtonLinkText>

                       )
                   }
               </ButtonLink>
           </ContaierContent>
           </KeyboardAvoidingView>

            <Modal visible={modalVisible} transparent animationType='slide'>
                <ModalLink onClose={ () => setModalVisible(false) } data={data} />
            </Modal>

        </LinearGradient>
    </TouchableWithoutFeedback>
    );
}