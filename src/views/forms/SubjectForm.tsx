import { Button, Input } from '@/components/ui'
import {
    ChangeEvent,
    useState,
} from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface SubjectClass {
    id: number
    name: string
    subjectCode: string
    bgColor: string
    medium: string
    img: File | null
    type: string
}

const SubjectForm = () => {
    const [items, setItems] = useState<Array<SubjectClass>>([
        
    ])
    const [editId, setEditId] = useState<number>()
    const [createSubject, setCreateSubject] = useState<boolean>(false)
    const [subjectDetails, setSubjectDetails] = useState<SubjectClass>({
        id: 1,
        name: '',
        subjectCode: '',
        bgColor: '',
        medium: '',
        img: null,
        type: '',
    })
    const handleEditSubmit = () => {
        setItems((items) =>
            items.map((i) => (i.id === subjectDetails.id ? subjectDetails : i))
        )
        setEditId(0)
        setSubjectDetails({
            id: 0,
            name: '',
            subjectCode: '',
            bgColor: '',
            medium: '',
            img: null,
            type: '',
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
    const handleAddItems = () => {
        if (
            subjectDetails.name == '' ||
            subjectDetails.subjectCode == '' ||
            subjectDetails.bgColor == '' ||
            subjectDetails.medium == '' ||
            subjectDetails.type == '' ||
            subjectDetails.img == null
        ) {
            alert('please fill all the fields')
        } else {
            setItems((items) => [
                ...items,
                {
                    id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
                    name: subjectDetails.name,
                    subjectCode: subjectDetails.subjectCode,
                    bgColor: subjectDetails.bgColor,
                    medium: subjectDetails.medium,
                    type: subjectDetails.type,
                    img: subjectDetails.img,
                },
            ])
            console.log(subjectDetails)
            setSubjectDetails({
                id: 0,
                name: '',
                subjectCode: '',
                bgColor: '',
                medium: '',
                img: null,
                type: '',
            })
        }
    }
    const handleEditClick = (item: SubjectClass) => {
        setEditId(item?.id), setSubjectDetails(item)
    }
    const handleDetailsChange = (
        event: ChangeEvent<HTMLInputElement>,
        detail: string
    ) => {
        event.target.files && event.target.files.length > 0
            ? setSubjectDetails({
                  ...subjectDetails,
                  [detail]: event.target.files[0],
              })
            : setSubjectDetails({
                  ...subjectDetails,
                  [detail]: event.target.value,
              })
    }
    return (
        <div className="flex flex-col bg-gray-200 rounded px-2 py-2 ">
            <p className="font-semibold text-gray-900">Manage Subject</p>
            <div className="flex w-full py-3 xs:flex-col lg:flex-row">
                {createSubject ? (
                    <div className="bg-white  mr-2 rounded px-6 py-4 w-full xs:my-2 lg:my-0">
                        <div className="flex w-full font-semibold text-gray-900 justify-between items-center">
                            <p>Create Subject</p>
                            <Button
                                className="items-center justify-center flex"
                                size="xs"
                                variant="solid"
                                icon={<ArrowBackIcon fontSize="smaller" />}
                                onClick={() => setCreateSubject(false)}
                            >
                                Back to List
                            </Button>
                        </div>
                        <p className="text-red-500 text-xs lg:my-1 xs:my-6">
                            Note: Subject name, code, type should be unique for
                            Medium
                        </p>
                        <div className="my-8">
                            <label className="text-sm">Medium*</label>
                            <div className="text-xs flex my-2 mr-2">
                                <input
                                    type="radio"
                                    className=""
                                    id="hindi"
                                    value="hindi"
                                    checked={subjectDetails.medium === 'hindi'}
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
                                    checked={
                                        subjectDetails.medium === 'english'
                                    }
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
                                    checked={
                                        subjectDetails.medium === 'gujrati'
                                    }
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
                                value={subjectDetails.name}
                                onChange={(e) => handleDetailsChange(e, 'name')}
                            />
                        </div>
                        <div className="my-8">
                            <label className="text-sm">Type*</label>
                            <div className="text-xs flex my-2 mr-2">
                                <input
                                    type="radio"
                                    className=""
                                    id="theory"
                                    value="theory"
                                    checked={subjectDetails.type === 'theory'}
                                    onChange={(e) =>
                                        handleDetailsChange(e, 'type')
                                    }
                                />
                                <label
                                    className="ml-2 mr-4 text-xs"
                                    htmlFor="theory"
                                >
                                    Theory
                                </label>

                                <input
                                    type="radio"
                                    className=""
                                    id="practical"
                                    value="practical"
                                    checked={
                                        subjectDetails.type === 'practical'
                                    }
                                    onChange={(e) =>
                                        handleDetailsChange(e, 'type')
                                    }
                                />
                                <label
                                    className="ml-2 mr-4 text-xs"
                                    htmlFor="practical"
                                >
                                    Practical
                                </label>
                            </div>
                        </div>
                        <div className="my-8">
                            <label className="text-sm">Subject Code*</label>
                            <Input
                                required
                                className="text-xs"
                                size="sm"
                                value={subjectDetails.subjectCode}
                                onChange={(e) =>
                                    handleDetailsChange(e, 'subjectCode')
                                }
                            />
                        </div>
                        <div className="my-8">
                            <label className="text-sm">Background Color*</label>
                            <Input
                                required
                                className="text-xs"
                                size="sm"
                                value={subjectDetails.bgColor}
                                onChange={(e) =>
                                    handleDetailsChange(e, 'bgColor')
                                }
                            />
                        </div>
                        <div className="my-8">
                            <label className="text-sm w-full">Image*</label>
                            <div>
                                <Input
                                    required
                                    className="text-xs w-3/4"
                                    size="sm"
                                    type="file"
                                    onChange={(e) =>
                                        handleDetailsChange(e, 'img')
                                    }
                                />
                                <Button
                                    variant="solid"
                                    className="w-1/4"
                                    size="sm"
                                    // onClick={}
                                >
                                    Upload
                                </Button>
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
                ) : (
                    <div className="flex flex-col text-gray-900 bg-white lg:w-full rounded px-4 py-4 xs:w-full xs:my-4 lg:my-0 ">
                        <div className="flex w-full  justify-between items-center">
                            <p>List Subject</p>
                            <Button
                                className="items-center justify-center flex"
                                size="xs"
                                variant="solid"
                                icon={<AddIcon fontSize="small" className="" />}
                                onClick={() => setCreateSubject(true)}
                            >
                                Add Subject
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
                                            Subject Code
                                        </th>
                                        <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                            Background Color
                                        </th>
                                        <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                            Medium
                                        </th>
                                        <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                            Image
                                        </th>
                                        <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                            Type
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
                                                        value={
                                                            subjectDetails.name
                                                        }
                                                        onChange={(e) =>
                                                            items?.map((i) =>
                                                                i?.id ===
                                                                item?.id
                                                                    ? setSubjectDetails(
                                                                          (
                                                                              subjectDetails
                                                                          ) => ({
                                                                              ...subjectDetails,
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
                                                    item?.subjectCode
                                                ) : (
                                                    <Input
                                                        value={
                                                            subjectDetails.subjectCode
                                                        }
                                                        onChange={(e) =>
                                                            items?.map((i) =>
                                                                i?.id ===
                                                                item?.id
                                                                    ? setSubjectDetails(
                                                                          (
                                                                              subjectDetails
                                                                          ) => ({
                                                                              ...subjectDetails,
                                                                              subjectCode:
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
                                            <td className="px-6 py-3 text-xs text-gray-700 ">
                                                {editId != item.id ? (
                                                    <div
                                                        className={`bg-${item?.bgColor} rounded p-2`}
                                                    >
                                                        {item?.bgColor}
                                                    </div>
                                                ) : (
                                                    <Input
                                                        value={
                                                            subjectDetails.bgColor
                                                        }
                                                        onChange={(e) =>
                                                            items?.map((i) =>
                                                                i?.id ===
                                                                item?.id
                                                                    ? setSubjectDetails(
                                                                          (
                                                                              subjectDetails
                                                                          ) => ({
                                                                              ...subjectDetails,
                                                                              bgColor:
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
                                            <td className="px-6 py-3 text-xs text-gray-700 ">
                                                {editId != item.id ? (
                                                    item?.medium
                                                ) : (
                                                    <Input
                                                        value={
                                                            subjectDetails.medium
                                                        }
                                                        onChange={(e) =>
                                                            items?.map((i) =>
                                                                i?.id ===
                                                                item?.id
                                                                    ? setSubjectDetails(
                                                                          (
                                                                              subjectDetails
                                                                          ) => ({
                                                                              ...subjectDetails,
                                                                              medium: e
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
                                                    <img
                                                        src={item.img!=null?item.img:item.name}
                                                        alt="item?.img"
                                                        className="w-1/2 rounded-lg"
                                                    />
                                                ) : (
                                                    <Input
                                                        type="file"
                                                        onChange={(e) =>
                                                            items?.map((i) =>
                                                                i?.id ===
                                                                item?.id
                                                                    ? setSubjectDetails(
                                                                          (
                                                                              subjectDetails
                                                                          ) => ({
                                                                              ...subjectDetails,
                                                                              img: e.target.files?e.target.files[0]:item.name,
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
                                                    item?.type
                                                ) : (
                                                    <Input
                                                        value={
                                                            subjectDetails.type
                                                        }
                                                        onChange={(e) =>
                                                            items?.map((i) =>
                                                                i?.id ===
                                                                item?.id
                                                                    ? setSubjectDetails(
                                                                          (
                                                                              subjectDetails
                                                                          ) => ({
                                                                              ...subjectDetails,
                                                                              type: e
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
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default SubjectForm
