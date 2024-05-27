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
        title: 'Perfil',
        icon: 'account_circle',
        redirect: '/home',
        rol: ['Administrador','Estudiante','Profesor']
    },
    {
        title: 'Inicio',
        icon: 'home',
        redirect: '/home',
        rol: ['Administrador','Estudiante','Profesor']
    },
    {
        title: 'Salones',
        icon: 'school',
        redirect: '/salones',
        rol: ['Administrador']
    },
    {
        title: 'Materias',
        icon: 'cast_for_education',
        redirect: '/cursos',
        rol: ['Administrador','Estudiante','Profesor']
    },
    {
        title: 'Temas',
        icon: 'menu_book',
        redirect: '/temas',
        rol: ['Estudiante','Profesor']
    },
    {
        title: 'Profesores',
        icon: 'group',
        redirect: '/usuarios',
        rol: ['Administrador']
    },
    {
        title: 'Alumnos',
        icon: 'groups',
        redirect: '/alumnos',
        rol: ['Administrador', 'Profesor']
    },
]