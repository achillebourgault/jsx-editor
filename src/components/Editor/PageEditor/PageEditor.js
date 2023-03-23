import EditSidebar from '@/components/Sidebar/EditSidebar/EditSidebar';

import styles from './PageEditor.module.css'
import {useState} from "react";
import {Droppable} from "react-drag-and-drop";

const examplePageContent = {
    parent: null,
    widgetId: "main",
    type: "div",
    attributes: {
        style: {
            "background": "beige",
            "height": "30vh",
            "width": "100%"
        }
    },
    children: [
        {
            parent: "main",
            widgetId: "main_a",
            type: "div",
            attributes: null,
            children: [
                {
                    parent: "main_a",
                    widgetId: "main_a_a",
                    type: "div",
                    attributes: null,
                    children: null
                },
                {
                    parent: "main_a",
                    widgetId: "main_a_b",
                    type: "div",
                    attributes: null,
                    children: null
                },
                {
                    parent: "main_a",
                    widgetId: "main_a_c",
                    type: "div",
                    attributes: null,
                    children: null
                },
            ]
        },

        {
            parent: "main",
            widgetId: "main_b",
            type: "div",
            attributes: null,
            children: [
                {
                    parent: "main_b",
                    widgetId: "main_b_a",
                    type: "div",
                    attributes: null,
                    children: null
                },
                {
                    parent: "main_b",
                    widgetId: "main_b_b",
                    type: "div",
                    attributes: null,
                    children: null
                },
                {
                    parent: "main_b",
                    widgetId: "main_b_c",
                    type: "div",
                    attributes: null,
                    children: null
                },
            ]
        },

        {
            parent: "main",
            widgetId: "main_c",
            type: "div",
            attributes: null,
            children: [
                {
                    parent: "main_c",
                    widgetId: "main_c_a",
                    type: "div",
                    attributes: null,
                    children: null
                },
                {
                    parent: "main_c",
                    widgetId: "main_c_b",
                    type: "div",
                    attributes: null,
                    children: null
                },
                {
                    parent: "main_c",
                    widgetId: "main_c_c",
                    type: "div",
                    attributes: null,
                    children: null
                },
            ]
        }

    ]
};

function getAllWidgets(pageContent, parent) {
    let tmpContent = pageContent;
    let tmpWidgetParentId = null;
    let widgets = [];

    if (tmpContent !== null || tmpContent !== undefined) {
        widgets.push({
            parent: widgets === [] ? parent : tmpWidgetParentId,
            widgetId: tmpContent.widgetId,
            type: tmpContent.type,
            attributes: tmpContent.attributes
        });
        if (tmpContent.children !== null) {
            tmpContent.children.map((childElement) => {
                getAllWidgets(childElement, tmpContent?.widgetId).map((e) => {
                    widgets.push(e);
                })
            })
        }
    }

    return widgets;
}

function addElementToWidget(pageContent, widgetId, element) {
    let newPageContent = pageContent;
    let tmpContent = null;
    let searchXTmp = 0;

    if (pageContent?.widgetId === widgetId) {
        newPageContent.children.push(element);
    } else {
        for (;pageContent?.children !== null && pageContent?.children !== undefined; searchXTmp++) {

        }
    }
    return newPageContent;
}

const createElementSection = () => {
    return (
        <div className={styles.createElementSection}>
            <span>Add new element <a>+</a></span>
        </div>
    )
}

export default function PageEditor() {
    const [pageContext, updatePageContext] = useState({
        pageName: "examplePage",
        pageProperties: null,
        pageNeedUpdate: false,
        pageContentOriginal: examplePageContent,
        pageContent: examplePageContent
    })

    function onDrop(data) {
        console.log(getAllWidgets(pageContext.pageContent))
        console.log(data)
    }

    return (
        <main className={styles.main}>
            <EditSidebar context={pageContext} />
            <Droppable
                className={styles.editor}
                types={['widget']}
                onDrop={onDrop}>
                <ul className="test_widget">test_widget</ul>
                {createElementSection()}
            </Droppable>

        </main>
    )
}
