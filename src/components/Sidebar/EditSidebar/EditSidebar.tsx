import {useState} from "react";

import style from './EditSidebar.module.css'


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
        <div className={style.element}>
            <p>{name}</p>
            <span>{icon}</span>
        </div>
    )
}

const EditSidebar = props => {
    const [widgetsListSelected, setWidgetsListSelected] = useState(WidgetsList.Global)

    function renderWidgetsList() {
        return (
            <div className={style.EditSidebarWidgetsList}>
                {
                    widgetsListSelected?.map((e, i) => {
                        return <WidgetTile name={e.name} icon={<span />} content={e.content} key={i} />
                    })
                }
            </div>
        )
    }

    return (
        <div className={style.EditSidebar}>
            <div className={style.ESidebarHeader}>
                <div className={style.ESidebarHeaderLogo}>
                    JSXEditor
                </div>
            </div>
            <div className={style.EditSidebarSelectionSection}>
                <button
                    className={widgetsListSelected === WidgetsList.Global ? style.ESidebarCurrentSelection : undefined}
                    onClick={() => setWidgetsListSelected(WidgetsList.Global)}
                >
                    GLOBALS
                </button>
                <button
                    className={widgetsListSelected === WidgetsList.Prefabs ? style.ESidebarCurrentSelection : undefined}
                    onClick={() => setWidgetsListSelected(WidgetsList.Prefabs)}
                >
                    PREFABS
                </button>
                <button
                    className={widgetsListSelected === WidgetsList.Personal ? style.ESidebarCurrentSelection : undefined}
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
