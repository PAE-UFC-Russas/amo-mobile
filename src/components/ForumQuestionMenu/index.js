import { IconButton, Menu } from 'native-base';

export default function ForumQuestionMenu({placeholder, value, setValue, color, error}){
    return (
        <Menu trigger={triggerProps => {
            return <IconButton accessibilityLabel="opções do comentario" {...triggerProps}/>
          }}>
            <Menu.Item>Arial</Menu.Item>
            <Menu.Item>Nunito Sans</Menu.Item>
            <Menu.Item>Roboto</Menu.Item>
            <Menu.Item>Poppins</Menu.Item>
            <Menu.Item>SF Pro</Menu.Item>
            <Menu.Item>Helvetica</Menu.Item>
            <Menu.Item isDisabled>Sofia</Menu.Item>
            <Menu.Item>Cookie</Menu.Item>
        </Menu>
    )
}