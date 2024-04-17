export interface IMenu {
    title: string;
    icon: string;
    redirect: string;
    rol: string[];
    children?: ItemsMenu[];

}

interface ItemsMenu {
    title: string;
    icon: string;
    redirect: string;
}

export const menu: IMenu[] = [
    {
        title: 'Inicio',
        icon: 'home',
        redirect: '/home',
        rol: ['admin','student','teacher']
    },
    {
        title: 'Materias',
        icon: 'cast_for_education',
        redirect: '/cursos',
        rol: ['student','teacher']
    },
    {
        title: 'Usuarios',
        icon: 'group',
        redirect: '/usuarios',
        rol: ['admin']
    },
    {
        title: 'Alumnos',
        icon: 'groups',
        redirect: '/alumnos',
        rol: ['admin', 'teacher']
    },
]