import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BiLoaderCircle, BiTrash } from "react-icons/bi";
import axiosURL from "../axiosConfig"
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { updateRestoSession } from "../feature/session.slice";
import { RootState } from "../app/store";

interface Props {
  setVisible: Dispatch<SetStateAction<boolean>>
}
export default function AddFoodForm(props: Props) {
  const { setVisible } = props
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const [file, setFile] = useState<string>();

  const { restaurant } = useSelector((state: RootState) => state.session)
  const formRef = useRef<HTMLFormElement>(null)

  interface Variant {
    name: string;
    price: number;
    description?: string;
  }
  interface Food {
    name: string;
    description: string;
    image: string;
    price: number,
    variants: Variant[],
  }

  const [formData, setFormData] = useState<Food>({
    name: "",
    description: "",
    image: "",
    price: 0,
    variants: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleAddVariant = () => {
    const newVariant = {
      name: "",
      price: 0,
    };

    setFormData({
      ...formData,
      variants: [...formData.variants, newVariant],
    });
  };

  const handleVariantChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newVariants = [...formData.variants];
    // @ts-ignore 
    newVariants[index][name] = value;

    setFormData({
      ...formData,
      variants: newVariants,
    });
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(URL.createObjectURL(file));
    setFormData({ ...formData, image: file.name });
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors({
      name: "",
      description: "",
      price: "",
    }); // Clear any previous errors on change
  };

  const validate = () => {
    const errors = {
      name: "",
      description: "",
      price: "",
    }

    if (!formData.name) {
      errors.name = "Le nom est obligatoire";
    }
    if (!formData.description) {
      errors.description = "La description est obligatoire";
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
    data.append("description", formData.description)
    data.append("price", formData.price.toString())
    data.append("variants", JSON.stringify(formData.variants))
    data.append("image", event.currentTarget.image.files[0])


    axiosURL.post(`/restaurants/plats/${restaurant._id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        setIsLoading(false)
        // Handle successful response
        dispatch(updateRestoSession(response.data.data))
        toast.success(response.data?.message || "le plat a été ajouter avec succès")
        setFormData({
          name: "",
          image: "",
          description: "",
          price: 0,
          variants: []
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

        <label htmlFor="image" className="p-5 overflow-hidden relative flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-tertiary hover:bg-secondary/10 dark:border-white/20 dark:focus:border-secondary dark:hover:border-gray-500 dark:hover:bg-tertiary/50">
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
          placeholder="Nom du plat*"
          className={`${errors.name && "!border-red-500"} bg-gray-50 dark:bg-tertiary border dark:border-white/20 dark:focus:border-secondary focus:border-secondary outline-none dark:text-white sm:text-sm rounded-lg block w-full p-2.5`}
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
          className={`${errors.price && "!border-red-500"} bg-gray-50 dark:bg-tertiary border dark:border-white/20 dark:focus:border-secondary focus:border-secondary outline-none dark:text-white sm:text-sm rounded-lg block w-full p-2.5`}
        />
        <span className="text-red-500 text-sm">{errors.price && errors.price}</span>
      </div>
      <div>
        <label htmlFor="description" className="block mb-2 text-sm font-bold text-writing dark:text-white">Description*</label>
        <textarea
          onChange={handleChange}
          id="description"
          name="description"
          rows={4}
          className={`${errors.description && "!border-red-500"} p-2.5 bg-gray-50 dark:bg-tertiary border dark:border-white/20 dark:focus:border-secondary focus:border-secondary outline-none dark:text-white sm:text-sm rounded-lg block w-full`}
          placeholder="Ecrivez une petite description pour ce plat..."
        ></textarea>
        <span className="text-red-500 text-sm">{errors.description && errors.description}</span>
      </div>

      {formData.variants?.map((_variant, index) =>
        <div key={index} className="variante bg-slate-100 dark:bg-tertiary p-5 rounded-md">
          <label className="text-lg uppercase mb-5 mt-2 block">Variante {index + 1}</label>
          <div>
            <label htmlFor={`variant-name-${index}`} className="block mb-2 text-sm font-bold text-writing dark:text-white">Taille*</label>
            <input
              type="text"
              name={`name`}
              // value={variant.name}
              onChange={(e) => handleVariantChange(index, e)}
              className={`${false && "!border-red-500"} mb-4 bg-gray-50 dark:bg-tertiary border dark:border-white/20 dark:focus:border-secondary focus:border-secondary outline-none dark:text-white sm:text-sm rounded-lg block w-full p-2.5`}
            />
            {/* <span className="text-red-500 text-sm">{errors.email && errors.email}</span> */}
          </div>
          <div>
            <label htmlFor={`variant-price-${index}`} className="block mb-2 text-sm font-bold text-writing dark:text-white">Prix*</label>
            <input
              type="number"
              name={`price`}
              // value={variant.price}
              onChange={(e) => handleVariantChange(index, e)}
              placeholder="FCFA"
              className={`${false && "!border-red-500"} mb-4 bg-gray-50 dark:bg-tertiary border dark:border-white/20 dark:focus:border-secondary focus:border-secondary outline-none dark:text-white sm:text-sm rounded-lg block w-full p-2.5`}
            />
            {/* <span className="text-red-500 text-sm">{errors.email && errors.email}</span> */}
          </div>
          <div className="flex justify-between items-center">
            <span>
              <input onChange={() => null} type="radio" name="variante-radio" id={`variante-radio-${index}`} className="mr-2" />
              <label htmlFor={`variante-radio-${index}`}>Présélectionner</label>
            </span>
            <span className="bg-red-600 btn !p-1 !rounded">
              <BiTrash />
            </span>
          </div>
        </div>
      )}

      <div className="variante bg-slate-100 dark:bg-tertiary px-5 py-3 rounded-md">
        <button
          type="button"
          onClick={handleAddVariant}
          className={`text-secondary underline ${(formData.variants?.length >= 3) && "!text-gray-300"}`}
          disabled={!!(formData.variants?.length >= 3)}
        >
          Ajouter une variante
        </button>
      </div>

      <div className="variante bg-slate-100 dark:bg-tertiary p-5 rounded-md">
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
