import React, { useEffect, useState, useContext, ReactNode } from "react";
import axios from "axios";
import { Form, Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import styles from "@/styles/Questionnaire.module.scss";
import { useRouter } from "next/router";
import { map, isEmpty, groupBy, isEqual } from "lodash";
import illustration from "~/public/imgs/illustration.png";
import Image from "next/image";
import { SpinnerContext } from "@/contexts/SpinnerContextProvider";
import Tooltip from "@mui/material/Tooltip";
import ImageUpload from "@/pages/components/ImageUpload";
import { QuestionnaireListType } from "@/pages/api/questionaire/initData";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { insertLogs } from "@/utils/shared";
import OpenDialog from "@/pages/components/Modal";
import HelpIcon from "@mui/icons-material/Help";
import SEO from "@/pages/components/SEO";

interface InputData {
  [key: string]: {
    value: any;
    title: string;
    index: number;
    labels: string;
    questType: string;
    minChar: number;
    answerID: number;
    options: string;
    error: boolean;
  };
}

interface ImageInfo {
  public_id: string;
  secure_url?: string;
  original_filename?: string;
  comingFromCloudinary?: boolean;
}

interface QuestionnaireProps {
  serviceTypeQueryParam: string;
  projectId: string | number;
  title: string;
  userId: string;
  userRole: string;
  USERID: string;
}
interface SelectorOption {
  value: string;
  name: string;
}
interface SelectorOptionsType {
  [key: string]: SelectorOption[];
}

interface RadioOptions {
  value: string;
}
interface TableType {
  [key: string]: {
    product: string;
    desc?: string;
  };
}

interface RadioOptionsType {
  [key: string]: RadioOptions[];
}

const Questionnaire: React.FC<QuestionnaireProps> = (props) => {
  const { showSpinner } = useContext(SpinnerContext);
  const [alreadySubmitted, setReadOnly] = useState(false);
  const [initialImage, setInitialImage] = useState<ImageInfo>();
  const [pageInputs, setPageInputs] = useState<InputData>({});
  const [stepperDataType, setStepperDataType] = useState<any>({});
  const [emailValue, setEmail] = useState("");
  const [tableRows, setTableValues] = useState<TableType>({
    "1": {
      product: "",
      desc: "",
    },
  });

  const selectorOptions: SelectorOptionsType = {
    ReferralOptions: [
      { value: "online search", name: "Online Search" },
      { value: "social media", name: "Social Media" },
      { value: "events", name: "Networking Event" },
      { value: "advertisements", name: "Advertisements" },
      { value: "partners or affiliates", name: "Partnerships or Affiliates" },
      { value: "review or testimonial", name: "Review or Testimonial" },
      { value: "referral", name: "Referral by Friend/Colleague" },
      { value: "community or group", name: "Community Forum or Group" },
      { value: "blog", name: "Blog/Article" },
      { value: "other", name: "Other" },
    ],

    IndustrySelectorOptions: [
      { value: "Manufacturing", name: "Manufacturing" },
      { value: "Consultancy", name: "Consultancy" },
      { value: "Entertainment", name: "Entertainment" },
      { value: "Hospitality", name: "Hospitality" },
      { value: "Technology", name: "Technology" },
      { value: "Construction", name: "Construction" },
      {
        value: "Distributing",
        name: "Distributing (Retailer, wholesale, personal selling)",
      },
      { value: "Supply", name: "Supply chain or logistics" },
      { value: "Financial", name: "Financial institutions group" },
      { value: "Healthcare", name: "Healthcare" },
      { value: "Other", name: "Other" },
    ],
    FinanceSelectorOptions: [
      { value: "Nosource", name: "No source" },
      { value: "Self-funded", name: "Self-funded" },
      { value: "familyAndFriends", name: "Family and friends" },
      { value: "investors", name: "Angel investors" },
      { value: "capitalists", name: "Venture capitalists" },
      { value: "Bank", name: "Bank" },
      { value: "Incubators", name: "Incubators" },
      { value: "Other", name: "Other" },
    ],
  };
  const radioOptions: RadioOptionsType = {
    ConfirmRadioOptions: [{ value: "Yes" }, { value: "No" }],
    StagesRadioOptions: [
      { value: "Idea" },
      { value: "Developed" },
      { value: "Tested" },
    ],
  };

  const router = useRouter();

  useEffect(() => {
    initData();
  }, []);

  async function initData(projectId?: number) {
    try {
      showSpinner(true);

      const res = await axios.get<{
        success: boolean;
        result: QuestionnaireListType[];
      }>("api/questionaire/initData", {
        params: {
          serviceType: props.serviceTypeQueryParam,
          projectId: projectId ? projectId : props.projectId,
          USERID: props.USERID || "",
        },
      });

      if (res.data.success) {
        const result = res.data.result;
        if (!isEmpty(result)) {
          const groupedData = groupBy(result, "quest_labels");
          const data: InputData = {};
          let tableValues: TableType = {};

          map(result, (parent) => {
            if (parent.quest_type === "imageType") {
              setInitialImage(parent.answers && JSON.parse(parent.answers));
            }
            if (parent.quest_type === "email") {
              setEmail(parent.answers);
            }

            const parentAnswers = parent.answers || "";
            const getValue = () => {
              if (parent.quest_type === "imageType") {
                return parent.answers && JSON.parse(parent.answers);
              } else if (
                parent.quest_placeholder === "multi" &&
                parent.quest_type === "selector"
              ) {
                return parent.answers ? parent.answers.split(",") : [];
              } else if (parent.quest_type === "table") {
                tableValues = parent.answers
                  ? JSON.parse(parent.answers)
                  : tableRows;
                return parent.answers ? JSON.parse(parent.answers) : "";
              } else {
                return parentAnswers;
              }
            };

            data[parent.id] = {
              ...pageInputs[parent.id],
              value: getValue(),
              title: parent.quest_title,
              index: parent.quest_order_index,
              labels: parent.quest_labels,
              questType: parent.quest_type,
              answerID: parent.answerID,
              minChar: parent.quest_min_char,
              options: parent.options,
              error: false,
            };

            setTableValues(tableValues);

            if (
              (parent.status && parent.status !== "notSubmitted") ||
              props.userRole !== "u"
            ) {
              setReadOnly(true);
            }
          });

          setPageInputs(data);
          setStepperDataType(groupedData);
        }

        showSpinner(false);
      } else {
        showSpinner(false);
        toast.error("Sorry, something went wrong!");
      }
    } catch (error: any) {
      showSpinner(false);
      toast.error("Sorry, something went wrong!");
      insertLogs("client", "initData", "questionnaire", error?.message);
    }
  }

  async function getSignature(): Promise<any> {
    try {
      const params = {
        folderName: "projects",
        subFolder: "resumee",
        id: props.userId,
      };

      const response = await axios.get("/api/cloudinary/getSignature", {
        params,
      });

      if (response.data.success) {
        const { signature, timestamp } = response.data.result;
        return { signature, timestamp };
      } else {
        showSpinner(false);
      }
    } catch (error) {
      showSpinner(false);
    }
  }

  const submitForm = async (
    step: number,
    isFinalStep: boolean,
    arrayOfError?: string[]
  ): Promise<{ passed: boolean }> => {
    try {
      // iza bi hal habb consultant y3mul submit
      if (props.userRole === "c") {
        return { passed: false };
      }

      showSpinner(true);

      // if form is error
      if (!isEmpty(arrayOfError) && arrayOfError) {
        map(pageInputs, (v, i) => {
          if (v.index === step) {
            setPageInputs((state) => ({
              ...state,
              [i]: {
                ...pageInputs[i],
                error: arrayOfError.includes(i),
              },
            }));
          }
        });

        showSpinner(false);
        return { passed: false };
      }

      // else remove error from state and continue

      map(pageInputs, (v, i) => {
        if (v.index === step) {
          setPageInputs((state) => ({
            ...state,
            [i]: {
              ...pageInputs[i],
              error: false,
            },
          }));
        }
      });

      if (step === 0) {
        const url: string = `${configs.cloudinary_url}`;

        let checkValueforImageValue: any;
        let checkValueforImageId: any;

        map(pageInputs, (v, i) => {
          if (v.questType === "imageType") {
            checkValueforImageValue = pageInputs[i].value;
            checkValueforImageId = i;
          }
        });

        let imageInfo: ImageInfo;

        imageInfo = {
          public_id: checkValueforImageValue?.public_id,
          secure_url: checkValueforImageValue?.secure_url,
          original_filename: checkValueforImageValue?.original_filename,
        };

        // if image has changed
        if (
          !initialImage?.public_id ||
          !isEqual(
            initialImage?.public_id,
            pageInputs[checkValueforImageId].value?.public_id
          )
        ) {
          // if we alreade have a public id we have to delete
          if (initialImage?.public_id) {
            const params = { id: initialImage.public_id };
            const response = await axios.get(
              "/api/cloudinary/cloudinaryDelete",
              {
                params,
              }
            );
            if (!response.data.success) {
              showSpinner(false);
              toast.error("Sorry something went wrong!");
              return { passed: false };
            }
          }

          const { signature, timestamp } = await getSignature();
          const formData = new FormData();
          formData.append("file", checkValueforImageValue);
          formData.append("signature", signature);
          formData.append("timestamp", timestamp);
          formData.append("folder", `projects/${props.userId}/resumee`);
          formData.append("use_filename", "true");
          formData.append("overwrite", "true");
          formData.append("transformation", "fl_attachment");
          formData.append("api_key", `${configs.cloudinary_api_key}`);

          const response = await fetch(url, {
            method: "post",
            body: formData,
          });
          const data = await response.json();

          if (data.error) {
            showSpinner(false);
            toast.error("Sorry, something went wrong!");
            insertLogs(
              "client",
              "formData",
              "questionnaire",
              data.error?.message
            );
            return { passed: false };
          } else {
            setPageInputs((state) => ({
              ...state,
              [checkValueforImageId]: {
                ...pageInputs[checkValueforImageId],
                value: {
                  public_id: data.public_id,
                  secure_url: data.secure_url,
                  original_filename: data.original_filename,
                },
              },
            }));

            setInitialImage({ public_id: data.public_id });

            imageInfo = {
              public_id: data.public_id,
              secure_url: data.secure_url,
              original_filename: data.original_filename,
              comingFromCloudinary: true,
            };
          }
        }

        let finalData: any = {};
        if (props.projectId !== "new") {
          map(pageInputs, (v, i) => {
            if (v.index === 0) {
              finalData[i] = v;
            }
          });
        } else {
          finalData = pageInputs;
        }

        const params = {
          pageInputs: finalData,
          serviceType: props.serviceTypeQueryParam,
          projectId: props.projectId,
          imageData: imageInfo,
          step,
          isFinalStep,
        };

        const res = await axios.post("api/questionaire/postData", params);
        if (res.data.success) {
          showSpinner(false);

          if (props.projectId === "new") {
            router.replace(
              `questionnaire?service=${props.title}&project=${res.data.result}`
            );

            await initData(res.data.result);

            toast.success("Saved successfully!");
            return { passed: true };
          } else {
            toast.success("Saved successfully!");
            return { passed: true };
          }
        } else {
          showSpinner(false);
          if (imageInfo.comingFromCloudinary) {
            const params = { id: imageInfo.public_id };
            await axios.get("/api/cloudinary/cloudinaryDelete", { params });

            setPageInputs((state) => ({
              ...state,
              [checkValueforImageId]: {
                ...pageInputs[checkValueforImageId],
                value: "",
              },
            }));
          }

          toast.error("Sorry, something went wrong!");
          return { passed: false };
        }
      } else {
        const finalData: any = {};
        map(pageInputs, (v, i) => {
          if (v.index === step) {
            finalData[i] = v;
          }
        });

        const params = {
          pageInputs: finalData,
          serviceType: props.serviceTypeQueryParam,
          projectId: props.projectId,
          step: step * 14343 + 14213,
          isFinalStep,
          tableRows,
          emailValue,
        };

        const res = await axios.post("api/questionaire/postData", params);
        if (res.data.success) {
          toast.success("Saved successfully!");
          showSpinner(false);
          return { passed: true };
        } else {
          showSpinner(false);
          toast.error("Something went wrong!");
          return { passed: false };
        }
      }
    } catch (error: any) {
      showSpinner(false);
      const ToastMessage =
        error?.message &&
        error?.message === "Request failed with status code 429"
          ? "Slow down. You are going too fast!"
          : "Sorry, something went wrong!";

      toast.error(ToastMessage);
      insertLogs("client", "submitForm", "questionnaire", error?.message);
      return { passed: false };
    }
  };

  const retrunImage = (id: number) => (v: File) => {
    setPageInputs((state) => ({
      ...state,
      [id]: { ...pageInputs[id], value: v },
    }));
  };

  const removeImage = (id: number) => () => {
    setPageInputs((state) => ({
      ...state,
      [id]: { ...pageInputs[id], value: "" },
    }));
  };

  function returnSelectorElement(options: SelectorOption[]): ReactNode[] {
    let html: ReactNode[] = [];
    map(options, (v) => {
      html.push(
        <MenuItem key={v.value} value={v.value}>
          {v.name}
        </MenuItem>
      );
    });
    return html;
  }

  function selectorOnchange(
    e: SelectChangeEvent,
    v: QuestionnaireListType,
    child: QuestionnaireListType[]
  ) {
    const idOfOtherField: number | undefined = child.find(
      (item) => item.quest_type === "other"
    )?.id;
    let checkValueOfSelector: boolean;
    //if multi
    if (typeof e.target.value !== "string") {
      const selectorArrayValue: string[] = e.target.value;
      checkValueOfSelector = selectorArrayValue.includes("Other");
    }
    // if single
    else {
      checkValueOfSelector = e.target.value === "Other";
    }

    setPageInputs((state) => ({
      ...state,
      [v.id]: {
        ...pageInputs[v.id],
        value: e.target.value,
      },
    }));

    // if selector value is Other we should make it required ( by removing not required)
    if (checkValueOfSelector && idOfOtherField) {
      setPageInputs((state) => ({
        ...state,
        [idOfOtherField]: {
          ...pageInputs[idOfOtherField],
          options: "",
        },
      }));
    } else {
      if (idOfOtherField) {
        setPageInputs((state) => ({
          ...state,
          [idOfOtherField]: {
            ...pageInputs[idOfOtherField],
            options: "notRequired",
          },
        }));
      }
    }
  }

  function returnRadioElement(options: RadioOptions[]): ReactNode[] {
    let html: ReactNode[] = [];

    map(options, (v) => {
      html.push(
        <FormControlLabel
          key={v.value}
          value={v.value}
          control={<Radio />}
          label={v.value}
        />
      );
    });
    return html;
  }

  function returnFieldsElement(
    v: QuestionnaireListType,
    child: QuestionnaireListType[]
  ): ReactNode[] {
    try {
      let html: ReactNode[] = [];
      let requiredFieldTextId: number | null | undefined = null;

      switch (v.quest_type) {
        // image
        case "imageType":
          html.push(
            <div key={v.id}>
              <ImageUpload
                returnFunction={retrunImage(v.id)}
                removeFunction={removeImage(v.id)}
                disableRemove={alreadySubmitted}
                imageValue={pageInputs[v.id].value}
                onError={pageInputs[v.id].error}
              />
              {(props.userRole === "a" || props.userRole === "c") && (
                <div style={{ paddingTop: "1rem" }}>
                  <a
                    href={pageInputs[v.id].value.secure_url}
                    download={pageInputs[v.id].value.original_filename}
                  >
                    <Button size="small" className="btn btn-third">
                      Download CV
                    </Button>
                  </a>
                </div>
              )}
            </div>
          );
          break;

        // selector
        case "selector":
          html.push(
            <div key={v.id}>
              <Select
                className={`textInput selectInput ${
                  pageInputs[v.id].error ? "errorInput" : ""
                } `}
                fullWidth
                multiple={v.quest_placeholder === "multi"}
                value={pageInputs[v.id]["value"]}
                onChange={(e: SelectChangeEvent) =>
                  selectorOnchange(e, v, child)
                }
                displayEmpty
                disabled={alreadySubmitted}
              >
                {returnSelectorElement(selectorOptions[v.options])}
              </Select>
            </div>
          );

          break;
        // radio
        case "radio":
          // in radio button stage options we need to take the id of the tested value so we are saving the id of the radio button
          if (v.options === "StagesRadioOptions") {
            requiredFieldTextId = child.find(
              (v) => v.quest_type === "requiredIfSelectedForStageRadio"
            )?.id;
          }
          html.push(
            <div style={{ textAlign: "left" }} key={v.id}>
              <FormControl disabled={alreadySubmitted}>
                <RadioGroup
                  aria-labelledby="muii-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={pageInputs[v.id]["value"]}
                  className={pageInputs[v.id].error ? "radioError" : ""}
                  onChange={(e: any) => {
                    const value = e.target.value;

                    setPageInputs((state) => ({
                      ...state,
                      [v.id]: {
                        ...state[v.id],
                        value,
                        error: false,
                      },
                      ...(requiredFieldTextId && {
                        [requiredFieldTextId]: {
                          ...state[requiredFieldTextId],
                          options: value === "Tested" ? "" : "notRequired",
                        },
                      }),
                    }));
                  }}
                >
                  {returnRadioElement(radioOptions[v.options])}
                </RadioGroup>
              </FormControl>
            </div>
          );
          break;
        // table
        case "table":
          html.push(
            <div key={v.id}>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead className={styles.tableHeader}>
                    <TableRow>
                      <TableCell style={{ borderRight: "1px solid lightgrey" }}>
                        <div className={styles.tableCell}>
                          <div>Current Products / Services</div>

                          {Object.keys(tableRows).length < 15 &&
                            !alreadySubmitted && (
                              <div
                                className={styles.iconsTable}
                                onClick={() => {
                                  const uniqueKey = Math.random()
                                    .toString(36)
                                    .substring(2, 9);

                                  setTableValues((state) => ({
                                    ...state,
                                    [uniqueKey]: {
                                      desc: "",
                                      product: "",
                                    },
                                  }));
                                }}
                              >
                                <AddIcon />
                                <div className={styles.product}>
                                  Add product
                                </div>
                              </div>
                            )}
                        </div>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        Additional information (Optional)
                      </TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {map(tableRows, (_, rowId) => (
                      <TableRow key={rowId}>
                        <TableCell
                          className={` ${
                            pageInputs[v.id].error ? "errorInputTable" : ""
                          }`}
                          style={{ borderRight: "1px solid lightgrey" }}
                        >
                          <Input
                            className={`inputTable`}
                            fullWidth
                            placeholder={`${
                              rowId === "1" ? "Eg: Clothing" : ""
                            }`}
                            disabled={alreadySubmitted}
                            value={tableRows[rowId].product}
                            onChange={(e: any) =>
                              setTableValues((state) => ({
                                ...state,
                                [rowId]: {
                                  ...tableRows[rowId],
                                  product: e.target.value,
                                },
                              }))
                            }
                            multiline
                            type="text"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            fullWidth
                            placeholder={`${
                              rowId === "1"
                                ? "Eg: The clothes will be manufactured in Canada and are intended for women's apparel."
                                : ""
                            }`}
                            className="inputTable"
                            disabled={alreadySubmitted}
                            value={tableRows[rowId].desc}
                            onChange={(e: any) =>
                              setTableValues((state) => ({
                                ...state,
                                [rowId]: {
                                  ...tableRows[rowId],
                                  desc: e.target.value,
                                },
                              }))
                            }
                            multiline
                            type="text"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <div>
                            {rowId !== "1" && !alreadySubmitted && (
                              <DeleteIcon
                                fontSize="small"
                                className={styles.iconsTable}
                                onClick={() => {
                                  const updatedObject = { ...tableRows };
                                  delete updatedObject[rowId];
                                  setTableValues(updatedObject);
                                }}
                              />
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          );
          break;

        default:
          // input field

          html.push(
            <div key={v.id}>
              <Input
                placeholder={v.quest_placeholder}
                fullWidth
                className={`textInput ${
                  pageInputs[v.id].error ? "errorInput" : ""
                }`}
                type={
                  v.quest_type === "number"
                    ? "number"
                    : v.quest_type === "email"
                    ? "email"
                    : "text"
                }
                multiline={
                  v.quest_order_index !== 0 && v.quest_type !== "number"
                }
                rows={
                  v.quest_order_index !== 0 && v.quest_type !== "number" ? 3 : 1
                }
                disabled={alreadySubmitted}
                value={pageInputs[v.id]["value"]}
                onChange={(e: any) => {
                  if (v.quest_type === "email") {
                    setEmail(e.target.value);
                  }
                  setPageInputs((state) => ({
                    ...state,
                    [v.id]: {
                      ...pageInputs[v.id],
                      value: e.target.value,
                    },
                  }));
                }}
              />

              {v.quest_min_char &&
                pageInputs[v.id]["value"].trim().length < v.quest_min_char && (
                  <Typography variant="caption" className={styles.minimumChar}>
                    Min Characters:{" "}
                    {pageInputs[v.id]["value"].trim().length > 0 &&
                      0 + pageInputs[v.id]["value"].trim().length + "/"}
                    {v.quest_min_char}
                  </Typography>
                )}
            </div>
          );
      }

      return html;
    } catch (error: any) {
      insertLogs(
        "client",
        "returnFieldsElement",
        "questionnaire",
        error?.message
      );
      return [];
    }
  }

  return (
    <>
      <SEO noIndex={true} title="Questionnaire - Horizon Consultancy" />
      <section>
        <div className={styles.mainContainer}>
          {!isEmpty(pageInputs) ? (
            <div className={styles.cardContent}>
              <FormikStepper
                initialValues={{
                  value: pageInputs,
                }}
                onSubmit={async (
                  step,
                  isFinalStep: boolean,
                  arrayOfError?: string[]
                ) => {
                  return await submitForm(step, isFinalStep, arrayOfError);
                }}
                projectId={props.projectId}
                alreadySubmitted={alreadySubmitted}
                tableRows={tableRows}
                userRole={props.userRole}
                projectType={props.serviceTypeQueryParam}
              >
                {map(
                  stepperDataType,
                  (child: QuestionnaireListType[], parent) => (
                    <FormikStep key={parent} label={parent}>
                      <div className={styles.inputContainer}>
                        <div className={styles.inputSection}>
                          <div className={styles.titleInfo}>
                            <div className="subTitle">
                              {props.serviceTypeQueryParam === "i"
                                ? "Let's Propose Ideas For You"
                                : "Let's Get To Know Your Business"}
                            </div>
                            <div className="description">
                              Complete the questionnaire step by step, providing
                              detailed responses for the best outcome. You can
                              save and edit your answers before submission.
                            </div>
                          </div>

                          {map(child, (v: QuestionnaireListType, i) => (
                            <div key={i}>
                              <div className={styles.title}>
                                <label>{v.quest_title}</label>
                                {v.quest_tooltip && (
                                  <div className={styles.info}>
                                    <Tooltip
                                      disableTouchListener={false}
                                      arrow={true}
                                      enterTouchDelay={0}
                                      leaveTouchDelay={3000}
                                      placement="top"
                                      title={v.quest_tooltip}
                                    >
                                      <HelpIcon
                                        fontSize="small"
                                        style={{
                                          color: "var(--secondaryColor)",
                                          cursor: "pointer",
                                        }}
                                      />
                                    </Tooltip>
                                  </div>
                                )}
                              </div>
                              <Box paddingBottom={4}>
                                {returnFieldsElement(v, child)}
                              </Box>
                            </div>
                          ))}
                        </div>
                      </div>
                    </FormikStep>
                  )
                )}
              </FormikStepper>
            </div>
          ) : (
            <div className={styles.loading}>
              <CircularProgress
                style={{ color: "var(--blueColor)" }}
                size={20}
              ></CircularProgress>
            </div>
          )}
        </div>
      </section>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </>
  );
};

export function FormikStep({
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  ...props
}: {
  children: React.ReactNode;
  initialValues: { value: InputData };
  projectId: string | number;
  alreadySubmitted: boolean;
  tableRows?: TableType;
  userRole: string;
  projectType: string;
  onSubmit: (
    step: number,
    isFinalStep: boolean,
    arrayOfError?: string[]
  ) => Promise<{ passed: boolean }>;
}) {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);
  const router = useRouter();
  const isLastStep = () => {
    return step === childrenArray.length - 1;
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogResult, setDialogResult] = useState("");

  useEffect(() => {
    let check = false;
    if (props.alreadySubmitted) {
      setCompleted(true);
    }
    map(props.initialValues.value, (v) => {
      if (!v.value && !check && v.options !== "notRequired") {
        check = true;
        setStep(v.index);
      }
    });
    if (!check && props.userRole === "u") {
      setStep(childrenArray.length - 1);
    }
    if (props.userRole !== "u") {
      setStep(0);
    }
  }, []);

  useEffect(() => {
    const handleAsyncEffect = async () => {
      if (dialogResult === "yes") {
        const result = await props.onSubmit(step, true);
        if (result.passed) {
          router.push("/dashboard");
        }
      }
    };

    handleAsyncEffect();
  }, [dialogResult]);

  async function dialogResultFn(v: string) {
    setDialogResult(v);
    setIsDialogOpen(false);
  }
  const inactiveStep = () => (
    <div className={styles.inactiveStep}>
      <CheckIcon className={styles.icon} />
    </div>
  );

  const activeStep = () => (
    <div className={styles.activeStepContainer}>
      {/* Outer Circle */}
      <div className={styles.activeOuterCircle}></div>

      {/* Middle Circle */}
      <div className={styles.activeMiddleCircle}></div>

      {/* Inner Circle */}
      <div className={styles.activeInnerCircle}></div>

      <CheckIcon className={styles.icon} />
    </div>
  );

  return (
    <Formik
      {...props}
      onSubmit={async () => {
        let err = "";
        let arrayOfError: string[] = [];
        try {
          map(props.initialValues.value, (v, i) => {
            if (v.index === step) {
              // if no value array and string
              if (
                (v.value?.length === 0 || !v.value) &&
                v.options !== "notRequired" &&
                v.questType !== "table"
              ) {
                err = "Some fields are required!";
                arrayOfError.push(i);
              }

              if (v.questType === "table") {
                let checkIfEmpty = true;
                map(props.tableRows, (row) => {
                  if (!row.product) {
                    checkIfEmpty = false;
                  }
                });

                if (!checkIfEmpty) {
                  err = "Product or service is required!";
                  arrayOfError.push(i);
                }
              }

              // if less then characters
              if (
                v.value &&
                v.minChar &&
                v.value.trim().length < v.minChar &&
                v.options !== "notRequired"
              ) {
                err = "Your answer is too short";
                arrayOfError.push(i);
              }

              // check if name or projectName
              if (v.questType === "name" || v.questType === "projectName") {
                if (v.value && v.value.trim().length > 30) {
                  err = `${
                    v.questType === "name" ? "Full name" : "Project name"
                  } must be between ${v.minChar} and 30 characters`;
                  arrayOfError.push(i);
                }
              }
              // check if email
              if (v.questType === "email") {
                if (
                  v.value &&
                  !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v.value)
                ) {
                  err = "Invalid email";
                  arrayOfError.push(i);
                }
              }
            }
          });
          if (!err) {
            if (isLastStep()) {
              if (props.alreadySubmitted) {
                return console.log("ate3un 3a ghayrna");
              }
              setIsDialogOpen(true);
            } else {
              if (props.alreadySubmitted) {
                setStep((s) => s + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                const result = await props.onSubmit(step, false);
                if (result.passed) {
                  setStep((s) => s + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }
            }
          } else {
            await props.onSubmit(step, false, arrayOfError);
            toast.error(err);
          }
        } catch (error: any) {
          insertLogs("client", "onSubmit", "questionnaire", error?.message);
        }
      }}
    >
      {({ isSubmitting }) => (
        <>
          <Form autoComplete="off">
            <OpenDialog
              text="Please note that submitted answers cannot be modified afterwards. Are you sure you want to proceed with the submission?"
              title={props.projectType === "i" ? "Get Your Review" : "Get Your Quote"}
              id="questionnaire"
              btnName={props.projectType === "i" ? "get review" : "get quote"}
              openDialog={isDialogOpen}
              onCloseDialog={(v) => dialogResultFn(v as string)}
            />

            <div className={styles.stepsSection}>
              <div className={styles.stepsContainer}>
                <div className={styles.stepperSection}>
                  <div className={styles.stepper}>
                    <Stepper activeStep={-1} orientation={"vertical"}>
                      {childrenArray.map((child, index) => {
                        if (
                          React.isValidElement(child) &&
                          child.props &&
                          child.props.label
                        ) {
                          return (
                            <Step
                              key={child.props.label}
                              completed={step > index || completed}
                            >
                              <StepLabel
                                StepIconComponent={
                                  step >= index || completed
                                    ? activeStep
                                    : inactiveStep
                                }
                              >
                                <div className={styles.stepNumber}>
                                  Part {index + 1}
                                </div>
                                <div className={styles.stepInfo}>
                                  {child.props.label}
                                </div>
                              </StepLabel>
                            </Step>
                          );
                        }
                        return null;
                      })}
                    </Stepper>
                  </div>

                  <div className={styles.stepperImage}>
                    <Image src={illustration} alt="illustration" />
                  </div>
                </div>
              </div>
              <div className={styles.questionsSection}>
                <div>{currentChild}</div>
                <div className={styles.btnSection}>
                  <div
                    className={`${styles.btnContainer} ${
                      step === 0 ? styles["no-back"] : ""
                    }`}
                  >
                    {step > 0 ? (
                      <div className={styles.back}>
                        <Button
                          disabled={isSubmitting}
                          size="large"
                          className="btn btn-whitish"
                          onClick={() => {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            setStep((s) => s - 1);
                          }}
                        >
                          Previous
                        </Button>
                      </div>
                    ) : null}

                    <div className={styles.next}>
                      {props.alreadySubmitted && isLastStep() ? (
                        <Button
                          size="large"
                          className="btn btn-secondary"
                          onClick={() => {
                            if (
                              props.userRole === "a" ||
                              props.userRole === "c"
                            ) {
                              return router.push(
                                "/consultant/dashboard-consultant"
                              );
                            } else {
                              return router.push("/dashboard");
                            }
                          }}
                        >
                          Back to dashboard
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          size="large"
                          className="btn btn-secondary"
                          disabled={
                            isSubmitting ||
                            (props.alreadySubmitted && isLastStep())
                          }
                        >
                          {isSubmitting
                            ? "Saving"
                            : isLastStep()
                            ? "Submit"
                            : completed
                            ? "next"
                            : "Save progress"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}

import { executeQuery } from "@/lib/db";
const sql = require("sql-template-strings");
import { getServerSession } from "next-auth/next";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { GetServerSidePropsContext } from "next/types";
import { optionsAuth } from "@/pages/api/auth/[...nextauth]";
import { configs } from "@/utils/config";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const routeAlliasService = {
    "business-plan": "business-plan",
    "ideas-generation": "ideas-generation",
    "financial-plan": "financial-plan",
    "marketing-plan": "marketing-plan",
    "complex-business-plan": "complex-business-plan",
  };
  const session = await getServerSession(context.req, context.res, optionsAuth);

  // check if logged in
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const id: string = session.user.id;
  const query = context?.query;
  let projectId: any = "";
  let serviceTypeQueryParam = "";
  if (!isEmpty(query)) {
    //check if query is empty if yes go to /
    switch (query.service) {
      case "ideas-generation":
        serviceTypeQueryParam = "i";
        break;
      case "business-plan":
        serviceTypeQueryParam = "b";
        break;
      case "financial-plan":
        serviceTypeQueryParam = "f";
        break;
      case "marketing-plan":
        serviceTypeQueryParam = "m";
        break;
      case "complex-business-plan":
        serviceTypeQueryParam = "bc";
        break;
      default:
        serviceTypeQueryParam = "";
    }

    // check if query service is services'name else go home
    if (!((query.service as string) in routeAlliasService)) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    // if query service not empty and matchs all the route
    else {
      try {
        // check if there is project id
        if (!isEmpty(query.project) && query.project !== "new") {
          projectId = query.project;

          const USERID = query?.userId || "";

          // means that its called even by admin or consultant
          let SQL;
          if (USERID && session.user.role === "c") {
            SQL = sql`select p.project_id from projects p where consultant_id = ${id} and p.customer_id = ${USERID} and  project_service = ${serviceTypeQueryParam} and project_id=${projectId}`;
          } else {
            SQL = sql`select p.project_id from projects p where customer_id = ${id} and project_service = ${serviceTypeQueryParam} and project_id=${projectId}`;
          }

          const checkIfhasProjects: {
            successQuery: boolean;
            data: any;
          } = (await executeQuery(SQL)) as {
            successQuery: boolean;
            data: any;
          };

          //check if User has this project
          if (checkIfhasProjects.successQuery) {
            // if no go to dashboard
            if (
              isEmpty(JSON.parse(checkIfhasProjects.data)) &&
              session.user.role !== "a"
            ) {
              return {
                redirect: {
                  destination: "/dashboard",
                  permanent: false,
                },
              };
            }
            // if project is valid then fetch by project id and type and user id
            else {
              return {
                props: {
                  projectId,
                  serviceTypeQueryParam,
                  title: query.service,
                  userId: id,
                  userRole: session.user.role,
                  USERID,
                },
              };
            }
          } else {
            throw {
              message: "error from project table when checkIfhasProjects ",
            };
          }
        }

        // if no project ID and project is NEW
        else {
          // if no project query in the query
          if (isEmpty(query.project)) {
            return {
              redirect: {
                destination: "/dashboard",
                permanent: false,
              },
            };
          }

          // if project.query = NEW

          if (query.project === "new") {
            return {
              props: {
                projectId: "new",
                serviceTypeQueryParam,
                title: query.service,
                userId: id,
                userRole: session.user.role,
              },
            };
          }
        }
      } catch (error: any) {
        insertLogs(
          "serverSide",
          "getServerSideProps",
          "questionnaire",
          error?.message,
          id
        );
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    }
  }
  // if all the query is empty
  else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default Questionnaire;
