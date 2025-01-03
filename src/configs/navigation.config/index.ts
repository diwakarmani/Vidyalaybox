import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    /** Example purpose only, please remove */
    
            {
                key: 'academic.collapse',
                path: '',
                title: 'Academics',
                translateKey: 'nav.academic.collapse.collapse',
                icon: 'academic',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'academic.collapse.medium',
                        path: '/medium',
                        title: 'Medium',
                        translateKey: 'nav.academic.collapse.medium',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'academic.collapse.section',
                        path: '/section',
                        title: 'Section',
                        translateKey: 'nav.academic.collapse.section',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'academic.collapse.stream',
                        path: '/stream',
                        title: 'Stream',
                        translateKey: 'nav.academic.collapse.stream',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'academic.collapse.subject',
                        path: '/subject',
                        title: 'Subject',
                        translateKey: 'nav.academic.collapse.subject',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'academic.collapse.shift',
                        path: '/shift',
                        title: 'Shift',
                        translateKey: 'nav.academic.collapse.shift',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'academic.collapse.class',
                        path: '/class',
                        title: 'Class',
                        translateKey: 'nav.academic.collapse.class',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'academic.collapse.assignSubToClass',
                        path: '/assignSubToClass',
                        title: 'Class Subject',
                        translateKey: 'nav.academic.collapse.assignSubToClass',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'academic.collapse.classSectionAndTeacher',
                        path: '/classSectionAndTeacher',
                        title: 'Class Section And Teacher',
                        translateKey: 'nav.academic.collapse.classSectionAndTeacher',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'academic.collapse.transferAndPromoteStudent',
                        path: '/transferAndPromoteStudent',
                        title: 'Transfer And Promote Student',
                        translateKey: 'nav.academic.collapse.transferAndPromoteStudent',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'academic.collapse.assignRollNumber',
                        path: '/assignRollNumber',
                        title: 'Assign Roll Number',
                        translateKey: 'nav.academic.collapse.assignRollNumber',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },

                ],
            },
            {
                key: 'students.collapse',
                path: '',
                title: 'Students',
                translateKey: 'nav.student.collapse.collapse',
                icon: 'students',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'student.collapse.academicForm',
                        path: '/academicForm',
                        title: 'Academic Form',
                        translateKey: 'nav.students.collapse.academicForm',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'student.collapse.studentAdmission',
                        path: '/studentAdmission',
                        title: 'Student Admission',
                        translateKey: 'nav.students.collapse.studentAdmission',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    

                ],
            }
    

]

export default navigationConfig
