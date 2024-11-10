import { Button, Input } from '@/components/ui'
import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'

interface FeatureClass {
    id: number
    name: string
    startTime: string //HH::MM::SS format
    endTime: string //HH::MM::SS format
    status: string
}
const ShiftForm = () => {
    const [items, setItems] = useState<Array<FeatureClass>>([])
    const [editId, setEditId] = useState<number>()
    const [editItem, setEditItem] = useState<FeatureClass>({
        id: 0,
        name: '',
        startTime: '',
        endTime: '',
        status: '',
    })
    const [shiftValue, setShiftVal] = useState<FeatureClass>({
        id: 0,
        name: '',
        startTime: '',
        endTime: '',
        status: 'Active',
    })
    const handleEditSubmit = () => {
        if (editItem.status != 'Active' && editItem.status != 'Not Active') {
            alert('Please enter a valid value of status (Active or Not Active)')
        } else {
            setItems((items) =>
                items.map((i) => (i.id === editItem.id ? editItem : i))
            )
            setEditId(0)
            setEditItem({
                id: 0,
                name: '',
                startTime: '',
                endTime: '',
                status: '',
            })
        }
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
            {
                id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
                name: shiftValue.name,
                startTime: shiftValue.startTime,
                endTime: shiftValue.endTime,
                status: shiftValue.status != '' ? shiftValue.status : 'Active',
            },
        ])
        setShiftVal({ id: 0, name: '', startTime: '', endTime: '', status: '' })
    }
    const handleEditClick = (item: FeatureClass) => {
        setEditId(item.id), setEditItem(item)
    }
    return (
        <div className="flex flex-col bg-gray-200 rounded px-2 py-2 ">
            <p className="font-semibold text-gray-900">Manage Shift</p>
            <div className="flex w-full py-3 xs:flex-col lg:flex-row">
                <div className="bg-white lg:w-1/3 mr-2 rounded px-6 py-4 xs:w-full xs:my-2 lg:my-0">
                    <p className="font-semibold my-2 text-gray-900">
                        Create Shift
                    </p>
                    <div>
                        <label className="text-xs">Name*</label>
                        <Input
                            value={shiftValue.name}
                            required={true}
                            onChange={(e) =>
                                setShiftVal((prevValue) => ({
                                    ...prevValue,
                                    name: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="mt-6">
                        <label className="text-xs my-11">Start Time*</label>
                        <Input
                            value={shiftValue.startTime}
                            type="time"
                            step={1}
                            required={true}
                            onChange={(e) =>
                                setShiftVal((prevValue) => ({
                                    ...prevValue,
                                    startTime: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <div className="mt-6">
                        <label className="text-xs">End Time*</label>
                        <Input
                            value={shiftValue.endTime}
                            type="time"
                            step={1}
                            required={true}
                            onChange={(e) =>
                                setShiftVal((prevValue) => ({
                                    ...prevValue,
                                    endTime: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <Button
                        className="my-4 text-xs xs:w-full lg:w-auto"
                        variant="solid"
                        onClick={(e) => handleAddItems()}
                    >
                        Submit
                    </Button>
                </div>
                <div className="flex flex-col text-gray-900 bg-white lg:w-2/3 rounded px-4 py-4 xs:w-full xs:my-4 lg:my-0">
                    <p>List Shifts</p>
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
                                        Start Time
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        End Time
                                    </th>
                                    <th className=" px-6 py-3 text-xs font-semibold text-gray-800">
                                        Status
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
                                                                    ? setEditItem(
                                                                          (
                                                                              prevValue
                                                                          ) => ({
                                                                              ...prevValue,

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
                                                    item?.startTime
                                                ) : (
                                                    <Input
                                                        value={
                                                            editItem.startTime
                                                        }
                                                        required={true}
                                                        type="time"
                                                        step={1}
                                                        onChange={(e) =>
                                                            items?.map((i) =>
                                                                i?.id ===
                                                                item?.id
                                                                    ? setEditItem(
                                                                          (
                                                                              prevValue
                                                                          ) => ({
                                                                              ...prevValue,

                                                                              startTime:
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
                                                    item?.endTime
                                                ) : (
                                                    <Input
                                                        value={editItem.endTime}
                                                        required={true}
                                                        type="time"
                                                        step={1}
                                                        onChange={(e) =>
                                                            items?.map((i) =>
                                                                i?.id ===
                                                                item?.id
                                                                    ? setEditItem(
                                                                          (
                                                                              prevValue
                                                                          ) => ({
                                                                              ...prevValue,

                                                                              endTime:
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
                                            <td className="px-6 py-3 text-xs text-white ">
                                                {editId != item.id ? (
                                                    <span
                                                        className={
                                                            item?.status ==
                                                            'Active'
                                                                ? 'bg-green-800 p-1 rounded'
                                                                : 'bg-red-800 p-1 rounded'
                                                        }
                                                    >
                                                        {item?.status}
                                                    </span>
                                                ) : (
                                                    <Input
                                                        className="text-black"
                                                        value={editItem.status}
                                                        required={true}
                                                        onChange={(e) =>
                                                            items?.map((i) =>
                                                                i?.id ===
                                                                item?.id
                                                                    ? setEditItem(
                                                                          (
                                                                              prevValue
                                                                          ) => ({
                                                                              ...prevValue,

                                                                              status: e
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
                                                        className="mx-2"
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
export default ShiftForm
