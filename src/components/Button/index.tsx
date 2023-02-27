import { TouchableOpacityProps } from 'react-native'
import {Conteiner, Title, ButtonTypeStyleProps} from './style'

type Props = TouchableOpacityProps &{
    title:string;
    type?: ButtonTypeStyleProps;
}

export function Button({ title, type='PRIMARY', ...rest }:Props){
    return(
        <Conteiner
            type={type}
            {...rest}
        >
            <Title>
                {title}
            </Title>
        </Conteiner>
    )
}