import { BiLoaderCircle } from "react-icons/bi";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from 'react';
import axiosURL from "../axiosConfig";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { connect } from "../feature/session.slice";

export default function LoginForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        setErrors({
            email: "",
            password: "",
        }); // Clear any previous errors on change
    };

    const validate = () => {
        const errors = {
            email: "",
            password: ""
        }

        if (!formData.email) {
            errors.email = "L'email est obligatoire";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            errors.email = "Veuillez saisir une adresse email valide";
        }

        if (!formData.password) {
            errors.password = "Entrer votre mot de passe";
        } else if (formData.password.length < 8) {
            errors.password = "Le mot de passe doit comporter au moins 8 caractères";
        }

        setErrors(errors);

        return Object.values(errors).every(field => field === "")
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validate()) return; // Stop submission if validation fails
        setIsLoading(true)

        axiosURL.post('/restaurants/auth/login', formData)
            .then(({ data }) => {
                setIsLoading(false)
                if (data?.data) {
                    // Handle successful response
                    dispatch(connect(data?.data))

                    toast.success(data?.message || "bienvenue à vous ✨!")

                    setFormData({
                        email: '',
                        password: '',
                    });
                }
            })
            .then(() => navigate('/restaurant/foods'))
            .catch((error) => {
                toast.error(error.response?.data.message || "Une erreur inattendue s'est produite : réessayez plus tard !")
                setIsLoading(false)
            });
    };


    return (
        <form className="space-y-4 md:space-y-6 border-2 border-transparent dark:border-secondary/50 bg-white dark:bg-tertiary p-5 sm:p-10 max-w-xs rounded-xl sm:max-w-lg" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-bold text-writing dark:text-white">Votre email*</label>
                <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="Email*"
                    className={`${errors.email && "!border-red-500"} bg-gray-50 dark:bg-transparent border dark:border-secondary/40 focus:border-secondary outline-none dark:text-white sm:text-sm rounded-lg block w-full p-2.5`}
                />
                <span className="text-red-500 text-sm">{errors.email && errors.email}</span>
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-bold text-writing dark:text-white">Mot de passe*</label>
                <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    placeholder="Au moins 6 caractères*"
                    className={`${errors.password && "!border-red-500"} bg-gray-50 dark:bg-transparent border dark:border-secondary/40 focus:border-secondary outline-none dark:text-white sm:text-sm rounded-lg block w-full p-2.5`}
                />
                <span className="text-red-500 text-sm">{errors.password && errors.password}</span>
            </div>
            <div className="flex items-center gap-2 !mt-2">
                <BsFillExclamationCircleFill />
                <span className="text-sm">
                    J’ai oublier mon <a href="#" className="text-secondary font-medium hover:underline">mot de passe</a>
                </span>
            </div>
            <button
                className="btn bg-primary !w-full !justify-center mb-5"
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? <>
                    Chargement <BiLoaderCircle className="animate-spin text-xl ml-1" />
                </> : <>
                    Se connecter
                </>}
            </button>
            <p className="text-sm font-light text-gray-500 text-center border-t-2 pt-6 border-gray-500">
                Je suis nouveau, je veux {" "}
                <NavLink to="/register" className="text-secondary font-semibold hover:underline">créer un compte pour mon restaurant.</NavLink>
            </p>
        </form>
    )
}
