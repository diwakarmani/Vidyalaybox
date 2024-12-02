import { Button, Dropdown, Input } from '@/components/ui'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import AddIcon from '@mui/icons-material/Add'
import DropdownItem from '@/components/ui/Dropdown/DropdownItem'
import { useState, ChangeEvent, useEffect } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { SORT_BY, ORDER_BY, CLASSES } from '@/components/ui/utils/constants'

interface NewRollNumber {
    id: number
    rollNo: number
}
interface Student {
    id: number
    rollNo: number
    firstName: string
    lastName: string
    class: string
    dob: string
    img: string
    admNo: number
    admDate: string
}
const AssignRollNumber = () => {
    const [filterClass, setFilterClass] = useState<string>('All')
    const [sortBy, setSortBy] = useState<string>('All')
    const [newRollNumberOfStudent, setNewRollNumberOfStudent] = useState<
        Array<NewRollNumber>
    >([])
    const [orderBy, setOrderBy] = useState<string>('Ascending')
    const [studentsDetails, setStudentsDetails] = useState<Array<Student>>([
        {
            id: 1,
            rollNo: 22,
            firstName: 'Beonel',
            lastName: 'Wessi',
            class: '7th A',
            dob: '20-12-2002',
            img: 'student.img',
            admNo: 23192,
            admDate: '2023-09-09',
        },
        {
            id: 2,
            rollNo: 1,
            firstName: 'Cristiano',
            lastName: 'Xonaldo',
            class: '8th A',
            dob: '21-12-2002',
            img: 'student.img',
            admNo: 23292,
            admDate: '2013-09-09',
        },
        {
            id: 3,
            rollNo: 11,
            firstName: 'Dristiano',
            lastName: 'Zonaldo',
            class: '8th A',
            dob: '21-12-2006',
            img: 'student.img',
            admNo: 23282,
            admDate: '2011-11-09',
        },
        {
            id: 4,
            rollNo: 34,
            firstName: 'Aristiano',
            lastName: 'Yonaldo',
            class: '7th A',
            dob: '21-02-2012',
            img: 'student.img',
            admNo: 22122,
            admDate: '2012-09-12',
        },
    ])

    const getFilteredAndSortedStudents = () => {
        let filteredStudents = studentsDetails

        // Filter by class
        if (filterClass !== 'All') {
            filteredStudents = filteredStudents.filter(
                (student) => student.class === filterClass
            )
        }

        // Sort by selected field and order
        const sortedStudents = [...filteredStudents].sort((a, b) => {
            if (orderBy === 'Ascending') {
                if (sortBy === 'First Name') {
                    return a.firstName.localeCompare(b.firstName)
                } else if (sortBy === 'Last Name') {
                    return a.lastName.localeCompare(b.lastName)
                } else if (sortBy === 'Admission Number') {
                    return Number(a.admNo) - Number(b.admNo)
                } else if (sortBy === 'Admission Date') {
                    const dateA = new Date(a.admDate).getTime() // Convert to numeric timestamp
                    const dateB = new Date(b.admDate).getTime()
                    return dateA - dateB
                } else if (sortBy === 'Date of Birth') {
                    const dateA = new Date(a.admDate).getTime() // Convert to numeric timestamp
                    const dateB = new Date(b.admDate).getTime()
                    return dateA - dateB
                }
            } else {
                if (sortBy === 'First Name') {
                    return b.firstName.localeCompare(a.firstName)
                } else if (sortBy === 'Last Name') {
                    return b.lastName.localeCompare(a.lastName)
                } else if (sortBy === 'Admission Number') {
                    return Number(b.admNo) - Number(a.admNo)
                } else if (sortBy === 'Admission Date') {
                    const dateA = new Date(a.admDate).getTime() // Convert to numeric timestamp
                    const dateB = new Date(b.admDate).getTime()
                    return dateB - dateA
                } else if (sortBy === 'Date of Birth') {
                    const dateA = new Date(a.admDate).getTime() // Convert to numeric timestamp
                    const dateB = new Date(b.admDate).getTime()
                    return dateB - dateA
                }
            }
            return 0
        })
        return sortedStudents
    }

    const studentsToDisplay = getFilteredAndSortedStudents();

    const handleUpdateRollNumber = () => {
        const newStudentData = studentsDetails.map((studentItem) => {
            const updatedStudent = newRollNumberOfStudent.find(
                (newRollOfStudent) => studentItem.id === newRollOfStudent.id
            )
            return updatedStudent
                ? { ...studentItem, rollNo: updatedStudent.rollNo }
                : studentItem
        })
        setStudentsDetails(newStudentData);
        alert('Roll numbers updated')

    }
    const handleChangeRoll = (student: Student, newRoll: number) => {
        setNewRollNumberOfStudent((prevDetails) => {
            const existingRoll = prevDetails.find((item) => item.id === student.id);
    
            if (existingRoll) {
                // Update the existing entry
                return prevDetails.map((item) =>
                    item.id === student.id ? { ...item, rollNo: newRoll } : item
                );
            } else {
                // Add a new entry
                return [...prevDetails, { id: student.id, rollNo: newRoll }];
            }
        });

    };
    return (
        <>
            <div className="flex flex-col bg-gray-200 rounded px-2 py-2 ">
                <p className="font-semibold text-gray-900">
                    Manage Student Roll Number
                </p>
                {/* <div className="flex w-full py-3 xs:flex-col lg:flex-row"> */}
                <div className="bg-white w-full mr-2 rounded px-6 py-4 my-2">
                    <p className="font-semibold my-2 text-gray-900">
                        List Students
                    </p>
                    <div className="flex w-full justify-between lg:flex-row xs:flex-col">
                        <div className="flex items-center bg-white my-2 px-1 lg:w-1/2 sm:w-full">
                            <label>Class: </label>
                            <Dropdown
                                style={{ color: 'black', fontSize: 'smaller' }}
                                title={filterClass != '' ? filterClass : 'All'}
                            >
                                {CLASSES.map((classItem) => (
                                    <DropdownItem
                                        key={classItem}
                                        onClick={() =>
                                            setFilterClass(classItem)
                                        }
                                    >
                                        {classItem}
                                    </DropdownItem>
                                ))}
                            </Dropdown>
                        </div>
                        <div className="flex items-center bg-white my-2 px-1 lg:w-1/2 sm:w-full">
                            <label>Sort By: </label>
                            <Dropdown
                                style={{ color: 'black', fontSize: 'smaller' }}
                                title={sortBy != '' ? sortBy : 'All'}
                            >
                                {SORT_BY.map((item) => (
                                    <DropdownItem
                                        key={item}
                                        onClick={() => setSortBy(item)}
                                    >
                                        {item}
                                    </DropdownItem>
                                ))}
                            </Dropdown>
                        </div>
                        <div className="flex items-center bg-white my-2 px-1 lg:w-1/2 sm:w-full">
                            <label>Order By: </label>
                            <Dropdown
                                style={{ color: 'black', fontSize: 'smaller' }}
                                title={orderBy}
                            >
                                {ORDER_BY.map((item) => (
                                    <DropdownItem
                                        key={item}
                                        onClick={() => setOrderBy(item)}
                                    >
                                        {item}
                                    </DropdownItem>
                                ))}
                            </Dropdown>
                        </div>
                    </div>
                    <div className="w-full xs:overflow-x-scroll lg:overflow-visible xs:my-2 lg:my-0">
                        <table className="w-full text-left my-2 lg:table-fixed">
                            <thead className="bg-gray-50">
                                <tr className="border-b">
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        No
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        New Roll Number
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        Old Roll Number
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        First Name
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        Last Name
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        Date of Birth
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        Image
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        Admission Number
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        Admission Date
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="w-full">
                                {studentsToDisplay?.map((student) =>
                                    student.class === filterClass ||
                                    filterClass === 'All' ? (
                                        <tr
                                            key={student?.id}
                                            className="border-b"
                                        >
                                            <td className=" px-6 py-3 text-xs text-gray-700">
                                                {student?.id}
                                            </td>
                                            <td className="px-6 py-3 text-xs text-gray-700 ">
                                                <input
                                                    className='border-2 rounded px-2 w-1/2'
                                                    type="text"
                                                    value={
                                                        newRollNumberOfStudent.find(item=>item.id===student.id)?.rollNo|| ""
                                                    }
                                                    onChange={(e) =>
                                                        handleChangeRoll(student, parseInt(e.target.value)||0)
                                                    }
                                                />
                                            </td>
                                            <td className="px-6 py-3 text-xs text-gray-700 ">
                                                {student?.rollNo}
                                            </td>
                                            <td className="px-6 py-3 text-xs text-gray-700 ">
                                                {student?.firstName}
                                            </td>
                                            <td className="px-6 py-3 text-xs text-gray-700 ">
                                                {student?.lastName}
                                            </td>
                                            <td className="px-6 py-3 text-xs text-gray-700 ">
                                                {student?.dob}
                                            </td>
                                            <td className="px-6 py-3 text-xs text-gray-700 ">
                                                {student?.img}
                                            </td>
                                            <td className="px-6 py-3 text-xs text-gray-700 ">
                                                {student?.admNo}
                                            </td>
                                            <td className="px-6 py-3 text-xs text-gray-700 ">
                                                {student?.admDate}
                                            </td>
                                        </tr>
                                    ) : null
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Button
                    className="my-4 text-xs xs:w-full lg:w-1/6"
                    variant="solid"
                    onClick={handleUpdateRollNumber}
                >
                    Submit
                </Button>
            </div>
        </>
    )
}
export default AssignRollNumber
