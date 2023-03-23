import JsxElement from "@achillebourgault/json-to-jsx";
import defaultImage from '../../assets/default_image.svg'

const AImage = (props) => {
    const className = props.className;
    const style = props.style;
    const text = props.text;
    const src = !props.src ? defaultImage : props.src;

    const metaData = {
        "type": "img",
        "attributes": {
            "className": className,
            "style": style,
            "src": src,
        },
        "text": text,
        "children": []
    }

    return (
        <JsxElement metaData={props.metaData} />
    )
}

export default AImage;
