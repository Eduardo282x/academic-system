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

                <div className="flex flex-wrap justify-around items-start gap-5 w-full">
                    <div className='imageOne'>

                    </div>
                    <div className='imageTwo'>

                    </div>
                    <div className='imageThree'>

                    </div>
                </div>

            </div>

        </div>
    )
}
