import './home.css';

export const Home = () => {
    return (
        <div className='w-full h-full flex items-start justify-start p-8 '>
            <div className="py-4 px-8 rounded-xl text-black bg-white w-screen overflow-auto h-full">

                <div className='imgSchool'>

                </div>

                <p>
                    ¡Bienvenidos al Colegio Jorge Washington! Nuestra misión es brindar una educación de calidad que inspire a nuestros estudiantes a alcanzar su máximo potencial.
                </p>

                <p className='my-8'>
                    En el Colegio Jorge Washington, estamos comprometidos con el aprendizaje integral. Explora nuestras aulas virtuales, conoce a nuestros profesores y descubre cómo puedes participar en actividades extracurriculares
                </p>
                {/* {menu.map((card: IMenu, index: number) => (
                    <div key={index} className={`flex ${card.color} p-5 rounded-xl cursor-pointer`} >
                        <span className="material-icons mr-2 text-[3rem]">{card.icon}</span>
                        <p className='text-[2rem]'>{card.title}</p>
                    </div>
                ))} */}
            </div>

        </div>
    )
}
