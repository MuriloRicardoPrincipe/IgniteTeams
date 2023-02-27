import { TouchableOpacityProps } from "react-native";
import { ButtonTypeStyleProps, Container, Icon} from "./style";
import { MaterialIcons} from "@expo/vector-icons";

type Props = TouchableOpacityProps &{
    icon: keyof typeof MaterialIcons.glyphMap;
    type?:ButtonTypeStyleProps;
}

export function ButtonIcon({icon, type = "PRIMARY", ...rest}:Props){
    return (
        <Container {...rest}>
            <Icon
                name={icon}
                type={type}
            />
        </Container>
    )
}