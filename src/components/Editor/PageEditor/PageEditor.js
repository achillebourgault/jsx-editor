import EditSidebar from '@/components/Sidebar/EditSidebar/EditSidebar';

import styles from './PageEditor.module.css'
import {useState} from "react";

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
        pageContent: {

        }
    })
    return (
        <main className={styles.main}>
            <EditSidebar context={pageContext} />
            <div className={styles.editor}>
                {createElementSection()}
            </div>
        </main>
    )
}
