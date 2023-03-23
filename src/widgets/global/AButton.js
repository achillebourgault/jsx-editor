import JsxElement from "@achillebourgault/json-to-jsx";

const AButton = (props) => {
    const className = props.className;
    const style = props.style;
    const text = props.text;

    const metaData = {
        "type": "button",
        "attributes": {
            "className": className,
            "style": style
        },
        "text": text,
        "children": []
    }

    return (
        <JsxElement metaData={props.metaData} />
    )
}

export default AButton;
