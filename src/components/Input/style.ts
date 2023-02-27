import { TextInput } from "react-native";
import styled, {css} from "styled-components/native";


export const Conteiner = styled(TextInput)`

    ${({theme}) => css`
        background-color: ${theme.COLORS.GRAY_700};
        color: ${theme.COLORS.WHITE};    
        font-size: ${theme.FONT_SIZE.MD}px;
        font-weight: ${theme.FONT_FAMILY.REGULAR};
    `}

    flex: 1;
    min-height: 56px;
    max-height: 56px;


    border-radius: 6px;
    padding: 16px;

`;