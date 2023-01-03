import LessonsList from '../components/LessonsList';
import NewLessonDialog from '../components/NewLessonDialog';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import EditLesson from '../components/EditLesson';
import '../styles/MainPage.css'

export default function MainPage() {

    const [modalVisible, setModalVisible] = useState(false);
    const [lessonsList, setLessonsList] = useState()
    const [editedLessonIdx, setEditedLessonIdx] = useState(-1)

    const retrieveLessons = function () {
        try {
            var list = JSON.parse(localStorage.getItem("lessons"))
            if (list != null) {
                return list
            } else {
                return []
            }

        } catch (_e) {
            return []
        }
    }

    const saveLessons = function (lessons) {
        var seen = [];
        localStorage.setItem("lessons",
            JSON.stringify(lessons, function (key, val) {
                if (val != null && typeof val == "object") {
                    if (seen.indexOf(val) >= 0) {
                        return;
                    }
                    seen.push(val);
                }
                return val;
            }))
    }

    const addNewLesson = function (lessonData) {
        var newList = [...lessonsList]
        newList.push(lessonData)
        setLessonsList(newList)
    }

    const deleteLesson = function (idx) {
        var newList = [...lessonsList]
        newList.splice(idx, 1)
        setLessonsList(newList)
    }

    const updateLesson = function (idx, newData) {
        var newList = [...lessonsList]
        newList[idx] = newData
        setLessonsList(newList)
    }

    const download = function (content, fileName, contentType) {
        const a = document.createElement("a");
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    const exportLesson = function (idx) {
        var data = lessonsList[idx]
        download(JSON.stringify(data, undefined, '\t'), data.lesson_name + ".json", "text/plain");
    }


    useEffect(() => {
        if (lessonsList != undefined) {
            saveLessons(lessonsList)
        }

    }, [lessonsList])

    useEffect(() => {
        setLessonsList(retrieveLessons())
    }, [])

    const getLessonEditor = function () {
        if (editedLessonIdx < 0) {
            return ""
        } else {
            return <EditLesson
                lessonData={lessonsList[editedLessonIdx]}
                lessonIdx={editedLessonIdx}
                updateLesson={updateLesson} />
        }
    }

    return (
        <div className="MainPage">
            <h1>כלי ניהול שיעורים</h1>
            <NewLessonDialog
                visible={modalVisible}
                onHide={() => setModalVisible(false)}
                saveLesson={addNewLesson}
                deleteLesson={deleteLesson} />

            <LessonsList
                lessons={lessonsList}
                deleteLesson={deleteLesson}
                editLesson={setEditedLessonIdx}
                exportLesson={exportLesson} />

            <Button onClick={() => setModalVisible(true)}>יצירת שיעור חדש</Button>

            <br /><hr /><br />
            {getLessonEditor()}

        </div>
    );
}