import { BiLoaderAlt } from "react-icons/bi";
import { BiLoaderCircle } from "react-icons/bi";
import { AiOutlineScan } from "react-icons/ai";
import { BiFullscreen } from "react-icons/bi";
import { MdCameraswitch } from "react-icons/md";
import { useState } from "react";
import QrReader from "react-qr-reader";

const ScanQr = () => {
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [result, setResult] = useState(false);

  const handleScan = async () => {
    setLoadingScan(true);
    setTimeout(() => {
      setLoadingScan(false)
      setStartScan(false)

      setResult(true)
    }, 2000);
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <div className="text-center flex w-full flex-col justify-center items-center h-fit pt-20">
      {/* <h1 className="text-primary font-bold py-2 px-5 text-lg">Scannez le QR code sur la table</h1> */}

      {result && <div className="rounded-md mb-10 p-4 flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-4">Résultat de l'analyse</h3>

        <div className="flex flex-wrap w-full">
          <div className="w-full md:w-1/2 p-4">
            <ul className="ml-4">
              <li className="mb-2">
                <span className="text-lg font-bold"> État de la plante:</span>
                <span className="text-green-500 font-bold"> Saine</span>
              </li>
              <li className="mb-2">
                <span className="text-lg font-bold"> Probabilité de maladie:</span>
                <span className="text-green-500 font-bold"> Faible (10%)</span>
              </li>
              <li className="mb-2">
                <span className="text-lg font-bold"> Pixels sains:</span>
                <span className="text-green-500 font-bold"> 85%</span>
              </li>
              <li className="mb-2">
                <span className="text-lg font-bold"> Pixels endommagés:</span>
                <span className="text-red-500 font-bold"> 15%</span>
              </li>
              <li className="mb-2">
                <span className="text-lg font-bold"> Symptômes potentiels:</span>
                <span className="text-orange-500 font-bold"> Taches foliaires (légères)</span>
              </li>
              <li>
                <span className="text-lg font-bold">Recommandations:</span>
                Surveiller la plante et répéter l'analyse si nécessaire.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 w-full flex justify-center">
          <button onClick={() => setResult(false)} className="btn">Analyser une autre image</button>
        </div>
      </div>

      }
      {!result &&
        <div className="relative flex flex-col bg-gray-300 dark:bg-purple-950/40 rounded">
          {startScan ? (
            <>
              <QrReader
                // @ts-ignore
                facingMode={selected}
                delay={1000}
                onError={handleError}
                onScan={handleScan}
                // chooseDeviceId={()=>selected}
                // style={{ width: "300px" }}
                className="h-80 xxs:w-80 w-[90vw]"
              />
            </>
          ) : (
            loadingScan ? <div className="h-80 xxs:w-80 w-[90vw] flex justify-center items-center">
              <BiLoaderAlt className="text-5xl animate-spin" />
            </div> : <div className="h-80 xxs:w-80 w-[90vw] flex justify-center items-center">
              <img src="/images/qr-code-illustration.webp" alt="qr-code-illustration" className="max-w-full w-full" />
            </div>
          )}

          <div className="bg-gray-700 dark:bg-tertiary flex items-center py-3 px-4 rounded justify-between">
            <button
              className="xxs:text-2xl text-xl text-white"
              onClick={() => {
                selected === "user" ? setSelected("environment") : setSelected("user")
              }}
            >
              <MdCameraswitch />
            </button>
            <button
              className="btn"
              onClick={() => {
                setStartScan((scan) => !scan);
                setLoadingScan((scan) => !scan);
              }}
            >
              {startScan ? "Stop Scan" : "Start Scan"} {" "}
              {startScan ? <BiLoaderCircle className="text-xl ml-2 animate-spin" /> : <AiOutlineScan className="text-xl ml-2" />}
              {/* {data !== "" && <p>{data}</p>} */}
            </button>
            <button className="xxs:text-2xl text-xl text-white" >
              <BiFullscreen />
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default ScanQr;
