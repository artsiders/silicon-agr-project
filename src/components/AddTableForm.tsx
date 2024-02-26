import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import axiosURL from "../axiosConfig"
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { updateRestoSession } from "../feature/session.slice";
import { RootState } from "../app/store";

interface Props {
  setVisible: Dispatch<SetStateAction<boolean>>
}
export default function AddTableForm(props: Props) {
  const { setVisible } = props
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()

  const { restaurant } = useSelector((state: RootState) => state.session)
  const formRef = useRef<HTMLFormElement>(null)

  interface Table {
    capacity: string;
    tableName: string;
  }

  const [formData, setFormData] = useState<Table>({
    capacity: "",
    tableName: "" // designation
  });

  const [errors, setErrors] = useState({
    capacity: "",
    tableName: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({
      capacity: "",
      tableName: "",
    }); // Clear any previous errors on change
  };

  const validate = () => {
    const errors = {
      capacity: "",
      tableName: "",
    }

    if (!formData.capacity) {
      errors.capacity = "La capacité de la table est obligatoire";
    }
    if (!formData.tableName) {
      errors.tableName = "La description est obligatoire";
    }

    setErrors(errors);

    return Object.values(errors).every(field => field === "")
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return; // Stop submission if validation fails
    setIsLoading(true)

    axiosURL.post(`/restaurants/tables/${restaurant._id}`, formData)
      .then((response) => {
        setIsLoading(false)
        // Handle successful response
        dispatch(updateRestoSession(response.data.data))
        toast.success(response.data?.message || "le plat a été ajouter avec succès")
        setFormData({
          capacity: "",
          tableName: "",
        });
        formRef.current?.reset()
      })
      .then(() => setVisible(false))
      .catch((error) => {
        toast.error("Une erreur inattendue s'est produite : réessayez plus tard !")
        console.log(error.response);
        setIsLoading(false)
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className="space-y-4 md:space-y-6 border-2 border-transparent bg-white dark:bg-transparent p-7 pb-16 w-full"
    >
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-bold text-writing dark:text-white">Désignation*</label>
        <input
          onChange={handleChange}
          id="name"
          type="text"
          name="tableName"
          placeholder="Non de la tabel"
          className={`${errors.tableName && "!border-red-500"} bg-gray-50 dark:bg-tertiary border dark:border-white/20 dark:focus:border-secondary focus:border-secondary outline-none dark:text-white sm:text-sm rounded-lg block w-full p-2.5`}
        />
        <span className="text-red-500 text-sm">{errors.tableName && errors.tableName}</span>
      </div>
      <div>
        <label htmlFor="capacity" className="block mb-2 text-sm font-bold text-writing dark:text-white">Capacité*</label>
        <input
          onChange={handleChange}
          id="capacity"
          type="number"
          name="capacity"
          placeholder="Nombre de place"
          className={`${errors.capacity && "!border-red-500"} bg-gray-50 dark:bg-tertiary border dark:border-white/20 dark:focus:border-secondary focus:border-secondary outline-none dark:text-white sm:text-sm rounded-lg block w-full p-2.5`}
        />
        <span className="text-red-500 text-sm">{errors.capacity && errors.capacity}</span>
      </div>

      <div className="bg-slate-100 dark:bg-tertiary p-5 rounded-md">
        <div className="flex flex-col justify-center items-center gap-3">
          <button
            className="btn-secondary !w-full !justify-center"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <>
              Chargement <BiLoaderCircle className="animate-spin text-xl ml-1" />
            </> : <>
              Sauvegarder
            </>}
          </button>
          <span onClick={() => setVisible(false)} className="underline">Annuler</span>
        </div>
      </div>
    </form>
  )
}
