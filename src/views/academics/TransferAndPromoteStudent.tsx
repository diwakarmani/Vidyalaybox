import { Dropdown, Button } from '@/components/ui'
import { useState } from 'react'
import DropdownItem from '@/components/ui/Dropdown/DropdownItem'

const classes = ['7th A', '8th A', '7th B', '8th B']
const years = ['2023-24', '2022-23', '2021-22', '2020-21']
interface Student {
    id: number
    name: string
    class: string
}
interface StudentResult {
    id: number
    type:string
}
interface StudentStatus {
    id: number
    status:string
}
const TransferAndPromoteStudent = () => {
    const [filterClass, setFilterClass] = useState<string>('--Select--')
    const [filterCurrentClass, setFilterCurrentClass] = useState<string>('--Select--')
    const [filterUpdateClass, setFilterUpdateClass] = useState<string>('--Select--')
    const [filterPromoteClass, setFilterPromoteClass] = useState<string>('--Select--')
    const [filterYear, setFilterYear] = useState<string>('--Select--')
    const [resultType, setResultType] = useState<Array<StudentResult>>([])
    const [statusType, setStatusType] = useState<Array<StudentStatus>>([])
    const [updateStudentDetails, setUpdateStudentDetails] = useState<Student>({
        id: 0,
        name: '',
        class: '',
    })
    const [studentsDetails, setStudentsDetails] = useState<Array<Student>>([
        {
            id: 1,
            name: 'Quinton De Cock',
            class: '7th A',
        },
        { id: 2, name: 'Quinton De Cock', class: '7th B' },
        { id: 3, name: 'Quinton De Cock', class: '8th A' },
        { id: 4, name: 'Prathiv Patel', class: '7th A' },
    ])
    const handleAddItems = () => {
        setStudentsDetails(
            studentsDetails.map((studentDetails) =>
                studentDetails.id === updateStudentDetails.id
                    ? updateStudentDetails
                    : studentDetails
            )
        )
        setFilterClass('')
        setFilterUpdateClass('')
    }
    const handlePromoteSubmit = () => {
        if(filterCurrentClass==='--Select--'||filterPromoteClass==='--Select--'){
            return alert('Select a class')
        }
        if(resultType.length===0||statusType.length===0)
        {
            return alert("Select a state for result and status")
        }
        else{
        const filteredStudents = studentsDetails.filter(
            student => !statusType.some(
                studentStatus => studentStatus.id === student.id && studentStatus.status === 'leave'
            )
        );
    
        const updatedStudents = filteredStudents.map(
            student => resultType.some(
                studentResult => studentResult.id === student.id && studentResult.type === 'pass'
            )
            ? { ...student, class: filterPromoteClass }
            : student
        );
    
        setStudentsDetails(updatedStudents);
    }
    };
    
    console.log(studentsDetails)
    return (
        <>
            <div className="m-2 bg-white rounded p-2 mb-6">
                <p className="font-semibold text-lg">
                    Transfer Student in next section
                </p>
                <div className="lg:w-[70%] sm:w-full flex lg:flex-row xs:flex-col justify-between">
                    <div
                        className="flex flex-col bg-white my-2 
                    lg:w-1/3 sm:w-full"
                    >
                        <label>Current class section*</label>
                        <Dropdown
                            style={{
                                color: 'black',
                                fontSize: 'smaller',
                                borderWidth: 1,
                                border: 'solid',
                                borderRadius: 5,
                                borderColor: 'gray',
                            }}
                            title={filterClass != '' ? filterClass : 'All'}
                        >
                            {classes
                                .filter(
                                    (classItem) =>
                                        classItem != filterUpdateClass
                                )
                                .map((classItem) => (
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
                    <div className="flex flex-col bg-white my-2  lg:w-1/3 sm:w-full">
                        <label>Transfer Class section*</label>
                        <Dropdown
                            style={{
                                color: 'black',
                                fontSize: 'smaller',
                                borderWidth: 0.5,
                                border: 'solid',
                                borderRadius: 5,
                                borderColor: 'gray',
                            }}
                            title={
                                filterUpdateClass != ''
                                    ? filterUpdateClass
                                    : 'All'
                            }
                        >
                            {classes
                                .filter((classItem) => classItem != filterClass)
                                .map((classItem) => (
                                    <DropdownItem
                                        key={classItem}
                                        onClick={() =>
                                            setFilterUpdateClass(classItem)
                                        }
                                    >
                                        {classItem}
                                    </DropdownItem>
                                ))}
                        </Dropdown>
                    </div>
                </div>
                <div>
                    <table className="w-full text-left my-2 lg:table-fixed">
                        <thead className="bg-gray-100">
                            <tr className="border-b">
                                <th>
                                    <input type="checkbox" />
                                </th>
                                <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                    No
                                </th>
                                <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                    Name
                                </th>
                            </tr>
                        </thead>

                        <tbody className="w-full text-left my-2 lg:table-fixed bg-gray-50">
                            {studentsDetails
                                ?.filter(
                                    (student) => student.class === filterClass
                                )
                                .map((student) => (
                                    <tr key={student.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                onChange={() =>
                                                    setUpdateStudentDetails({
                                                        id: student.id,
                                                        name: student.name,
                                                        class: filterUpdateClass,
                                                    })
                                                }
                                            />
                                        </td>
                                        <td className=" px-6 py-1 text-xs">
                                            {student.id}
                                        </td>
                                        <td className=" px-6 py-1 text-xs">
                                            {student.name}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <Button
                    className="mt-12  text-xs xs:w-full lg:w-auto"
                    variant="solid"
                    onClick={handleAddItems}
                >
                    Submit
                </Button>
            </div>
            <div className="m-2 bg-white rounded p-2 mt-16">
                <p className="font-semibold text-lg">
                    Promote Student in next class
                </p>
                <div className="w-full flex lg:flex-row xs:flex-col justify-between">
                    <div
                        className="flex flex-col bg-white my-2 
                    lg:w-1/4 sm:w-full"
                    >
                        <label>Class section*</label>
                        <Dropdown
                            style={{
                                color: 'black',
                                fontSize: 'smaller',
                                borderWidth: 1,
                                border: 'solid',
                                borderRadius: 5,
                                borderColor: 'gray',
                            }}
                            title={
                                filterCurrentClass != ''
                                    ? filterCurrentClass
                                    : 'All'
                            }
                        >
                            {classes
                                .filter(
                                    (classItem) =>
                                        classItem != filterPromoteClass
                                )
                                .map((classItem) => (
                                    <DropdownItem
                                        key={classItem}
                                        onClick={() =>
                                            setFilterCurrentClass(classItem)
                                        }
                                    >
                                        {classItem}
                                    </DropdownItem>
                                ))}
                        </Dropdown>
                    </div>
                    <div className="flex flex-col bg-white my-2  lg:w-1/4 sm:w-full">
                        <label>Promote In*</label>
                        <Dropdown
                            style={{
                                color: 'black',
                                fontSize: 'smaller',
                                borderWidth: 0.5,
                                border: 'solid',
                                borderRadius: 5,
                                borderColor: 'gray',
                            }}
                            title={filterYear != '' ? filterYear : 'All'}
                        >
                            {years.map((year) => (
                                <DropdownItem
                                    key={year}
                                    onClick={() => setFilterYear(year)}
                                >
                                    {year}
                                </DropdownItem>
                            ))}
                        </Dropdown>
                    </div>
                    <div className="flex flex-col bg-white my-2  lg:w-1/4 sm:w-full">
                        <label>Promote Class*</label>
                        <Dropdown
                            style={{
                                color: 'black',
                                fontSize: 'smaller',
                                borderWidth: 0.5,
                                border: 'solid',
                                borderRadius: 5,
                                borderColor: 'gray',
                            }}
                            title={
                                filterPromoteClass != ''
                                    ? filterPromoteClass
                                    : 'All'
                            }
                        >
                            {classes
                                .filter(
                                    (classItem) =>
                                        classItem != filterCurrentClass
                                )
                                .map((classItem) => (
                                    <DropdownItem
                                        key={classItem}
                                        onClick={() =>
                                            setFilterPromoteClass(classItem)
                                        }
                                    >
                                        {classItem}
                                    </DropdownItem>
                                ))}
                        </Dropdown>
                    </div>
                </div>
                <div className="w-full xs:overflow-x-scroll lg:overflow-visible xs:my-2 lg:my-0">

                    <table className="w-full text-left my-2 lg:table-fixed  overflow-scroll">
                        <thead className="bg-gray-100">
                            <tr className="border-b">
                                <th>
                                    <input type="checkbox" />
                                </th>
                                <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                    No
                                </th>
                                <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                    Name
                                </th>
                                <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                    Result
                                </th>
                                <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody className="w-full text-left my-2 lg:table-fixed bg-gray-50">
                            {studentsDetails
                                ?.filter(
                                    (student) =>
                                        student.class === filterCurrentClass
                                )
                                .map((student) => (
                                    <tr key={student.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                onChange={() =>
                                                    setUpdateStudentDetails({
                                                        id: student.id,
                                                        name: student.name,
                                                        class: filterUpdateClass,
                                                    })
                                                }
                                            />
                                        </td>
                                        <td className=" px-6 py-1 text-xs">
                                            {student.id}
                                        </td>
                                        <td className=" px-6 py-1 text-xs">
                                            {student.name}
                                        </td>
                                        <td className=" px-6 py-1 text-xs">
                                            <div className='flex'>
                                                <div className='w-1/4  justify-between mr-4 flex flex-row '>
                                                <input type="radio" checked={resultType.some(result=>result.id===student.id&&result.type==='pass')} onChange={e=>setResultType(resultType=>[...resultType.filter(result=>result.id!==student.id),{id:student.id,type:'pass'}])}/>
                                                <label>Pass</label>
                                                </div>
                                                <div className='w-1/4  justify-between  flex flex-row '>
                                                <input type="radio" checked={resultType.some(result=>result.id===student.id&&result.type==='fail')} onChange={e=>setResultType(resultType=>[...resultType.filter(result=>result.id!==student.id),{id:student.id,type:'fail'}])}/>
                                                <label>Fail</label>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=" px-6 py-1 text-xs">
                                            <div className='flex'>
                                            <div className='w-1/3  justify-between mr-6 flex flex-row '>

                                                <input type="radio" checked={statusType.some(statusItem=>statusItem.id===student.id&&statusItem.status==='continue')} onChange={e=>setStatusType(statusType=>[...statusType.filter(result=>result.id!==student.id),{id:student.id,status:'continue'}])}/>
                                                <label>Continue</label>
                                                </div>
                                                <div className='w-1/4  justify-between  flex flex-row '>

                                                <input type="radio" checked={statusType.some(statusItem=>statusItem.id===student.id&&statusItem.status==='leave')} onChange={e=>setStatusType(statusType=>[...statusType.filter(result=>result.id!==student.id),{id:student.id,status:'leave'}])}/>
                                                <label>Leave</label>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <Button
                    className="mt-12  text-xs xs:w-full lg:w-auto"
                    variant="solid"
                    onClick={handlePromoteSubmit}
                >
                    Submit
                </Button>
            </div>
        </>
    )
}
export default TransferAndPromoteStudent
