import JsxElement from "@achillebourgault/json-to-jsx";

export default function Renderer(props) {
    const { pageContent } = props;

    return (
        <JsxElement metaData={pageContent} />
    )
}
