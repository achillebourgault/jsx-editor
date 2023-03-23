import './EditSidebar.css'

import {useState} from "react";

import globalWidgets from "../../../widgets/globalWidgets";
import prefabsWidgets from "../../../widgets/prefabsWidgets";
import personalWidgets from "../../../widgets/personalWidgets";

const WidgetsList = {
    Global: globalWidgets,
    Prefabs: prefabsWidgets, //TODO
    Personal: personalWidgets //TODO
}

const WidgetTile = (props) => {
    const name = props.name;
    const icon = props.icon;

    return (
        <div className={"element"}>
            <p>{name}</p>
            <span>{icon}</span>
        </div>
    )
}

const EditSidebar = props => {
    const [widgetsListSelected, setWidgetsListSelected] = useState(WidgetsList.Global)

    function renderWidgetsList() {
        return (
            <div className={"EditSidebarWidgetsList"}>
                {
                    widgetsListSelected?.map((e, i) => {
                        return <WidgetTile name={e.name} icon={<span />} content={e.content} key={i} />
                    })
                }
            </div>
        )
    }

    return (
        <div className={"EditSidebar"}>
            <div className={"ESidebarHeader"}>
                <div className={"ESidebarHeaderLogo"}>
                    JSXEditor
                </div>
            </div>
            <div className={"EditSidebarSelectionSection"}>
                <button
                    className={widgetsListSelected === WidgetsList.Global ? "ESidebarCurrentSelection" : undefined}
                    onClick={() => setWidgetsListSelected(WidgetsList.Global)}
                >
                    GLOBALS
                </button>
                <button
                    className={widgetsListSelected === WidgetsList.Prefabs ? "ESidebarCurrentSelection" : undefined}
                    onClick={() => setWidgetsListSelected(WidgetsList.Prefabs)}
                >
                    PREFABS
                </button>
                <button
                    className={widgetsListSelected === WidgetsList.Personal ? "ESidebarCurrentSelection" : undefined}
                    onClick={() => setWidgetsListSelected(WidgetsList.Personal)}
                >
                    MY WIDGETS
                </button>
            </div>
            {renderWidgetsList()}
        </div>
    )
}

export default EditSidebar;
