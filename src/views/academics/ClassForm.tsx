import { Button, Dropdown, Input } from '@/components/ui'
import { useState, ChangeEvent } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DropdownMenu from '@/components/ui/Dropdown/DropdownMenu'
import DropdownItem from '@/components/ui/Dropdown/DropdownItem'

interface Class {
    id: number
    medium: string
    name: string
    shift: string
    stream: string
    section: string
    semester: boolean | string
}
const ClassForm = () => {
    const [editId, setEditId] = useState<number>()
    const [createClass, setCreateClass] = useState<boolean>(false)
    const [classDetails, setClassDetails] = useState<Class>({
        id: 0,
        medium: '',
        name: '',
        shift: '',
        stream: '',
        section: '',
        semester: '',
    })
    const [items, setItems] = useState<Array<Class>>([])
    const handleEditSubmit = () => {
        setItems((items) =>
            items.map((i) => (i.id === classDetails.id ? classDetails : i))
        )
        setEditId(0)
        setClassDetails({
            id: 0,
            medium: '',
            name: '',
            shift: '',
            stream: '',
            section: '',
            semester: '',
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
    const handleDetailsChange = (
        event: ChangeEvent<HTMLInputElement>,
        detail: string
    ) => {
        setClassDetails({
            ...classDetails,
            [detail]: event.target.value,
        })
    }
    const handleAddItems = () => {
        if (
            classDetails.name == '' ||
            classDetails.medium == '' ||
            classDetails.section == ''
        ) {
            alert('please fill all the required fields')
        } else {
            setItems((items) => [
                ...items,
                {
                    id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
                    name: classDetails.name,
                    medium: classDetails.medium,
                    shift: classDetails.shift,
                    stream: classDetails.stream,
                    section: classDetails.section,
                    semester:
                        classDetails.semester == 'Include semesters'
                            ? true
                            : false,
                },
            ])
            console.log(classDetails)
            setClassDetails({
                id: 0,
                name: '',
                medium: '',
                shift: '',
                stream: '',
                section: '',
                semester: '',
            })
        }
    }
    // console.log(createClass)
    return (
        <div className="flex flex-col text-gray-900 bg-white lg:w-full rounded px-4 py-4 xs:w-full xs:my-4 lg:my-0 ">
            {!createClass ? (
                <>
                    <div className="flex w-full  justify-between items-center">
                        <p>List Class</p>
                        <Button
                            className="items-center justify-center flex"
                            size="xs"
                            variant="solid"
                            icon={<AddIcon fontSize="small" className="" />}
                            onClick={() => setCreateClass(true)}
                        >
                            Add Class
                        </Button>
                    </div>

                    <div className="w-full xs:overflow-x-scroll lg:overflow-visible xs:my-2 lg:my-0">
                        <table className="w-full text-left my-2 lg:table-fixed">
                            <thead className="bg-gray-50">
                                <tr className="border-b">
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        No
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        Name
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        Shift
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        Section
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        Semester
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        Stream
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="w-full">
                                {items?.map((item) => (
                                    <tr key={item?.id} className="border-b">
                                        <td className=" px-6 py-3 text-xs text-gray-700">
                                            {item?.id}
                                        </td>
                                        <td className="px-6 py-3 text-xs text-gray-700 ">
                                            {editId != item.id ? (
                                                item?.name
                                            ) : (
                                                <Input
                                                    value={classDetails.name}
                                                    onChange={(e) =>
                                                        items?.map((i) =>
                                                            i?.id === item?.id
                                                                ? setClassDetails(
                                                                      (
                                                                          classDetails
                                                                      ) => ({
                                                                          ...classDetails,
                                                                          name: e
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
                                                item?.shift
                                            ) : (
                                                <Dropdown
                                                    title={
                                                        classDetails.shift != ''
                                                            ? classDetails.shift
                                                            : '--Select--'
                                                    }
                                                    className="w-full bg-red-500 border-red-500 rounded border-3"
                                                >
                                                    <DropdownItem
                                                        onClick={() =>
                                                            setClassDetails({
                                                                ...classDetails,
                                                                shift: 'Morning',
                                                            })
                                                        }
                                                    >
                                                        Morning
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        onClick={() =>
                                                            setClassDetails({
                                                                ...classDetails,
                                                                shift: 'Evening',
                                                            })
                                                        }
                                                    >
                                                        Evening
                                                    </DropdownItem>
                                                </Dropdown>
                                            )}
                                        </td>
                                        <td className="px-6 py-3 text-xs text-gray-700 ">
                                            {editId != item.id ? (
                                                item?.section
                                            ) : (
                                                <Dropdown
                                                    title={
                                                        classDetails.section !=
                                                        ''
                                                            ? classDetails.section
                                                            : '--Select--'
                                                    }
                                                    className="w-full bg-red-500 border-red-500 rounded border-3"
                                                >
                                                    <DropdownItem
                                                        onClick={() =>
                                                            setClassDetails({
                                                                ...classDetails,
                                                                section: 'A',
                                                            })
                                                        }
                                                    >
                                                        A
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        onClick={() =>
                                                            setClassDetails({
                                                                ...classDetails,
                                                                section: 'B',
                                                            })
                                                        }
                                                    >
                                                        B
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        onClick={() =>
                                                            setClassDetails({
                                                                ...classDetails,
                                                                section: 'C',
                                                            })
                                                        }
                                                    >
                                                        C
                                                    </DropdownItem>
                                                </Dropdown>
                                            )}
                                        </td>
                                        <td className="px-6 py-3 text-xs  text-gray-700 ">
                                            {editId != item.id ? (
                                                <div
                                                    className={`bg-${
                                                        item?.semester
                                                            ? 'green'
                                                            : 'red'
                                                    }-600 rounded p-2 text-center lg:w-1/2 xs:w-full text-white`}
                                                >
                                                    <span className="text-center">
                                                        {item?.semester
                                                            ? 'Yes'
                                                            : 'No'}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="ml-1">
                                                    <input
                                                        className="mr-2"
                                                        type="checkbox"
                                                        value="Include semesters"
                                                        checked={
                                                            classDetails.semester ==
                                                            'Include semesters'
                                                                ? true
                                                                : false
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
                                                                              semester:
                                                                                  e
                                                                                      .target
                                                                                      .value,
                                                                          })
                                                                      )
                                                                    : null
                                                            )
                                                        }
                                                    />
                                                    <label>
                                                        Include semesters
                                                    </label>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-3 text-xs text-gray-700 ">
                                            {editId != item.id ? (
                                                item?.stream
                                            ) : (
                                                <Dropdown
                                                    title={
                                                        classDetails.stream !=
                                                        ''
                                                            ? classDetails.stream
                                                            : '--Select--'
                                                    }
                                                    className="w-full bg-red-500 border-red-500 rounded border-3"
                                                >
                                                    <DropdownItem
                                                        onClick={() =>
                                                            setClassDetails({
                                                                ...classDetails,
                                                                stream: 'Arts',
                                                            })
                                                        }
                                                    >
                                                        Arts
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        onClick={() =>
                                                            setClassDetails({
                                                                ...classDetails,
                                                                stream: 'Science',
                                                            })
                                                        }
                                                    >
                                                        Science
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        onClick={() =>
                                                            setClassDetails({
                                                                ...classDetails,
                                                                stream: 'Commerce',
                                                            })
                                                        }
                                                    >
                                                        Commerce
                                                    </DropdownItem>
                                                </Dropdown>
                                            )}
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
                                                        handleEditClick(item)
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
                                                    handleDeleteItem(item.id)
                                                }
                                            ></Button>
                                        </td>
                                    </tr>
                                ))}
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
                    {/* <p className="text-red-500 text-xs lg:my-1 xs:my-6">
                        Note: Class name, code, type should be unique for
                        Medium
                    </p> */}
                    <div className="my-8">
                        <label className="text-sm">Medium*</label>
                        <div className="text-xs flex my-2 mr-2">
                            <input
                                type="radio"
                                className=""
                                id="hindi"
                                value="hindi"
                                checked={classDetails.medium === 'hindi'}
                                onChange={(e) =>
                                    handleDetailsChange(e, 'medium')
                                }
                            />
                            <label
                                className="ml-2 mr-4 text-xs"
                                htmlFor="hindi"
                            >
                                Hindi
                            </label>

                            <input
                                type="radio"
                                className=""
                                id="english"
                                value="english"
                                checked={classDetails.medium === 'english'}
                                onChange={(e) =>
                                    handleDetailsChange(e, 'medium')
                                }
                            />
                            <label
                                className="ml-2 mr-4 text-xs"
                                htmlFor="english"
                            >
                                English
                            </label>

                            <input
                                type="radio"
                                className=""
                                id="gujrati"
                                value="gujrati"
                                checked={classDetails.medium === 'gujrati'}
                                onChange={(e) =>
                                    handleDetailsChange(e, 'medium')
                                }
                            />
                            <label
                                className="ml-2 mr-4 text-xs"
                                htmlFor="gujrati"
                            >
                                Gujrati
                            </label>
                        </div>
                    </div>
                    <div className="my-8">
                        <label className="text-sm">Name*</label>
                        <Input
                            required
                            className="text-xs"
                            size="sm"
                            value={classDetails.name}
                            onChange={(e) => handleDetailsChange(e, 'name')}
                        />
                    </div>
                    <div className="my-8">
                        <label className="text-sm">
                            Shift
                            <span className="text-blue-500"> (Optional)</span>
                        </label>
                        <div className="border-2 p-1 rounded-lg border-gray-200 mt-2">
                            <Dropdown
                                title={
                                    classDetails.shift != ''
                                        ? classDetails.shift
                                        : '--Select--'
                                }
                                className="w-full bg-red-500 border-red-500 rounded border-3"
                            >
                                <DropdownItem
                                    onClick={() =>
                                        setClassDetails({
                                            ...classDetails,
                                            shift: 'Morning',
                                        })
                                    }
                                >
                                    Morning
                                </DropdownItem>
                                <DropdownItem
                                    onClick={() =>
                                        setClassDetails({
                                            ...classDetails,
                                            shift: 'Evening',
                                        })
                                    }
                                >
                                    Evening
                                </DropdownItem>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="my-8  w-full flex flex-col">
                        <label className="text-sm">
                            Stream
                            <span className="text-blue-500"> (Optional)</span>
                        </label>
                        <div className="border-2 p-1 rounded-lg border-gray-200 mt-2">
                            <Dropdown
                                title={
                                    classDetails.stream != ''
                                        ? classDetails.stream
                                        : '--Select--'
                                }
                                className="w-full bg-red-500 border-red-500 rounded border-3"
                            >
                                <DropdownItem
                                    onClick={() =>
                                        setClassDetails({
                                            ...classDetails,
                                            stream: 'Arts',
                                        })
                                    }
                                >
                                    Arts
                                </DropdownItem>
                                <DropdownItem
                                    onClick={() =>
                                        setClassDetails({
                                            ...classDetails,
                                            stream: 'Science',
                                        })
                                    }
                                >
                                    Science
                                </DropdownItem>
                                <DropdownItem
                                    onClick={() =>
                                        setClassDetails({
                                            ...classDetails,
                                            stream: 'Commerce',
                                        })
                                    }
                                >
                                    Commerce
                                </DropdownItem>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="my-8">
                        <label className="text-sm">Section*</label>
                        <div className=" lg:w-1/3 xs:w-full  flex justify-between p-1  mt-2">
                            <div>
                                <input
                                    className="mr-2"
                                    type="checkbox"
                                    checked={
                                        classDetails.section === 'A'
                                            ? true
                                            : false
                                    }
                                    value="A"
                                    onChange={(e) =>
                                        handleDetailsChange(e, 'section')
                                    }
                                />
                                <label>A</label>
                            </div>
                            <div>
                                <input
                                    className="mr-2"
                                    type="checkbox"
                                    checked={
                                        classDetails.section === 'B'
                                            ? true
                                            : false
                                    }
                                    value="B"
                                    onChange={(e) =>
                                        handleDetailsChange(e, 'section')
                                    }
                                />
                                <label>B</label>
                            </div>
                            <div>
                                <input
                                    className="mr-2"
                                    type="checkbox"
                                    checked={
                                        classDetails.section === 'C'
                                            ? true
                                            : false
                                    }
                                    value="C"
                                    onChange={(e) =>
                                        handleDetailsChange(e, 'section')
                                    }
                                />
                                <label>C</label>
                            </div>
                        </div>
                    </div>
                    <div className="ml-1">
                        <input
                            className="mr-2"
                            type="checkbox"
                            value="Include semesters"
                            onChange={(e) => handleDetailsChange(e, 'semester')}
                        />
                        <label>Include semesters</label>
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
        </div>
    )
}
export default ClassForm
