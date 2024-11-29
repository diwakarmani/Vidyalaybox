import { Button, Dropdown, Input } from '@/components/ui'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import AddIcon from '@mui/icons-material/Add'
import DropdownItem from '@/components/ui/Dropdown/DropdownItem'
import { useState, ChangeEvent,useEffect } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface SubjectTeacher {
    id: number
    subject: string
    teacher: string
}

interface Class {
    id: number
    class: string
    classTeacher: string
    subjectTeacher: Array<SubjectTeacher>
}
const ClassSectionAndTeacher = () => {
    const [editId, setEditId] = useState<number>()
    const [createClass, setCreateClass] = useState<boolean>(false)
    const [editSubjectTeacher, setEditSubjectTeacher] = useState<number>()
    const [newSubjectTeacher, setSubjectTeacher] = useState<SubjectTeacher>({
        id: 0,
        subject: '',
        teacher: '',
    })
    const [classDetails, setClassDetails] = useState<Class>({
        id: 0,
        class: '',
        classTeacher: '',
        subjectTeacher: [],
    })
    const [filterClass, setFilterClass] = useState<string>('All')
    const [classes, setClasses] = useState<Array<string>>([]);
    const [items, setItems] = useState<Array<Class>>([
        
    ])

    const handleEditSubmit = () => {
        setItems((items) =>
            items.map((i) => (i.id === classDetails.id ? classDetails : i))
        )
        setEditId(0)
        setClassDetails({
            id: 0,
            class: '',
            classTeacher: '',
            subjectTeacher: [],
        })
    }
    const handleDeleteItem = (id: number) => {
        setItems((items) => {
            const filteredItems = items.filter((item) => item.id != id)
            return filteredItems.map((item) =>
                item.id > id ? { ...item, id: item.id - 1 } : item
            )
        })
    }
    const handleEditClick = (item: Class) => {
        setEditId(item?.id), setClassDetails(item)
    }
    const handleSubjectTeacherEditClick = (item: SubjectTeacher) => {
        setEditSubjectTeacher(item.id), setSubjectTeacher(item)
    }
    const updateSubjectTeacher = (
        itemId: number,
        teacherId: number,
        key: string,
        value: string
    ) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId
                    ? {
                          ...item,
                          subjectTeacher: item.subjectTeacher.map((teacher) =>
                              teacher.id === teacherId
                                  ? { ...teacher, [key]: value }
                                  : teacher
                          ),
                      }
                    : item
            )
        )
    }
    const handleClassDetailsChange = (
        event: ChangeEvent<HTMLInputElement>,
        detail: string
    ) => {
        setClassDetails({
            ...classDetails,
            [detail]: event.target.value,
        })
    }
    const handleSubjectDetailsChange = (
        event: ChangeEvent<HTMLInputElement>,
        detail: string
    ) => {
        
    
        setSubjectTeacher({
            ...newSubjectTeacher,
            id: classDetails.subjectTeacher.length > 0 ? classDetails.subjectTeacher[classDetails.subjectTeacher.length - 1].id + 1 : 1,
            [detail]: event.target.value,
        })
    }
    const handleAddSubject=()=>{
        if(newSubjectTeacher.subject===""||newSubjectTeacher.teacher===""){
            alert("Fill the subject and teacher");
            
        }
        else{
            const exists = classDetails.subjectTeacher.some(
                (teacher) =>
                    teacher.subject === newSubjectTeacher.subject &&
                    teacher.teacher === newSubjectTeacher.teacher
            );
        
            if (exists) {
                alert("This subject and teacher combination already exists!");
                setSubjectTeacher({id:0,subject:'',teacher:''})
                return; // Stop further execution
            }
            setClassDetails({
            ...classDetails,
            subjectTeacher: [
                ...classDetails.subjectTeacher,
                
                newSubjectTeacher,
            ],
        }),
            setSubjectTeacher({id:0,subject:'',teacher:''})
        }
    }
    const handleAddItems = () => {
        if (
            classDetails.class == '' ||
            classDetails.classTeacher == '' ||
            classDetails.subjectTeacher.length ==0
        ) {
            alert('Please fill all the required fields')
        } else {
            setItems((items) => [
                ...items,
                {
                    id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
                    class: classDetails.class,
                    classTeacher: classDetails.classTeacher,
                    subjectTeacher: classDetails.subjectTeacher,
                   
                },
            ])
            setClassDetails({
                id: 0,
                class: '',
                classTeacher: '',
                subjectTeacher: []
                
            })
            setCreateClass(false)
        }
    }
    
    useEffect(() => {
        const uniqueClasses = [...new Set(items.map((item) => item.class))];
        setClasses(uniqueClasses);
    
    }, [items])
    
    return (
        <>
            {!createClass ? (
                <>
                    <div className="flex w-full  justify-between items-center">
                        <p>List Teacher and Section</p>

                        <Button
                            className="items-center justify-center flex"
                            size="xs"
                            variant="solid"
                            icon={<AddIcon fontSize="small" className="" />}
                            onClick={() => setCreateClass(true)}
                        >
                            Add Teacher and Section
                        </Button>
                    </div>

                    <div className="flex items-center bg-white my-2 px-1 lg:w-1/2 sm:w-full">
                        <label>Class: </label>
                        <Dropdown
                            style={{ color: 'black', fontSize: 'smaller' }}
                            title={filterClass != '' ? filterClass : 'All'}
                        >
                            {classes.map((classItem) => (
                                <DropdownItem
                                    key={classItem}
                                    onClick={() => setFilterClass(classItem)}
                                >
                                    {classItem}
                                </DropdownItem>
                            ))}
                        </Dropdown>
                    </div>
                    <div className="w-full xs:overflow-x-scroll lg:overflow-visible xs:my-2 lg:my-0">
                        <table className="w-full text-left my-2 lg:table-fixed">
                            <thead className="bg-gray-50">
                                <tr className="border-b">
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        No
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        Class
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        Class Teacher
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        Subject Teacher
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="w-full">
                                {items?.map((item) =>
                                    item.class === filterClass ||
                                    filterClass === 'All' ? (
                                        <tr key={item?.id} className="border-b">
                                            <td className=" px-6 py-3 text-xs text-gray-700">
                                                {item?.id}
                                            </td>
                                            <td className="px-6 py-3 text-xs text-gray-700 ">
                                                {editId != item.id ? (
                                                    item?.class
                                                ) : (
                                                    <Input
                                                        value={
                                                            classDetails.class
                                                        }
                                                        onChange={(e) =>
                                                            items?.map((i) =>
                                                                i?.id ===
                                                                item?.id
                                                                    ? setClassDetails(
                                                                          (
                                                                              classDetails
                                                                          ) => ({
                                                                              ...classDetails,
                                                                              class: e
                                                                                  .target
                                                                                  .value,
                                                                          })
                                                                      )
                                                                    : null
                                                            )
                                                        }
                                                    />
                                                )}
                                            </td>
                                            <td className="px-6 py-3 text-xs text-gray-700 ">
                                                {editId != item.id ? (
                                                    item?.classTeacher
                                                ) : (
                                                    <Input
                                                        value={
                                                            classDetails.classTeacher
                                                        }
                                                        onChange={(e) =>
                                                            items?.map((i) =>
                                                                i?.id ===
                                                                item?.id
                                                                    ? setClassDetails(
                                                                          (
                                                                              classDetails
                                                                          ) => ({
                                                                              ...classDetails,
                                                                              classTeacher:
                                                                                  e
                                                                                      .target
                                                                                      .value,
                                                                          })
                                                                      )
                                                                    : null
                                                            )
                                                        }
                                                    />
                                                )}
                                            </td>
                                            <td className="px-6 py-3 text-xs text-gray-700 flex">
                                                <div className="flex flex-col w-4/5">
                                                    {item.subjectTeacher.map(
                                                        (teacher) =>
                                                            editSubjectTeacher !=
                                                            teacher.id ? (
                                                                <div
                                                                    key={
                                                                        teacher.id
                                                                    }
                                                                >
                                                                    <div className="flex justify-between">
                                                                        <p className="my-2">
                                                                            {`${teacher.id}. ${teacher.subject} : ${teacher.teacher}`}
                                                                        </p>
                                                                    </div>
                                                                    <div className="bg-gray-200 h-[2px] my-2"></div>
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    key={
                                                                        teacher.id
                                                                    }
                                                                >
                                                                    <Input
                                                                        value={
                                                                            teacher.subject
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            updateSubjectTeacher(
                                                                                item.id,
                                                                                teacher.id,
                                                                                'subject',
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                    <Input
                                                                        value={
                                                                            teacher.teacher
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            updateSubjectTeacher(
                                                                                item.id,
                                                                                teacher.id,
                                                                                'teacher',
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            )
                                                    )}
                                                </div>
                                                <div className="w-1/5 max-h-full flex flex-col justify-around">
                                                    {item.subjectTeacher.map(
                                                        (teacher) =>
                                                            editSubjectTeacher !=
                                                            teacher.id ? (
                                                                <Button
                                                                    key={
                                                                        teacher.id
                                                                    }
                                                                    style={{
                                                                        width: '70%',
                                                                        padding:
                                                                            '1%',
                                                                    }}
                                                                    shape="circle"
                                                                    size="xs"
                                                                    variant="solid"
                                                                    icon={
                                                                        <EditIcon fontSize="small" />
                                                                    }
                                                                    className="mx-2 xs:mx-1"
                                                                    onClick={() =>
                                                                        handleSubjectTeacherEditClick(
                                                                            teacher
                                                                        )
                                                                    }
                                                                />
                                                            ) : (
                                                                <Button
                                                                    key={
                                                                        teacher.id
                                                                    }
                                                                    shape="circle"
                                                                    size="xs"
                                                                    variant="solid"
                                                                    color="green"
                                                                    icon={
                                                                        <CheckIcon fontSize="small" />
                                                                    }
                                                                    className="mx-2 xs:mx-1"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        setEditSubjectTeacher(
                                                                            0
                                                                        )
                                                                    }
                                                                ></Button>
                                                            )
                                                    )}
                                                </div>
                                            </td>

                                            <td className=" lg:px-6 py-3 text-xs text-gray-700  xs:px-2">
                                                {editId != item.id ? (
                                                    <Button
                                                        shape="circle"
                                                        size="xs"
                                                        variant="solid"
                                                        icon={
                                                            <EditIcon fontSize="small" />
                                                        }
                                                        className="mx-2 xs:mx-1"
                                                        onClick={(e) =>
                                                            handleEditClick(
                                                                item
                                                            )
                                                        }
                                                    ></Button>
                                                ) : (
                                                    <Button
                                                        shape="circle"
                                                        size="xs"
                                                        variant="solid"
                                                        color="green"
                                                        icon={
                                                            <CheckIcon fontSize="small" />
                                                        }
                                                        className="mx-2 xs:mx-1"
                                                        onClick={(e) =>
                                                            handleEditSubmit()
                                                        }
                                                    ></Button>
                                                )}
                                                <Button
                                                    shape="circle"
                                                    size="xs"
                                                    variant="solid"
                                                    color="gray"
                                                    icon={
                                                        <DeleteIcon fontSize="small" />
                                                    }
                                                    className="mx-2 xs:mx-0"
                                                    onClick={(e) =>
                                                        handleDeleteItem(
                                                            item.id
                                                        )
                                                    }
                                                ></Button>
                                            </td>
                                        </tr>
                                    ) : null
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div className="bg-white  mr-2 rounded px-6 py-4 w-full xs:my-2 lg:my-0">
                    <div className="flex w-full font-semibold text-gray-900 justify-between items-center">
                        <p>Create Subject</p>
                        <Button
                            className="items-center justify-center flex"
                            size="xs"
                            variant="solid"
                            icon={<ArrowBackIcon fontSize="smaller" />}
                            onClick={() => setCreateClass(false)}
                        >
                            Back to List
                        </Button>
                    </div>

                    <div className="my-8">
                        <label className="text-sm">Class*</label>
                        <Input
                            required
                            className="text-xs"
                            size="sm"
                            value={classDetails.class}
                            onChange={(e) =>
                                handleClassDetailsChange(e, 'class')
                            }
                        />
                    </div>

                    <div className="my-8">
                        <label className="text-sm">Class Teacher*</label>
                        <Input
                            required
                            className="text-xs"
                            size="sm"
                            value={classDetails.classTeacher}
                            onChange={(e) =>
                                handleClassDetailsChange(e, 'classTeacher')
                            }
                        />
                    </div>
                    <div className="my-8">
                        <label className="text-sm">Subject Teacher*</label>
                        <div>
                            
                            {classDetails.subjectTeacher.length!=0?
                            <>
                            <div className="flex flex-row justify-between items-center">
                            <div className="w-1/3 my-4">
                            <label className="text-sm">Subject*</label>
                            {classDetails.subjectTeacher.map(subjectTeacher=><div key={subjectTeacher.id} className='border-2 rounded-lg my-2 p-2'><p>{subjectTeacher.subject}</p></div>)}
                        </div>
                        <div className="w-1/3 my-4">
                        <label className="text-sm">Teacher*</label>
                        {classDetails.subjectTeacher.map(subjectTeacher=><div key={subjectTeacher.id} className='border-2 rounded-lg my-2 p-2'><p>{subjectTeacher.teacher}</p></div>)}
                    </div>
                    </div>
                    </>:null}
                    <div className="flex flex-row justify-between items-center">
                            <div className="w-1/3 my-4">
                                <label className="text-sm">Subject*</label>
                                <Input
                                    required
                                    className="text-xs"
                                    size="sm"
                                    value={newSubjectTeacher.subject}
                                    onChange={(e) =>
                                        handleSubjectDetailsChange(e, 'subject')
                                    }
                                />
                            </div>
                            <div className="w-1/3 my-4">
                                <label className="text-sm">Teacher*</label>
                                <Input
                                    required
                                    className="text-xs"
                                    size="sm"
                                    value={newSubjectTeacher.teacher}
                                    onChange={(e) =>
                                        handleSubjectDetailsChange(e, 'teacher')
                                    }
                                />
                            </div>
                            <div className="my-4">
                                <Button
                                    className="items-center justify-center flex"
                                    size="xs"
                                    variant="solid"
                                    icon={<AddIcon fontSize="smaller" />}
                                    onClick={() => handleAddSubject()
                                    
                                    }
                                ></Button>
                            </div>
                            </div>

                        </div>
                    </div>

                    <Button
                        className="my-4 text-xs xs:w-full lg:w-auto"
                        variant="solid"
                          onClick={handleAddItems}
                    >
                        Submit
                    </Button>
                </div>
            )}
        </>
    )
}
export default ClassSectionAndTeacher
