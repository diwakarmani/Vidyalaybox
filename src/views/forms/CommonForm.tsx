import { Button, Input } from '@/components/ui'
import {useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'

interface FeatureClass {
    id: number
    name: string
}
interface CommonFormProps {
    feature: string
}
const CommonForm = (props: CommonFormProps) => {
    const [items, setItems] = useState<Array<FeatureClass>>([
        {
            id: 1,
            name: 'ABC',
        },
    ])
    const [editId, setEditId] = useState<number>()
    const [editItem, setEditItem] = useState<FeatureClass>({ id: 0, name: '' })
    const { feature } = props
    const [val, setVal] = useState<string>('')
    const handleEditSubmit = () => {
        setItems((items) =>
            items.map((i) => (i.id === editItem.id ? { ...i, name: editItem.name } : i))
        )
        setEditId(0)
        setEditItem({ id: 0, name: '' })
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
        setItems((items) => [
            ...items,
            { id: items.length>0?items[items.length - 1].id + 1:1, name: val },
        ])
        setVal('')
    }

    return (
        <div className="flex flex-col bg-gray-200 rounded px-2 py-2 ">
            <p className="font-semibold text-gray-900">Manage {feature}</p>
            <div className="flex w-full py-3 xs:flex-col lg:flex-row">
                <div className="bg-white lg:w-1/2 mr-2 rounded px-6 py-4 xs:w-full xs:my-2 lg:my-0">
                    <p className="font-semibold my-2 text-gray-900">
                        Create {feature}
                    </p>
                    <label className="text-xs">Name*</label>
                    <Input
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                    />
                    <Button
                        className="my-4 text-xs xs:w-full lg:w-auto"
                        variant="solid"
                        onClick={(e) => handleAddItems()}
                    >
                        Submit
                    </Button>
                </div>
                <div className="flex flex-col text-gray-900 bg-white lg:w-1/2 rounded px-4 py-4 xs:w-full xs:my-4 lg:my-0">
                    <p>List {feature}</p>
                    <div className="w-full">
                        <table className="w-full text-left my-2 table-fixed">
                            <thead className="bg-gray-50">
                                <tr className="border-b">
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        No
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        Name
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                        </table>

                        <div className="h-3/4 overflow-y-auto w-full">
                            <table className="w-full text-left table-fixed ">
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
                                                        value={editItem.name}
                                                        onChange={(e) =>
                                                            items?.map((i) =>
                                                                i?.id ===
                                                                item?.id
                                                                    ? setEditItem({
                                                                          id: item.id,
                                                                          name: e
                                                                              .target
                                                                              .value,
                                                                      })
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
                                                        className="mx-2"
                                                        onClick={(e) =>
                                                            setEditId(item.id)
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
                                                        className="mx-2"
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
                </div>
            </div>
        </div>
    )
}
export default CommonForm
