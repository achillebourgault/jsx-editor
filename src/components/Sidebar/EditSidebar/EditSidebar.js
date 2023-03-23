import {useState} from "react";

import style from './EditSidebar.module.css'


import globalWidgets from "../../../widgets/globalWidgets";
import prefabsWidgets from "../../../widgets/prefabsWidgets";
import personalWidgets from "../../../widgets/personalWidgets";

const WidgetsListType = {
    Global: globalWidgets,
    Prefabs: prefabsWidgets,
    Personal: personalWidgets
}

const WidgetTile = (props) => {
    const name = props.name;
    const icon = props.icon;

    return (
        <div className={style.element} draggable={true}>
            <p>{name}</p>
            <span>{icon}</span>
        </div>
    )
}

const EditSidebar = props => {
    const [widgetsListSelected, setWidgetsListSelected] = useState(WidgetsListType.Global)
    const context = props.context;
    const currentPage = context.pageName;
    const pageNeedUpdate = context.pageNeedUpdate;

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

    function renderWidgetsTypeSelection() {
        return <div className={style.EditSidebarSelectionSection}>
            <button
                className={widgetsListSelected === WidgetsListType.Global ? style.ESidebarCurrentSelection : undefined}
                onClick={() => setWidgetsListSelected(WidgetsListType.Global)}
            >
                Globals
            </button>
            <button
                className={widgetsListSelected === WidgetsListType.Prefabs ? style.ESidebarCurrentSelection : undefined}
                onClick={() => setWidgetsListSelected(WidgetsListType.Prefabs)}
            >
                Prefabs
            </button>
            <button
                className={widgetsListSelected === WidgetsListType.Personal ? style.ESidebarCurrentSelection : undefined}
                onClick={() => setWidgetsListSelected(WidgetsListType.Personal)}
            >
                My widgets
            </button>
        </div>;
    }

    return (
        <div className={style.EditSidebar}>

            <div className={style.ESidebarHeader}>
                <div className={style.ESidebarHeaderLogo}>
                    JSXEditor
                </div>
            </div>

            {renderWidgetsTypeSelection()}
            {renderWidgetsList()}

            <div className={style.ESidebarFooter}>
                <span>{currentPage}</span>
                <button className={style.updateBtn} disabled={!pageNeedUpdate}>
                    UPDATE PAGE
                </button>
            </div>

        </div>
    )
}

export default EditSidebar;
