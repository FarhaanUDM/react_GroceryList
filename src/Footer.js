
function Footer(props) {

    const footerStyle = {
        backgroundColor : 'aqua',
        color: '#ee3123',
    }
    return (
        <footer style={footerStyle}>
            <p>{props.length} {props.length === 1 || props.length === 0  ? "Item" : "Items"} left</p>
            
        </footer>
    )
}

export default Footer;