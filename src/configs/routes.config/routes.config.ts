import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    {
        key: 'medium',
        path: '/medium',
        component: lazy(() => import('@/views/forms/MediumForm')),
        authority: [],
    },
    {
        key: 'section',
        path: '/section',
        component: lazy(() => import('@/views/forms/SectionForm')),
        authority: [],
    },
    {
        key: 'subject',
        path: '/subject',
        component: lazy(() => import('@/views/forms/SubjectForm')),
        authority: [],
    },
    {
        key: 'stream',
        path: '/stream',
        component: lazy(() => import('@/views/forms/StreamForm')),
        authority: [],
    },
    {
        key: 'shift',
        path: '/shift',
        component: lazy(() => import('@/views/forms/ShiftForm')),
        authority: [],
    },
    {
        key: 'class',
        path: '/class',
        component: lazy(() => import('@/views/forms/ClassForm')),
        authority: [],
    },
    {
        key: 'assignSubToClass',
        path: '/assignSubToClass',
        component: lazy(() => import('@/views/forms/AssignSubToClass')),
        authority: [],
    },
    {
        key: 'classSectionAndTeacher',
        path: '/classSectionAndTeacher',
        component: lazy(() => import('@/views/forms/ClassSectionAndTeacher')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'singleMenuItem',
        path: '/single-menu-view',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-view-1',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-view-2',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: lazy(() =>
            import('@/views/demo/GroupSingleMenuItemView')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView1')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView2')
        ),
        authority: [],
    },
]