import {Conteiner, Icon, Title} from "./style"
import { TouchableOpacityProps } from "react-native"

type Props = TouchableOpacityProps & {
    title:string;

}

export function GroupCard({title, ...rest}:Props){
    return(
        <Conteiner {...rest}>
            <Icon/>
            <Title>
                {title}
            </Title>
        </Conteiner>
    )
}