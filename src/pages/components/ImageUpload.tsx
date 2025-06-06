import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import styles from "@/styles/ImageUpload.module.scss";
import { SpinnerContext } from "@/contexts/SpinnerContextProvider";
import { toast } from "react-toastify";
import attach from "~/public/icons/attach.svg";
import pdf from "~/public/icons/pdf.svg";
import remove from "~/public/icons/remove.svg";
import Image from "next/image";
import { insertLogs } from "@/utils/shared";

interface ImageData {
  public_id: string;
  secure_url: string;
  original_filename: string;
}

interface Props {
  imageValue?: ImageData | File;
  returnFunction: (data: File) => void;
  removeFunction: () => void;
  disableRemove?: boolean;
  onError: boolean;
  fromConsultant?: boolean;
}

export default function ImageUpload(props: Props): JSX.Element {
  const [image, setImage] = useState<ImageData | null>(null);
  const [imageLocal, setImageLocal] = useState<File | null>(null);

  const { showSpinner } = useContext(SpinnerContext);

  const fileType = ["application/pdf"];

  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.imageValue instanceof File) {
      setImageLocal(props.imageValue);
      setImage(null);
    } else if (props.imageValue) {
      setImage(props.imageValue);
      setImageLocal(null);
    } else {
      setImage(null);
      setImageLocal(null);
      if (fileInput.current) {
        fileInput.current.value = "";
      }
    }
  }, [props.imageValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();

    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      showSpinner(true);

      if (selectedFile && fileType.includes(selectedFile.type)) {
        if (selectedFile.size < 5000000) {
          try {
            setImageLocal(selectedFile);
            props.returnFunction(selectedFile);
            showSpinner(false);
          } catch (error: any) {
            showSpinner(false);
            toast.error("Sorry something went wrong!");
            insertLogs(
              "client",
              "handleImageChange",
              "ImageUpload",
              error?.message
            );
          }
        } else {
          showSpinner(false);
          setImageLocal(null);
          setImage(null);
          toast.error("Please select a valid pdf size below 5MB");
        }
      } else {
        showSpinner(false);
        setImageLocal(null);
        setImage(null);
        toast.error("Please select a valid pdf file");
      }
    }
  };

  const handleClick = (): void => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const drawHtmlUpload = (): ReactNode => {
    let html: ReactNode[] = [];
    html.push(
      <div key={image ? "image" : "local"} className={styles.existingPdf}>
        <Image style={{ marginRight: ".5rem" }} alt="pdf" src={pdf} />

        {image ? (
          props.fromConsultant ? (
            <a href={image?.secure_url} download={image?.original_filename}>
              {image.original_filename}
            </a>
          ) : (
            image.original_filename
          )
        ) : (
          imageLocal?.name
        )}
        {!props.disableRemove && (
          <Image
            style={{ marginLeft: ".8rem", cursor: "pointer" }}
            alt="remove"
            src={remove}
            onClick={() => handleRemove()}
          />
        )}
      </div>
    );
    return html;
  };

  const handleRemove = (): void => {
    if (!props.disableRemove) {
      try {
        showSpinner(true);
        if (fileInput.current) {
          fileInput.current.value = "";
        }
        props.removeFunction();
        setImageLocal(null);
        setImage(null);
        showSpinner(false);
      } catch (error: any) {
        showSpinner(false);
        toast.error("Sorry something went wrong!");
        insertLogs("client", "handleRemove", "ImageUpload", error?.message);
      }
    }
  };

  return (
    <div className={styles.fileinput}>
      <input
        hidden
        type="file"
        accept="application/pdf"
        onChange={handleImageChange}
        ref={fileInput}
      />
      {
        <div
          style={{
            cursor: image || imageLocal ? "auto" : "pointer",
          }}
          className={`${styles.uploadFileInput} ${
            props.onError ? "errorInput" : ""
          }`}
        >
          {image || imageLocal ? (
            <div className={`${styles.fileBtnInput} ${styles.fileCss}`}>
              {drawHtmlUpload()}
            </div>
          ) : (
            <div
              onClick={() => handleClick()}
              className={`${styles.fileBtnInput} `}
            >
              <Image
                style={{ marginRight: ".5rem" }}
                alt="attachment"
                src={attach}
              />
              {props.fromConsultant && <span>upload</span>}
              {!props.fromConsultant && (
                <div>
                  Click here to <span>upload</span> your file
                </div>
              )}
            </div>
          )}
        </div>
      }
    </div>
  );
}
