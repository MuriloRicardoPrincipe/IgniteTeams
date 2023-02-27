import styled, {css} from "styled-components/native";
import { TouchableOpacity } from "react-native";

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECUNDARY';

type Props = {
    type:ButtonTypeStyleProps;
}

export const Conteiner = styled(TouchableOpacity)<Props>`
    flex: 1;
    min-height: 56px;
    max-height: 56px;

    background-color: ${({theme, type}) => type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};

    border-radius: 6px;

    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text`

    ${({theme}) => css`
        font-size: ${theme.FONT_SIZE.MD}px;
        font-family: ${theme.FONT_FAMILY.REGULAR};
        color: ${theme.COLORS.WHITE};
    `}
`;