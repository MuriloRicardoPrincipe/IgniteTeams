import {Conteiner, Logo, BackButton, BackIcon} from './style'
import LogoImage from '@assets/logo.png'

import { useNavigation } from '@react-navigation/native';

type Props ={
    showBackButton?: boolean;
}

export function Header ({showBackButton = false}: Props){

    const navigation = useNavigation();
    function handleNew(){
        navigation.navigate('groups')
    }
    return(
        <Conteiner>
            {
                showBackButton &&
                <BackButton onPress={handleNew} >
                    <BackIcon/>
                </BackButton>
            }

            <Logo
                source={LogoImage} 
            />
        </Conteiner>
    )
}