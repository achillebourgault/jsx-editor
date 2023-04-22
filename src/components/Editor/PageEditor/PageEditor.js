import EditSidebar from '@/components/Sidebar/EditSidebar/EditSidebar';

import styles from './PageEditor.module.css'
import {useState} from "react";
import {Droppable} from "react-drag-and-drop";
import Renderer from "@/components/Editor/Renderer/Renderer";

let examplePageContent = {
    "parent": null,
    "widgetId": "main",
    "type": "div",
    "attributes": {
        "style": {
            "background": "beige",
            "height": "30vh",
            "width": "100%"
        }
    },
    "children": [
        {
            "parent": "main",
            "widgetId": "main_a",
            "type": "div",
            "attributes": null,
            "children": [
                {
                    "parent": "main_a",
                    "widgetId": "main_a_a",
                    "type": "div",
                    "attributes": null,
                    "children": []
                },
                {
                    "parent": "main_a",
                    "widgetId": "main_a_b",
                    "type": "div",
                    "attributes": null,
                    "children": []
                },
                {
                    "parent": "main_a",
                    "widgetId": "main_a_c",
                    "type": "div",
                    "attributes": null,
                    "children": []
                },
            ]
        },

        {
            "parent": "main",
            "widgetId": "main_b",
            "type": "div",
            "attributes": null,
            "children": [
                {
                    "parent": "main_b",
                    "widgetId": "main_b_a",
                    "type": "div",
                    "attributes": null,
                    "children": []
                },
                {
                    "parent": "main_b",
                    "widgetId": "main_b_b",
                    "type": "div",
                    "attributes": null,
                    "children": []
                },
                {
                    "parent": "main_b",
                    "widgetId": "main_b_c",
                    "type": "div",
                    "attributes": null,
                    "children": []
                },
            ]
        },

        {
            "parent": "main",
            "widgetId": "main_c",
            "type": "div",
            "attributes": null,
            "children": [
                {
                    "parent": "main_c",
                    "widgetId": "main_c_a",
                    "type": "div",
                    "attributes": null,
                    "children": []
                },
                {
                    "parent": "main_c",
                    "widgetId": "main_c_b",
                    "type": "div",
                    "attributes": null,
                    "children": []
                },
                {
                    "parent": "main_c",
                    "widgetId": "main_c_c",
                    "type": "div",
                    "attributes": null,
                    "children": []
                },
            ]
        }

    ]
};

function getAllWidgets(pageContent, parent) {
    const tmpContent = pageContent;
    let widgets = [];

    if (tmpContent !== null && tmpContent !== undefined) {
        widgets.push({
            parent: parent ? parent : null,
            widgetId: tmpContent.widgetId,
            type: tmpContent.type,
            attributes: tmpContent.attributes
        });
        if (tmpContent.children !== null) {
            tmpContent.children?.map((childElement) => {
                getAllWidgets(childElement, tmpContent?.widgetId).map((e) => {
                    widgets.push(e);
                })
            })
        }
    }
    return widgets;
}

function getRootElement(pageContent) {
    let allWidgets = getAllWidgets(pageContent);
    let rootContent = null;

    allWidgets.map((e) => {
        if (e.parent === null) {
            rootContent = e;
        }
    })
    return rootContent;
}

function addElementToWidget(element, parent, pageContent) {
    let newPageContent = pageContent;

    if (pageContent.widgetId !== parent) {
        //Must search on childrens
        if (pageContent.children === null) {
            throw Error("Parent \"" + parent + "\" was not found in the Page Context.");
            return pageContent;
        } else {
            pageContent.children.map((widget) => {

                if (widget.children !== null) {

                }

                //Parent Found
                if (widget.widgetId === parent) {
                    widget.children.push(element);
                }
            });
        }
        addElementToWidget(element, parent, )
    }

    return newPageContent;
}

function BACKUP_addElementToWidget(element, parent, pageContent) {
    let allWidgets = getAllWidgets(pageContent);
    let newPageContent = {};
    let rootElement;

    allWidgets.push({
        parent: parent,
        widgetId: element.widgetId,
        type: element.type,
        attributes: element.attributes
    })

    newPageContent = getRootElement(pageContent);
    if (allWidgets.length > 1) {
        allWidgets.map((e, index) => {
            newPageContent.children.push({

            })
        })
    }

    return newPageContent;
}

function addElementToPage(element, parentWidgetId, pageContent) {
    let tmpPageContent = pageContent;
    // Recherche de l'élément parent ayant un widgetId correspondant au paramètre parentWidgetId
    let parentElement = findParentElement(tmpPageContent, parentWidgetId);

    // Si l'élément parent n'a pas de children, on crée le tableau children et on l'ajoute à l'élément parent
    if (parentElement !== null && (parentElement?.children === undefined || parentElement?.children === null)) {
        parentElement.children = [];
    }

    if (parentElement !== null) {
        // On ajoute l'élément à ajouter dans le tableau children de l'élément parent
        parentElement.children.push(element);
    } else {
        // Si l'élément parent n'a pas été trouvé, on l'ajoute aux .children de tmpPageContent
        tmpPageContent.children.push(element);
    }

    return tmpPageContent;
}

// Fonction auxiliaire qui permet de trouver l'élément parent ayant un widgetId correspondant au paramètre widgetId
function findParentElement(element, widgetId) {
    // Si l'élément courant a un widgetId correspondant au paramètre widgetId, on le renvoie
    if (element?.widgetId === widgetId) {
        return element;
    }

    // Sinon, on parcourt tous les enfants de l'élément courant et on récursivement recherche l'élément ayant le widgetId correspondant
    if (element.children) {
        for (let i = 0; i < element.children.length; i++) {
            const parentElement = findParentElement(element.children[i], widgetId);
            if (parentElement) {
                return parentElement;
            }
        }
    }

    // Si aucun élément n'a été trouvé, on renvoie null
    return null;
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
        originalPageContent: examplePageContent,
        pageContent: examplePageContent
    })

    function onDrop(data) {
        //console.log(sortJSON(pageContext.pageContent))
        console.log(data)
        updatePageContext(previousContentContext => (
            {
                ...previousContentContext, pageContent: addElementToPage({
                    widgetId: 'test_elem',
                    type: "h1",
                    attributes: null,
                    children: [],
                    text: "Hello world"
                }, "main_a", pageContext.pageContent)
            }
        ));
        console.table(getAllWidgets(pageContext?.pageContent))
    }

    return (
        <main className={styles.main}>
            <EditSidebar context={pageContext} />
            <Droppable
                className={styles.editor}
                types={['widget']}
                onDrop={onDrop}>
                <Renderer pageContent={pageContext?.pageContent} />
                {createElementSection()}
            </Droppable>

        </main>
    )
}
