import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BiLoaderCircle, BiTrash } from "react-icons/bi";
import axiosURL from "../axiosConfig"
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { updateRestoSession } from "../feature/session.slice";
import { RootState } from "../app/store";

interface Props {
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function AddDrinkForm(props: Props) {
  const { setVisible } = props
  const [file, setFile] = useState<string>()
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()

  const { restaurant } = useSelector((state: RootState) => state.session)
  const formRef = useRef<HTMLFormElement>(null)

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    price: "",
  });


  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(URL.createObjectURL(file));
    setFormData({ ...formData, image: file.name });
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({
      name: "",
      price: "",
    }); // Clear any previous errors on change
  };

  const validate = () => {
    const errors = {
      name: "",
      price: "",
    }

    if (!formData.name) {
      errors.name = "Le nom est obligatoire";
    }
    if (!formData.price) {
      errors.price = "Le prix est obligatoire";
    }

    setErrors(errors);

    return Object.values(errors).every(field => field === "")
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return; // Stop submission if validation fails
    setIsLoading(true)

    const data = new FormData();

    data.append("name", formData.name)
    data.append("price", formData.price.toString())
    data.append("image", event.currentTarget.image.files[0])


    axiosURL.post(`/restaurants/boissons/${restaurant._id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        setIsLoading(false)
        // Handle successful response
        dispatch(updateRestoSession(response.data.data))
        toast.success(response.data?.message || "la boissons a été ajouter avec succès")
        setFormData({
          name: "",
          price: 0,
          image: ""
        });
        formRef.current?.reset()
        setFile("")
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
      encType="multipart/form-data"
      className="space-y-4 md:space-y-6 border-2 border-transparent bg-white dark:bg-transparent p-5 pb-16"
    >
      <div className="relative">
        {file && <span
          onClick={() => setFile("")}
          className="z-10 absolute top-2 right-2 bg-red-600 btn !p-1 !rounded"
        >
          <BiTrash />
        </span>}

        <label htmlFor="image" className="p-5 overflow-hidden relative flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-tertiary hover:bg-gray-100 dark:border-secondary/50 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          {file && <img
            src={file}
            alt="image-example"
            className="absolute top-0 right-0 w-full"
          />}
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <AiOutlineCloudUpload className="text-4xl" />
            <p className="mb-2 text-center"><span className="font-semibold">Cliquez pour télécharger</span> ou glisser-déposer</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG (MAX. 1Mo)</p>
          </div>
          <input
            type="file"
            className="hidden"
            name="image"
            id="image"
            placeholder=""
            onChange={handleChangeFile}
          />
        </label>
      </div>

      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-bold text-writing dark:text-white">Nom*</label>
        <input
          onChange={handleChange}
          id="name"
          type="text"
          name="name"
          placeholder="Non de la boisson*"
          className={`${errors.name && "!border-red-500"} bg-gray-50 dark:bg-tertiary border dark:border-secondary/50 focus:border-secondary outline-none dark:text-white sm:text-sm rounded-lg block w-full p-2.5`}
        />
        <span className="text-red-500 text-sm">{errors.name && errors.name}</span>
      </div>
      <div>
        <label htmlFor="price" className="block mb-2 text-sm font-bold text-writing dark:text-white">Prix*</label>
        <input
          onChange={handleChange}
          id="price"
          type="number"
          name="price"
          placeholder="FCFA"
          className={`${errors.price && "!border-red-500"} bg-gray-50 dark:bg-tertiary border dark:border-secondary/50 focus:border-secondary outline-none dark:text-white sm:text-sm rounded-lg block w-full p-2.5`}
        />
        <span className="text-red-500 text-sm">{errors.price && errors.price}</span>
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
