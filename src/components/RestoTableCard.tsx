import { CgSoftwareDownload } from "react-icons/cg";
import { Table } from "../_interface";
import QrCodeGenerator from "./QrCodeGenerator";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface Props {
    table: Table;
}
export default function RestoTableCard(props: Props) {
    const { table } = props
    const { restaurant } = useSelector((state: RootState) => state.session)

    return (
        <div className="w-[90vw] min-w-[300px] z-10 sm:w-60 block shadow-card dark:shadow-none rounded-2xl bg-white dark:bg-tertiary">
            <div className="flex relative">
                <div className="relative overflow-hidden bg-cover bg-no-repeat w-32">
                    <QrCodeGenerator stringifiedObject={{
                        restaurantId: restaurant._id,
                        tableId: table._id
                    }} />
                </div>
                <div className="p-2">
                    <div className="">
                        designation : <b>{table.tableName}</b>
                    </div>
                    <div className="">
                        capacité : <b>{table.capacity}</b>
                    </div>
                    <button className="btn-gray absolute bottom-3 !py-2 !px-4 right-3">
                        <CgSoftwareDownload className="text-xl" />
                    </button>
                </div>
            </div>
        </div>
    )
}
