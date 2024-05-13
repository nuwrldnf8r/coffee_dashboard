import {colors} from '../lib/colors'

const Button = props => {
    let bgcolor
    switch(props.background){
        case 'green':
            bgcolor = colors.buttongreen
            break
        case 'blue':
            bgcolor = colors.buttonblue
            break
        case 'grey':
            bgcolor = colors.buttongrey
            break
        default:
            bgcolor = colors.buttongreen
    }
    
    if(props.icon){
        const opacity = props.selected?100:50        
        let style = {
            display: 'inline-block',
            backgroundColor: bgcolor, 
            borderStyle: 'none', 
            borderRadius: 5, 
            width: 30,
            height: 30,
            opacity: `${opacity}%`,
            vAlign: 'middle',
            textAlign: 'center',
            margin: 5
        }
        if(!props.selected) style.cursor = 'pointer'
        return (<button style={style} onClick={props.onClick}>{props.children}</button>)
    } else {
        const opacity = props.disabled?50:100  
        
        let style = {
            display: 'inline-block',
            backgroundColor:bgcolor, 
            borderStyle: 'none', 
            borderRadius: 15, 
            opacity: `${opacity}%`,
            padding: 7,
            minWidth: 170,
            fontWeight: props.selected?'bold':'normal',
            cursor: 'pointer'
        }
        //if(!props.disabled) style.cursor = 'pointer'
        return (<button style={style} onClick={props.onClick}>{props.children}</button>)
    }
}

export default Button