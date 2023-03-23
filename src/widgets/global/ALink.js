import JsxElement from "@achillebourgault/json-to-jsx";

const ALink = (props) => {
    const className = props.className;
    const style = props.style;
    const text = props.text;
    const href = !props.href ? "#" : props.href;

    const metaData = {
        "type": "a",
        "attributes": {
            "className": className,
            "style": style,
            "href": href,
        },
        "text": text,
        "children": []
    }

    return (
        <JsxElement metaData={props.metaData} />
    )
}

export default ALink;
