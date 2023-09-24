import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Checkbox, Input } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
export interface DialogType {
  title: string;
  text?: string;
  type?: string;
  id: string;
  openDialog: boolean;
  onCloseDialog: (v: string | InfoEmailAlertValueType) => void;
}
interface InfoEmailAlertType {
  value: string;
  automatic: boolean;
  default: string;
}
export interface InfoEmailAlertValueType {
  modalName: string;
  result: {
    emailValue: string;
    alertValue: string;
    answer: string;
    type: string;
  };
}
type AllowedInputAlertKeys = "emailInfo" | "alertInfo";

type inputEmailAlertType = {
  [key in AllowedInputAlertKeys]: InfoEmailAlertType;
};

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function OpenDialog(props: DialogType) {
  const [open, setOpen] = React.useState(false);

  const DefaultValueEmailAlert: inputEmailAlertType = {
    emailInfo: {
      value:
        "default msg Email here about review is complete and you go and pay",
      automatic: true,
      default:
        "default msg Email here about review is complete and you go and pay",
    },
    alertInfo: {
      value: "default msg Alert here about review is complete and go to pay",
      automatic: true,
      default: "default msg Alert here about review is complete and go to pay",
    },
  };

  const [inputEmailAlert, setinputEmailAlert] =
    React.useState<inputEmailAlertType>(DefaultValueEmailAlert);

  React.useEffect(() => {
    setOpen(props.openDialog);
    if (props.type === "inputEmailAlert") {
      setinputEmailAlert(DefaultValueEmailAlert);
    }
  }, [props.openDialog]);

  const handleClose = (v: string) => {
    if (props.type === "inputEmailAlert") {
      props.onCloseDialog({
        modalName: props.id,
        result: {
          answer: v,
          emailValue: inputEmailAlert.emailInfo.value,
          alertValue: inputEmailAlert.alertInfo.value,
          type: props.type,
        },
      });
    } else {
      props.onCloseDialog(v);
    }
    setOpen(false);
  };
  function inputEmailAlertOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const fieldName = e.target.name as keyof inputEmailAlertType;
    setinputEmailAlert((curr: inputEmailAlertType) => ({
      ...curr,
      [fieldName]: {
        ...curr[fieldName],
        value: e.target.value,
        automatic: false,
      },
    }));
  }
  return (
    <div>
      <BootstrapDialog
        onClose={() => handleClose("no")}
        aria-labelledby={props.id}
        open={open}
        fullWidth={props.type ? true : false}
      >
        <BootstrapDialogTitle id={props.id} onClose={() => handleClose("no")}>
          {props.title}
        </BootstrapDialogTitle>
        {!props.type && (
          <DialogContent dividers>
            <Typography gutterBottom>{props.text}</Typography>
          </DialogContent>
        )}

        {/* inputEmailAlert */}
        {props.type === "inputEmailAlert" && (
          <>
            <div>
              <Checkbox
                checked={inputEmailAlert.emailInfo.automatic}
                onChange={() =>
                  setinputEmailAlert((curr: inputEmailAlertType) => ({
                    ...curr,
                    emailInfo: {
                      ...curr.emailInfo,
                      automatic: !curr.emailInfo.automatic,
                      value: !curr.emailInfo.automatic
                        ? curr.emailInfo.default
                        : "",
                    },
                  }))
                }
              />
              <label>Use default email template</label>
            </div>

            <div style={{ margin: "1rem" }}>
              <Input
                placeholder={"email"}
                className={`textInput`}
                type="text"
                name="emailInfo"
                fullWidth
                multiline={true}
                rows={5}
                value={
                  inputEmailAlert.emailInfo.automatic
                    ? inputEmailAlert.emailInfo.default
                    : inputEmailAlert.emailInfo.value
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  inputEmailAlertOnChange(e);
                }}
              />
            </div>

            <div>
              <Checkbox
                checked={inputEmailAlert.alertInfo.automatic}
                onChange={() =>
                  setinputEmailAlert((curr: inputEmailAlertType) => ({
                    ...curr,
                    alertInfo: {
                      ...curr.alertInfo,
                      automatic: !curr.alertInfo.automatic,
                      value: !curr.alertInfo.automatic
                        ? curr.alertInfo.default
                        : "",
                    },
                  }))
                }
              />
              <label>Use default alert template</label>
            </div>

            <div style={{ margin: "1rem" }}>
              <Input
                placeholder={"alert"}
                className={`textInput`}
                type="text"
                name="alertInfo"
                fullWidth
                multiline={true}
                rows={5}
                value={
                  inputEmailAlert.alertInfo.automatic
                    ? inputEmailAlert.alertInfo.default
                    : inputEmailAlert.alertInfo.value
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  inputEmailAlertOnChange(e);
                }}
              />
            </div>
          </>
        )}

        <DialogActions>
          <Button
            className="btn btn-secondary"
            onClick={() => handleClose("yes")}
          >
            {props.id === "confirm" ? "Confirm" : "Submit"}
          </Button>
          <Button className="links" onClick={() => handleClose("no")}>
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
