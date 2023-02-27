import {Conteiner, Message} from './style'

type Props = {
    message:string;

}

export function ListEmpty({message}:Props){
    return(
        <Conteiner>
            <Message>
                {message}
            </Message>
        </Conteiner>
    )
}