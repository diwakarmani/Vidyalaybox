import { Button, Input } from '@/components/ui'
import { ChangeEvent, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DropdownItem from '@/components/ui/Dropdown/DropdownItem'
import Dropdown from '@/components/ui/Dropdown/Dropdown'
import { sections, sessionYears } from '@/mock/data/fakeData'

interface StudentClass {
    id: number
    grNumber: string
    section: string
    sessionYear: string
    admDate: string
    img: File | null
    status: string
    firstName: string
    lastName: string
    dob: string
    gender: string
    mobile: string
    currAddress: string
    permAddress: string
    guardianEmail: string
    guardianFirstName: string
    guardianLastName: string
    guardianMobile: string
    guardianGender: string
}

const StudentAdmission = () => {
    const [items, setItems] = useState<Array<StudentClass>>([])
    const [editId, setEditId] = useState<number>()
    const [createSubject, setCreateSubject] = useState<boolean>(false)
    const [studentDetails, setStudentDetails] = useState<StudentClass>({
        id: 1,
        grNumber: '',
        section: '',
        sessionYear: '',
        admDate: '',
        img: null,
        status: '',
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        mobile: '',
        currAddress: '',
        permAddress: '',
        guardianEmail: '',
        guardianFirstName: '',
        guardianLastName: '',
        guardianMobile: '',
        guardianGender: '',
    })
    const handleEditSubmit = () => {
        setItems((items) =>
            items.map((i) => (i.id === studentDetails.id ? studentDetails : i))
        )
        setEditId(0)
        setStudentDetails({
            id: 0,
            grNumber: '',
            section: '',
            sessionYear: '',
            admDate: '',
            img: null,
            status: '',
            firstName: '',
            lastName: '',
            dob: '',
            gender: '',
            mobile: '',
            currAddress: '',
            permAddress: '',
            guardianEmail: '',
            guardianFirstName: '',
            guardianLastName: '',
            guardianMobile: '',
            guardianGender: '',
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
            studentDetails.grNumber == '' ||
            studentDetails.section == '' ||
            studentDetails.sessionYear == '' ||
            studentDetails.admDate == '' ||
            studentDetails.status == '' ||
            studentDetails.img == null ||
            studentDetails.firstName == '' ||
            studentDetails.lastName == '' ||
            studentDetails.dob == '' ||
            studentDetails.gender == '' ||
            studentDetails.mobile == '' ||
            studentDetails.currAddress == '' ||
            studentDetails.permAddress == '' ||
            studentDetails.guardianEmail == '' ||
            studentDetails.guardianFirstName == '' ||
            studentDetails.guardianLastName == '' ||
            studentDetails.gender == '' ||
            studentDetails.guardianMobile == ''
        ) {
            alert('please fill all the fields')
        } else {
            setItems((items) => [
                ...items,
                {
                    id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
                    grNumber: studentDetails.grNumber,
                    section: studentDetails.section,
                    sessionYear: studentDetails.sessionYear,
                    admDate: studentDetails.admDate,
                    status: studentDetails.status,
                    img: studentDetails.img,
                    firstName: studentDetails.firstName,
                    lastName: studentDetails.lastName,
                    dob: studentDetails.dob,
                    gender: studentDetails.gender,
                    mobile: studentDetails.mobile,
                    currAddress: studentDetails.currAddress,
                    permAddress: studentDetails.permAddress,
                    guardianEmail: studentDetails.guardianEmail,
                    guardianFirstName: studentDetails.guardianFirstName,
                    guardianLastName: studentDetails.guardianLastName,
                    guardianGender: studentDetails.guardianGender,
                    guardianMobile: studentDetails.guardianMobile,
                },
            ])
            console.log(studentDetails)
            setStudentDetails({
                id: 0,
                grNumber: '',
                section: '',
                sessionYear: '',
                admDate: '',
                img: null,
                status: '',
                firstName: '',
                lastName: '',
                dob: '',
                gender: '',
                mobile: '',
                currAddress: '',
                permAddress: '',
                guardianEmail: '',
                guardianFirstName: '',
                guardianLastName: '',
                guardianMobile: '',
                guardianGender: '',
            })
        }
    }
    const handleEditClick = (item: StudentClass) => {
        setEditId(item?.id), setStudentDetails(item)
    }
    const handleDetailsChange = (
        event: ChangeEvent<HTMLInputElement>,
        detail: string
    ) => {
        event.target.files && event.target.files.length > 0
            ? setStudentDetails({
                  ...studentDetails,
                  [detail]: event.target.files[0],
              })
            : setStudentDetails({
                  ...studentDetails,
                  [detail]: event.target.value,
              })
    }
    return (
        <div className="flex flex-col bg-gray-200 rounded px-2 py-2 ">
            <p className="font-semibold text-gray-900">Manage Student</p>
            <div className="flex w-full py-3 xs:flex-col lg:flex-row">
                <div className="bg-white  mr-2 rounded px-6 py-4 w-full xs:my-2 lg:my-0">
                    <div className="flex w-full font-semibold text-gray-900 justify-between items-center">
                        <p>Create Student</p>
                    </div>
                    <div className="flex my-8 justify-between">
                        <div className="mr-2">
                            <label className="text-sm">Gr Number*</label>
                            <Input
                                required
                                className="text-xs"
                                size="sm"
                                value={studentDetails.grNumber}
                                onChange={(e) =>
                                    handleDetailsChange(e, 'grNumber')
                                }
                            />
                        </div>
                        <div className="mx-2 flex flex-col">
                            <label className="text-sm">Class Section*</label>
                            <Dropdown
                                title={
                                    studentDetails.section != ''
                                        ? studentDetails.section
                                        : '--Select--'
                                }
                                className="w-full bg-red-500 border-red-500 rounded border-3"
                            >
                                {sections.map((section) => (
                                    <DropdownItem
                                        key={section.id}
                                        onClick={() =>
                                            setStudentDetails({
                                                ...studentDetails,
                                                section: section.name,
                                            })
                                        }
                                    >
                                        {section.name}
                                    </DropdownItem>
                                ))}
                            </Dropdown>
                        </div>
                        <div className="mx-2 flex flex-col">
                            <label className="text-sm">Session Year</label>
                            <Dropdown
                                title={
                                    studentDetails.sessionYear != ''
                                        ? studentDetails.sessionYear
                                        : '--Select--'
                                }
                            >
                                {sessionYears.map((sessionYear) => (
                                    <DropdownItem
                                        key={sessionYear.id}
                                        onClick={() =>
                                            setStudentDetails({
                                                ...studentDetails,
                                                sessionYear: sessionYear.year,
                                            })
                                        }
                                    >
                                        {sessionYear.year}
                                    </DropdownItem>
                                ))}
                            </Dropdown>
                        </div>
                        <div className="mx-2">
                            <label className="text-sm">Admission Date*</label>
                            <Input
                                required
                                type="date"
                                className="text-xs"
                                size="sm"
                                value={studentDetails.admDate}
                                onChange={(e) =>
                                    handleDetailsChange(e, 'admDate')
                                }
                            />
                        </div>
                    </div>
                    <div className="my-8">
                        <label className="text-sm">Status*</label>
                        <div className="text-xs flex my-2 mr-2">
                            <input
                                type="radio"
                                className=""
                                id="active"
                                value="active"
                                checked={studentDetails.status === 'active'}
                                onChange={(e) =>
                                    handleDetailsChange(e, 'medium')
                                }
                            />
                            <label
                                className="ml-2 mr-4 text-xs"
                                htmlFor="active"
                            >
                                Active
                            </label>

                            <input
                                type="radio"
                                className=""
                                id="deactive"
                                value="deactive"
                                checked={studentDetails.status === 'deactive'}
                                onChange={(e) =>
                                    handleDetailsChange(e, 'medium')
                                }
                            />
                            <label
                                className="ml-2 mr-4 text-xs"
                                htmlFor="deactive"
                            >
                                Deactive
                            </label>
                        </div>
                    </div>
                    <div className="bg-gray-400 h-0.5"></div>

                    <div className="flex my-8 justify-between">
                        <div className="mr-2">
                            <label className="text-sm">First Name*</label>
                            <Input
                                required
                                className="text-xs"
                                size="sm"
                                value={studentDetails.firstName}
                                onChange={(e) =>
                                    handleDetailsChange(e, 'firstNumber')
                                }
                            />
                        </div>

                        <div className="mx-2">
                            <label className="text-sm">Last Name*</label>
                            <Input
                                required
                                className="text-xs"
                                size="sm"
                                value={studentDetails.lastName}
                                onChange={(e) =>
                                    handleDetailsChange(e, 'lastName')
                                }
                            />
                        </div>
                        <div className="mx-2">
                            <label className="text-sm">Date of Birth*</label>
                            <Input
                                required
                                type="date"
                                className="text-xs"
                                size="sm"
                                value={studentDetails.dob}
                                onChange={(e) => handleDetailsChange(e, 'dob')}
                            />
                        </div>
                    </div>
                    <div className="my-8">
                        <div className="flex justify-between">
                            <div className="mr-2">
                                <label className="text-sm">Gender*</label>
                                <div className="text-xs flex my-2 mr-2">
                                    <input
                                        type="radio"
                                        className=""
                                        id="male"
                                        value="Male"
                                        checked={
                                            studentDetails.gender === 'Male'
                                        }
                                        onChange={(e) =>
                                            handleDetailsChange(e, 'gender')
                                        }
                                    />
                                    <label
                                        className="ml-2 mr-4 text-xs"
                                        htmlFor="Male"
                                    >
                                        Male
                                    </label>

                                    <input
                                        type="radio"
                                        className=""
                                        id="Female"
                                        value="Female"
                                        checked={
                                            studentDetails.gender === 'Female'
                                        }
                                        onChange={(e) =>
                                            handleDetailsChange(e, 'gender')
                                        }
                                    />
                                    <label
                                        className="ml-2 mr-4 text-xs"
                                        htmlFor="Female"
                                    >
                                        Female
                                    </label>
                                </div>
                            </div>
                            <div className="mx-2 flex flex-col">
                                <label className="text-sm">Image*</label>
                                <div className="flex">
                                    <input type="file" />
                                    <Button
                                        variant="solid"
                                        className="w-1/4"
                                        size="sm"
                                    >
                                        Upload
                                    </Button>
                                </div>
                            </div>
                            <div className="mx-2">
                                <label className="text-sm">Mobile*</label>
                                <Input
                                    required
                                    type="text"
                                    className="text-xs"
                                    size="sm"
                                    value={studentDetails.mobile}
                                    onChange={(e) =>
                                        handleDetailsChange(e, 'mobile')
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between my-8">
                        <div className="mr-2">
                            <label className="text-sm">Current Address*</label>
                            <Input
                                required
                                className="text-xs"
                                size="sm"
                                value={studentDetails.currAddress}
                                onChange={(e) =>
                                    handleDetailsChange(e, 'currAddress')
                                }
                            />
                        </div>
                        <div className="mx-2">
                            <label className="text-sm">
                                Permanent Address*
                            </label>
                            <Input
                                required
                                className="text-xs"
                                size="sm"
                                value={studentDetails.permAddress}
                                onChange={(e) =>
                                    handleDetailsChange(e, 'permAddress')
                                }
                            />
                        </div>
                    </div>
                    <div className="bg-gray-400 h-0.5"></div>
                    <div className="my-2">
                        <label className="text-sm">Guardian Email*</label>
                        <Input
                            required
                            className="text-xs"
                            size="sm"
                            value={studentDetails.guardianEmail}
                            onChange={(e) =>
                                handleDetailsChange(e, 'guardianEmail')
                            }
                        />
                    </div>
                    <div className="flex justify-between">
                        <div className="mr-2">
                            <label className="text-sm">
                                Guardian First Name*
                            </label>
                            <Input
                                required
                                className="text-xs"
                                size="sm"
                                value={studentDetails.guardianFirstName}
                                onChange={(e) =>
                                    handleDetailsChange(e, 'guardianFirstName')
                                }
                            />
                        </div>
                        <div className="mx-2">
                            <label className="text-sm">
                                Guardian Last Name*
                            </label>
                            <Input
                                required
                                className="text-xs"
                                size="sm"
                                value={studentDetails.guardianLastName}
                                onChange={(e) =>
                                    handleDetailsChange(e, 'guardianLastName')
                                }
                            />
                        </div>
                        <div className="mx-2">
                            <label className="text-sm">Guardian Mobile*</label>
                            <Input
                                required
                                className="text-xs"
                                size="sm"
                                value={studentDetails.guardianMobile}
                                onChange={(e) =>
                                    handleDetailsChange(e, 'guardianMobile')
                                }
                            />
                        </div>
                    </div>
                    <div className="my-2">
                    <label className="text-sm">Gender*</label>
                                <div className="text-xs flex my-2 mr-2">
                                    <input
                                        type="radio"
                                        className=""
                                        id="male"
                                        value="Male"
                                        checked={
                                            studentDetails.guardianGender === 'Male'
                                        }
                                        onChange={(e) =>
                                            handleDetailsChange(e, 'guardianGender')
                                        }
                                    />
                                    <label
                                        className="ml-2 mr-4 text-xs"
                                        htmlFor="Male"
                                    >
                                        Male
                                    </label>

                                    <input
                                        type="radio"
                                        className=""
                                        id="Female"
                                        value="Female"
                                        checked={
                                            studentDetails.guardianGender === 'Female'
                                        }
                                        onChange={(e) =>
                                            handleDetailsChange(e, 'guardianGender')
                                        }
                                    />
                                    <label
                                        className="ml-2 mr-4 text-xs"
                                        htmlFor="Female"
                                    >
                                        Female
                                    </label>
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
            </div>
        </div>
    )
}
export default StudentAdmission
