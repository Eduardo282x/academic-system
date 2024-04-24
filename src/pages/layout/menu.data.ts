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
        title: 'Usuario',
        icon: 'account_circle',
        redirect: '/home',
        color: 'bg-violet-500',
        rol: ['Administrador','Estudiante','Profesor']
    },
    {
        title: 'Inicio',
        icon: 'home',
        redirect: '/home',
        color: 'bg-violet-500',
        rol: ['Administrador','Estudiante','Profesor']
    },
    {
        title: 'Salones',
        icon: 'school',
        redirect: '/salones',
        color: 'bg-rose-500',
        rol: ['Administrador']
    },
    {
        title: 'Materias',
        icon: 'cast_for_education',
        redirect: '/cursos',
        color: 'bg-rose-500',
        rol: ['Administrador','Estudiante','Profesor']
    },
    {
        title: 'Profesores',
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