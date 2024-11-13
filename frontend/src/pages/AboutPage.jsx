import { assets } from "../assets/assets";

const AboutPage = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          SOBRE <span className="text-gray-700 font-medium">NOSOTROS</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
            similique magni, soluta aut quas repellat illo ullam tenetur
            architecto, dolore animi pariatur reiciendis? Officia, eos voluptas?
            Quas, non eum vero facere laborum quos dolores odit quis nobis totam
            est obcaecati corporis culpa. Placeat quam odio voluptatibus eveniet
            accusamus rem itaque.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora
            provident similique expedita suscipit accusamus, vero odio ut
            explicabo laborum quo aspernatur ex nihil eligendi alias mollitia
            modi, ducimus totam qui voluptatum reprehenderit atque ratione?
            Tenetur fugiat quod consequuntur dolores recusandae dolore commodi
            voluptates, soluta, modi deleniti inventore iure impedit dolor.
            Ratione, a minima maiores deserunt porro esse. Incidunt et quasi
            ducimus, maxime sed id excepturi error molestias placeat commodi
            provident ullam adipisci architecto a amet hic eligendi. Nostrum,
            consectetur hic.
          </p>
          <b className="text-gray-800">Nuestra Vision</b>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae
            rerum explicabo consequuntur asperiores quos nihil excepturi at, qui
            dolor natus quidem sequi quas veniam commodi praesentium corrupti?
            Quod, repellat minus.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          PORQUE <span className="text-gray-600 font-bold">ELEGIRNOS</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-700 cursor-pointer">
          <b>EFICIENCIA</b>
          <p>Programación de citas simplificada que se adapta a su ocupado estilo de vida.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-700 cursor-pointer">
          <b>CONVENIENCIA</b>
          <p>Acceso a una red de profesionales de la salud de confianza en tu area.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-700 cursor-pointer">
          <b>PERSONALIZACION</b>
          <p>Recomendaciones y recordatorios personalizados para ayudarte a mantenerte al tanto de tu salud.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
