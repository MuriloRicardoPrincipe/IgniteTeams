import { ButtonIcon } from '@components/ButtonIcon';
import {Conteiner, Icon, Name} from './style'

type Props = {
    name:string;
    onRemove: ()=> void; 
}

export function CardPlayer({name, onRemove}:Props){
    return(
        <Conteiner>
            <Icon name="person"/>
            <Name>
                {name}
            </Name>
            <ButtonIcon
                icon="close"
                type="SECUNDARY"
                onPress={onRemove}
            />
        </Conteiner>
    )
}