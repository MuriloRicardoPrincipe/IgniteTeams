import { TouchableOpacityProps } from 'react-native'
import {Conteiner, Title, FilterStyleProps} from './style'


type Props = TouchableOpacityProps & FilterStyleProps & {
    title:string;
}

export function Filter({title, isActive = false, ...rest}:Props){
    return(
        <Conteiner
            isActive={isActive}
            {...rest}
        >
            <Title>
                {title}
            </Title>
        </Conteiner>
    )
}