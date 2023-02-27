import { Conteiner, SubTitle, Title } from "./style";


type Props = {
    title: string,
    subTitle: string
}

export function Highlight({title, subTitle}:Props){
    return(
        <Conteiner>
            <Title>
                {title}
            </Title>
            <SubTitle>
                {subTitle}
            </SubTitle>
        </Conteiner>
    )
}