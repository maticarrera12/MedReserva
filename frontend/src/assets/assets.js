import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    { speciality: 'Clínico general', image: General_physician },
    { speciality: 'Ginecología', image: Gynecologist },
    { speciality: 'Dermatología', image: Dermatologist },
    { speciality: 'Pediatría', image: Pediatricians },
    { speciality: 'Neurología', image: Neurologist },
    { speciality: 'Gastroenterología', image: Gastroenterologist },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Ricardo Gómez',
        image: doc1,
        speciality: 'Clínico general',
        degree: 'Médico',
        experience: '4 años',
        about: 'El Dr. Gómez tiene una sólida trayectoria en atención integral, enfocado en medicina preventiva, diagnóstico temprano y estrategias de tratamiento efectivas.',
        fees: 5000,
        address: {
            line1: 'Av. Corrientes 1234',
            line2: 'CABA, Buenos Aires'
        }
    },
    {
        _id: 'doc2',
        name: 'Dra. Emilia Larrea',
        image: doc2,
        speciality: 'Ginecología',
        degree: 'Médica',
        experience: '3 años',
        about: 'La Dra. Larrea se dedica a brindar atención completa en salud femenina, destacando su enfoque en la prevención y la salud reproductiva.',
        fees: 5500,
        address: {
            line1: 'Av. Santa Fe 1567',
            line2: 'CABA, Buenos Aires'
        }
    },
    {
        _id: 'doc3',
        name: 'Dra. Sara Pereyra',
        image: doc3,
        speciality: 'Dermatología',
        degree: 'Médica',
        experience: '1 año',
        about: 'La Dra. Pereyra está comprometida con el diagnóstico y tratamiento de enfermedades de la piel, con un enfoque en la salud dermatológica preventiva.',
        fees: 4500,
        address: {
            line1: 'Calle Florida 1122',
            line2: 'CABA, Buenos Aires'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Cristian López',
        image: doc4,
        speciality: 'Pediatría',
        degree: 'Médico',
        experience: '2 años',
        about: 'El Dr. López se especializa en el cuidado infantil, brindando atención de calidad para el bienestar de los niños y adolescentes.',
        fees: 4800,
        address: {
            line1: 'Calle Rivadavia 3420',
            line2: 'CABA, Buenos Aires'
        }
    },
    {
        _id: 'doc5',
        name: 'Dra. Julia García',
        image: doc5,
        speciality: 'Neurología',
        degree: 'Médica',
        experience: '4 años',
        about: 'La Dra. García tiene una gran dedicación en el tratamiento de trastornos neurológicos, ofreciendo un enfoque compasivo y profesional.',
        fees: 6000,
        address: {
            line1: 'Av. Callao 875',
            line2: 'CABA, Buenos Aires'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Andrés Fernández',
        image: doc6,
        speciality: 'Neurología',
        degree: 'Médico',
        experience: '4 años',
        about: 'El Dr. Fernández se enfoca en brindar atención neurológica integral, abordando diagnósticos complejos y tratamientos innovadores.',
        fees: 6000,
        address: {
            line1: 'Av. Belgrano 2210',
            line2: 'CABA, Buenos Aires'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Cristian Duarte',
        image: doc7,
        speciality: 'Clínico general',
        degree: 'Médico',
        experience: '4 años',
        about: 'El Dr. Duarte se especializa en diagnóstico y tratamiento de enfermedades comunes, promoviendo la medicina preventiva y el cuidado integral.',
        fees: 5000,
        address: {
            line1: 'Calle Perú 789',
            line2: 'CABA, Buenos Aires'
        }
    },
    {
        _id: 'doc8',
        name: 'Dra. Mariana Silva',
        image: doc8,
        speciality: 'Ginecología',
        degree: 'Médica',
        experience: '3 años',
        about: 'La Dra. Silva se dedica a la salud femenina con un enfoque en el bienestar integral y la prevención de enfermedades.',
        fees: 5500,
        address: {
            line1: 'Av. de Mayo 1550',
            line2: 'CABA, Buenos Aires'
        }
    },
    {
        _id: 'doc9',
        name: 'Dra. Ana Pérez',
        image: doc9,
        speciality: 'Dermatología',
        degree: 'Médica',
        experience: '1 año',
        about: 'La Dra. Pérez se dedica a mejorar la salud de la piel de sus pacientes, centrándose en tratamientos efectivos y preventivos.',
        fees: 4500,
        address: {
            line1: 'Av. Libertador 4567',
            line2: 'CABA, Buenos Aires'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Julián Martínez',
        image: doc10,
        speciality: 'Pediatría',
        degree: 'Médico',
        experience: '2 años',
        about: 'El Dr. Martínez proporciona atención pediátrica personalizada, cuidando la salud y el desarrollo de niños de todas las edades.',
        fees: 4800,
        address: {
            line1: 'Calle Azcuénaga 1234',
            line2: 'CABA, Buenos Aires'
        }
    },
    {
        _id: 'doc11',
        name: 'Dra. Lorena Quiroga',
        image: doc11,
        speciality: 'Gastroenterología',
        degree: 'Médica',
        experience: '4 años',
        about: 'La Dra. Quiroga se especializa en el tratamiento gastroenterologico, con un enfoque integral y humanista.',
        fees: 6000,
        address: {
            line1: 'Av. Pueyrredón 235',
            line2: 'CABA, Buenos Aires'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Patricio Hernández',
        image: doc12,
        speciality: 'Neurología',
        degree: 'Médico',
        experience: '4 años',
        about: 'El Dr. Hernández aborda los desafíos neurológicos de sus pacientes con dedicación y una sólida formación académica.',
        fees: 6000,
        address: {
            line1: 'Calle Juncal 1987',
            line2: 'CABA, Buenos Aires'
        }
    },
    {
        _id: 'doc13',
        name: 'Dra. María Acosta',
        image: doc13,
        speciality: 'Clínico general',
        degree: 'Médica',
        experience: '4 años',
        about: 'La Dra. Acosta se centra en la prevención y tratamiento de enfermedades, brindando atención médica integral y personalizada.',
        fees: 5000,
        address: {
            line1: 'Av. San Juan 1350',
            line2: 'CABA, Buenos Aires'
        }
    },
    {
        _id: 'doc14',
        name: 'Dra. Carla Méndez',
        image: doc14,
        speciality: 'Ginecología',
        degree: 'Médica',
        experience: '3 años',
        about: 'La Dra. Méndez tiene una amplia experiencia en el cuidado de la salud femenina y en promover prácticas saludables.',
        fees: 5500,
        address: {
            line1: 'Av. Cabildo 2675',
            line2: 'CABA, Buenos Aires'
        }
    },
    {
        _id: 'doc15',
        name: 'Dra. Sofía Díaz',
        image: doc15,
        speciality: 'Dermatología',
        degree: 'Médica',
        experience: '1 año',
        about: 'La Dra. Díaz se especializa en el cuidado de la piel, ofreciendo tratamientos de vanguardia en dermatología.',
        fees: 4500,
        address: {
            line1: 'Calle Defensa 842',
            line2: 'CABA, Buenos Aires'
        }
    }
];
