export interface IMenu {
    title: string;
    icon: string;
    redirect: string;
    rol: string[];
    color?: string;
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
        color: 'bg-violet-500',
        rol: ['Administrador','Estudiante','Profesor']
    },
    {
        title: 'Materias',
        icon: 'cast_for_education',
        redirect: '/cursos',
        color: 'bg-rose-500',
        rol: ['Administrador','Estudiante','Profesor']
    },
    {
        title: 'Usuarios',
        icon: 'group',
        redirect: '/usuarios',
        color: 'bg-teal-500',
        rol: ['Administrador']
    },
    {
        title: 'Alumnos',
        icon: 'groups',
        redirect: '/alumnos',
        color: 'bg-orange-500',
        rol: ['Administrador', 'Profesor']
    },
]