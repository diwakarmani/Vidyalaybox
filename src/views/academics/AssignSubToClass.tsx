import { Button, Input } from '@/components/ui'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'

const fakeData = {
    coreSubjects: [
        {
            semester: '---Select---',
            subject: '---Select---',
        },
        {
            semester: '1st',
            subject: 'ABC',
        },
        {
            semester: '2nd',
            subject: 'XYZ',
        },
        {
            semester: '3rd',
            subject: 'PQR',
        },
    ],
    electiveSubjects: [
        {
            semester: '---Select---',
            subject: '---Select---',
        },
        {
            semester: '1st',
            subject: 'ABC',
        },
        {
            semester: '2nd',
            subject: 'XYZ',
        },
        {
            semester: '3rd',
            subject: 'PQR',
        },
    ],
    totalSelectableSubjects: '',
}
interface Subjects {
    semester: string
    subject: string
}
interface ClassSubjects {
    class: string
    semester: boolean
    coreSubjects: Array<Subjects>
    electiveSubjects: Array<Subjects> | null
    totalSelectableSubjects: number
}
const AssignSubToClass = () => {
    const [classSubjects, setClassSubjects] = useState<ClassSubjects>({
        class: '5th',
        semester: true,
        coreSubjects: [],
        electiveSubjects: [],
        totalSelectableSubjects: 0,
    })
    const [coreSubjectsState, setCoreSubjects] = useState<Subjects>({
        semester: '',
        subject: '',
    })
    const [electiveSubjectsWithSemester, setElectiveSubjectsWithSemester] =
        useState<Subjects>({
            semester: '',
            subject: '',
        })
    const [
        electiveSubjectsWithoutSemester,
        setElectiveSubjectsWithoutSemester,
    ] = useState<Subjects>({
        semester: '',
        subject: '',
    })
    const handleAddCoreSubject = () => {
        if (
            coreSubjectsState.semester === '' ||
            coreSubjectsState.subject === ''
        ) {
            return alert('Please select subject and semester')
        } else {
            setClassSubjects((classSubjects) => {
                const alreadyExists = classSubjects.coreSubjects.some(
                    (item) =>
                        item.semester === coreSubjectsState.semester &&
                        item.subject === coreSubjectsState.subject
                )

                // If it exists, show an alert and return the current state
                if (alreadyExists) {
                    alert('This subject is already in the list.')
                    return classSubjects // No changes made if the item already exists
                }

                // Otherwise, add the new subject
                return {
                    ...classSubjects,
                    coreSubjects: [
                        ...classSubjects.coreSubjects,
                        {
                            semester: coreSubjectsState.semester,
                            subject: coreSubjectsState.subject,
                        },
                    ],
                }
            }),
                setCoreSubjects({ semester: '', subject: '' })
        }
    }
    const handleAddElectiveSubject = () => {
        if (
            electiveSubjectsWithSemester.semester === '' &&
            electiveSubjectsWithSemester.subject === '' &&
            electiveSubjectsWithoutSemester.subject === ''
        ) {
            return alert('Please select subject and semester')
        } else {
            setClassSubjects((classSubjects) => {
                // Determine whether the subject with or without a semester already exists
                const alreadyExists = classSubjects.electiveSubjects?.some(
                    (item) =>
                        (item.semester ===
                            electiveSubjectsWithSemester.semester &&
                            item.subject ===
                                electiveSubjectsWithSemester.subject) ||
                        item.subject === electiveSubjectsWithoutSemester.subject
                )

                // If the subject already exists, show an alert and return the current state
                if (alreadyExists) {
                    alert('This subject is already in the list.')
                    return classSubjects // No changes made if the item already exists
                }
                // Check whether one of the fields of semseter and subject is empty
                if (
                    (electiveSubjectsWithSemester.semester != '' &&
                        electiveSubjectsWithSemester.subject === '') ||
                    (electiveSubjectsWithSemester.semester === '' &&
                        electiveSubjectsWithSemester.subject != '')
                ) {
                    alert('Please fill both semester and subject')
                    return classSubjects
                }
                // Choose the appropriate values for semester and subject
                const newElective =
                    electiveSubjectsWithSemester.semester != '' &&
                    electiveSubjectsWithSemester.subject != ''
                        ? {
                              semester: electiveSubjectsWithSemester.semester,
                              subject: electiveSubjectsWithSemester.subject,
                          }
                        : {
                              semester:
                                  electiveSubjectsWithoutSemester.semester,
                              subject: electiveSubjectsWithoutSemester.subject,
                          }

                // Return updated state with the new elective subject added
                return {
                    ...classSubjects,
                    electiveSubjects: [
                        ...(classSubjects.electiveSubjects || []),
                        newElective,
                    ],
                }
            })
        }
    }
    const handleSubmit=()=>{
        console.log(classSubjects)
    }
    return (
        <div className="rounded m-1 bg-white px-8 py-3">
            <div>
                <div className="flex flex-row">
                    <p className="font-bold text-gray-700 mr-1">Class:</p>
                    <p>{classSubjects.class}</p>
                </div>
                <div className="flex flex-row">
                    <p className="font-bold text-gray-700 mr-1">
                        Semesters Included:
                    </p>
                    <p>{classSubjects.semester ? 'Yes' : 'No'}</p>
                </div>
                <div className="mt-12">
                    <p className="text-xl font-semibold text-gray-700">
                        Core Subjects
                    </p>
                    {classSubjects.coreSubjects.length != 0 ? (
                        <div className="flex flex-col ">
                            {classSubjects.coreSubjects.map((coreSubject) => (
                                <div
                                    key={coreSubject.semester}
                                    className="flex w-full py-2 justify-between"
                                >
                                    <div className="w-1/5 p-1 rounded  bg-gray-200 cursor-pointer">
                                        <p key={coreSubject.semester}>
                                            {coreSubject.semester}
                                        </p>
                                    </div>
                                    <div className="w-1/5 p-1 rounded  bg-gray-200 cursor-pointer">
                                        <p>{coreSubject.subject}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                    <div className="flex flex-row w-full py-2 justify-between">
                        <select
                            className="w-1/3 p-2 rounded-sm border-gray-200 border-2 bg-white cursor-pointer"
                            onChange={(e) =>
                                setCoreSubjects((coreSubjectsState) => ({
                                    ...coreSubjectsState,
                                    semester: e.target.value,
                                }))
                            }
                        >
                            {fakeData.coreSubjects.map((coreSubject) => (
                                <option
                                    key={coreSubject.semester}
                                    value={coreSubject.semester}
                                >
                                    {coreSubject.semester}
                                </option>
                            ))}
                        </select>
                        <select
                            className="w-1/3 p-2 rounded-sm border-gray-200 border-2 bg-white cursor-pointer"
                            onChange={(e) =>
                                setCoreSubjects((coreSubjectsState) => ({
                                    ...coreSubjectsState,
                                    subject: e.target.value,
                                }))
                            }
                        >
                            {fakeData.coreSubjects.map((coreSubject) => (
                                <option
                                    key={coreSubject.semester}
                                    value={coreSubject.subject}
                                >
                                    {coreSubject.subject}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Button
                        className="items-center justify-center flex my-4 lg:w-1/4 xs:w-full cursor-pointer"
                        size="xs"
                        variant="twoTone"
                        icon={<AddIcon fontSize="small" className="" />}
                        onClick={() => handleAddCoreSubject()}
                    >
                        Add Core Subject
                    </Button>
                </div>
                <div className="bg-gray-400 h-0.5"></div>
                <div className="mt-12">
                    <p className="text-xl font-semibold text-gray-700">
                        Elective Subjects
                    </p>
                    <p className="text-xl font-semibold text-gray-700">
                        Groups
                    </p>
                    {classSubjects.electiveSubjects &&
                    classSubjects.electiveSubjects.length != 0 ? (
                        <div className="flex flex-col ">
                            {classSubjects.electiveSubjects.map(
                                (electiveSubject) => (
                                    <div
                                        key={`${electiveSubject.semester}-${electiveSubject.subject}`}
                                        className="flex w-full py-2 justify-between"
                                    >
                                        <div className="w-1/5 p-1 rounded  bg-gray-200 cursor-pointer">
                                            <p>{electiveSubject.semester}</p>
                                        </div>
                                        <div className="w-1/5 p-1 rounded  bg-gray-200 cursor-pointer">
                                            <p>{electiveSubject.subject}</p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    ) : null}
                    <div className="flex flex-row w-full py-2 justify-between">
                        <select
                            className="w-1/3 p-2 rounded-sm border-gray-200 border-2 bg-white cursor-pointer"
                            onChange={(e) => (
                                setElectiveSubjectsWithSemester(
                                    (electiveSubjectsWithSemester) => ({
                                        ...electiveSubjectsWithSemester,
                                        semester: e.target.value,
                                    })
                                ),
                                setElectiveSubjectsWithoutSemester({
                                    semester: '',
                                    subject: '',
                                })
                            )}
                        >
                            {fakeData.coreSubjects.map((electiveSubject) => (
                                <option
                                    key={electiveSubject.semester}
                                    value={electiveSubject.semester}
                                >
                                    {electiveSubject.semester}
                                </option>
                            ))}
                        </select>
                        <select
                            className="w-1/3 p-2 rounded-sm border-gray-200 border-2 bg-white cursor-pointer"
                            onChange={(e) => (
                                setElectiveSubjectsWithSemester(
                                    (electiveSubjectsWithSemester) => ({
                                        ...electiveSubjectsWithSemester,
                                        subject: e.target.value,
                                    })
                                ),
                                setElectiveSubjectsWithoutSemester({
                                    semester: '',
                                    subject: '',
                                })
                            )}
                        >
                            {fakeData.electiveSubjects.map(
                                (electiveSubject) => (
                                    <option
                                        key={electiveSubject.semester}
                                        value={electiveSubject.subject}
                                    >
                                        {electiveSubject.subject}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                    <div className="text-center">
                        <p className="font-black">OR</p>
                    </div>
                    <div className="flex flex-row w-full py-2 justify-between">
                        <select
                            className="w-1/3 p-2 rounded-sm border-gray-200 border-2 bg-white cursor-pointer"
                            onChange={(e) => (
                                setElectiveSubjectsWithoutSemester({
                                    semester: '',
                                    subject: e.target.value,
                                }),
                                setElectiveSubjectsWithSemester({
                                    semester: '',
                                    subject: '',
                                })
                            )}
                        >
                            {fakeData.electiveSubjects.map(
                                (electiveSubject) => (
                                    <option
                                        key={electiveSubject.subject}
                                        value={electiveSubject.subject}
                                    >
                                        {electiveSubject.subject}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                    <Button
                        className="items-center justify-center flex my-4 lg:w-1/4 xs:w-full cursor-pointer"
                        size="xs"
                        variant="twoTone"
                        icon={<AddIcon fontSize="small" className="" />}
                        onClick={() => handleAddElectiveSubject()}
                    >
                        Add Elective Subject
                    </Button>
                </div>
                <div>
                    <label className="text-xs">Total Selectable Subjects*</label>
                    <Input
                        onChange={(e) =>
                            setClassSubjects((classSubjects) => ({
                                ...classSubjects,
                                totalSelectableSubjects: Number(e.target.value),
                            }))
                        }
                    />
                </div>
                <Button
                        className="items-center justify-center flex my-4 lg:w-1/4 xs:w-full cursor-pointer"
                        size="sm"
                        variant="solid"
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </Button>
            </div>
            <div></div>
        </div>
    )
}
export default AssignSubToClass
