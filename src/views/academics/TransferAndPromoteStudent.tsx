import { Dropdown,Button } from '@/components/ui'
import { useState } from 'react'
import DropdownItem from '@/components/ui/Dropdown/DropdownItem'

const classes = ['7th A', '8th A', '7th B', '8th B']
interface Student{
    id:number
    name:string
    class:string
}
const TransferAndPromoteStudent = () => {
    const [filterClass, setFilterClass] = useState<string>('--Select--');
    const [filterUpdateClass, setFilterUpdateClass] = useState<string>('--Select--');
    const [updateStudentDetails, setUpdateStudentDetails] = useState<Student>({
        id:0,
        name:"",
        class:""
    });
    const [studentsDetails, setStudentsDetails] = useState<Array<Student>>([
        {
            id:1,
            name:"Quinton De Cock",
            class:"7th A"
        },
        {    id:2,
            name:"Quinton De Cock",
            class:"7th B"
        },
        {    id:3,
            name:"Quinton De Cock",
            class:"8th A"
        },
        {    id:4,
            name:"Prathiv Patel",
            class:"7th A"
        },
    ]);
    const handleAddItems=()=>{
        setStudentsDetails(studentsDetails.map(studentDetails=>studentDetails.id===updateStudentDetails.id?updateStudentDetails:studentDetails));
        setFilterClass('')
        setFilterUpdateClass('')
    }
    return (
        <>
            <div className="m-2 bg-white rounded p-2">
                <p className="font-semibold">
                    Transfer Student in next section
                </p>
                <div className="w-[70%] flex flex-row justify-between">
                    <div className="flex flex-col bg-white my-2 
                    lg:w-1/3 sm:w-full">
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
                            {classes.filter(classItem=>classItem!=filterUpdateClass).map(
                            (classItem) => (
                                <DropdownItem
                                    key={classItem}
                                    onClick={() => setFilterClass(classItem)}
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
                            title={filterUpdateClass != '' ? filterUpdateClass : 'All'}
                        >
                            {classes.filter(classItem=>classItem!=filterClass).map(
                            (classItem) => (
                                <DropdownItem
                                    key={classItem}
                                    onClick={() => setFilterUpdateClass(classItem)}
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
                                        <input type='checkbox'/>
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        No
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        Name
                                    </th>
                                    
                                </tr>
                            </thead>

                            <tbody className='w-full text-left my-2 lg:table-fixed bg-gray-50'>
                                {studentsDetails?.filter(student=>student.class===filterClass).map(student=>
                                    <tr key={student.id} >
                                        <td>
                                            <input type='checkbox' onChange={()=>setUpdateStudentDetails({id:student.id,name:student.name,class:filterUpdateClass})}/>
                                        </td>
                                        <td className=' px-6 py-1 text-xs'>
                                            {student.id}
                                        </td>
                                        <td className=' px-6 py-1 text-xs'>
                                            {student.name}
                                        </td>
                                    </tr>
                                )}
                            
                            </tbody>
                        </table>
                </div><Button
                        className="mt-12  text-xs xs:w-full lg:w-auto"
                        variant="solid"
                          onClick={handleAddItems}
                    >
                        Submit
                    </Button>

            </div>
            <div className="m-2 bg-white rounded p-2">
                <p>Promote Student in next class</p>
            </div>
        </>
    )
}
export default TransferAndPromoteStudent
