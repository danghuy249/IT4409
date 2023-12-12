import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
const ButtonInputSearch = (props) => {
    const { 
        size, 
        placeholder, 
        textButton, 
        bordered, 
        bgcInput = '#fff', 
        bgcButton = 'rgb(13,92,182)',
        colorButton = '#fff',  
    
    } = props;
    return (
        <div style={{ display: 'flex' }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                bordered={bordered}
                style={{ borderRadius: '0px', backgroundColor: bgcInput }}
                {...props}
            />
            <ButtonComponent
                size={size}
                icon={<SearchOutlined color={colorButton}/>}
                styleButton={{ borderRadius: '0px', border: !bordered && 'none' , backgroundColor: bgcButton, color: colorButton }}
                textButton={textButton}
                styleTextButton={{color: colorButton}}
            >
            </ButtonComponent>
        </div>
    );
};

export default ButtonInputSearch;
